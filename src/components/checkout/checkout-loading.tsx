import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CheckoutLoading() {
  return (
    <div className='space-y-6'>
      <Card>
        <CardContent className='pt-6'>
          <div className='space-y-4'>
            <div className='space-y-3'>
              {[1, 2, 3].map((i) => (
                <div key={i} className='flex items-center space-x-4'>
                  <Skeleton className='h-16 w-16 rounded-md' />
                  <div className='flex-1 space-y-2'>
                    <Skeleton className='h-4 w-3/4' />
                    <Skeleton className='h-3 w-1/2' />
                  </div>
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-16' />
                    <Skeleton className='h-3 w-12' />
                  </div>
                </div>
              ))}
            </div>
            <Skeleton className='h-px w-full' />
            <div className='flex justify-between'>
              <Skeleton className='h-6 w-16' />
              <Skeleton className='h-6 w-20' />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='pt-6'>
          <div className='space-y-4'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-12 w-full' />
            <Skeleton className='h-3 w-1/2 mx-auto' />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
