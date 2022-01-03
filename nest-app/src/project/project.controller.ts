import { Body, Controller, Delete, ForbiddenException, Get, NotFoundException, Param, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserService } from "src/user/user.service";
import { AddFeedbackDTO, CreateProjectDTO } from "./project.dto";
import { ProjectService } from "./project.service";

@UseGuards(JwtAuthGuard)
@Controller('/projects')
export class ProjectController
{
	constructor(private project_service: ProjectService,
				private user_service: UserService) {}

	@Get()
	async getAllProjects()
	{
		return await this.project_service.getAll();
	}

	@Post()
	async createProject(@Body() project_dto: CreateProjectDTO)
	{
		this.project_service.createProject(project_dto);
	}
	
	@Post(':id/members')
	async addMember(@Param('id') project_id: number, @Request() req)
	{
		let user = await this.user_service.findOneById(req.user.id);
		let project = await this.project_service.getOneById(project_id);
		if (!project)
			throw new NotFoundException("Project not found");
		await this.project_service.addMember(project, user);
		return await this.project_service.getOneById(project_id);
	}

	@Delete(':id/members')
	async removeMember(@Param('id') project_id: number, @Request() req)
	{
		let user = await this.user_service.findOneById(req.user.id);
		let project = await this.project_service.getOneById(project_id);
		if (!project)
			throw new NotFoundException("Project not found");
		await this.project_service.removeMember(project, user);
		return await this.project_service.getOneById(project_id);
	}

	@Post(':id/feedbacks')
	async addFeedback(@Param('id') project_id: number, @Request() req, @Body() body: AddFeedbackDTO)
	{
		let user = await this.user_service.findOneById(req.user.id);
		let project = await this.project_service.getOneById(project_id);
		if (!project)
			throw new NotFoundException("Project not found.");
		if (project.members.find(member => member.id == user.id) === undefined)
			throw new ForbiddenException("You must be registered to this project to add feedback.");
		await this.project_service.addFeedback(project, user, body);
		return await this.project_service.getOneById(project_id);
	}
}
