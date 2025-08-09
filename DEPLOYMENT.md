# Vercel Deployment Guide for Eroica

## Pre-deployment Checklist

### 1. Environment Variables Setup

Copy `.env.example` to `.env.local` and fill in all required values:

```bash
cp .env.example .env.local
```

Required environment variables:

- `DATABASE_URL` - PostgreSQL connection string
- `DIRECT_URL` - Direct PostgreSQL connection (for connection pooling)
- `SHADOW_DATABASE_URL` - Shadow database URL for migrations (optional)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `NEXT_PUBLIC_APP_URL` - Your deployed app URL

### 2. Database Setup

#### For Production (Vercel):

1. Set up a PostgreSQL database (recommended: Neon, Supabase, or PlanetScale)
2. Get your `DATABASE_URL` and `DIRECT_URL`
3. Add these to your Vercel environment variables

#### For local development:

```bash
npm run db:push  # Push schema to database
npm run db:seed  # Seed with initial data (if seed file exists)
```

### 3. Stripe Configuration

1. Set up your Stripe account and get API keys
2. Configure webhook endpoint in Stripe dashboard:
   - URL: `https://your-app.vercel.app/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `payment_intent.succeeded`
3. Get the webhook secret and add to environment variables

### 4. Clerk Authentication Setup

1. Create a Clerk account and application
2. Configure redirect URLs in Clerk dashboard:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in URL: `/`
   - After sign-up URL: `/`

## Deployment to Vercel

### Option 1: Deploy with Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Option 2: Deploy via GitHub Integration

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect it's a Next.js app
4. Add environment variables in Vercel dashboard
5. Deploy

## Environment Variables in Vercel

In your Vercel dashboard, add these environment variables:

1. Go to your project settings
2. Click "Environment Variables"
3. Add each variable from your `.env.example` file
4. Make sure to set the correct environment (Production, Preview, Development)

## Post-Deployment Steps

1. **Database Migration**: The deployment will automatically run `prisma migrate deploy`
2. **Webhook Configuration**: Update your Stripe webhook URL to point to your Vercel deployment
3. **Clerk Configuration**: Update your Clerk app settings with the production URL
4. **Test Payment Flow**: Test the complete purchase flow in production

## Troubleshooting

### Common Issues:

1. **Prisma Client Not Generated**

   - Solution: The `vercel-build` script handles this automatically

2. **Database Connection Issues**

   - Check if `DATABASE_URL` is correctly set
   - Ensure your database accepts connections from Vercel's IP ranges

3. **Stripe Webhook Failures**

   - Verify webhook secret is correct
   - Check webhook endpoint URL
   - Ensure webhook endpoint can handle POST requests

4. **Clerk Authentication Issues**
   - Verify all Clerk environment variables are set
   - Check domain configuration in Clerk dashboard

### Performance Optimization

The app is configured with:

- Prisma client generation during build
- Image optimization for external images (Unsplash)
- Server components optimization
- Proper webpack configuration for Prisma

### Monitoring

Consider adding:

- Vercel Analytics
- Error tracking (Sentry)
- Performance monitoring
- Database monitoring for your PostgreSQL instance

## Development vs Production

| Environment | Database                         | Stripe    | Clerk                |
| ----------- | -------------------------------- | --------- | -------------------- |
| Development | Local PostgreSQL or dev database | Test keys | Development instance |
| Production  | Production PostgreSQL            | Live keys | Production instance  |

Make sure to never use production API keys in development!
