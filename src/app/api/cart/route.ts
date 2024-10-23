import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/config/shopify'

export async function POST(request: NextRequest) {
  try {
    const { action, cartId, variantId, quantity } = await request.json()

    switch (action) {
      case 'create':
        const newCart = await client.checkout.create()
        return NextResponse.json(newCart)

      case 'fetch':
        const existingCart = await client.checkout.fetch(cartId)
        return NextResponse.json(existingCart)

      case 'addItem':
        const updatedCartWithNewItem = await client.checkout.addLineItems(
          cartId,
          [{ variantId, quantity }],
        )
        return NextResponse.json(updatedCartWithNewItem)

      case 'removeItem':
        const updatedCartAfterRemoval = await client.checkout.removeLineItems(
          cartId,
          [variantId], // variantId here is actually lineItemId
        )
        return NextResponse.json(updatedCartAfterRemoval)

      case 'updateItem':
        const updatedCartWithQuantity = await client.checkout.updateLineItems(
          cartId,
          [{ id: variantId, quantity }], // variantId here is actually lineItemId
        )
        return NextResponse.json(updatedCartWithQuantity)

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Cart operation error:', error)
    return NextResponse.json(
      { error: 'Cart operation failed' },
      { status: 500 },
    )
  }
}
