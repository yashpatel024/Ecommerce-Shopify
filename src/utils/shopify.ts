import Client from 'shopify-buy'

export const client = Client.buildClient({
  domain: process.env.SHOPIFY_DOMAIN || '',
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
  apiVersion: '2024-04',
})
