import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { createOrder } from '@/lib/actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>
}

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const { session_id } = await searchParams

  if (!session_id) {
    redirect('/cart')
  }

  try {
    const order = await createOrder(session_id)

    return (
      <div className='container max-w-2xl mx-auto px-4 py-8'>
        <Card>
          <CardHeader className='text-center'>
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
              <CheckCircle className='h-8 w-8 text-green-600' />
            </div>
            <CardTitle className='text-2xl font-bold text-green-800'>
              Payment Successful!
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='text-center'>
              <p className='text-muted-foreground'>
                Thank you for your purchase. Your order has been confirmed.
              </p>
            </div>

            <div className='border rounded-lg p-4'>
              <h3 className='font-semibold mb-2'>Order Details</h3>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span>Order ID:</span>
                  <span className='font-mono'>{order.id}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Total:</span>
                  <span className='font-semibold'>
                    ${order.total.toFixed(2)}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span>Items:</span>
                  <span>{order.items.length} item(s)</span>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <h4 className='font-semibold'>Items Purchased:</h4>
              <div className='space-y-3'>
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className='flex justify-between items-center'
                  >
                    <div>
                      <p className='font-medium'>{item.product.name}</p>
                      <p className='text-sm text-muted-foreground'>
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className='font-medium'>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-3 pt-4'>
              <Button asChild className='flex-1'>
                <Link href='/'>Continue Shopping</Link>
              </Button>
              <Button variant='outline' asChild className='flex-1'>
                <Link href='/orders'>View Orders</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  } catch (error) {
    console.error('Error processing successful payment:', error)

    return (
      <div className='container max-w-2xl mx-auto px-4 py-8'>
        <Card>
          <CardHeader className='text-center'>
            <CardTitle className='text-xl font-bold text-red-800'>
              Error Processing Order
            </CardTitle>
          </CardHeader>
          <CardContent className='text-center space-y-4'>
            <p className='text-muted-foreground'>
              There was an issue processing your order. Please contact support.
            </p>
            <Button asChild>
              <Link href='/'>Return Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }
}
