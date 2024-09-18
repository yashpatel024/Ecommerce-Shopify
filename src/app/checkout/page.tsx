import CheckoutForm from '@/components/sections/checkout/checkoutForm'
import { Suspense } from 'react'

const CheckoutPage = () => {
  return (
    <section className="container py-16">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CheckoutForm />
      </Suspense>
    </section>
  )
}

export default CheckoutPage
