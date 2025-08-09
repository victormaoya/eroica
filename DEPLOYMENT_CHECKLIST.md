# Vercel Deployment Checklist for Eroica

## ✅ Pre-Deployment Setup

### Database Setup

- [ ] Set up production PostgreSQL database (Neon, Supabase, PlanetScale, etc.)
- [ ] Get `DATABASE_URL` connection string
- [ ] Get `DIRECT_URL` for connection pooling (if using Prisma Accelerate)
- [ ] Optionally get `SHADOW_DATABASE_URL` for safer migrations

### Clerk Authentication

- [ ] Create Clerk application
- [ ] Get `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- [ ] Get `CLERK_SECRET_KEY`
- [ ] Configure redirect URLs in Clerk dashboard:
  - [ ] Sign-in URL: `/sign-in`
  - [ ] Sign-up URL: `/sign-up`
  - [ ] After sign-in URL: `/`
  - [ ] After sign-up URL: `/`

### Stripe Payment Processing

- [ ] Set up Stripe account
- [ ] Get `STRIPE_SECRET_KEY` (use test keys initially)
- [ ] Get `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] Create webhook endpoint for: `checkout.session.completed`
- [ ] Get `STRIPE_WEBHOOK_SECRET`

## ✅ Vercel Configuration

### Environment Variables in Vercel

Add these in your Vercel dashboard under Project Settings → Environment Variables:

#### Database

- [ ] `DATABASE_URL`
- [ ] `DIRECT_URL`
- [ ] `SHADOW_DATABASE_URL` (optional)

#### Clerk

- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- [ ] `CLERK_SECRET_KEY`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`

#### Stripe

- [ ] `STRIPE_SECRET_KEY`
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] `STRIPE_WEBHOOK_SECRET`

#### App Configuration

- [ ] `NEXT_PUBLIC_APP_URL=https://your-app.vercel.app`

## ✅ Deployment Process

### Option 1: GitHub Integration (Recommended)

- [ ] Push code to GitHub repository
- [ ] Connect repository to Vercel
- [ ] Configure build settings (auto-detected)
- [ ] Add environment variables
- [ ] Deploy

### Option 2: Vercel CLI

```bash
# Install and deploy
npm i -g vercel
vercel login
vercel
```

## ✅ Post-Deployment Tasks

### Database Migration

- [ ] Verify Prisma migrations ran successfully
- [ ] Check database tables were created
- [ ] Optionally seed initial data

### API Endpoints Testing

- [ ] Test health check: `GET /api/health`
- [ ] Test Stripe webhook: `POST /api/webhooks/stripe`
- [ ] Test checkout API: `POST /api/checkout`

### Authentication Flow

- [ ] Test user sign-up process
- [ ] Test user sign-in process
- [ ] Verify authentication middleware works
- [ ] Test protected routes

### Payment Processing

- [ ] Update Stripe webhook URL to production URL
- [ ] Test complete checkout flow
- [ ] Verify webhook receives events
- [ ] Test both successful and failed payments

### Final Configuration Updates

- [ ] Update Clerk application settings with production domain
- [ ] Switch Stripe to live keys when ready for production
- [ ] Verify all redirect URLs work correctly

## ✅ Monitoring & Maintenance

### Performance Monitoring

- [ ] Enable Vercel Analytics
- [ ] Set up error tracking (optional: Sentry)
- [ ] Monitor database performance

### Security Checks

- [ ] Verify environment variables are not exposed in client bundle
- [ ] Check webhook endpoints are properly secured
- [ ] Validate input sanitization

### Regular Maintenance

- [ ] Monitor webhook delivery success rates
- [ ] Check database connection pool usage
- [ ] Review application logs for errors

## 🚨 Troubleshooting Common Issues

### Build Failures

- Ensure `prisma generate` runs before build
- Check all environment variables are set
- Verify database can be reached during build

### Runtime Errors

- Check `/api/health` endpoint for database connectivity
- Verify Clerk keys match the domain
- Validate Stripe webhook secret

### Performance Issues

- Monitor database connection pooling
- Check for N+1 queries in Prisma
- Optimize image loading

## 📝 Important Notes

- **Never commit `.env` files** - they're in `.gitignore`
- **Use test keys** during development and testing
- **Switch to live keys** only when ready for production
- **Monitor webhook endpoints** for successful event processing
- **Keep environment variables secure** and rotate them periodically

## 🎉 Success Indicators

Your deployment is successful when:

- [ ] App loads without errors at your Vercel URL
- [ ] Users can sign up and sign in via Clerk
- [ ] Products load from the database
- [ ] Test payments complete successfully
- [ ] Webhooks receive and process events
- [ ] Health check endpoint returns status 200
