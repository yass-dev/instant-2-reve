import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController
{
	constructor(private auth_service: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('/login')
	async login(@Request() req)
	{
		return this.auth_service.login(req.user);
	}

	@Post('/register')
	async register(@Body() body: RegisterDTO)
	{
		await this.auth_service.register(body);
	}
}
