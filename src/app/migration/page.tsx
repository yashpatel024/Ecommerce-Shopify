'use client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { getHostUrl } from '@/lib/utils'

export default function MigrationPage() {
  const [status, setStatus] = useState('')
  const hostUrl = getHostUrl()

  const fetchWooProducts = async () => {
    setStatus('Fetching WooCommerce products...')
    const response = await fetch(hostUrl + '/api/woo-to-shopify')
    const data = await response.json()
    setStatus(
      `Fetched ${data.count} products from WooCommerce \n Total Pages: ${data.totalPages} `,
    )
  }

  const migrateToShopify = async () => {
    setStatus('Starting migration...')
    const response = await fetch(hostUrl + '/api/woo-to-shopify', {
      method: 'POST',
    })
    const data = await response.json()
    setStatus(data.message || data.error || 'Migration failed')
  }

  return (
    <div className="p-4">
      <h1 className="text-primary-typographytext-2xl font-bold mb-4">
        WooCommerce to Shopify Migration
      </h1>
      <div className="space-x-4">
        <Button
          onClick={fetchWooProducts}
          variant="secondary"
          className="bg-secondary-typography text-background-light font-bold py-2 px-4 rounded"
        >
          Fetch WooCommerce Products
        </Button>
        <Button
          onClick={migrateToShopify}
          variant="default"
          className="bg-primary-typography text-background-light font-bold py-2 px-4 rounded"
        >
          Migrate to Shopify
        </Button>
      </div>
      <div className="mt-4">
        <h2 className="text-primary-typography text-xl font-semibold">
          Status:
        </h2>
        <p className="text-secondary-typography"> {status}</p>
      </div>
    </div>
  )
}
