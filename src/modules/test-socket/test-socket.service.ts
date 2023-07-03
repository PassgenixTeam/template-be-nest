import { Injectable } from '@nestjs/common';
import { CreateTestSocketDto } from './dto/create-test-socket.dto';
import { UpdateTestSocketDto } from './dto/update-test-socket.dto';
import { Server, Socket } from 'socket.io';
import { IGatewayBase } from '@app/common';
import { CustomWsExceptionFilter } from '@app/common/exception/custom-ws.exception';

@Injectable()
export class TestSocketService implements IGatewayBase {
  server!: Server;

  initServer(server: Server) {
    this.server = server;
  }

  create(client: Socket, createTestSocketDto: CreateTestSocketDto) {
    console.log(createTestSocketDto);
    throw new CustomWsExceptionFilter({
      eventMessage: 'test event message',
      message: 'test message',
    });
    client.emit('message', 'hello');
  }

  findAll() {
    return `This action returns all testSocket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testSocket`;
  }

  update(id: number, _updateTestSocketDto: UpdateTestSocketDto) {
    return `This action updates a #${id} testSocket`;
  }

  remove(id: number) {
    return `This action removes a #${id} testSocket`;
  }
}
