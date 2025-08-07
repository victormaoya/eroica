import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className='space-y-8'>
      <section className='text-center space-y-4'>
        <Skeleton className='h-12 w-64 mx-auto' />
        <Skeleton className='h-6 w-48 mx-auto' />
      </section>

      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className='overflow-hidden'>
            <Skeleton className='h-64 w-full' />
            <CardHeader>
              <div className='flex items-center justify-between'>
                <Skeleton className='h-6 w-32' />
                <Skeleton className='h-5 w-16' />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className='h-8 w-20' />
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
