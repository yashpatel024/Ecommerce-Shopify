'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import ProductCarousel from '@/components/sections/carousel/productCarousel'
import { type ShopifyProduct } from '@/types/shopify.types'
import NewProduct from '@/components/cards/newProductCard'
import { getHostUrl } from '@/lib/utils'

//

export default function Hero() {
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const hostUrl = getHostUrl()

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${hostUrl}/api/products`)
      const data = await response.json()
      setProducts(data.products)
    }
    fetchProducts()
  }, [])

  return (
    <section className="relative w-full pt-8 md:pt-0 h-[100vh] flex items-start">
      <div className="relative flex flex-col-reverse md:items-center lg:flex-row gap-4 w-full lg:px-12 lg:justify-center">
        {/* First column with 2 rows */}
        <div className="relative grid grid-rows-2 gap-4 md:grid-rows-1 md:grid-cols-2 lg:grid-cols-1 lg:h-full lg:w-1/3">
          {products.length > 0 && (
            <>
              <NewProduct product={products[0]} variant="one" />
              {products.length > 1 && (
                <NewProduct product={products[1]} variant="two" />
              )}
            </>
          )}
        </div>

        {/* Second column with carousel */}
        <ProductCarousel
          products={products}
          className="w-full h-fit lg:w-2/3 lg:h-full relative bg-[#F4F5F3] px-6 py-6 flex flex-col justify-center gap-6"
        />
      </div>
    </section>
  )
}
