import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDTO } from 'src/auth/auth.dto';
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
		.leftJoinAndSelect('user.chats', 'user_chats')
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

	async create(u: RegisterDTO)
	{
		let user = new User();
		user.email = u.email;
		user.first_name = u.first_name;
		user.last_name = u.last_name;
		user.username = u.username;
		user.password = u.password;
		user.photo = "https://img2.freepng.fr/20180626/fhs/kisspng-avatar-user-computer-icons-software-developer-5b327cc98b5780.5684824215300354015708.jpg";
		user.is_admin = false;
		user.biography = u.biography;
		await this.repository.save(user);
	}
}
