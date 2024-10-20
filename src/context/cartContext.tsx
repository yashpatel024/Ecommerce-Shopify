'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import Client from 'shopify-buy'
import { cookies } from 'next/headers'
import { client } from '@/lib/config/shopify'

interface CartContextType {
  cart: any
  loading: boolean
  addItem: (variantId: string, quantity: number) => Promise<void>
  removeItem: (lineItemId: string) => Promise<void>
  updateItemQuantity: (lineItemId: string, quantity: number) => Promise<void>
  createCartAndSetCookie: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeCart()
  }, [])

  const initializeCart = async () => {
    const cartId = (await cookies()).get('cardId')?.value

    if (cartId) {
      try {
        const existingCart = await client.checkout.fetch(cartId)
        setCart(existingCart)
      } catch (error) {
        console.error('Error fetching cart:', error)
        await createCartAndSetCookie()
      }
    } else {
      await createCartAndSetCookie()
    }
    setLoading(false)
  }

  const createCartAndSetCookie = async () => {
    try {
      const newCart = await client.checkout.create()
      setCart(newCart)
      cookies().set('cardId', newCart.id)
    } catch (error) {
      console.error('Error creating cart:', error)
    }
  }

  const addItem = async (variantId: string, quantity: number) => {
    if (!cart) return
    try {
      const updatedCart = await client.checkout.addLineItems(cart.id, [
        { variantId, quantity },
      ])
      setCart(updatedCart)
    } catch (error) {
      console.error('Error adding item to cart:', error)
    }
  }

  const removeItem = async (lineItemId: string) => {
    if (!cart) return
    try {
      const updatedCart = await client.checkout.removeLineItems(cart.id, [
        lineItemId,
      ])
      setCart(updatedCart)
    } catch (error) {
      console.error('Error removing item from cart:', error)
    }
  }

  const updateItemQuantity = async (lineItemId: string, quantity: number) => {
    if (!cart) return
    try {
      const updatedCart = await client.checkout.updateLineItems(cart.id, [
        { id: lineItemId, quantity },
      ])
      setCart(updatedCart)
    } catch (error) {
      console.error('Error updating item quantity:', error)
    }
  }

  const value = {
    cart,
    loading,
    addItem,
    removeItem,
    updateItemQuantity,
    createCartAndSetCookie,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
