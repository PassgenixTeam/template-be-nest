import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { StripeModule } from './modules/stripe/stripe.module';

@Module({
  providers: [PaymentService],
  exports: [PaymentService],
  imports: [StripeModule],
})
export class PaymentModule {}
