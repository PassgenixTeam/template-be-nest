import { Module } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { PaypalController } from './paypal.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PaypalController],
  providers: [PaypalService],
})
export class PaypalModule {}
