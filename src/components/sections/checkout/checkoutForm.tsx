// src/components/checkout/CheckoutForm.tsx
'use client'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { PaymentForm } from '@/components/sections/checkout/paymentForm'
import { ProductSummary } from '@/components/sections/checkout/productSummary'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
)

export default function CheckoutForm() {
  // In a real application, you would fetch the product details based on the selected product
  const product = {
    id: 'product_1',
    name: 'Sample Product',
    price: 1000,
    image: '/sample-product.jpg',
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProductSummary product={product} />
      <Elements stripe={stripePromise}>
        <PaymentForm product={product} />
      </Elements>
    </div>
  )
}
