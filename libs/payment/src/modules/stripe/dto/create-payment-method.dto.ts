import { ApiProperty } from '@nestjs/swagger';
import Stripe from 'stripe';
import { PAYMENT_METHOD_TYPE } from '../enum/stripe.enum';

export class CreatePaymentMethodDto {
  @ApiProperty({ type: String })
  customerId: string;

  @ApiProperty({ type: String, enum: PAYMENT_METHOD_TYPE })
  type: Stripe.PaymentMethodCreateParams.Type;

  @ApiProperty()
  cardNumber: string;

  @ApiProperty()
  expMonth: number;

  @ApiProperty()
  expYear: number;

  @ApiProperty()
  cvc: string;
}
