import ProductCard from '@/components/cards/productCard'
import type { ShopifyProduct } from '@/types/shopify.types'

interface ProductGridProps {
  products: ShopifyProduct[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
