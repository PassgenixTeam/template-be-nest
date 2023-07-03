import {
  BaseGateway,
  ClassValidatorFilter,
  ROLE,
  TransformInterceptor,
  WsAllExceptionsFilter,
} from '@app/common';
import { CustomWsExceptionFilter } from '@app/common/exception/custom-ws.exception';
import { WsAuth } from '@app/core';
import { Logger, UseFilters, UseInterceptors } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { CreateTestSocketDto } from './dto/create-test-socket.dto';
import { UpdateTestSocketDto } from './dto/update-test-socket.dto';
import { TestSocketService } from './test-socket.service';
import { SessionService } from 'src/modules/session/session.service';

@WebSocketGateway({
  cors: '*',
})
@UseFilters(WsAllExceptionsFilter, ClassValidatorFilter)
@UseInterceptors(new TransformInterceptor())
export class TestSocketGateway extends BaseGateway {
  constructor(
    private readonly testSocketService: TestSocketService,
    sessionService: SessionService,
  ) {
    super(
      new Logger(TestSocketGateway.name),
      testSocketService,
      sessionService,
    );
  }

  @WsAuth()
  @SubscribeMessage('createTestSocket')
  create(
    client: Socket,
    @MessageBody() createTestSocketDto: CreateTestSocketDto,
  ) {
    throw new CustomWsExceptionFilter('test message');
    return this.testSocketService.create(client, createTestSocketDto);
  }

  @WsAuth(ROLE.ADMIN)
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
