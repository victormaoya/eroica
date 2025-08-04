'use client'

import { useCart } from '@/store/cart'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeItem, increaseQty, decreaseQty, clearCart } = useCart()

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {items.map(item => (
              <li key={item.id} className="flex gap-4 border-b pb-4">
                <Image src={item.image} alt={item.name} width={100} height={100} className="rounded-md" />

                <div className="flex-1">
                  <Link href={`/product/${item.slug}`} className="text-lg font-medium text-gray-900 hover:underline">
                    {item.name}
                  </Link>

                  <div className="flex items-center gap-4 mt-2">
                    <button onClick={() => decreaseQty(item.id)} className="px-2 text-xl">−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)} className="px-2 text-xl">+</button>
                  </div>

                  <p className="mt-2 text-gray-700">${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <button onClick={() => removeItem(item.id)} className="text-red-600 font-bold">×</button>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-between items-center">
            <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
            <button onClick={clearCart} className="text-sm text-gray-500 hover:underline">Clear cart</button>
          </div>
        </>
      )}
    </div>
  )
}