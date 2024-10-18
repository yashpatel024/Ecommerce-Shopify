'use client'

import { ShoppingCart } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getCartItemsCount } from '@/lib/session-store'

interface CartIconProps {
  className?: string
  cartItemClassName?: string
}

export default function Cart({
  className = '',
  cartItemClassName = '',
}: CartIconProps) {
  const [cartItems, setCartItems] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const fetchCartItemsCount = async () => {
      const count = await getCartItemsCount()
      setCartItems(count)
    }
    fetchCartItemsCount()
  }, [])

  return (
    <button
      className={twMerge(
        'py-2 w-10 h-10 flex items-center justify-center relative',
        className,
      )}
      onClick={() => {
        router.push('/cart')
      }}
    >
      <ShoppingCart size={24} />
      {cartItems > 0 && (
        <span
          className={twMerge(
            'absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center',
            cartItemClassName,
          )}
        >
          {cartItems}
        </span>
      )}
    </button>
  )
}
