import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { StripeModule } from '@app/payment';
import { PaypalModule } from '../../libs/payment/src/modules/paypal/paypal.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { TestSocketModule } from './test-socket/test-socket.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    StripeModule,
    PaypalModule,
    UploadModule,
    TestSocketModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
