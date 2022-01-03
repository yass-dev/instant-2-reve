import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectObjective } from "./project-objective/project-objective.entity";
import { ProjectStep } from "./project-step/project-step.entity";
import { CreateProjectDTO } from "./project.dto";
import { Project } from "./project.entity";

@Injectable()
export class ProjectService
{
	constructor(@InjectRepository(Project) private repository: Repository<Project>,
				@InjectRepository(ProjectStep) private step_repository: Repository<ProjectStep>,
				@InjectRepository(ProjectObjective) private objective_repository: Repository<ProjectObjective>) {}

	async getAll()
	{
		return await this.repository.createQueryBuilder('project')
		.leftJoinAndSelect('project.steps', 'steps')
		.leftJoinAndSelect('project.members', 'project_members')
		.leftJoinAndSelect('steps.objectives', 'objectives')
		.leftJoinAndSelect('steps.members', 'step_members')
		.getMany();
	}

	async createProject(project_dto: CreateProjectDTO)
	{
		let project = new Project;
		project.name = project_dto.name;
		project.description = project_dto.description;
		project.status = "NOT_STARTED";
		project.start_date = project_dto.steps[0].start_date;
		project.end_date = project_dto.steps[project_dto.steps.length - 1].end_date;
		project.steps = [];
		for (let s of project_dto.steps)
		{
			let step = new ProjectStep;
			step.name = s.name;
			step.description = s.description;
			step.start_date = s.start_date;
			step.end_date = s.end_date;
			step.place = s.place;
			step.status = 'NOT_STARTED';
			step.objectives = [];
			for (let obj of s.objectives)
			{
				let objective = new ProjectObjective;
				objective.name = obj.name;
				objective.min = obj.min;
				objective.max = obj.max;
				objective.value = obj.value;
				objective = await this.objective_repository.save(objective);
				step.objectives.push(objective);
			}
			step = await this.step_repository.save(step);
			project.steps.push(step);
		}
		await this.repository.save(project);
	}
}