import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Chat } from "src/chat/chat.entity";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { Message } from "./message.entity";

@Injectable()
export class MessageService
{
	constructor (@InjectRepository(Message) private repository: Repository<Message>) {}

	async createMessage(sender: User, type: string, content: string, chat: Chat, mime_type: string = "", filename: string = ""): Promise<Message>
	{
		let message = new Message();
		message.content = content;
		message.type = type;
		message.sender = sender;
		message.chat = chat;
		message.date = new Date();
		message.mime_type = mime_type;
		message.filename = filename
		return await this.repository.save(message);
	}
}