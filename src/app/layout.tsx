import '@/app/globals.css'
import { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { AuthButtons } from '@/components/auth/auth-buttons'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Eroica',
  description: 'Refined eCommerce for the elite.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable}>
        <body className="min-h-screen bg-white text-gray-900 font-sans">
          <header className="border-b shadow-sm sticky top-0 z-50 bg-white">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
              <Link href="/" className="text-xl font-bold tracking-tight">
                Eroica
              </Link>
              <AuthButtons />
            </nav>
          </header>
          <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}