import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getUserOrders } from '@/lib/actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default async function OrdersPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const orders = await getUserOrders()

  return (
    <div className='container max-w-4xl mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold'>Your Orders</h1>
        <p className='text-muted-foreground mt-2'>
          View your order history and track your purchases
        </p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className='pt-6'>
            <div className='text-center py-8'>
              <p className='text-muted-foreground mb-4'>
                You haven&apos;t placed any orders yet
              </p>
              <Button asChild>
                <Link href='/'>Start Shopping</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className='space-y-6'>
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className='flex justify-between items-start'>
                  <div>
                    <CardTitle className='text-lg'>
                      Order #{order.id.slice(-8).toUpperCase()}
                    </CardTitle>
                    <p className='text-sm text-muted-foreground'>
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className='text-right'>
                    <Badge
                      variant={
                        order.status === 'completed' ? 'default' : 'secondary'
                      }
                      className='mb-2'
                    >
                      {order.status}
                    </Badge>
                    <p className='text-lg font-semibold'>
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className='flex items-center gap-4 p-3 bg-muted/50 rounded-lg'
                    >
                      <div className='relative h-12 w-12 rounded-md overflow-hidden'>
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className='object-cover'
                        />
                      </div>
                      <div className='flex-1'>
                        <h4 className='font-medium'>{item.product.name}</h4>
                        <p className='text-sm text-muted-foreground'>
                          Quantity: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className='text-right'>
                        <p className='font-medium'>
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
