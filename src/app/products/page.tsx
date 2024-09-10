import { ProductCard } from '@/components/sections'
import { getProducts } from '@/services/shopify-services'
import type { ShopifyProduct } from '@/types/shopify.types'

export default async function Products() {
  const products: ShopifyProduct[] = await getProducts()

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
