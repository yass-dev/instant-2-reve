import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/message/message.entity';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateGroupDTO } from './chat.dto';
import { Chat } from './chat.entity';

@Injectable()
export class ChatService
{
	constructor(@InjectRepository(Chat) private repository: Repository<Chat>,
				private user_service: UserService) {}

	async getAllChatsOfUser(user_id: number)
	{
		let chats = await this.user_service.getChats(user_id);
		let ids = chats.map(chat => chat.id);
		if (ids.length == 0)
			return [];

		chats = await this.repository.createQueryBuilder("chat")
		.leftJoinAndSelect('chat.members', 'members')
		.leftJoinAndSelect('chat.messages', 'messages')
		.leftJoinAndSelect('messages.sender', 'sender')
		.where('chat.id IN (:...ids)', {ids: ids.length > 0 ? ids : [-1]})
		.getMany();

		for (let chat of chats)
			chat.messages.sort((a: Message, b: Message) => (a.date.getTime() - b.date.getTime()));
		return chats;
	}

	async createGroup(group: CreateGroupDTO, creator: User, members: User[]): Promise<Chat>
	{
		let chat = new Chat;
		chat.is_group = true;
		chat.from = creator;
		chat.members = members;
		chat.name = group.name;
		chat.messages = [];
		chat.photo = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
		return await this.repository.save(chat);
	}

	async createDirect(from: User, to: User): Promise<Chat>
	{
		let chat = new Chat;
		chat.is_group = false;
		chat.from = from;
		chat.to = to;
		chat.members = [from, to];
		chat.messages = [];
		chat.photo = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
		return await this.repository.save(chat);
	}

	async directExists(user_1: User, user_2: User): Promise<Boolean>
	{
		let chats = await this.repository
		.createQueryBuilder('chat')
		.innerJoin('chat.from', 'from', 'from.id IN (:user_1_id, :user_2_id)', {user_1_id: user_1.id, user_2_id: user_2.id})
		.innerJoin('chat.to', 'to', 'to.id IN (:user_1_id, :user_2_id)', {})
		.where('chat.is_group = 0')
		.getMany();

		return chats.length > 0;
	}

	async findById(id: number): Promise<Chat>
	{
		let chat = await this.repository.createQueryBuilder('chat')
		.leftJoinAndSelect('chat.members', 'members')
		.leftJoinAndSelect('chat.messages', 'messages')
		.where('chat.id = :id', {id: id})
		.getOne();
		return chat ? chat : null;
	}

	chatContainsUser(chat: Chat, user: User) : Boolean
	{
		return chat.members.find(member => member.id == user.id) != undefined;
	}
}
