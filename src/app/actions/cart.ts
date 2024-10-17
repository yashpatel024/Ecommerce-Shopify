'use server'

import { setCartItem, removeCartItem, clearCart } from '@/lib/session-store'

export async function addToCart(productHandle: string, quantity: number) {
  await setCartItem(productHandle, quantity)
}

export async function removeFromCart(productHandle: string) {
  await removeCartItem(productHandle)
}

export async function updateCartItemQuantity(
  productHandle: string,
  quantity: number,
) {
  await setCartItem(productHandle, quantity)
}

export async function clearEntireCart() {
  await clearCart()
}
