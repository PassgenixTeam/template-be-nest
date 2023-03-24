import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ type: Number, example: 100 })
  amount: number;
}
