import '@/app/globals.css'
import { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { AuthButtons } from '@/components/auth/auth-buttons'
import Link from 'next/link'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Eroica',
  description: 'Refined eCommerce for the elite.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang='en' className={inter.variable} suppressHydrationWarning>
        <body className='min-h-screen bg-background text-foreground font-sans antialiased'>
          <ThemeProvider 
            attribute='class' 
            defaultTheme='system' 
            enableSystem
            disableTransitionOnChange
          >
            <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
              <div className='container flex h-14 items-center'>
                <nav className='flex flex-1 items-center justify-between'>
                  <Link
                    href='/'
                    className='text-xl font-bold tracking-tight hover:text-primary transition-colors'
                  >
                    Eroica
                  </Link>
                  <AuthButtons />
                </nav>
              </div>
            </header>
            <main className='container mx-auto py-6'>{children}</main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
