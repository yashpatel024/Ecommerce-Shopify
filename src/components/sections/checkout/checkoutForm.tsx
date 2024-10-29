'use client'

import { Elements } from '@stripe/react-stripe-js'
import { PaymentForm } from '@/components/sections/checkout/paymentForm'
import { ProductSummary } from '@/components/sections/checkout/productSummary'
import { stripePromise } from '@/lib/config/stripe'
import { useCart } from '@/context/cartContext'

export default function CheckoutForm() {
  const { cart } = useCart()

  if (!cart) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProductSummary />
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  )
}
