'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ProductGrid from '@/components/sections/products/grid/productGrid'
import FilterBar from '@/components/sections/products/filters/filterBar'
import ProductHeader from '@/components/sections/products/header/productHeader'
import Pagination from '@/components/sections/products/pagination'
import type { ShopifyProduct } from '@/types/shopify.types'
import { getHostUrl } from '@/lib/utils'
import { FilterState } from '@/types/filter.types'
import { INITIAL_FILTER_STATE } from '@/constants/filters'
import Container from '@/components/layout/container'

export default function Products() {
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalProducts, setTotalProducts] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [activeFilters, setActiveFilters] =
    useState<FilterState>(INITIAL_FILTER_STATE)

  const searchParams = useSearchParams()
  const router = useRouter()
  const hostUrl = getHostUrl()

  // Fetch products from API
  const fetchProducts = useCallback(
    async (filters?: FilterState, page: number = 1) => {
      setIsLoading(true)
      try {
        const params = new URLSearchParams()
        params.set('page', page.toString())

        if (filters) {
          Object.entries(filters).forEach(([key, values]) => {
            if (values.length > 0) {
              params.set(key, values.join(','))
            }
          })
        }

        const response = await fetch(
          `${hostUrl}/api/products?${params.toString()}`,
        )
        const data = await response.json()

        setProducts(data.products)
        setTotalProducts(data.totalProducts)
        setTotalPages(data.totalPages)
        setCurrentPage(data.currentPage)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [hostUrl],
  )

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10)
    const urlFilters: FilterState = {
      category: searchParams.get('category')?.split(',') || [],
      price: searchParams.get('price')?.split(',') || [],
    }
    setActiveFilters(urlFilters)
    fetchProducts(urlFilters, page)
  }, [searchParams, fetchProducts])

  // Handle filter changes from FilterBar component
  const handleFilterChange = (filters: FilterState) => {
    setActiveFilters(filters)
    const params = new URLSearchParams()
    params.set('page', '1') // Reset to first page when filters change
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(key, values.join(','))
      }
    })
    router.push(`/products?${params.toString()}`, { scroll: false })
    fetchProducts(filters, 1)
  }

  // Handle pagination changes from Pagination component
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`/products?${params.toString()}`, { scroll: true })
    fetchProducts(activeFilters, page)
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
    <Container className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <aside>
          <FilterBar
            onFilterChange={handleFilterChange}
            initialFilters={activeFilters}
          />
        </aside>
        <main>
          <ProductHeader
            totalProducts={totalProducts}
            onSortChange={handleSortChange}
          />
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              Loading...
            </div>
          ) : (
            <>
              <ProductGrid products={products} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </main>
      </div>
    </Container>
  )
}
