import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController
{
	constructor (private user_service: UserService) {}

	@Get('/')
	async getAllUsers(@Request() req)
	{
		return await this.user_service.findAllUsers(req.user.id);
	}
}
