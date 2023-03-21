import { ApiProperty } from '@nestjs/swagger';

export class AddPaymentMethodDto {
  @ApiProperty({ type: String })
  paymentMethodId: string;

  @ApiProperty({ type: String })
  customerId: string;
}
