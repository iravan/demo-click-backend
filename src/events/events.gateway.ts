import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

let database = {};

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('stat')
  stat(@MessageBody() data?: any): WsResponse<any> {
    return database as any;
  }

  @SubscribeMessage('click')
  async click(@MessageBody() data: any): Promise<string> {
    const { sid, value } = data;

    if (!database[sid]) {
      database[sid] = { ORANGE: 0, BLUE: 0 };
    }
    database[sid][value] += 1;
    if (this.server) {
      this.server.emit('stat', database);
    }
    return 'OK';
  }

  reset() {
    database = {};
  }
}
