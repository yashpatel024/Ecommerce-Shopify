'use server'

import 'server-only'
import { cookies } from 'next/headers'
import { kv } from '@vercel/kv'

type SessionId = string
type CartItem = {
  handle: string
  quantity: number
}

export async function getSessionId(): Promise<SessionId | undefined> {
  const cookieStore = cookies()
  return cookieStore.get('session-id')?.value
}

function setSessionId(sessionId: SessionId): void {
  const cookieStore = cookies()
  cookieStore.set('session-id', sessionId)
}

export async function getSessionIdAndCreateIfMissing() {
  const sessionId = await getSessionId()
  if (!sessionId) {
    const newSessionId = crypto.randomUUID()
    setSessionId(newSessionId)
    return newSessionId
  }
  return sessionId
}

export async function getCart(): Promise<Record<string, number> | null> {
  const sessionId = getSessionId()
  if (!sessionId) {
    return null
  }
  return kv.hgetall(`cart-${sessionId}`)
}

export async function setCartItem(productHandle: string, quantity: number) {
  const sessionId = getSessionIdAndCreateIfMissing()
  return kv.hset(`cart-${sessionId}`, { [productHandle]: quantity })
}

export async function removeCartItem(productHandle: string) {
  const sessionId = getSessionId()
  if (!sessionId) {
    return null
  }
  return kv.hdel(`cart-${sessionId}`, productHandle)
}

export async function clearCart() {
  const sessionId = getSessionId()
  if (!sessionId) {
    return null
  }
  return kv.del(`cart-${sessionId}`)
}

export async function getCartItemsCount(): Promise<number> {
  const cart = await getCart()
  if (!cart) return 0
  return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
}
