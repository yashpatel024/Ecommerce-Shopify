import { ProductCard } from '@/components/sections'
import { getProducts } from '@/services/shopify-services'
import type { ShopifyProduct } from '@/types/shopify.types'

export default async function Home() {
  const products: ShopifyProduct[] = await getProducts()

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
