import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";
import { ProjectFeedback } from "./project-feedback/project-feedback.entity";
import { ProjectObjective } from "./project-objective/project-objective.entity";
import { ProjectStep } from "./project-step/project-step.entity";
import { ProjectController } from "./project.controller";
import { Project } from "./project.entity";
import { ProjectGateway } from "./project.gateway";
import { ProjectService } from "./project.service";

@Module({
	imports: [TypeOrmModule.forFeature([Project, ProjectStep, ProjectObjective, ProjectFeedback]), UserModule, AuthModule],
	controllers: [ProjectController],
	providers: [ProjectService, ProjectGateway]
})
export class ProjectModule {}