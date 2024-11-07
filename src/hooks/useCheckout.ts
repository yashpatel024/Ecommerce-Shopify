import { useState } from 'react'
import { PaymentMethod } from '@stripe/stripe-js'
import { getHostUrl } from '@/lib/utils'
import { Cart } from '@/context/cartContext'
import type { CustomerDetails } from '@/components/sections/checkout/customerDetailsForm'

interface CheckoutResponse {
  success: boolean
  error?: string
  orderId?: string
  checkoutUrl?: string
}

export function useCheckout() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [customerDetails, setCustomerDetails] =
    useState<CustomerDetails | null>(null)

  const updateCheckoutDetails = async (
    checkoutId: string,
    details: CustomerDetails,
  ) => {
    const hostUrl = getHostUrl()
    const response = await fetch(`${hostUrl}/api/checkout/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        checkoutId,
        customerDetails: details,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to update checkout details')
    }

    return await response.json()
  }

  const handlePayment = async (
    paymentMethod: PaymentMethod,
    cart: Cart,
  ): Promise<CheckoutResponse> => {
    if (!customerDetails) {
      return {
        success: false,
        error: 'Customer details are required',
      }
    }

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
          cart,
          customerDetails,
        }),
      })

      const shopifyCheckout = await shopifyResponse.json()

      if (shopifyCheckout.error) {
        throw new Error(shopifyCheckout.error)
      }

      // Update checkout with customer details
      await updateCheckoutDetails(shopifyCheckout.id, customerDetails)

      // Process payment with Stripe
      const stripeResponse = await fetch(`${hostUrl}/api/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: shopifyCheckout.totalPrice.amount,
          checkoutId: shopifyCheckout.id,
          customerDetails,
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

  return {
    handlePayment,
    error,
    isLoading,
    setCustomerDetails,
    customerDetails,
  }
}
