import { Chat } from "src/chat/chat.entity";
import { Message } from "src/message/message.entity";
import { ProjectFeedback } from "src/project/project-feedback/project-feedback.entity";
import { ProjectStep } from "src/project/project-step/project-step.entity";
import { Project } from "src/project/project.entity";
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity
{
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	first_name: string;

	@Column()
	last_name: string;

	@Column({select: false})
	email: string;

	@Column()
	username: string;

	@Column({select: false})
	password: string;

	@Column()
	photo: string;

	@Column()
	is_admin: Boolean;

	@ManyToMany(() => Project, project => project.members)
	projects: Project[];

	@ManyToMany(() => Chat, chat => chat.members)
	chats: Chat[];

	@OneToMany(() => Chat, chat => chat.from)
	created_chats: Chat[];

	@OneToMany(() => Chat, chat => chat.to)
	received_chats: Chat[];

	@OneToMany(() => Message, message => message.sender)
	messages: Message[];

	@ManyToMany(() => ProjectStep, step => step.members)
	project_steps: ProjectStep[];

	@OneToMany(() => ProjectFeedback, feedback => feedback.user)
	feedbacks: ProjectFeedback[];
}