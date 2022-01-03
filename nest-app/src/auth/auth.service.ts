import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService
{
	constructor(private user_service: UserService,
				private jwt_service: JwtService)
	{

	}

	async validateUser(username: string, pass: string): Promise<any>
	{
		const user = await this.user_service.checkLogin(username, pass);
		if (user)
			return user;
		return null;
	}

	async login(user: any)
	{
		const payload = { username: user.username, sub: user.id };
		user = await this.user_service.findOneById(user.id);
		return {
			access_token: this.jwt_service.sign(payload),
			user: user
		};
	}

	async validateToken(access_token: string): Promise<User>
	{	
		const decoded = await this.jwt_service.verify(access_token);
		let user = this.user_service.findOneById(decoded.sub);
		if (!user)
			throw new UnauthorizedException();
		return user;
	}
}
