import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { StripeModule } from '@app/payment';

@Module({
  imports: [UserModule, StripeModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
