import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PaymentMethod } from '@stripe/stripe-js'
import type { ShopifyProduct } from '@/types/shopify.types'

export function useCheckout() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handlePayment = async (
    paymentMethod: PaymentMethod,
    products: ShopifyProduct[],
  ) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          orderData: products,
        }),
      })

      const paymentResponse = await response.json()

      if (paymentResponse.error) {
        setError(paymentResponse.error)
      } else {
        router.push('/order-confirmation')
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred during payment')
    } finally {
      setIsLoading(false)
    }
  }

  return { handlePayment, error, isLoading }
}
