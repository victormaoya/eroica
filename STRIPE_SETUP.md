# Stripe Checkout Setup

This document explains how to configure Stripe for your e-commerce application.

## Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# App URL for Stripe redirects
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Stripe Account Setup

1. **Create a Stripe Account**: Visit [stripe.com](https://stripe.com) and create an account

2. **Get API Keys**:

   - Go to Stripe Dashboard → Developers → API keys
   - Copy the Publishable key (starts with `pk_test_`)
   - Copy the Secret key (starts with `sk_test_`)

3. **Set up Webhooks**:
   - Go to Stripe Dashboard → Developers → Webhooks
   - Click "Add endpoint"
   - Enter your endpoint URL: `http://localhost:3000/api/webhooks/stripe`
   - Select events to send: `checkout.session.completed` and `payment_intent.payment_failed`
   - Copy the signing secret (starts with `whsec_`)

## Features Implemented

### Checkout Flow

- ✅ Secure checkout with Stripe Checkout
- ✅ Cart integration
- ✅ Order creation after successful payment
- ✅ Success page with order details
- ✅ Webhook handling for reliable order processing

### Pages Created

- `/checkout` - Main checkout page
- `/checkout/success` - Success page after payment
- `/orders` - Order history page

### Components Created

- `CheckoutForm` - Main checkout form component
- `CheckoutLoading` - Loading state component

### API Routes

- `/api/webhooks/stripe` - Handles Stripe webhook events

## Testing

### Test Card Numbers

Use these test card numbers provided by Stripe:

- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 0002
- **Requires authentication**: 4000 0000 0000 3220

### Testing Webhooks Locally

1. Install Stripe CLI:

   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe

   # Other platforms: https://stripe.com/docs/stripe-cli/install
   ```

2. Login to Stripe:

   ```bash
   stripe login
   ```

3. Forward webhooks to your local server:

   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. Use the webhook signing secret provided by the CLI in your `.env.local`

## Deployment Considerations

### Production Setup

1. Replace test API keys with live keys from your Stripe dashboard
2. Update webhook endpoint URL to your production domain
3. Ensure all environment variables are set in your production environment
4. Test the complete flow in production mode

### Security Notes

- Never expose secret keys in client-side code
- Always validate webhook signatures
- Use HTTPS in production
- Implement proper error handling and logging

## Troubleshooting

### Common Issues

1. **"Invalid signature" webhook error**:

   - Verify webhook secret is correct
   - Check that raw body is used for signature verification

2. **"No items in cart" error**:

   - Ensure cart state is properly managed
   - Check that items are passed correctly to checkout

3. **Redirect issues**:

   - Verify `NEXT_PUBLIC_APP_URL` is set correctly
   - Check success/cancel URLs in Stripe session creation

4. **Order not created**:
   - Check webhook is receiving events
   - Verify database connection
   - Check server logs for errors

## Database Schema

The checkout functionality uses these database models:

- `Order` - Stores order information
- `OrderItem` - Stores individual items in an order
- `Product` - Product information
- `User` - User information (handled by Clerk)

Make sure to run Prisma migrations to create the necessary tables:

```bash
npx prisma db push
```

## Support

For Stripe-related issues:

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com)

For implementation questions, check the code comments and error logs for guidance.
