import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { appConfig } from '@app/core';
import {
  AddPaymentMethodDto,
  CreatePaymentIntentDto,
  CreatePaymentMethodDto,
} from './dto';
import { CreateCustomerPaymentDto } from './dto/create-customer-payment.dto';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(appConfig.payment.stripe.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async createCheckoutSession(id: string) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: '30 days package',
              images: ['https://i.imgur.com/EHyR2nP.png'],
              description: '30 days package',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url:
        'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://example.com/cancel',
    });

    return session.url;
  }

  async getPublishableKey() {
    return {
      publishableKey: appConfig.payment.stripe.STRIPE_PUBLISHABLE_KEY,
    };
  }

  async createPaymentIntent(input: CreatePaymentIntentDto) {
    try {
      const { amount, currency, customerId, paymentMethodId } = input;
      const paymentIntent = await this.stripe.paymentIntents.create({
        receipt_email: 'uptimumdn2000@gmail.com',
        customer: customerId,
        payment_method: paymentMethodId,
        amount: amount,
        currency: currency,
      });

      return { clientSecret: paymentIntent.client_secret };
    } catch (error) {
      throw error;
    }
  }

  async webhook(payload: any, sig: string) {
    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        sig,
        appConfig.payment.stripe.STRIPE_WEBHOOK_SECRET,
      );

      // Handle the event
      switch (event.type) {
        case 'payment_intent.amount_capturable_updated':
          const paymentIntentAmountCapturableUpdated = event.data.object;
          console.log(
            'paymentIntentAmountCapturableUpdated',
            paymentIntentAmountCapturableUpdated,
          );

          // Then define and call a function to handle the event payment_intent.amount_capturable_updated
          break;
        case 'payment_intent.canceled':
          const paymentIntentCanceled = event.data.object;
          console.log('paymentIntentCanceled', paymentIntentCanceled);
          // Then define and call a function to handle the event payment_intent.canceled
          break;
        case 'payment_intent.created':
          const paymentIntentCreated = event.data.object;
          console.log('paymentIntentCreated', paymentIntentCreated);
          // Then define and call a function to handle the event payment_intent.created
          break;
        case 'payment_intent.partially_funded':
          const paymentIntentPartiallyFunded = event.data.object;
          console.log(
            'paymentIntentPartiallyFunded',
            paymentIntentPartiallyFunded,
          );
          // Then define and call a function to handle the event payment_intent.partially_funded
          break;
        case 'payment_intent.payment_failed':
          const paymentIntentPaymentFailed = event.data.object;
          console.log('paymentIntentPaymentFailed', paymentIntentPaymentFailed);
          // Then define and call a function to handle the event payment_intent.payment_failed
          break;
        case 'payment_intent.processing':
          const paymentIntentProcessing = event.data.object;
          console.log('paymentIntentProcessing', paymentIntentProcessing);
          // Then define and call a function to handle the event payment_intent.processing
          break;
        case 'payment_intent.requires_action':
          const paymentIntentRequiresAction = event.data.object;
          console.log(
            'paymentIntentRequiresAction',
            paymentIntentRequiresAction,
          );
          // Then define and call a function to handle the event payment_intent.requires_action
          break;
        case 'payment_intent.succeeded':
          const paymentIntentSucceeded = event.data.object;
          console.log('paymentIntentSucceeded', paymentIntentSucceeded);
          // Then define and call a function to handle the event payment_intent.succeeded
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (err) {
      throw err;
    }
  }

  async createCustomer(input: CreateCustomerPaymentDto) {
    try {
      const { email, name, city, country, state, line1, line2, phone } = input;
      const customer = await this.stripe.customers.create({
        email,
        name,
        address: {
          city,
          country,
          line1,
          line2,
          state,
        },
        phone,
      });

      return customer;
    } catch (error) {
      throw error;
    }
  }

  async createPaymentMethod(
    input: CreatePaymentMethodDto,
  ): Promise<Stripe.PaymentMethod> {
    const { cardNumber, expMonth, expYear, cvc, customerId } = input;
    const paymentMethod = await this.stripe.paymentMethods.create({
      customer: customerId,
      type: 'card',
      card: {
        number: cardNumber,
        exp_month: expMonth,
        exp_year: expYear,
        cvc: cvc,
      },
    });

    return paymentMethod;
  }

  async addPaymentMethodToCustomer(
    input: AddPaymentMethodDto,
  ): Promise<Stripe.Customer> {
    const { customerId, paymentMethodId } = input;
    const customer = await this.stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    return customer;
  }
}
