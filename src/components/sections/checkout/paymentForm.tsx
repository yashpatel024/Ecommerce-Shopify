import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useCheckout } from '@/hooks/useCheckout'
import type { ShopifyProduct } from '@/types/shopify.types'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cartContext'

interface PaymentFormProps {
  product: ShopifyProduct
}

export function PaymentForm({ product }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const { handlePayment, error, isLoading } = useCheckout()
  const { cart } = useCart()

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
      await handlePayment(paymentMethod, [product])
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
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
          {isLoading
            ? 'Processing...'
            : `Pay $${(cart?.cost?.totalAmount?.amount || 0 * 1.0).toFixed(2)}`}
        </Button>
      </form>
    </div>
  )
}
