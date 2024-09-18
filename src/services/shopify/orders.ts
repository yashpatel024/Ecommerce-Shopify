import { client } from '@/utils/config/shopify'

// TODO: Add types
const createOrder = async (order: any) => {
  try {
    const response = await client.checkout.create(order)
    return response
  } catch (error) {
    console.error(`Error creating order ${order.id}:`, error)
    throw new Error('Failed to create order')
  }
}

export { createOrder }
