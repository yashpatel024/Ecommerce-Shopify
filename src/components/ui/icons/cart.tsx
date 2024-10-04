import { ShoppingCart } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface CartIconsProps {
  cartItems: number
  className?: string
}

export default function Cart({ cartItems, className = '' }: CartIconsProps) {
  return (
    <button
      className={twMerge(
        'py-2 w-10 h-10 flex items-center justify-center',
        className,
      )}
    >
      <ShoppingCart size={24} />
      <span className="absolute top-7 right-7 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {cartItems}
      </span>
    </button>
  )
}
