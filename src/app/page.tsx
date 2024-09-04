import { getProducts } from '@/services/shopify-services'
// import Button from '@/components/ui/Button'
import React from 'react'
import type { Product } from 'shopify-buy'
import ProductCard from '@/components/sections/product-card'

export default async function Home() {
  const products: Product[] = await getProducts()

  return (
    <main className="flex flex-col items-center justify-center py-8">
      <h1 className="text-4xl font-bold mb-8 text-primary-typography">
        Welcome to Brave Furniture Store 👋
      </h1>
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
