import { adminClient, client } from '@/utils/config/shopify'
import type { ShopifyProduct } from '@/types/shopify.types'
import { deserializeProduct } from '@/utils/product/product-deserializer'

/**
 * Get all products - Shopify Buy API
 */
const getProducts = async (): Promise<ShopifyProduct[]> => {
  try {
    const fetchedProducts: any[] = await client.product.fetchAll()
    return fetchedProducts.map((product: any) => deserializeProduct(product))
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

const getProduct = async (handle: string): Promise<ShopifyProduct | null> => {
  try {
    const fetchedProduct: any = await client.product.fetchByHandle(handle)
    return fetchedProduct ? deserializeProduct(fetchedProduct) : null
  } catch (error) {
    console.error(`Error fetching product with Handle ${handle}:`, error)
    return null
  }
}

const createShopifyProduct = async (
  product: ShopifyProduct,
): Promise<ShopifyProduct> => {
  try {
    const response = await adminClient.post('products', {
      data: {
        product: product,
      },
    })
    return product
  } catch (error) {
    console.error(`Error creating Shopify product ${product.title}:`, error)
    throw new Error('Failed to create Shopify product')
  }
}

const getProductsByHandles = async (
  handles: string[],
): Promise<ShopifyProduct[]> => {
  try {
    const products = await Promise.all(
      handles.map((handle) => client.product.fetchByHandle(handle)),
    )
    return products
      .filter(Boolean)
      .map((product) => deserializeProduct(product))
  } catch (error) {
    console.error('Error fetching products by handles:', error)
    return []
  }
}

export { getProducts, getProduct, createShopifyProduct, getProductsByHandles }
