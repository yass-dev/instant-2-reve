import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'

@Injectable()
export class WsJwtGuard implements CanActivate
{
	constructor(private auth_service: AuthService) {}

	canActivate(context: any): boolean | any | Promise<boolean | any> | Observable<boolean | any>
	{
		const bearerToken = context.args[0].handshake.headers.authorization.split(' ')[1];
		try
		{
			this.auth_service.validateToken(bearerToken)
			.then (user =>
			{
				context.switchToHttp().getRequest().user = user;
			})
		}
		catch (ex)
		{
			console.log(ex);
			return false;
		}
	}
}