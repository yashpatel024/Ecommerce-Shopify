// import { client } from '@/lib/config/shopify'
// import type { ShopifyProduct } from '@/types/shopify.types'
// import type { Cart, Checkout } from 'shopify-buy'

// export const createCheckout = async (): Promise<Checkout> => {
//   try {
//     const checkout: Checkout = await client.checkout.create()
//     return checkout
//   } catch (error) {
//     throw new Error('Error creating a checkout')
//   }
// }

// export const fetchCart = async (cartId: string): Promise<Cart[]> => {
//   try {
//     const fetchedCart = await client.checkout.fetch(cartId)
//     console.log(fetchCart)
//     // return fetchedProducts.map((product: any) => deserializeProduct(product))
//     return fetchedCart
//   } catch (error) {
//     console.error('Error fetching cart:', error)
//     return []
//   }
// }
