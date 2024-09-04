import ProductCard from '@/components/ui/product-card'
import { getProducts } from '@/services/shopify-services'
import React from 'react'
import type { Product } from 'shopify-buy'

export default async function Products() {
  const products: Product[] = await getProducts()

  return (
    <main className="flex flex-col items-center justify-center py-8">
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
