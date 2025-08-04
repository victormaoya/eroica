'use client'

import { useCart } from '@/store/cart'
import { Button } from '@/components/ui/button'
import type { CartItem } from '@/store/cart'

type Product = Omit<CartItem, 'quantity'>

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCart((state) => state.addItem)

  return (
    <Button
      className='mt-8' 
      onClick={() => {
        console.log('clicked add to cart', product)
        addItem(product)
      }}
    >
      Add to Cart
    </Button>
  )
}
