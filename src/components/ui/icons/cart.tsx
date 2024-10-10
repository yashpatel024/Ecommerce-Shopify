import { ShoppingCart } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { useCartOperations } from '@/hooks/useCartOperations'

interface CartIconProps {
  className?: string
  cartItemClassName?: string
}

export default function Cart({
  className = '',
  cartItemClassName = '',
}: CartIconProps) {
  const { getCartItemsCount } = useCartOperations()
  const cartItems = getCartItemsCount()

  return (
    <button
      className={twMerge(
        'py-2 w-10 h-10 flex items-center justify-center relative',
        className,
      )}
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
