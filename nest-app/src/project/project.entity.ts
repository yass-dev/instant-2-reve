import { User } from "src/user/user.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectFeedback } from "./project-feedback/project-feedback.entity";
import { ProjectStep } from "./project-step/project-step.entity";

@Entity()
export class Project extends BaseEntity
{
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;
	
	@Column({type: 'text'})
	description: string;

	@Column({type: 'datetime'})
	start_date: Date;

	@Column({type: 'datetime'})
	end_date: Date;

	@Column()
	status: 'NOT_STARTED' | 'IN_PROGRESS' | 'FINISHED';

	@ManyToMany(() => User, user => user.projects)
	@JoinTable()
	members: User[];

	@OneToMany(() => ProjectStep, step => step.project, {cascade: true})
	steps: ProjectStep[];

	@OneToMany(() => ProjectFeedback, feedback => feedback.project, {cascade: true})
	feedbacks: ProjectFeedback[];
}