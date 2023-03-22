import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Headers,
  Req,
  RawBodyRequest,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { StripeService } from './stripe.service';
import {
  AddPaymentMethodDto,
  CreateCustomerPaymentDto,
  CreatePaymentIntentDto,
  CreatePaymentMethodDto,
} from './dto';
import { CapturePaymentIntentDto } from './dto/capture-payment-intent.dto';
import { ConfirmPaymentIntentDto } from './dto/confirm-payment-intent.dto';

@ApiTags('stripe')
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  // @Get('create-checkout-session/:id')
  // async createCheckoutSession(@Param('id') id: string) {
  //   return this.stripeService.createCheckoutSession(id);
  // }

  @Get('publishable-key')
  getPublishableKey() {
    return this.stripeService.getPublishableKey();
  }

  @Post('create-payment-intent')
  createPaymentIntent(@Body() input: CreatePaymentIntentDto) {
    return this.stripeService.createPaymentIntent(input);
  }

  @Post('create-customer')
  createCustomer(@Body() input: CreateCustomerPaymentDto) {
    return this.stripeService.createCustomer(input);
  }

  @Post('create-payment-method')
  createPaymentMethod(@Body() paymentMethod: CreatePaymentMethodDto) {
    return this.stripeService.createPaymentMethod(paymentMethod);
  }

  @Post('default-payment-method-to-customer')
  defaultPaymentMethodToCustomer(@Body() paymentMethod: AddPaymentMethodDto) {
    return this.stripeService.defaultPaymentMethodToCustomer(paymentMethod);
  }

  @Post('confirm-payment-intent')
  confirmPaymentIntent(@Body() input: ConfirmPaymentIntentDto) {
    return this.stripeService.confirmPaymentIntent(input);
  }

  @Post('capture-payment-intent')
  capturePaymentIntent(@Body() input: CapturePaymentIntentDto) {
    return this.stripeService.capturePaymentIntent(input);
  }

  @Post('webhook')
  webhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') sig: string,
  ) {
    return this.stripeService.webhook(req.rawBody, sig);
  }
}
