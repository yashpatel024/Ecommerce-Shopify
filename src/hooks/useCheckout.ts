import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PaymentMethod } from '@stripe/stripe-js'
import { getHostUrl } from '@/lib/utils'
import { CartItem } from '@/context/cartContext'

interface CheckoutResponse {
  success: boolean
  error?: string
  orderId?: string
  checkoutUrl?: string
}

export function useCheckout() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async (
    paymentMethod: PaymentMethod,
    cartLines: CartItem[],
  ): Promise<CheckoutResponse> => {
    setIsLoading(true)
    setError(null)
    const hostUrl = getHostUrl()

    try {
      // First create Shopify checkout
      const shopifyResponse = await fetch(`${hostUrl}/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartLines,
        }),
      })

      const shopifyCheckout = await shopifyResponse.json()

      if (shopifyCheckout.error) {
        throw new Error(shopifyCheckout.error)
      }

      // Then process Stripe payment
      const stripeResponse = await fetch(`${hostUrl}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: shopifyCheckout.totalPrice,
          checkoutId: shopifyCheckout.id,
        }),
      })

      const paymentResult = await stripeResponse.json()

      if (paymentResult.error) {
        throw new Error(paymentResult.error)
      }

      return {
        success: true,
        orderId: paymentResult.orderId,
        checkoutUrl: shopifyCheckout.checkoutUrl,
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred during checkout')
      return {
        success: false,
        error: error.message,
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { handlePayment, error, isLoading }
}
