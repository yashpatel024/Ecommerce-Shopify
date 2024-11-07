'use client'

import { useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useCheckout } from '@/hooks/useCheckout'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cartContext'
import { useRouter } from 'next/navigation'
import { CustomerDetailsForm, CustomerDetails } from './customerDetailsForm'

export function PaymentForm() {
  const [showPayment, setShowPayment] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const { handlePayment, error, isLoading, setCustomerDetails } = useCheckout()
  const { cart, clearCart } = useCart()
  const router = useRouter()

  if (!cart) return null

  const handleCustomerDetails = (details: CustomerDetails) => {
    setCustomerDetails(details)
    setShowPayment(true)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    if (error) {
      console.error(error)
      return
    }

    if (paymentMethod) {
      const result = await handlePayment(paymentMethod, cart)
      if (result.success) {
        await clearCart() // Clear cart after successful checkout
        await router.push(`/order/success?orderId=${result.orderId}`)
      }
    }
  }

  if (!showPayment) {
    return (
      <CustomerDetailsForm
        onSubmit={handleCustomerDetails}
        isLoading={isLoading}
      />
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
      <div className="mb-4 p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          Test Mode: Use card number 4242 4242 4242 4242, any future date, any 3
          digits for CVC, and any postal code.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="card-element"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Credit or debit card
          </label>
          <div className="border rounded-md p-3">
            <CardElement
              id="card-element"
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <Button
          variant="default"
          disabled={!stripe || isLoading}
          className="w-full mt-4"
          type="submit"
        >
          {isLoading ? 'Processing...' : `Pay $${cart.cost.totalAmount.amount}`}
        </Button>
      </form>
    </div>
  )
}
