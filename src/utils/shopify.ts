import { createStorefrontApiClient } from '@shopify/storefront-api-client'
import Client from 'shopify-buy'

/**
 * Create a Shopify Buy client
 */
export const client = Client.buildClient({
  domain: process.env.SHOPIFY_DOMAIN || '',
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
  apiVersion: '2024-04',
})

/**
 * Create a Storefront API client
 */
export const StorefrontClient = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_DOMAIN || '',
  apiVersion: '2024-04',
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
})
