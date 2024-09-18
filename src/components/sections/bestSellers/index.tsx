import ProductCard from '@/components/cards/productCard'
import { getProducts } from '@/services/shopify/products'
import type { ShopifyProduct } from '@/types/shopify.types'

const BestSellers = async () => {
  const products: ShopifyProduct[] = await getProducts()

  return (
    <section className="container py-16">
      <h2 className="text-2xl font-bold mb-8">Bestsellers</h2>
      <div className="flex flex-row flex-wrap justify-center gap-4 md:gap-8">
        {products.map(
          (product) =>
            product && <ProductCard key={product.id} product={product} />,
        )}
      </div>
    </section>
  )
}

export default BestSellers
