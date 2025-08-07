'use client'

import { useCart } from '@/store/cart'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Minus, Plus, X } from 'lucide-react'
import { toast } from 'sonner'

export default function CartPage() {
  const { items, removeItem, increaseQty, decreaseQty, clearCart } = useCart()

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleRemoveItem = (item: { id: string; name: string }) => {
    removeItem(item.id)
    toast.success(`${item.name} removed from cart`)
  }

  const handleClearCart = () => {
    clearCart()
    toast.success('Cart cleared')
  }

  return (
    <div className='container max-w-4xl mx-auto px-4 py-8'>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>Your Cart</h1>
          {items.length > 0 && (
            <Button variant='outline' size='sm' onClick={handleClearCart}>
              Clear cart
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <Card className='p-8'>
            <div className='text-center space-y-4'>
              <p className='text-muted-foreground'>Your cart is empty.</p>
              <Button asChild>
                <Link href='/'>Continue Shopping</Link>
              </Button>
            </div>
          </Card>
        ) : (
          <div className='space-y-6'>
            <div className='space-y-4'>
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className='p-6'>
                    <div className='flex gap-4'>
                      <div className='relative w-20 h-20 rounded-md overflow-hidden'>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className='object-cover'
                        />
                      </div>

                      <div className='flex-1 space-y-2'>
                        <Link
                          href={`/product/${item.slug}`}
                          className='text-lg font-medium hover:text-primary transition-colors'
                        >
                          {item.name}
                        </Link>

                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-2'>
                            <Button
                              variant='outline'
                              size='icon'
                              className='h-8 w-8'
                              onClick={() => decreaseQty(item.id)}
                            >
                              <Minus className='h-4 w-4' />
                            </Button>
                            <Badge variant='secondary' className='px-3'>
                              {item.quantity}
                            </Badge>
                            <Button
                              variant='outline'
                              size='icon'
                              className='h-8 w-8'
                              onClick={() => increaseQty(item.id)}
                            >
                              <Plus className='h-4 w-4' />
                            </Button>
                          </div>

                          <div className='flex items-center gap-4'>
                            <p className='text-lg font-semibold'>
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-8 w-8 text-destructive hover:text-destructive'
                              onClick={() => handleRemoveItem(item)}
                            >
                              <X className='h-4 w-4' />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-1'>
                    <p className='text-2xl font-bold'>
                      Total: ${total.toFixed(2)}
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      {items.length} item{items.length !== 1 ? 's' : ''} in cart
                    </p>
                  </div>
                  <Button size='lg' asChild>
                    <Link href='/checkout'>Proceed to Checkout</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
