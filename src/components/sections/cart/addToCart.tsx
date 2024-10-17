'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { getCart, setCartItem, removeCartItem } from '@/lib/session-store'

interface AddToCartButtonProps {
  productHandle: string
}

export default function AddToCartButton({
  productHandle,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchCartItem = async () => {
      const cart = await getCart()
      setQuantity(cart ? cart[productHandle] || 0 : 0)
    }
    fetchCartItem()
  }, [productHandle])

  const handleAddToCart = async () => {
    setIsLoading(true)
    await setCartItem(productHandle, 1)
    setQuantity(1)
    setIsLoading(false)
  }

  const handleUpdateQuantity = async (newQuantity: number) => {
    setIsLoading(true)
    if (newQuantity > 0) {
      await setCartItem(productHandle, newQuantity)
      setQuantity(newQuantity)
    } else {
      await removeCartItem(productHandle)
      setQuantity(0)
    }
    setIsLoading(false)
  }

  if (quantity === 0) {
    return (
      <Button
        onClick={handleAddToCart}
        variant="default"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Adding...' : 'Add to Cart'}
      </Button>
    )
  }

  return (
    <div className="flex items-center justify-between w-full">
      <Button
        onClick={() => handleUpdateQuantity(quantity - 1)}
        variant="outline"
        className="px-3 py-1"
        disabled={isLoading}
      >
        -
      </Button>
      <span className="mx-2">{quantity}</span>
      <Button
        onClick={() => handleUpdateQuantity(quantity + 1)}
        variant="outline"
        className="px-3 py-1"
        disabled={isLoading}
      >
        +
      </Button>
    </div>
  )
}
