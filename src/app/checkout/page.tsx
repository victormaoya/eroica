import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default function CheckoutPage() {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  return <div>Checkout Page for {userId}</div>
}