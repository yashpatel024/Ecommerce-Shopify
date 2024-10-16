import ProductCard from '@/components/cards/productCard'
import { getProducts } from '@/services/shopify/products'
import type { ShopifyProduct } from '@/types/shopify.types'

export default async function Products() {
  const products: ShopifyProduct[] = await getProducts()

  return (
    <main className="flex flex-col items-center justify-center">
      <h1>Products</h1>
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
