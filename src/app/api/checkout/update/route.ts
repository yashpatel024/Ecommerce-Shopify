import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/config/shopify'
import type { MailingAddressInput } from 'shopify-buy'

export async function POST(request: NextRequest) {
  try {
    const { checkoutId, customerDetails } = await request.json()
    // Update checkout with customer information
    const checkout = await client.checkout.updateEmail(
      checkoutId,
      customerDetails.email,
    )

    // Update shipping address
    const shippingAddress: MailingAddressInput = {
      address1: customerDetails.address1,
      address2: customerDetails.address2,
      city: customerDetails.city,
      company: '',
      country: customerDetails.country,
      firstName: customerDetails.firstName,
      lastName: customerDetails.lastName,
      phone: customerDetails.phone,
      province: customerDetails.province,
      zip: customerDetails.postalCode,
    }

    const updatedCheckout = await client.checkout.updateShippingAddress(
      checkoutId,
      shippingAddress,
    )

    return NextResponse.json(updatedCheckout)
  } catch (error) {
    console.error('Checkout update error:', error)
    return NextResponse.json(
      { error: 'Failed to update checkout' },
      { status: 500 },
    )
  }
}
