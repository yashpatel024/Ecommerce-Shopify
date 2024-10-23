import { Suspense } from 'react'
import CartContent from '@/components/sections/cart/cartContent'

export default async function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CartContent />
      </Suspense>
    </div>
  )
}
