import { create } from 'zustand'

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  slug: string
  quantity: number
}

type CartState = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  clearCart: () => void
  increaseQty: (id: string) => void
  decreaseQty: (id: string) => void
}

export const useCart = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) => {
    const existing = get().items.find(i => i.id === item.id)

    if (existing) {
      set({
        items: get().items.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      })
    } else {
      set({ items: [...get().items, { ...item, quantity: 1 }] })
    }
  },

  removeItem: (id) =>
    set({ items: get().items.filter(item => item.id !== id) }),

  clearCart: () => set({ items: [] }),

  increaseQty: (id) =>
    set({
      items: get().items.map(i =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      )
    }),

  decreaseQty: (id) =>
    set({
      items: get().items
        .map(i =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter(i => i.quantity > 0)
    }),
}))