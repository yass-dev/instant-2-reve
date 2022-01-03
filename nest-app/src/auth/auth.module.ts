import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import JwtConfig from './jwt.config';
import { JwtStrategy } from './jwt.strategy';
import { WsJwtGuard } from './ws-jwt.guard';

@Module({
	imports: [UserModule, JwtModule.register({
		secret: JwtConfig.secret,
		signOptions: {},
	}),],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, JwtStrategy, WsJwtGuard],
	exports: [AuthService, WsJwtGuard]
})
export class AuthModule {}
