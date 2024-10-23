import { ApiResponse, restClient } from '@/lib/api/restClient'
import type { Cart, CartItem } from '@/context/cartContext'

export const cartApi = {
  create: async () => {
    return await restClient.post<Cart>('/api/cart', {
      action: 'create',
    })
  },

  fetch: async (cartId: string): Promise<ApiResponse<Cart>> => {
    return await restClient.post<Cart>('/api/cart', {
      action: 'fetch',
      cartId,
    })
  },

  addItem: async (cartId: string, variantId: string, quantity: number) => {
    return await restClient.post<Cart>('/api/cart', {
      action: 'addItem',
      cartId,
      variantId,
      quantity,
    })
  },

  removeItem: async (cartId: string, lineItemId: string) => {
    return await restClient.post<Cart>('/api/cart', {
      action: 'removeItem',
      cartId,
      variantId: lineItemId,
    })
  },

  updateItem: async (cartId: string, lineItemId: string, quantity: number) => {
    return await restClient.post<Cart>('/api/cart', {
      action: 'updateItem',
      cartId,
      variantId: lineItemId,
      quantity,
    })
  },
}
