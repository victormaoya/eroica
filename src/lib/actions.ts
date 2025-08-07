import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import type { CartItem } from '@/store/cart'

interface OrderItemData {
  id: string
  quantity: number
  price: number
}

export async function ensureUserExists(userId: string) {
  try {
    // Check if user already exists in database
    const existingUser = await db.user.findUnique({
      where: { id: userId },
    })

    if (existingUser) {
      return existingUser
    }

    // Get user details from Clerk
    const clerkUser = await currentUser()

    if (!clerkUser) {
      throw new Error('User not found in Clerk')
    }

    // Create user in database
    const user = await db.user.create({
      data: {
        id: userId,
        email:
          clerkUser.emailAddresses[0]?.emailAddress || `${userId}@unknown.com`,
        role: 'customer',
      },
    })

    return user
  } catch (error) {
    console.error('Error ensuring user exists:', error)
    throw new Error('Failed to create or retrieve user')
  }
}

export async function getProducts() {
  return await db.product.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function getProductBySlug(slug: string) {
  return await db.product.findUnique({
    where: { slug },
  })
}

export async function getUserOrders() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Ensure user exists in database
  await ensureUserExists(userId)

  return await db.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function createCheckoutSession(items: CartItem[]) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  if (items.length === 0) {
    throw new Error('No items in cart')
  }

  // Ensure user exists in database
  await ensureUserExists(userId)

  try {
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
      metadata: {
        userId,
        items: JSON.stringify(
          items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
          }))
        ),
      },
    })

    return { url: session.url }
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw new Error('Failed to create checkout session')
  }
}

export async function createOrder(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      throw new Error('Payment not completed')
    }

    const userId = session.metadata?.userId
    const itemsData: OrderItemData[] = JSON.parse(
      session.metadata?.items || '[]'
    )

    if (!userId || !itemsData.length) {
      throw new Error('Invalid session metadata')
    }

    // Ensure user exists in database
    await ensureUserExists(userId)

    // Create order in database
    const order = await db.order.create({
      data: {
        userId,
        total: session.amount_total! / 100, // Convert back from cents
        status: 'completed',
        items: {
          create: itemsData.map((item: OrderItemData) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    return order
  } catch (error) {
    console.error('Error creating order:', error)
    throw new Error('Failed to create order')
  }
}
