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

  async createCheckoutSession(id: string) {
    const session = await this.stripeService.createCheckoutSession(id);
    return session;
  }

  async createPaymentIntent() {
    return this.stripeService.createPaymentIntent(2000, 'usd');
  }

  async getPublishableKey() {
    return this.stripeService.getPublishableKey();
  }

  async webhook(payload: any, signature: string) {
    return this.stripeService.webhook(payload, signature);
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
