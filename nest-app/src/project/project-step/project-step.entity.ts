import { User } from "src/user/user.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectObjective } from "../project-objective/project-objective.entity";
import { Project } from "../project.entity";

@Entity()
export class ProjectStep extends BaseEntity
{
	@PrimaryGeneratedColumn()
	id: number;
	
	@Column()
	name: string;

	@Column()
	description: string;

	// String because the place can be large (centre-ville, quartier des facultés, ...)
	@Column()
	place: string;

	@Column({type: 'datetime'})
	start_date: Date;

	@Column({type: 'datetime'})
	end_date: Date;

	@Column()
	status: 'NOT_STARTED' | 'IN_PROGRESS' | 'FINISHED';

	@ManyToOne(() => Project, project => project.steps, {onDelete: 'CASCADE'})
	project: Project;

	@OneToMany(() => ProjectObjective, objective => objective.step, {cascade: true})
	objectives: ProjectObjective[];
}