'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ProductGrid from '@/components/sections/products/grid/productGrid'
import FilterBar from '@/components/sections/products/filters/filterBar'
import ProductHeader from '@/components/sections/products/header/productHeader'
import type { ShopifyProduct } from '@/types/shopify.types'
import { getHostUrl } from '@/lib/utils'
import { FilterState } from '@/types/filter.types'
import { INITIAL_FILTER_STATE } from '@/constants/filters'

export default function Products() {
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalProducts, setTotalProducts] = useState(0)

  // Initialize filter state with empty arrays for each filter type
  const [activeFilters, setActiveFilters] =
    useState<FilterState>(INITIAL_FILTER_STATE)

  // Get URL params and router for navigation
  const searchParams = useSearchParams()
  const router = useRouter()
  const hostUrl = getHostUrl()

  // Fetch products based on active filters
  const fetchProducts = useCallback(
    async (filters?: FilterState) => {
      setIsLoading(true)
      try {
        // Build query params from filters
        const params = new URLSearchParams()

        if (filters) {
          Object.entries(filters).forEach(([key, values]) => {
            if (values.length > 0) {
              params.set(key, values.join(','))
            }
          })
        }

        // Make API request with filter params
        const response = await fetch(
          `${hostUrl}/api/products?${params.toString()}`,
        )
        const data = await response.json()

        // Update state with fetched data
        setProducts(data.products)
        setTotalProducts(data.totalProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [hostUrl],
  )

  // Initialize products and filters from URL params
  useEffect(() => {
    const urlFilters: FilterState = {
      category: searchParams.get('category')?.split(',') || [],
      price: searchParams.get('price')?.split(',') || [],
      brand: searchParams.get('brand')?.split(',') || [],
      size: searchParams.get('size')?.split(',') || [],
    }
    setActiveFilters(urlFilters)
    fetchProducts(urlFilters)
  }, [searchParams, fetchProducts])

  // Handle filter changes from FilterBar component
  const handleFilterChange = (filters: FilterState) => {
    setActiveFilters(filters)

    // Update URL without refresh
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(key, values.join(','))
      }
    })
    router.push(`/products?${params.toString()}`, { scroll: false })

    fetchProducts(filters)
  }

  // Handle sorting changes from ProductHeader component
  const handleSortChange = (sortType: string) => {
    const sorted = [...products].sort((a, b) => {
      switch (sortType) {
        case 'price-low':
          return a.variants[0].price.amount - b.variants[0].price.amount
        case 'price-high':
          return b.variants[0].price.amount - a.variants[0].price.amount
        case 'name':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })
    setProducts(sorted)
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        <aside className="w-full">
          <FilterBar
            onFilterChange={handleFilterChange}
            initialFilters={activeFilters}
          />
        </aside>
        <main className="flex-1">
          <ProductHeader
            totalProducts={totalProducts}
            onSortChange={handleSortChange}
          />
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              Loading...
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </main>
      </div>
    </div>
  )
}
