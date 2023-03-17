import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { StripeService } from '@app/payment';
import { Request } from 'express';

@Injectable()
export class PaymentService {
  constructor(private readonly stripeService: StripeService) {}
  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  async findAll() {
    const paymentIntent = await this.stripeService.createPaymentIntent(
      100,
      'usd',
    );
    return { clientSecret: paymentIntent.client_secret };
  }

  async findOne(payload: any, signature: string) {
    return this.stripeService.webhook(payload, signature);
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
