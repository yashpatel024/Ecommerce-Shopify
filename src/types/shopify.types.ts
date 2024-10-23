import { Cart, CartLine, Product, ProductVariant } from 'shopify-buy'

/**
 * Cart Interfaces
 */
export interface ShopifyCart {
  id: string | undefined
  checkoutUrl: string
  cost: {
    subtotalAmount: Money
    totalAmount: Money
    totalTaxAmount: Money
  }
  lines: CartItem[]
  totalQuantity: number
}

export interface CartItem {
  id: string | undefined
  quantity: number
  cost: {
    totalAmount: Money
  }
  merchandise: {
    id: string
    title: string
    selectedOptions: {
      name: string
      value: string
    }[]
    product: CartProduct
  }
}

export interface CartProduct {
  id: string
  handle: string
  title: string
  featuredImage: Image
}

/**
 * Shopify Interfaces
 */
export interface Money {
  amount: string
  currencyCode: string
}

export type Image = {
  url: string
  altText: string
  width: number
  height: number
}

export interface SEO {
  title: string
  description: string
}

/**
 * Shopify Collection
 */
export interface ShopifyCollection {
  handle: string
  title: string
  description: string
  seo: SEO
  updatedAt: string
  path: string
}

export interface ProductOption {
  id: string
  name: string
  values: string[]
}

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

export interface ShopifyProductVariant extends ProductVariant {}

export interface ShopifyProduct extends Product {}
