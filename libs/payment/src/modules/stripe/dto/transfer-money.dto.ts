import { ApiProperty } from '@nestjs/swagger';

export class TransferMoneyDto {
  @ApiProperty({ type: String, example: 'acct_1MojVdRNd7382SLZ' })
  accountId: string;

  @ApiProperty({ type: Number, example: 1000 })
  amount: number;

  @ApiProperty({ type: String, example: 'usd' })
  currency: string;
}
