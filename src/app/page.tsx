import BestSellers from '@/components/sections/bestSellers'
import Hero from '@/components/sections/hero'
import { getProducts } from '@/services/shopify/products'
import type { ShopifyProduct } from '@/types/shopify.types'

export default async function Home() {
  const products: ShopifyProduct[] = await getProducts()

  return (
    <main className="flex flex-col items-center justify-center">
      <Hero />
      <BestSellers />
    </main>
  )
}
