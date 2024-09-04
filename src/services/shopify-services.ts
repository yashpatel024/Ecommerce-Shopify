import { client } from '@/utils/shopify'
import type { Product } from 'shopify-buy'

/**
 * Get all products - Shopify Buy API
 */
const getProducts = async () => {
  const products: Product[] = await client.product.fetchAll()
  return products
}

const getProduct = async (id: string) => {
  const product: Product = await client.product.fetch(id)
  return product
}

export { getProducts, getProduct }
