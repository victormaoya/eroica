'use client'

import { useCart, type CartItem } from '@/store/cart'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'

export function CheckoutForm() {
  const { items, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create checkout session')
      }

      if (result.url) {
        // Clear the cart before redirecting to Stripe
        clearCart()
        // Redirect to Stripe Checkout
        window.location.href = result.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to start checkout process'
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className='pt-6'>
          <div className='text-center py-8'>
            <p className='text-muted-foreground'>Your cart is empty</p>
            <Button className='mt-4' asChild>
              <a href='/'>Continue Shopping</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {items.map((item) => (
            <div key={item.id} className='flex items-center space-x-4'>
              <div className='relative h-16 w-16 rounded-md overflow-hidden'>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className='object-cover'
                />
              </div>
              <div className='flex-1'>
                <h4 className='font-medium'>{item.name}</h4>
                <p className='text-sm text-muted-foreground'>
                  Quantity: {item.quantity}
                </p>
              </div>
              <div className='text-right'>
                <p className='font-medium'>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <p className='text-sm text-muted-foreground'>
                  ${item.price.toFixed(2)} each
                </p>
              </div>
            </div>
          ))}

          <Separator />

          <div className='flex justify-between items-center text-lg font-semibold'>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Checkout Button */}
      <Card>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <p className='text-sm text-muted-foreground'>
              You will be redirected to Stripe to complete your payment
              securely.
            </p>

            <Button
              onClick={handleCheckout}
              disabled={isLoading || items.length === 0}
              className='w-full'
              size='lg'
            >
              {isLoading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
            </Button>

            <p className='text-xs text-center text-muted-foreground'>
              Secure payment powered by Stripe
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
