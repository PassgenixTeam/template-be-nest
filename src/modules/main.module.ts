import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [UserModule, PaymentModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
