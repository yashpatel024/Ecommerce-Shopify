'use client'

import { useEffect, useState } from 'react'
import { useCartOperations } from '@/hooks/useCartOperations'
import { ShopifyProduct } from '@/types/shopify.types'
import CartItem from '@/components/sections/cart/cartItems'
import CartSummary from '@/components/sections/cart/cartSummary'

export default function CartPage() {
  const { cartItems } = useCartOperations()
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const productHandles = cartItems.map((item) => item.handle)
        const response = await fetch('/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json()
        if (data.error) {
          throw new Error(data.error)
        }
        setProducts(data.products)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
      setIsLoading(false)
    }

    fetchProducts()
  }, [cartItems])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {products.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {products.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                quantity={
                  cartItems.find((item) => item.handle === product.handle)
                    ?.quantity || 0
                }
              />
            ))}
          </div>
          <div>
            <CartSummary cartItems={cartItems} products={products} />
          </div>
        </div>
      )}
    </div>
  )
}
