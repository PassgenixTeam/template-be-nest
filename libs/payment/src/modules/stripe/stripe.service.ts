import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { appConfig } from '@app/core';

@Injectable()
export class StripeService {
  private readonly stripeConfig: Stripe = new Stripe(
    appConfig.payment.stripe.STRIPE_SECRET_KEY,
    {
      apiVersion: '2022-11-15',
    },
  );

  async createCheckoutSession(id: string) {
    const session = await this.stripeConfig.checkout.sessions.create({
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

  async createPaymentIntent(amount: number, currency: string) {
    try {
      const paymentIntent = await this.stripeConfig.paymentIntents.create({
        receipt_email: 'uptimumdn2000@gmail.com',
        // customer: 'cus_KYq2Z2Q2Z2Q2Z2',
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
      const event = this.stripeConfig.webhooks.constructEvent(
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

  async createCustomer(email: string) {
    try {
      const customer = await this.stripeConfig.customers.create({
        email: email,
      });

      return customer;
    } catch (error) {
      throw error;
    }
  }
}
