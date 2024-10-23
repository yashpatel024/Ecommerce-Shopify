import { LATEST_API_VERSION } from '@shopify/shopify-api'
import Client from 'shopify-buy'
// import { createAdminRestApiClient } from '@shopify/admin-api-client'

/**
 * Create a Shopify Buy client
 */
export const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || '',
  storefrontAccessToken:
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
  apiVersion: '2024-04',
})

/**
 * Shopify Admin API Client
 */
// export const adminClient = createAdminRestApiClient({
//   storeDomain: 'quickstart-2d627a23.myshopify.com',
//   apiVersion: LATEST_API_VERSION,
//   accessToken: process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN!,
// })
