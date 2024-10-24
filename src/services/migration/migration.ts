import { createShopifyProduct } from '@/services/shopify/products'
import { fetchWooProducts } from '@/services/wordpress/woocommerce'
import { transformProduct } from '@/lib/shopify/product/product-transformer'

/**
 * Migrate WooCommerce products to Shopify in batches
 * @returns
 */
export async function migrateProducts() {
  let page = 1
  let totalPages = 1
  const noOfProductFetched = 10
  const results = []

  while (page <= totalPages) {
    const { products: wooProducts, totalPages: pages } = await fetchWooProducts(
      page,
      noOfProductFetched,
    )
    totalPages = pages

    const transformedProducts = wooProducts.map(transformProduct)

    const chunksResult = await Promise.all(
      transformedProducts.map(async (product: any) => {
        try {
          const shopifyProduct = await createShopifyProduct(product)
          return {
            success: true,
            id: shopifyProduct.id,
            title: shopifyProduct.title,
          }
        } catch (error) {
          return {
            success: false,
            title: product.title,
            error: (error as Error).message,
          }
        }
      }),
    )

    results.push(...chunksResult)
    page++
  }

  return results
}
