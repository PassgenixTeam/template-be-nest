import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountBankDto {
  @ApiProperty({ type: String, example: 'US' })
  country: string;

  @ApiProperty({ type: String, example: 'usd' })
  currency: string;

  @ApiProperty({ type: String, example: 'bank_account' })
  object: string;

  @ApiProperty({ type: String, example: 'Jane Austen' })
  accountHolderName: string;

  @ApiProperty({ type: String, example: 'individual' })
  accountHolderType: string;

  @ApiProperty({ type: String, example: '110000000' })
  routingNumber: string;

  @ApiProperty({ type: String, example: '000999999991' })
  accountNumber: string;

  @ApiProperty({ type: String, example: 'custom' })
  type: string;

  @ApiProperty({ type: String, example: 'abc@gmail.com' })
  email: string;
}
