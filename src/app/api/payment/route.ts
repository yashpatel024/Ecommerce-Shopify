import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/config/stripe'
import { createOrder } from '@/services/shopify/orders'

export async function POST(request: NextRequest) {
  try {
    const { paymentMethodId, amount, checkoutId } = await request.json()

    // Create and confirm Stripe payment intent with test mode configurations
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(parseFloat(amount) * 100),
      currency: 'CAD',
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
      metadata: {
        checkoutId,
        testMode: 'true',
      },
      // Test mode specific settings
      description: 'Test payment',
      statement_descriptor_suffix: 'TEST',
    })

    if (paymentIntent.status !== 'succeeded') {
      throw new Error('Test payment failed')
    }

    // Create test order in Shopify
    // const order = await createOrder(checkoutId)

    return NextResponse.json({
      success: true,
      paymentIntent: paymentIntent.id,
      testMode: true,
    })
  } catch (error: any) {
    console.error('Test order creation error:', error)
    return NextResponse.json(
      { error: error.message || 'Test order creation failed' },
      { status: 500 },
    )
  }
}
