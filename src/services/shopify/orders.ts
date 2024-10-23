import type { ShopifyProduct } from '@/types/shopify.types'
import { client } from '@/lib/config/shopify'

const createOrder = async (order: ShopifyProduct[]) => {
  try {
    const response = await client.checkout.create({
      lineItems: order.map((product) => ({
        variantId: product.variants[0].id,
        quantity: 1,
      })),
    })
    return response
  } catch (error) {
    console.error(`Error creating order ${order[0].id}:`, error)
    throw new Error('Failed to create order')
  }
}

export { createOrder }
