'use client'

import { useCart } from '@/store/cart'
import { Button } from '@/components/ui/button'
import type { CartItem } from '@/store/cart'
import { ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'

type Product = Omit<CartItem, 'quantity'>

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCart((state) => state.addItem)

  const handleAddToCart = () => {
    addItem(product)
    toast.success(`${product.name} added to cart!`, {
      description: `$${product.price.toFixed(2)} • Added to your cart`,
    })
  }

  return (
    <Button size='lg' className='w-full gap-2' onClick={handleAddToCart}>
      <ShoppingCart className='h-4 w-4' />
      Add to Cart
    </Button>
  )
}
