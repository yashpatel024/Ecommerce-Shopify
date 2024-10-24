'use client'

import Image from 'next/image'
import type { Product } from 'shopify-buy'
import { useState, useEffect } from 'react'
import { CartItem, useCart } from '@/context/cartContext'

interface CartItemProps {
  product: Product
  cartItem: CartItem | undefined
  quantity: number
}

export default function CartItems({
  product,
  cartItem,
  quantity,
}: CartItemProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { loading, removeItem, updateItemQuantity } = useCart()

  const handleUpdateQuantity = async (newQuantity: number) => {
    setIsLoading(true)
    if (newQuantity > 0) {
      await updateItemQuantity(cartItem?.merchandise.id!, newQuantity)
    } else {
      await removeItem(cartItem?.merchandise.id!)
    }
    setIsLoading(false)
  }

  const handleRemove = async () => {
    setIsLoading(true)
    await removeItem(cartItem?.merchandise.id!)
    setIsLoading(false)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <a href="#" className="shrink-0 md:order-1">
          <Image
            src={product.variants[0].image.src!}
            alt={product.title}
            width={80}
            height={80}
            className="h-20 w-20 object-cover"
          />
        </a>

        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center">
            <button
              onClick={() => handleUpdateQuantity(quantity - 1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              disabled={isLoading}
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
              onClick={() => handleUpdateQuantity(quantity + 1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              disabled={isLoading}
            >
              +
            </button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-gray-900 dark:text-white">
              ${cartItem?.merchandise.price.amount ?? 0 * quantity}
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
              disabled={isLoading}
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
            >
              {isLoading ? 'Removing...' : 'Remove'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
