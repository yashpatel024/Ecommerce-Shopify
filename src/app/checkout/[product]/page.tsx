import CheckoutForm from '@/components/sections/checkout/checkoutForm'
import type { ShopifyProduct } from '@/types/shopify.types'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

type CheckoutPageProps = {
  params: {
    product: string
  }
}

// Get the host URL
const getHostUrl = () => {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const host = process.env.VERCEL_URL! || 'localhost:3000'
  return `${protocol}://${host}`
}

/**
 * Params: product - The handle of the product to be checked out
 */
const CheckoutPage = async ({ params }: CheckoutPageProps) => {
  const productHandle = params.product
  const hostUrl = getHostUrl()

  if (!productHandle) {
    return notFound()
  }

  let product = null

  try {
    product = await fetch('/api/products?handle=' + productHandle, {
      method: 'GET',
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    return notFound()
  }

  const productData: ShopifyProduct = await product.json()

  if (!productData.id) {
    return notFound()
  }

  return (
    <section className="container py-16">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CheckoutForm product={productData} />
      </Suspense>
    </section>
  )
}

export default CheckoutPage
