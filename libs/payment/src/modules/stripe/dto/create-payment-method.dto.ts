import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentMethodDto {
  @ApiProperty({ type: String })
  customerId: string;

  @ApiProperty()
  token: string;
}
