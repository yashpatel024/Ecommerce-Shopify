import CheckoutForm from '@/components/sections/checkout/checkoutForm'
import { Suspense } from 'react'
import Container from '@/components/layout/container'

export default async function CheckoutPage() {
  return (
    <Container className="py-16">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CheckoutForm />
      </Suspense>
    </Container>
  )
}
