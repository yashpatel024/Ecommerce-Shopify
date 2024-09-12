import { getProduct } from '@/services/shopify'
import Image from 'next/image'
import type { ShopifyProduct } from '@/types/shopify.types'

type ProductPageProps = {
  params: {
    handle: string
  }
}

export default async function Product({ params }: ProductPageProps) {
  // Fetch the product data from Shopify-Buy API
  const productData: ShopifyProduct | null = await getProduct(params.handle)

  if (productData === null) {
    return <div>Product not found</div>
  }

  return (
    <section
      id={productData.id}
      className="flex flex-col min-h-screen items-center justify-center py-8"
    >
      <h1 className="text-4xl font-bold mb-8 text-primary-typography">
        {productData.title}
      </h1>
      <Image
        src={productData.images[0].src}
        alt={productData.title}
        width={500}
        height={500}
      />
      <div className="flex flex-col justify-between items-center w-1/2">
        <p className="text-light-typography">{productData.description}</p>
        {/* Show the variants of the product from product.variants[0] */}
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-secondary-typography">
            Price - ${productData.variants[0].price.amount}
          </p>
        </div>
      </div>
    </section>
  )
}
