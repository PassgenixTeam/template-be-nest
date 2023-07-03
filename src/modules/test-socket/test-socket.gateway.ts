import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { TestSocketService } from './test-socket.service';
import { CreateTestSocketDto } from './dto/create-test-socket.dto';
import { UpdateTestSocketDto } from './dto/update-test-socket.dto';
import { Logger, UseFilters, UseInterceptors } from '@nestjs/common';
import {
  BaseGateway,
  ClassValidatorFilter,
  TransformInterceptor,
  WsAllExceptionsFilter,
} from '@app/common';
import { WsAuth } from '@app/core';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: '*',
})
@UseFilters(WsAllExceptionsFilter, ClassValidatorFilter)
@UseInterceptors(new TransformInterceptor())
export class TestSocketGateway extends BaseGateway {
  constructor(private readonly testSocketService: TestSocketService) {
    super(new Logger(TestSocketGateway.name), testSocketService);
  }

  @WsAuth()
  @SubscribeMessage('createTestSocket')
  create(
    client: Socket,
    @MessageBody() createTestSocketDto: CreateTestSocketDto,
  ) {
    return this.testSocketService.create(client, createTestSocketDto);
  }

  @SubscribeMessage('findAllTestSocket')
  findAll() {
    return this.testSocketService.findAll();
  }

  @SubscribeMessage('findOneTestSocket')
  findOne(@MessageBody() id: number) {
    return this.testSocketService.findOne(id);
  }

  @SubscribeMessage('updateTestSocket')
  update(@MessageBody() updateTestSocketDto: UpdateTestSocketDto) {
    return this.testSocketService.update(
      updateTestSocketDto.id,
      updateTestSocketDto,
    );
  }

  @SubscribeMessage('removeTestSocket')
  remove(@MessageBody() id: number) {
    return this.testSocketService.remove(id);
  }
}
