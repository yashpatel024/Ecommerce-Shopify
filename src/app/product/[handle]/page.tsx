import { Metadata } from 'next'
import ProductGallery from '@/components/sections/products/gallery'
import ProductInfo from '@/components/sections/products/info'
import type { ShopifyProduct } from '@/types/shopify.types'
import { notFound } from 'next/navigation'
import { getHostUrl } from '@/lib/utils'

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
  const hostUrl = getHostUrl()
  try {
    const response = await fetch(
      `${hostUrl}/api/products?handles=${params.handle}`,
      {
        next: { revalidate: 60 }, // Cache for 60 seconds
      },
    )

    if (!response.ok) {
      return { title: 'Product not found' }
    }

    const data = await response.json()
    const product = data.products[0]

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
  } catch (error) {
    console.error('Error fetching product metadata:', error)
    return { title: 'Product not found' }
  }
}

export default async function Product({ params }: ProductPageProps) {
  let product: ShopifyProduct | null = null
  console.log('Fetching product:', params.handle)
  const hostUrl = getHostUrl()
  console.log('Host URL:', hostUrl)
  try {
    const response = await fetch(
      `${hostUrl}/api/products?handles=${params.handle}`,
      {
        next: { revalidate: 60 }, // Cache for 60 seconds
      },
    )
    console.log('Fetching product:', response)

    if (!response.ok) {
      throw new Error('Failed to fetch product')
    }

    const data = await response.json()
    product = data.products[0]
  } catch (error) {
    console.error('Error fetching product:', error)
    return notFound()
  }

  if (!product) {
    return notFound()
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="pb-20 pt-6 lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product Gallery */}
          <ProductGallery images={product.images} />

          {/* Product Info */}
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  )
}
