import { Suspense } from 'react'
import CartItems from '@/components/sections/cart/cartItems'
import CartSummary from '@/components/sections/cart/cartSummary'
import { ShopifyProduct } from '@/types/shopify.types'
import { getCart } from '@/lib/session-store'
import { getHostUrl } from '@/lib/utils'

async function getProductsByHandles(handles: string[]) {
  const hostUrl = getHostUrl()

  try {
    const response = await fetch(hostUrl + '/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ handles: handles }),
    })

    const { products }: { products: ShopifyProduct[] } = await response.json()

    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error('Failed to fetch products')
  }
}

async function CartContent() {
  const cart = await getCart()

  console.log('cart', cart)
  if (!cart) {
    return <p>Your cart is empty.</p>
  }

  const productHandles = Object.keys(cart)

  const products: ShopifyProduct[] = await getProductsByHandles(productHandles)

  const cartItems = products.map((product) => ({
    ...product,
    quantity: cart[product.handle],
  }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        {cartItems.map((item) => (
          <CartItems
            key={item.id}
            product={item}
            quantity={item.quantity as number}
          />
        ))}
      </div>
      <div>
        <CartSummary
          cartItems={cartItems.map((item) => ({
            ...item,
            quantity: Number(item.quantity),
          }))}
          products={products}
        />
      </div>
    </div>
  )
}

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CartContent />
      </Suspense>
    </div>
  )
}
