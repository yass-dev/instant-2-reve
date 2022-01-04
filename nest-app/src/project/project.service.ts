import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { ProjectFeedback } from "./project-feedback/project-feedback.entity";
import { ProjectObjective } from "./project-objective/project-objective.entity";
import { ProjectStep } from "./project-step/project-step.entity";
import { AddFeedbackDTO, CreateProjectDTO } from "./project.dto";
import { Project } from "./project.entity";

@Injectable()
export class ProjectService
{
	constructor(@InjectRepository(Project) private repository: Repository<Project>,
				@InjectRepository(ProjectStep) private step_repository: Repository<ProjectStep>,
				@InjectRepository(ProjectObjective) private objective_repository: Repository<ProjectObjective>,
				@InjectRepository(ProjectFeedback) private feedback_repository: Repository<ProjectFeedback>) {}

	async getAll(): Promise<Project[]>
	{
		let projects = await this.repository.createQueryBuilder('project')
		.leftJoinAndSelect('project.steps', 'steps')
		.leftJoinAndSelect('project.members', 'project_members')
		.leftJoinAndSelect('project.feedbacks', 'feedbacks')
		.leftJoinAndSelect('feedbacks.user', 'feedbacks_user')
		.leftJoinAndSelect('steps.objectives', 'objectives')
		.getMany();

		for (let project of projects)
			project = this.removeAnonymeFeedbacks(project);

		return projects;
	}

	async getOneById(id: number)
	{
		let project = await this.repository.createQueryBuilder('project')
		.leftJoinAndSelect('project.steps', 'steps')
		.leftJoinAndSelect('project.members', 'project_members')
		.leftJoinAndSelect('project.feedbacks', 'feedbacks')
		.leftJoinAndSelect('feedbacks.user', 'feedbacks_user')
		.leftJoinAndSelect('steps.objectives', 'objectives')
		.where('project.id = :id', {id: id})
		.getOne();

		project = this.removeAnonymeFeedbacks(project);

		return project
	}

	async createProject(project_dto: CreateProjectDTO): Promise<Project>
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
		return await this.repository.save(project);
	}

	async addMember(project: Project, user: User): Promise<Project>
	{
		if (project.members.find(member => member.id == user.id) !== undefined)
			throw new ConflictException("You are already registered to this project.");
		project.members.push(user);
		return await this.repository.save(project);
	}

	async removeMember(project: Project, user: User): Promise<Project>
	{
		let index = project.members.findIndex(member => member.id == user.id);
		if (index === -1)
			throw new NotFoundException("User not found in project members");
		project.members.splice(index, 1);
		return await this.repository.save(project);
	}

	async addFeedback(project: Project, user: User, fb: AddFeedbackDTO)
	{
		let feedback = new ProjectFeedback();
		feedback.comment = fb.comment;
		feedback.note = fb.note;
		feedback.user = user;
		feedback.project = project;
		feedback.is_anonyme = fb.is_anonyme;
		feedback = await this.feedback_repository.save(feedback);
	}

	removeAnonymeFeedbacks(project: Project): Project
	{
		for (let feedback of project.feedbacks)
			if (feedback.is_anonyme)
				delete feedback.user;
		return project;
	}
}