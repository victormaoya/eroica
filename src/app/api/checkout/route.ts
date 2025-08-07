import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/actions'
import type { CartItem } from '@/store/cart'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items }: { items: CartItem[] } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 })
    }

    const result = await createCheckoutSession(items)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Checkout API error:', error)

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
