import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, ChatModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
