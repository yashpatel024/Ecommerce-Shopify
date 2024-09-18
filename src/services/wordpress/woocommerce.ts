import { client as woocommerceClient } from '@/utils/config/woocommerce'
import type { WooCommerceProduct } from '@/types/woocommerce.types'

/**
 * Get WooCommerce products
 * @param page
 * @param perPage
 * @returns
 */
export async function fetchWooProducts(
  page = 1,
  perPage = 10,
): Promise<{ products: WooCommerceProduct[]; totalPages: number }> {
  try {
    const { data: products, headers } = await woocommerceClient.get(
      'products',
      { per_page: perPage, page },
    )

    const totalPages = parseInt(headers['x-wp-totalpages'], 10)

    return { products, totalPages }
  } catch (error) {
    console.error('Error fetching WooCommerce products:', error)
    throw new Error('Failed to fetch WooCommerce products')
  }
}
