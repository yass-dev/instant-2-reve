import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDate, IsDefined, IsNotEmpty, ValidateNested } from "class-validator";

class ProjectObjectiveDTO
{
	@IsDefined()
	@IsNotEmpty()
	name: string;

	@IsDefined()
	@IsNotEmpty()
	min: number;

	@IsDefined()
	@IsNotEmpty()
	max: number;

	@IsDefined()
	@IsNotEmpty()
	value: number;
}

class ProjectStepDTO
{
	@IsDefined()
	@IsNotEmpty()
	name: string;

	@IsDefined()
	@IsNotEmpty()
	description: string;

	@IsDefined()
	@IsNotEmpty()
	place: string;

	@IsDefined()
	@Type(() => Date)
	@IsDate()
	start_date: Date;

	@IsDefined()
	@Type(() => Date)
	@IsDate()
	end_date: Date;

	@IsDefined()
	@IsArray()
	@ValidateNested()
	@Type(() => ProjectObjectiveDTO)
	objectives: ProjectObjectiveDTO[];
}

export class CreateProjectDTO
{
	@IsDefined()
	@IsNotEmpty()
	name: string;

	@IsDefined()
	@IsNotEmpty()
	description: string;

	@IsDefined()
	@IsArray()
	@ValidateNested()
	@Type(() => ProjectStepDTO)
	@ArrayMinSize(1)
	steps: ProjectStepDTO[];
}