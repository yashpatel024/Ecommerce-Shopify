'use client'

import { useEffect, useState } from 'react'
import ProductGrid from '@/components/sections/products/grid/productGrid'
import FilterBar from '@/components/sections/products/filters/filterBar'
import ProductHeader from '@/components/sections/products/header/productHeader'
import type { ShopifyProduct } from '@/types/shopify.types'
import { getHostUrl } from '@/lib/utils'

export default function Products() {
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [filteredProducts, setFilteredProducts] = useState<ShopifyProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const hostUrl = getHostUrl()

  useEffect(() => {
    // Fetch all products when component mounts
    const fetchProducts = async () => {
      const response = await fetch(`${hostUrl}/api/products`)
      const data = await response.json()
      setProducts(data.products)
      setFilteredProducts(data.products) // Start with all products shown
      setIsLoading(false)
    }
    fetchProducts()
  }, [])

  const handleFilterChange = (filters: Record<string, string[]>) => {
    // TODO: Need to implement actual filtering logic here
    let filtered = [...products]
    // Add your filtering logic based on the filters object
    setFilteredProducts(filtered)
  }

  const handleSortChange = (sortType: string) => {
    // Sort products based on price or name
    // Not using newest for now since we don't have date field
    const sorted = [...filteredProducts].sort((a, b) => {
      switch (sortType) {
        case 'price-low':
          return a.variants[0].price.amount - b.variants[0].price.amount
        case 'price-high':
          return b.variants[0].price.amount - a.variants[0].price.amount
        case 'name':
          return a.title.localeCompare(b.title)
        default:
          return 0 // Keep original order for unknown sort types
      }
    })
    setFilteredProducts(sorted)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        <aside className="w-full">
          <FilterBar onFilterChange={handleFilterChange} />
        </aside>
        <main className="flex-1">
          <ProductHeader
            totalProducts={filteredProducts.length}
            onSortChange={handleSortChange}
          />
          <ProductGrid products={filteredProducts} />
        </main>
      </div>
    </div>
  )
}
