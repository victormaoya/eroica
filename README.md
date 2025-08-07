# Eroica

**Refined. Minimal. Elite.**

A modern e-commerce platform built with Next.js 15, featuring a clean design and seamless shopping experience.

## Features

- 🛍️ **Product Catalog** - Browse and search products with categories
- 🛒 **Shopping Cart** - Add, remove, and manage items with persistent state
- 💳 **Secure Checkout** - Stripe integration for payment processing
- 👤 **User Authentication** - Clerk-powered sign up/sign in system
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🎨 **Modern UI** - shadcn/ui components with dark/light theme support
- 📦 **Order Management** - Track orders and order history
- ⚡ **Fast Performance** - Next.js 15 with Turbopack for development

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui + Radix UI
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Clerk
- **Payments:** Stripe
- **State Management:** Zustand
- **Icons:** Lucide React
- **Notifications:** Sonner

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account
- Clerk account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/victormaoya/eroica.git
   cd eroica
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/eroica"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # Stripe
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                 # App Router pages and layouts
│   ├── (auth)/         # Authentication routes
│   ├── (shop)/         # Shop-related routes
│   ├── api/            # API routes
│   ├── cart/           # Shopping cart page
│   ├── checkout/       # Checkout flow
│   └── orders/         # Order management
├── components/         # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── cart/           # Cart-related components
│   ├── checkout/       # Checkout components
│   └── ui/             # Base UI components (shadcn/ui)
├── lib/                # Utility functions and configurations
└── store/              # Zustand state management
```

## Database Schema

The application uses PostgreSQL with the following main entities:

- **User** - Customer accounts and authentication
- **Product** - Product catalog with categories and inventory
- **CartItem** - Shopping cart persistence
- **Order** - Order history and tracking
- **OrderItem** - Individual items within orders

## API Routes

- `POST /api/checkout` - Create Stripe checkout session
- `POST /api/webhooks/stripe` - Handle Stripe webhook events

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The application is ready for deployment on Vercel, Netlify, or any platform that supports Next.js applications.

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set up environment variables in the Vercel dashboard
3. Deploy automatically on every push to main branch

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For questions or support, please contact the development team.
