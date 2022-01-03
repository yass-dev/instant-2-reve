import { BadRequestException, Body, ConflictException, Controller, ForbiddenException, Get, NotFoundException, Param, Post, Req, Request, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { AppService } from 'src/app.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MessageService } from 'src/message/message.service';
import { imageFileFilter } from 'src/upload/multer.config';
import { UserService } from 'src/user/user.service';
import { CreateDirectDto, CreateGroupDTO, CreateTextMessageDto } from './chat.dto';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController
{
	constructor(private chat_service: ChatService,
				private message_service: MessageService,
				private user_service: UserService,
				private chat_gateway: ChatGateway,
				) {}

	@Get()
	async getChats(@Request() req)
	{
		let chats = await this.chat_service.getAllChatsOfUser(req.user.id);
		return chats;
	}

	@Post('/groups')
	async createGroup(@Body() group: CreateGroupDTO, @Request() req)
	{
		let creator = await this.user_service.findOneById(req.user.id);
		let members = [creator];
		for (let id of group.users_id)
		{
			let member = await this.user_service.findOneById(id);
			if (!member)
				throw new NotFoundException(`User with id ${id} not found.`);
			members.push(member);
		}
		let chat = await this.chat_service.createGroup(group, creator, members);
		this.chat_gateway.emitNewChat(chat);
	}

	@Post('/directs')
	async createDirect(@Body() body: CreateDirectDto, @Request() req)
	{
		if (req.user.id == body.user_id)
			throw new BadRequestException("You cannot DM yourself.");
		let from = await this.user_service.findOneById(req.user.id);
		let to = await this.user_service.findOneById(body.user_id);
		if (!from || !to)
			throw new NotFoundException("User not found.");

		if (await this.chat_service.directExists(from, to))
			throw new ConflictException(`Chat with ${to.username} already exists.`);
		let direct = await this.chat_service.createDirect(from, to);
		this.chat_gateway.emitNewChat(direct);
		return direct;
	}

	@Post(':id/messages')
	async postMessages(@Request() req, @Param('id') id: number, @Body() body: CreateTextMessageDto)
	{
		let user = await this.user_service.findOneById(req.user.id);
		let chat = await this.chat_service.findById(id);

		if (!chat)
			throw new NotFoundException(`Chat with id ${id} not found`);

		if (!this.chat_service.chatContainsUser(chat, user))
			throw new ForbiddenException("You have not access to this chat");

		let message = await this.message_service.createMessage(user, 'text', body.content, chat);

		this.chat_gateway.emitNewMessage(chat, message);
	}

	@Post(':id/messages/images')
	@UseInterceptors(FilesInterceptor('images', 10, {
		fileFilter: imageFileFilter
	}))
	async postImageMessage(@UploadedFiles() files: Array<Express.Multer.File>, @Param('id') id : number, @Request() req)
	{
		if (req.file_filter_error)
			throw new BadRequestException(req.file_filter_error);

		let user = await this.user_service.findOneById(req.user.id);
		let chat = await this.chat_service.findById(id);

		if (!chat)
			throw new NotFoundException(`Chat with id ${id} not found`);

		if (!this.chat_service.chatContainsUser(chat, user))
			throw new ForbiddenException("You have not access to this chat");

		for (let file of files)
		{
			let message = await this.message_service.createMessage(user, 'image', file.path, chat, file.mimetype);
			this.chat_gateway.emitNewMessage(chat, message);
		}
	}

	@Post(':id/messages/files')
	@UseInterceptors(FilesInterceptor('files', 10))
	async postFileMessage(@UploadedFiles() files: Array<Express.Multer.File>, @Param('id') id : number, @Request() req)
	{
		let user = await this.user_service.findOneById(req.user.id);
		let chat = await this.chat_service.findById(id);

		if (!chat)
			throw new NotFoundException(`Chat with id ${id} not found`);

		if (!this.chat_service.chatContainsUser(chat, user))
			throw new ForbiddenException("You have not access to this chat");

		for (let file of files)
		{
			let message = await this.message_service.createMessage(user, 'file', file.path, chat, file.mimetype, file.originalname);
			this.chat_gateway.emitNewMessage(chat, message);
		}
	}

	@UseGuards()
	@Get(':chat_id/messages/:message_id')
	async getMessage(@Request() req, @Param('chat_id') chat_id: number, @Param('message_id') message_id: number, @Res() response: Response)
	{
		let user = await this.user_service.findOneById(req.user.id);
		let chat = await this.chat_service.findById(chat_id);

		if (!chat)
			throw new NotFoundException(`Chat with id ${chat_id} not found`);

		if (!this.chat_service.chatContainsUser(chat, user))
			throw new ForbiddenException("You have not access to this chat");

		let message = chat.messages.find(message => message.id == message_id);
		if (message === undefined)
			throw new NotFoundException("Message not found.");

		if (message.type == 'image' || message.type == 'file')
		{
			const file = createReadStream(message.content);
			response.set('Content-Type', message.mime_type);
			if (message.type == 'file')
				response.set('Content-Disposition', `attachment;filename=${message.filename}`);
			file.pipe(response);
		}
		else
			return message.content;
	}
}
