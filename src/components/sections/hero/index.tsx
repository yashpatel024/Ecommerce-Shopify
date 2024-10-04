'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import ProductCarousel from '@/components/sections/hero/productCarousel'
import { type ShopifyProduct } from '@/types/shopify.types'

//

export default function Hero() {
  const [products, setProducts] = useState<ShopifyProduct[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data.products)
    }
    fetchProducts()
  }, [])

  return (
    <section className="container relative w-full pt-24 h-[100vh] flex items-center">
      <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
        {/* First column with 2 rows */}
        <div className="grid grid-rows-2 gap-4">
          {/* <div className="bg-gray-100 p-4 rounded-lg">
            <Image
              src={products[0].images[0].src}
              alt={products[0].title}
              width={400}
              height={400}
              className="w-full h-auto"
            />
            <h3 className="text-lg font-semibold mt-2">{products[0].title}</h3>
            <p className="text-sm text-gray-600">{products[0].description}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <Image
              src={products[1].images[0].src}
              alt={products[1].title}
              width={400}
              height={400}
              className="w-full h-auto"
            />
            <h3 className="text-lg font-semibold mt-2">{products[1].title}</h3>
            <p className="text-sm text-gray-600">{products[1].description}</p>
          </div> */}
        </div>

        {/* Second column with carousel */}
        <div className="relative bg-gray-100 p-4 rounded-lg">
          <ProductCarousel products={products} />
        </div>
      </div>
    </section>
  )
}
