import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        if (session.payment_status === 'paid') {
          const userId = session.metadata?.userId
          const itemsData = JSON.parse(session.metadata?.items || '[]')

          if (userId && itemsData.length > 0) {
            // Create order in database
            await db.order.create({
              data: {
                userId,
                total: session.amount_total! / 100,
                status: 'completed',
                items: {
                  create: itemsData.map(
                    (item: {
                      id: string
                      quantity: number
                      price: number
                    }) => ({
                      productId: item.id,
                      quantity: item.quantity,
                      price: item.price,
                    })
                  ),
                },
              },
            })

            console.log(`Order created for user ${userId}`)
          }
        }
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`Payment failed: ${paymentIntent.id}`)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
