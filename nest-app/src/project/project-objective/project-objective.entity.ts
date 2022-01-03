import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectStep } from "../project-step/project-step.entity";

@Entity()
export class ProjectObjective extends BaseEntity
{
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	min: number;

	@Column()
	max: number;

	@Column()
	value: number;

	@ManyToOne(() => ProjectStep, step => step.objectives, {onDelete: 'CASCADE'})
	step: ProjectStep;
}