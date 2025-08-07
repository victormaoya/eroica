import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-muted/30'>
      <div className='max-w-md w-full space-y-8'>{children}</div>
    </div>
  )
}
