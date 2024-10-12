import { getProducts } from '@/services/shopify/products'
import { type ShopifyProduct } from '@/types/shopify.types'
import { MetadataRoute } from 'next'

/**
 * Generate a Static and Dynamic Sitemaps
 * TODO: Generate a Categories and Blog Sitemap
 * @returns Sitemaps
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.PRODUCTION_URL!

  const products: ShopifyProduct[] = await getProducts()

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/product/${product.handle}`,
    // lastModified: new Date(product.updatedAt),
    lastModified: new Date(),
  }))

  const staticPages = [
    '',
    '/about',
    '/contact',
    '/terms',
    '/privacy',
    '/cart',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }))

  return [...staticPages, ...productUrls]
}
