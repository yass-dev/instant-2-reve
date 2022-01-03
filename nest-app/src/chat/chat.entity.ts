import { Message } from "src/message/message.entity";
import { User } from "src/user/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Chat extends BaseEntity
{
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	is_group: Boolean;

	// For group only
	@Column({default: ""})
	name: string;

	@CreateDateColumn()
	created_date: Date;

	@UpdateDateColumn()
	updated_date: Date;

	@Column()
	photo: string;

	// For direct only
	@ManyToOne(() => User, user => user.created_chats)
	from: User;

	// For direct only
	@ManyToOne(() => User, user => user.created_chats)
	to: User;

	@ManyToMany(() => User, user => user.chats)
	@JoinTable()
	members: User[];

	@OneToMany(() => Message, message => message.chat, {onDelete: 'CASCADE'})
	messages: Message[];
}