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

const getHostUrl = () => {
  let protocol: string
  let host: string

  if (typeof window !== 'undefined') {
    // Client-side
    protocol = window.location.protocol.slice(0, -1) // Remove the colon
    host = window.location.host
  } else {
    // Server-side
    try {
      const headersList = headers()
      protocol = headersList.get('x-forwarded-proto') || 'http'
      host =
        headersList.get('host') || process.env.VERCEL_URL || 'localhost:3000'
    } catch (error) {
      console.error('Error getting headers:', error)
      protocol = 'http'
      host = 'localhost:3000'
    }
  }

  // Ensure protocol is either 'http' or 'https'
  protocol = ['http', 'https'].includes(protocol) ? protocol : 'https'

  // Basic sanitation of host
  host = host.replace(/[^\w.-:]/g, '')

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
    product = await fetch(hostUrl + '/api/products?handle=' + productHandle, {
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
