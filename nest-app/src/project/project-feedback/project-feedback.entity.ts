import { User } from "src/user/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../project.entity";

@Entity()
export class ProjectFeedback extends BaseEntity
{
	@PrimaryGeneratedColumn()
	id: number;

	@Column({type: 'text'})
	comment: string;

	@Column()
	note: number;

	@Column()
	is_anonyme: Boolean;

	@CreateDateColumn()
	date: Date;

	@ManyToOne(() => User, user => user.feedbacks)
	user: User;

	@ManyToOne(() => Project, project => project.feedbacks)
	project: Project;
}