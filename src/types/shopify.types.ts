export interface ShopifyImage {
  src: string
  alt: string
}

export interface ShopifyVariant {
  id: string
  price: {
    amount: string
  }
  availableForSale: boolean
  image: ShopifyImage
}

export interface ShopifyProduct {
  id: string
  title: string
  description: string
  handle: string
  images: ShopifyImage[]
  variants: ShopifyVariant[]
  tags: string[]
  productType: string
}
