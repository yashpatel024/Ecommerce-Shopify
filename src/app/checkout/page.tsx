import CheckoutForm from '@/components/sections/checkout/checkoutForm'
import { Suspense } from 'react'
// import { useCart } from '@/context/cartContext'

export default async function CheckoutPage() {
  // const { cart } = useCart()

  // if (!cart) {
  //   return notFound()
  // }

  return (
    <section className="py-16">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CheckoutForm />
      </Suspense>
    </section>
  )
}
