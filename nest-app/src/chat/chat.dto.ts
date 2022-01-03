import { IsArray, IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CreateGroupDTO
{
	@IsDefined()
	@IsNotEmpty()
	name: string;

	@IsDefined()
	@IsNotEmpty()
	@IsArray()
	users_id: [];
}

export class CreateDirectDto
{
	@IsDefined()
	@IsNotEmpty()
	user_id: number | String;
}

export class CreateTextMessageDto
{
	@IsDefined()
	@IsNotEmpty()
	type: string;

	@IsDefined()
	@IsNotEmpty()
	content: string;
}