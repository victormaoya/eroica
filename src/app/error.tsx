'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='container max-w-2xl mx-auto px-4 py-8'>
      <Card className='text-center'>
        <CardHeader>
          <div className='flex justify-center mb-4'>
            <AlertCircle className='h-12 w-12 text-destructive' />
          </div>
          <CardTitle className='text-2xl'>Something went wrong!</CardTitle>
          <CardDescription>
            We encountered an error while loading this page.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p className='text-sm text-muted-foreground'>
            {error.message || 'An unexpected error occurred'}
          </p>
          <div className='flex gap-4 justify-center'>
            <Button onClick={() => reset()}>Try again</Button>
            <Button variant='outline' asChild>
              <Link href='/'>Go home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
