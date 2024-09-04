import { client } from '@/utils/shopify'

const getProducts = async () => {
  const products = await client.product.fetchAll()
  return products
}

export { getProducts }
