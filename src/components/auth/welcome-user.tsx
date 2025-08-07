'use client'

import { useUser } from '@clerk/nextjs'

export function WelcomeUser() {
  const { user } = useUser()

  if (!user) return null

  return (
    <p className='text-sm text-muted-foreground'>Welcome, {user.firstName}</p>
  )
}
