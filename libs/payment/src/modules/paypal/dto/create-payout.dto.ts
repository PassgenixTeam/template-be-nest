import { ApiProperty } from '@nestjs/swagger';

export class CreatePayoutDto {
  @ApiProperty({ type: String, example: 'gmail@example.com' })
  email: string;
}
