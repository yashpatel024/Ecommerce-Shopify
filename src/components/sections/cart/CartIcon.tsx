'use client'

import { useCart } from '@/context/cartContext'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function CartIcon() {
  const { cart } = useCart()
  const quantity = cart?.totalQuantity ?? 0

  return (
    <Link href="/cart" className="relative">
      <ShoppingBag className="h-6 w-6" />
      {quantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {quantity}
        </span>
      )}
    </Link>
  )
}
