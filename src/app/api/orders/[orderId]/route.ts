import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/config/shopify'

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } },
) {
  try {
    // Fetch order details from Shopify
    const order = await client.checkout.fetch(params.orderId)

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order details' },
      { status: 500 },
    )
  }
}
