import { ShopifyProduct } from '@/types/shopify.types'
import { Shopify } from '@shopify/shopify-api'

/**
 * Transform a WooCommerce product to a Shopify product
 * TODO - Work on this, Add more fields and relevant data
 * @param wooProduct
 * @returns
 */
export const transformProduct = (wooProduct: any): any => {
  return {
    id: wooProduct.id,
    handle: wooProduct.sku,
    title: wooProduct.name,
    description: wooProduct.short_description,
    productType: wooProduct.categories[0]?.name || 'Default Category',
    variants: wooProduct.variations.map((variant: any) => ({
      price: variant.price,
      sku: variant.sku,
      inventory_quantity: variant.stock_quantity,
      option1: variant.attributes[0]?.option || null,
    })),
    images: wooProduct.images.map((image: any) => ({
      src: image.src,
    })),
    tags: wooProduct.tags,
    status: wooProduct.status === 'publish' ? 'active' : 'draft',
    price: wooProduct.price,
  }
}
