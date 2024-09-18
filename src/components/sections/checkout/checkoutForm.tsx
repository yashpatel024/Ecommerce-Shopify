'use client'

import { Elements } from '@stripe/react-stripe-js'
import { PaymentForm } from '@/components/sections/checkout/paymentForm'
import { ProductSummary } from '@/components/sections/checkout/productSummary'
import { stripePromise } from '@/utils/config/stripe'
import type { ShopifyProduct } from '@/types/shopify.types'

interface CheckoutFormProps {
  product: ShopifyProduct
}

export default function CheckoutForm({ product }: CheckoutFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProductSummary product={product} />
      <Elements stripe={stripePromise}>
        <PaymentForm product={product} />
      </Elements>
    </div>
  )
}
