import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PaymentMethod } from '@stripe/stripe-js'

export function useCheckout() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handlePayment = async (
    paymentMethod: PaymentMethod,
    productId: string,
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
          amount: 1000, // Replace with actual product price
          paymentMethodId: paymentMethod.id,
          orderData: {
            line_items: [
              {
                variantId: productId,
                quantity: 1,
              },
            ],
          },
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
