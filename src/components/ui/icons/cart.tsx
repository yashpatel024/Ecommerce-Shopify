import { ShoppingCart } from 'lucide-react'

interface CartIconsProps {
  cartItems: number
}

export default function Cart({ cartItems }: CartIconsProps) {
  return (
    <div className="relative ">
      <ShoppingCart
        size={24}
        className="p-2 w-10 h-10 flex items-center justify-center"
      />
      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {cartItems}
      </span>
    </div>
  )
}
