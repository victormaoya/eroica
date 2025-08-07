'use client'

import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from '@clerk/nextjs'
import { WelcomeUser } from './welcome-user'
import { Button } from '@/components/ui/button'
import { CartIcon } from '@/components/cart/cart-icon'

export function AuthButtons() {
  return (
    <div className='flex gap-4 items-center'>
      <CartIcon />

      <SignedOut>
        <SignInButton>
          <Button variant='ghost' size='sm'>
            Sign In
          </Button>
        </SignInButton>
        <SignUpButton>
          <Button size='sm'>Sign Up</Button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <WelcomeUser />
        <UserButton afterSignOutUrl='/' />
      </SignedIn>
    </div>
  )
}
