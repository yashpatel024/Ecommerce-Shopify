'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { client } from '@/lib/config/shopify'
import type { Checkout } from 'shopify-buy'
import { revalidateTag } from 'next/cache'

const TAGS = {
  collections: 'collections',
  products: 'products',
  cart: 'cart',
}

export type CartItem = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    handle: string
    image: string
    price: {
      amount: number
      currencyCode: string
    }
  }
}

export type Cart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  lines: CartItem[]
  cost: {
    subtotalAmount: {
      amount: number
      currencyCode: string
    }
    totalAmount: {
      amount: number
      currencyCode: string
    }
    totalTaxAmount: {
      amount: number
      currencyCode: string
    }
  }
}

type UpdateType = 'plus' | 'minus' | 'delete'

interface CartContextType {
  cart: Cart | undefined
  loading: boolean
  addItem: (variantId: string, quantity: number) => Promise<void>
  removeItem: (lineItemId: string) => Promise<void>
  updateItemQuantity: (lineItemId: string, quantity: number) => Promise<void>
  // redirectToCheckout: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export function CartProvider({
  children,
  initialCartId,
}: {
  children: React.ReactNode
  initialCartId?: string
}) {
  const [cart, setCart] = useState<Cart>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeCart()
  }, [])

  const initializeCart = async () => {
    let cartId = initialCartId || localStorage.getItem('cartId')

    if (cartId) {
      try {
        const existingCartCheckout: Checkout =
          await client.checkout.fetch(cartId)
        // console.log('createnewCart - checkout', existingCartCheckout)

        setCart(reshapeCart(existingCartCheckout))
      } catch (error) {
        console.error('Error fetching cart:', error)
        await createNewCart()
      }
    } else {
      await createNewCart()
    }
    setLoading(false)
  }

  const createNewCart = async () => {
    try {
      const newCartCheckout: Checkout = await client.checkout.create()
      setCart(reshapeCart(newCartCheckout))
      localStorage.setItem('cartId', newCartCheckout.id)
    } catch (error) {
      console.error('Error creating new cart:', error)
    }
  }

  const reshapeCart = (shopifyCheckout: Checkout): Cart => {
    return {
      id: shopifyCheckout.id,
      checkoutUrl: shopifyCheckout.webUrl,
      totalQuantity: shopifyCheckout.lineItems.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0,
      ),
      lines: shopifyCheckout.lineItems.map((item: any) => ({
        id: item.id,
        quantity: item.quantity,
        merchandise: {
          id: item.variant.id,
          title: item.title,
          handle: item.variant.product.handle,
          image: item.variant.image.url,
          price: {
            amount: item.variant.price.amount,
            currencyCode: item.variant.price.currencyCode,
          },
        },
      })),
      cost: {
        subtotalAmount: {
          amount: shopifyCheckout.subtotalPrice.amount,
          currencyCode: shopifyCheckout.subtotalPrice.currencyCode,
        },
        totalAmount: {
          amount: shopifyCheckout.totalPrice.amount,
          currencyCode: shopifyCheckout.totalPrice.currencyCode,
        },
        totalTaxAmount: {
          amount: shopifyCheckout.totalTax?.amount ?? 0,
          currencyCode:
            shopifyCheckout.totalTax?.currencyCode ??
            shopifyCheckout.currencyCode,
        },
      },
    }
  }

  const getLineItemId = (variantId: string) => {
    return cart?.lines?.find((item) => item.merchandise.id === variantId)?.id
  }

  const addItem = async (variantId: string, quantity: number) => {
    if (!cart) return
    setLoading(true)
    try {
      const updatedCartCheckout: Checkout = await client.checkout.addLineItems(
        cart.id,
        [{ variantId: variantId, quantity: quantity }],
      )
      setCart(reshapeCart(updatedCartCheckout))
      revalidateTag(TAGS.cart)
    } catch (error) {
      console.error('Error adding item to cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (variantId: string) => {
    if (!cart) return
    setLoading(true)
    try {
      // On update, the Cart Product Checkout Id is the lineItemId
      const lineItemId = getLineItemId(variantId)

      if (!lineItemId) return

      const updatedCartCheckout: Checkout =
        await client.checkout.removeLineItems(cart.id, [lineItemId])
      setCart(reshapeCart(updatedCartCheckout))
      revalidateTag(TAGS.cart)
    } catch (error) {
      console.error('Error removing item from cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateItemQuantity = async (variantId: string, quantity: number) => {
    if (!cart) return
    setLoading(true)
    try {
      // On update, the Cart Product Checkout Id is the lineItemId
      const lineItemId = getLineItemId(variantId)

      if (!lineItemId) return

      if (quantity === 0) {
        await removeItem(lineItemId)
      } else {
        const updatedCartCheckout: Checkout =
          await client.checkout.updateLineItems(cart.id, [
            { id: lineItemId, quantity: quantity },
          ])

        setCart(reshapeCart(updatedCartCheckout))
      }
      revalidateTag(TAGS.cart)
    } catch (error) {
      console.error('Error updating item quantity:', error)
    } finally {
      setLoading(false)
    }
  }

  // const redirectToCheckout = async () => {
  //   if (!cart) return
  //   redirect(cart.checkoutUrl)
  // }

  const value = {
    cart,
    loading,
    addItem,
    removeItem,
    updateItemQuantity,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
