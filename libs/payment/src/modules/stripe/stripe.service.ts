import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { appConfig } from '@app/core';
import { Request } from 'express';

@Injectable()
export class StripeService {
  private readonly stripeConfig: Stripe = new Stripe(
    appConfig.payment.stripe.STRIPE_SECRET_KEY,
    {
      apiVersion: '2022-11-15',
    },
  );

  async createPaymentIntent(amount: number, currency: string) {
    try {
      const paymentIntent = await this.stripeConfig.paymentIntents.create({
        amount: amount,
        currency: currency,
      });
      return paymentIntent;
    } catch (error) {
      throw error;
    }
  }

  async webhook(payload: any, sig: string) {
    try {
      const event = this.stripeConfig.webhooks.constructEvent(
        payload,
        sig,
        appConfig.payment.stripe.STRIPE_WEBHOOK_SECRET,
      );

      // Handle the event
      switch (event.type) {
        case 'payment_intent.amount_capturable_updated':
          const paymentIntentAmountCapturableUpdated = event.data.object;
          console.log(paymentIntentAmountCapturableUpdated);

          // Then define and call a function to handle the event payment_intent.amount_capturable_updated
          break;
        case 'payment_intent.canceled':
          const paymentIntentCanceled = event.data.object;
          console.log(paymentIntentCanceled);
          // Then define and call a function to handle the event payment_intent.canceled
          break;
        case 'payment_intent.created':
          const paymentIntentCreated = event.data.object;
          console.log(paymentIntentCreated);
          // Then define and call a function to handle the event payment_intent.created
          break;
        case 'payment_intent.partially_funded':
          const paymentIntentPartiallyFunded = event.data.object;
          console.log(paymentIntentPartiallyFunded);
          // Then define and call a function to handle the event payment_intent.partially_funded
          break;
        case 'payment_intent.payment_failed':
          const paymentIntentPaymentFailed = event.data.object;
          console.log(paymentIntentPaymentFailed);
          // Then define and call a function to handle the event payment_intent.payment_failed
          break;
        case 'payment_intent.processing':
          const paymentIntentProcessing = event.data.object;
          console.log(paymentIntentProcessing);
          // Then define and call a function to handle the event payment_intent.processing
          break;
        case 'payment_intent.requires_action':
          const paymentIntentRequiresAction = event.data.object;
          console.log(paymentIntentRequiresAction);
          // Then define and call a function to handle the event payment_intent.requires_action
          break;
        case 'payment_intent.succeeded':
          const paymentIntentSucceeded = event.data.object;
          console.log(paymentIntentSucceeded);
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

  private getRawBody(req: Request): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      let data = '';
      req.on('data', (chunk: any) => {
        data += chunk;
      });
      req.on('end', () => {
        resolve(Buffer.from(data));
      });
      req.on('error', (err: any) => {
        reject(err);
      });
    });
  }
}
