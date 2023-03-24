import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { StripeModule } from '@app/payment';
import { PaypalModule } from '../../libs/payment/src/modules/paypal/paypal.module';

@Module({
  imports: [UserModule, StripeModule, PaypalModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
