import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentIntentDto {
  @ApiProperty({ type: String })
  customerId: string;

  @ApiProperty({ type: String })
  paymentMethodId: string;

  @ApiProperty({ type: String })
  currency: string;

  @ApiProperty({ type: Number })
  amount = 1;
}
