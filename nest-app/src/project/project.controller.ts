import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateProjectDTO } from "./project.dto";
import { ProjectService } from "./project.service";

@Controller('/projects')
export class ProjectController
{
	constructor(private project_service: ProjectService) {}

	@Get()
	async getAllProjects()
	{
		return await this.project_service.getAll();
	}

	@Post()
	createProject(@Body() project_dto: CreateProjectDTO)
	{
		this.project_service.createProject(project_dto);
	}
}
