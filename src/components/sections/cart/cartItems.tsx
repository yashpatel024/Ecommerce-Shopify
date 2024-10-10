import Image from 'next/image'
import { ShopifyProduct } from '@/types/shopify.types'
import { useCartOperations } from '@/hooks/useCartOperations'

interface CartItemProps {
  product: ShopifyProduct
  quantity: number
}

export default function CartItem({ product, quantity }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCartOperations()

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(product.handle, Math.max(0, newQuantity))
  }

  const handleRemove = () => {
    removeFromCart(product.handle)
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <a href="#" className="shrink-0 md:order-1">
          <Image
            src={product.images[0].src}
            alt={product.title}
            width={80}
            height={80}
            className="h-20 w-20 object-cover"
          />
        </a>

        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              -
            </button>
            <input
              type="text"
              className="w-12 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
              value={quantity}
              readOnly
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              +
            </button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-gray-900 dark:text-white">
              ${(product.price * quantity).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <a
            href="#"
            className="text-base font-medium text-gray-900 hover:underline dark:text-white"
          >
            {product.title}
          </a>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleRemove}
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
