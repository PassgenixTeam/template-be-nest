import { ApiProperty } from '@nestjs/swagger';

export class CapturePaymentIntentDto {
  @ApiProperty({ type: String })
  paymentIntentId: string;

  @ApiProperty({ type: Number })
  amount: number;
}
