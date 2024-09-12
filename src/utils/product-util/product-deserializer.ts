import type {
  ShopifyProduct,
  ShopifyImage,
  ShopifyVariant,
} from '@/types/shopify.types'

export const deserializeProduct = (product: any): ShopifyProduct => {
  return {
    id: product.id.toString(),
    title: product.title.toString(),
    description: product.description.toString(),
    handle: product.handle.toString(),
    images: product.variants.map(
      (variant: any): ShopifyImage => ({
        src: variant.image.src,
        alt: variant.image.alt,
      }),
    ),
    price: product.variants[0].price.amount,
    variants: product.variants.map(
      (variant: any): ShopifyVariant => ({
        id: variant.id.toString(),
        price: {
          amount: variant.price.amount.toString() || 'N/A',
        },
        availableForSale: variant.availableForSale,
        image: {
          src: variant.image.src,
          alt: variant.image.alt,
        },
      }),
    ),
    tags: product.tags,
    productType: product.productType,
    status: product.status,
  }
}
