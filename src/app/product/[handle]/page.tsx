import { getProduct } from '@/services/shopify/products'
import { Metadata } from 'next'
import ProductGallery from '@/components/sections/products/gallery'
import ProductInfo from '@/components/sections/products/info'
import type { ShopifyProduct } from '@/types/shopify.types'
import { notFound } from 'next/navigation'

type ProductPageProps = {
  params: {
    handle: string
  }
}

/*
  Generate metadata for the product page
*/
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.handle)

  if (!product) {
    return { title: 'Product not found' }
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.images[0].src,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
    },
  }
}

export default async function Product({ params }: ProductPageProps) {
  // Fetch the product data from Shopify-Buy API
  const productData: ShopifyProduct | null = await getProduct(params.handle)

  if (!productData) {
    return notFound()
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="pb-20 pt-6 lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product Gallery */}
          <ProductGallery images={productData.images} />

          {/* Product Info */}
          <ProductInfo product={productData} />
        </div>
      </div>
    </div>
  )
}
