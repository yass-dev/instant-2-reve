import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from 'src/message/message.module';
import { UserModule } from 'src/user/user.module';
import { ChatController } from './chat.controller';
import { Chat } from './chat.entity';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import MulterConfig from '../upload/multer.config';

@Module({
	imports: [TypeOrmModule.forFeature([Chat]), UserModule, MessageModule, AuthModule, MulterModule.register(MulterConfig)],
	providers: [ChatService, ChatGateway],
	controllers: [ChatController],
	exports: [ChatService]
})
export class ChatModule {}
