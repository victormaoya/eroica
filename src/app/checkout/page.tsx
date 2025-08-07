import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { CheckoutForm } from '@/components/checkout/checkout-form'

export default async function CheckoutPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  return (
    <div className='container max-w-2xl mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold'>Checkout</h1>
        <p className='text-muted-foreground mt-2'>
          Complete your purchase securely
        </p>
      </div>

      <CheckoutForm />
    </div>
  )
}
