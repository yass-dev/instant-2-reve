import { IsDefined, IsEmail, IsNotEmpty } from "class-validator";

export class RegisterDTO
{
	@IsDefined()
	@IsNotEmpty()
	first_name: string;

	@IsDefined()
	@IsNotEmpty()
	last_name: string;

	@IsDefined()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsDefined()
	@IsNotEmpty()
	username: string;

	@IsDefined()
	@IsNotEmpty()
	password: string;

}