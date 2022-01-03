import { Logger, Request, UseGuards } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';
import { AuthService } from "src/auth/auth.service";
import { WsJwtGuard } from "src/auth/ws-jwt.guard";
import { Message } from "src/message/message.entity";
import { UserService } from "src/user/user.service";
import { Chat } from "./chat.entity";

const CHAT_ROOM_PREFIX = "chat_";

@UseGuards(WsJwtGuard)
@WebSocketGateway({cors: true, namespace: 'chat'})
export class ChatGateway
{
	@WebSocketServer() server: Server;

	private logger: Logger = new Logger('ChatGateway');
	private users: Array<Socket> = new Array<Socket>();

	constructor(private user_service: UserService,
				private auth_service: AuthService) {}

	async handleConnection(client: Socket, ...args: any[])
	{
		const token = client.handshake.headers.authorization.split(' ')[1];
		const user = await this.auth_service.validateToken(token);
		if (!user)
			client.disconnect();
	
		this.users[user.id] = client;
		
		let chats = await this.user_service.getChats(user.id);
		for (let chat of chats)
			client.join(`${CHAT_ROOM_PREFIX}${chat.id}`);

		this.logger.debug(`Client connected: ${user.username} (${chats.length} rooms)`);
	}

	handleDisconnect(client: Socket)
	{
		let user_id = this.getUserBySocket(client);
		this.logger.log(`Client disconnected: user ${user_id}`);
		delete this.users[user_id];
	}

	getUserBySocket(socket: Socket)
	{
		for (let user_id of Object.keys(this.users))
			if (this.users[user_id].id == socket.id)
				return user_id;
		return null;
	}

	emitNewMessage(chat: Chat, message: Message)
	{
		this.server.to(`${CHAT_ROOM_PREFIX}${chat.id}`).emit('new_message', {chat_id: chat.id, message: message});
	}

	emitNewChat(chat: Chat)
	{
		// Join the new room if user is connected
		for (let member of chat.members)
			if (this.users[member.id])
				this.users[member.id].join(`${CHAT_ROOM_PREFIX}${chat.id}`);
		this.server.to(`${CHAT_ROOM_PREFIX}${chat.id}`).emit('new_chat', {chat: chat});
	}
}