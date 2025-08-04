'use client'

import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton
} from '@clerk/nextjs'
import { WelcomeUser } from './welcome-user'

export function AuthButtons() {
  return (
    <div className="flex gap-4 items-center">
      <SignedOut>
        <SignInButton>
          <button className="text-sm hover:underline">Sign In</button>
        </SignInButton>
        <SignUpButton>
          <button className="text-sm hover:underline">Sign Up</button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <WelcomeUser />
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  )
}