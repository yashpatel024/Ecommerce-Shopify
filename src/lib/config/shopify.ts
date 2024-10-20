import { LATEST_API_VERSION } from '@shopify/shopify-api'
import Client from 'shopify-buy'
import { createAdminRestApiClient } from '@shopify/admin-api-client'
import { Shopify } from '@shopify/shopify-api'
/**
 * Create a Shopify Buy client
 */
export const client = Client.buildClient({
  domain: process.env.SHOPIFY_DOMAIN || '',
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
  apiVersion: '2024-04',
})

/**
 * Shopify Admin API Client
 */
export const adminClient = createAdminRestApiClient({
  storeDomain: process.env.SHOPIFY_DOMAIN!,
  apiVersion: LATEST_API_VERSION,
  accessToken: process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN!,
})
