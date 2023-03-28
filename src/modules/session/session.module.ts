import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionEntity } from './entities/session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class SessionModule {}
