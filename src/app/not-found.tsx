import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className='container max-w-2xl mx-auto px-4 py-8'>
      <Card className='text-center'>
        <CardHeader>
          <div className='flex justify-center mb-4'>
            <FileQuestion className='h-12 w-12 text-muted-foreground' />
          </div>
          <CardTitle className='text-2xl'>Page Not Found</CardTitle>
          <CardDescription>
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p className='text-muted-foreground'>
            The page you requested doesn&apos;t exist or has been moved.
          </p>
          <div className='flex gap-4 justify-center'>
            <Button asChild>
              <Link href='/'>Go home</Link>
            </Button>
            <Button variant='outline' asChild>
              <Link href='/cart'>View cart</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
