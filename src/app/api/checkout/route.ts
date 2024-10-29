import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/config/shopify'
import { CartItem } from '@/context/cartContext'

export async function POST(request: NextRequest) {
  try {
    const { cartLines } = await request.json()

    const lineItems = cartLines.map((item: CartItem) => ({
      variantId: item.merchandise.id,
      quantity: item.quantity,
    }))

    const checkout = await client.checkout.create({
      lineItems,
    })

    return NextResponse.json({
      id: checkout.id,
      totalPrice: checkout.totalPrice,
      checkoutUrl: checkout.webUrl,
    })
  } catch (error) {
    console.error('Checkout creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout' },
      { status: 500 },
    )
  }
}
