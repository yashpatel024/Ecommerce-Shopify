'use client'

import {
  ShopifyCart,
  CartItem,
  ShopifyProduct,
  ShopifyVariant,
} from '@/types/shopify.types'
import { createContext, use, useContext, useMemo, useOptimistic } from 'react'

type UpdateType = 'plus' | 'minus' | 'delete'

type CartContextType = {
  cart: ShopifyCart | undefined
  updateCartItem: (merchandiseId: string, updateType: UpdateType) => void
  addCartItem: (variant: ShopifyVariant, product: ShopifyProduct) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({
  childern,
  cartPromise,
}: {
  childern: React.ReactNode
  cartPromise: Promise<ShopifyCart | undefined>
}) {}

/**
 * Customer Hook
 * useCart will provide context of Cart - Call it directly anywhere from the App
 * (Make sure Cart Provider is wrapped around the App)
 */
export function useCart() {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCart must be used inside a CartContextProvider')
  }

  return context
}
