import { ApiProperty } from '@nestjs/swagger';

export class CaptureOrderDto {
  @ApiProperty({ type: String, example: 'PAY-1234567890' })
  orderId: string;
}
