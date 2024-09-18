import { createOrder } from '@/services/shopify/orders'
import type { ShopifyProduct } from '@/types/shopify.types'
// import { stripe } from '@/utils/config/stripe'
import Stripe from 'stripe'

type RequestBody = {
  paymentMethodId: string
  orderData: ShopifyProduct[]
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const calculateOrderAmountInCent = (items: ShopifyProduct[]) => {
  const total = items.reduce(
    (acc: number, item: ShopifyProduct) =>
      acc + Number(item.variants[0].price.amount),
    0,
  )
  // return cents
  return Math.round(total * 100)
}

export async function POST(request: Request, response: Response) {
  const { paymentMethodId, orderData }: RequestBody = await request.json()

  if (!paymentMethodId) {
    return Response.json(
      { error: 'Error with Payment Method' },
      { status: 400 },
    )
  }

  try {
    console.log('Payment Intent started')
    const paymentIntent = await stripe.paymentIntents.create({
      // amount: calculateOrderAmountInCent(orderData),
      amount: 100,
      currency: 'CAD',
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    })

    if (paymentIntent.status !== 'succeeded') {
      return Response.json({ error: 'Payment failed' }, { status: 400 })
    }

    // Create the order in Shopify
    const order = await createOrder(orderData)

    return Response.json(order)
  } catch (error) {
    console.error('Error fetching order:', error)
    return Response.json(
      {
        error: 'An error occurred while fetching order.',
      },
      { status: 500 },
    )
  }
}
