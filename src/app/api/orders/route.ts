import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/config/shopify'

export async function GET(request: NextRequest) {
  try {
    // Fetch order details from Shopify
    const orderId = request.nextUrl.searchParams.get('orderId')
    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 },
      )
    }
    const order = await client.checkout.fetch(orderId)

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
