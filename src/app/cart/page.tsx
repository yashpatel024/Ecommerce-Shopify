import { Suspense } from 'react'
import CartContent from '@/components/sections/cart/cartContent'
import Container from '@/components/layout/container'

export default async function CartPage() {
  return (
    <Container className="py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CartContent />
      </Suspense>
    </Container>
  )
}
