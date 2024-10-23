'use client'

import { useCart } from '@/context/cartContext'
import CartItems from '@/components/sections/cart/cartItems'
import CartSummary from '@/components/sections/cart/cartSummary'
import { ShopifyProduct } from '@/types/shopify.types'
import { useEffect, useState } from 'react'
import { getHostUrl } from '@/lib/utils'

export default function CartContent() {
  const { cart } = useCart()
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      if (!cart || cart.lines.length === 0) {
        setProducts([])
        setIsLoading(false)
        return
      }

      try {
        // Get unique product handles from cart lines
        const productHandles = Array.from(
          new Set(cart.lines.map((line) => line.merchandise.handle)),
        )

        // Fetch products data using REST API
        const response = await fetch(
          `${getHostUrl()}/api/products?handles=${productHandles.join(',')}`,
        )

        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        const fetchedProducts = await response.json()

        setProducts(fetchedProducts.products)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [cart])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!cart || products.length === 0) {
    return <p>Your cart is empty.</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        {products.length > 0 &&
          products.map((item) => (
            <CartItems
              key={item.id}
              product={item}
              cartItem={cart.lines.find(
                (line) => line.merchandise.handle === item.handle,
              )}
              quantity={
                cart.lines.find(
                  (line) => line.merchandise.handle === item.handle,
                )?.quantity ?? 0
              }
            />
          ))}
      </div>
      <div>
        <CartSummary cartCost={cart.cost} />
      </div>
    </div>
  )
}
