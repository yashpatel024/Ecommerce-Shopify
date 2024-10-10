import { useState, useEffect } from 'react'
import { useCartOperations } from '@/hooks/useCartOperations'
import Button from '@/components/ui/button'
import { ShopifyProduct } from '@/types/shopify.types'

interface AddToCartButtonProps {
  product: ShopifyProduct
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { cartItems, addToCart, removeFromCart, updateQuantity } =
    useCartOperations()
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    const cartItem = cartItems.find((item) => item.handle === product.handle)
    setQuantity(cartItem ? cartItem.quantity : 0)
  }, [cartItems, product.handle])

  const handleAddToCart = () => {
    addToCart(product.handle)
  }

  const handleUpdateQuantity = (newQuantity: number) => {
    updateQuantity(product.handle, newQuantity)
  }

  if (quantity === 0) {
    return (
      <Button
        onClick={{
          action: 'action',
          callbackAction: handleAddToCart,
        }}
        variant="primary"
        className="w-full"
      >
        Add to Cart
      </Button>
    )
  }

  return (
    <div className="flex items-center justify-between w-full">
      <Button
        onClick={{
          action: 'action',
          callbackAction: () => handleUpdateQuantity(quantity - 1),
        }}
        variant="outline"
        className="px-3 py-1"
      >
        -
      </Button>
      <span className="mx-2">{quantity}</span>
      <Button
        onClick={{
          action: 'action',
          callbackAction: () => handleUpdateQuantity(quantity + 1),
        }}
        variant="outline"
        className="px-3 py-1"
      >
        +
      </Button>
    </div>
  )
}
