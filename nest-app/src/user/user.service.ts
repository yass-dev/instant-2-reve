import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/chat/chat.entity';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService
{
	constructor (@InjectRepository(User) private repository : Repository<User>) {}

	async getChats(user_id: number): Promise<Chat[]>
	{
		let user = await this.repository.createQueryBuilder('user')
		.innerJoinAndSelect('user.chats', 'chats')
		.where('user.id = :user_id', {user_id: user_id})
		.getOne();
		return user.chats;
	}

	async checkLogin(username: string, password: string)
	{
		let user = await this.repository.findOne({
			where: {username: username, password: password}
		});
		return user;
	}

	async findOneById(id: String | number): Promise<User | null>
	{
		let user = await this.repository.createQueryBuilder('user')
		.select()
		.where("user.id = :id", { id: id })
		.getOne();
		return user;
	}

	async findAllUsers(except_id: number) : Promise<User[]>
	{
		let users = await this.repository.createQueryBuilder("user")
		.where("user.id != :id", {id: except_id})
		.getMany();
		return users;
	}
}
