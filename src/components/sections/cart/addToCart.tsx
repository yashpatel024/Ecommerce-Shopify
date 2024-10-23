'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cartContext'

interface AddToCartButtonProps {
  variantId: string
}

export default function AddToCartButton({ variantId }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { cart, loading, addItem, removeItem, updateItemQuantity } = useCart()

  useEffect(() => {
    const fetchCartItem = async () => {
      setQuantity(cart ? cart.totalQuantity || 0 : 0)
    }
    fetchCartItem()
  }, [cart])

  const handleAddToCart = async () => {
    setIsLoading(true)
    await addItem(variantId, 1)
    setIsLoading(false)
  }

  const handleUpdateQuantity = async (newQuantity: number) => {
    setIsLoading(true)
    if (newQuantity > 0) {
      await updateItemQuantity(variantId, newQuantity)
      setQuantity(newQuantity)
    } else {
      await removeItem(variantId)
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

  if (loading) return <div>Loading...</div>
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
