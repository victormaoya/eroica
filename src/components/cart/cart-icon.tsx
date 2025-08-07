'use client'

import Link from 'next/link'
import { useCart } from '@/store/cart'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart } from 'lucide-react'

export function CartIcon() {
  const items = useCart((state) => state.items)
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <Button variant='ghost' size='sm' asChild className='relative'>
      <Link href='/cart'>
        <ShoppingCart className='h-5 w-5' />
        {totalItems > 0 && (
          <Badge
            variant='destructive'
            className='absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs'
          >
            {totalItems > 99 ? '99+' : totalItems}
          </Badge>
        )}
      </Link>
    </Button>
  )
}
