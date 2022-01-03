import { Chat } from "src/chat/chat.entity";
import { User } from "src/user/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message extends BaseEntity
{
	@PrimaryGeneratedColumn()
	id: number;

	@Column({default: "text"})
	type: string;

	@Column()
	content: string;

	// Only for image
	@Column({default: ""})
	mime_type: string;

	// Only for file
	@Column({default: ""})
	filename: string;

	@Column({type: 'datetime'})
	date: Date;

	@ManyToOne(() => User, user => user.messages)
	sender: User;

	@ManyToOne(() => Chat, chat => chat.messages)
	chat: Chat;
}