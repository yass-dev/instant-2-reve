import { Logger, Request, UseGuards } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';
import { AuthService } from "src/auth/auth.service";
import { WsJwtGuard } from "src/auth/ws-jwt.guard";
import { Project } from "./project.entity";

const CHAT_ROOM_PREFIX = "chat_";

@UseGuards(WsJwtGuard)
@WebSocketGateway({cors: true, namespace: 'project'})
export class ProjectGateway
{
	@WebSocketServer() server: Server;

	private logger: Logger = new Logger('ProjectGateway');
	private users: Array<Socket> = new Array<Socket>();

	constructor(private auth_service: AuthService) {}

	async handleConnection(client: Socket, ...args: any[])
	{
		const token = client.handshake.headers.authorization.split(' ')[1];
		const user = await this.auth_service.validateToken(token);
		if (!user)
			client.disconnect();
	
		this.users[user.id] = client;

		this.logger.debug(`Client connected: ${user.username}`);
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

	emitNewProject(project: Project)
	{
		this.server.emit('new_project', project);
	}

	emitUpdateProject(project: Project)
	{
		this.server.emit('update_project', project);
	}
}