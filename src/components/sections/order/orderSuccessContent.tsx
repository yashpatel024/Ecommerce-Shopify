'use client'

import { useEffect, useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { getHostUrl } from '@/lib/utils'
import type { Checkout } from 'shopify-buy'

interface OrderSuccessContentProps {
  orderId: string
}

export default function OrderSuccessContent({
  orderId,
}: OrderSuccessContentProps) {
  const [orderDetails, setOrderDetails] = useState<Checkout | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const hostUrl = getHostUrl()

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`${hostUrl}/api/orders?orderId=${orderId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch order details')
        }
        const data = await response.json()
        setOrderDetails(data)
      } catch (error) {
        console.error('Error fetching order details:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrderDetails()
  }, [orderId])

  if (isLoading) {
    return <div>Loading order details...</div>
  }

  if (!orderDetails) {
    return <div>Order not found</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Thank you for your order!
          </h2>
          <p className="text-gray-600">Order #{orderDetails.id}</p>
          <p className="text-gray-600">
            A confirmation email has been sent to {orderDetails.email}
          </p>
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Order Details</h3>
            <p className="text-gray-600">
              Date: {new Date(orderDetails.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              Total: ${orderDetails.totalPrice.amount}{' '}
              {orderDetails.totalPrice.currencyCode}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
            <div className="text-gray-600">
              <p>{orderDetails.shippingAddress?.address1}</p>
              {orderDetails.shippingAddress?.address2 && (
                <p>{orderDetails.shippingAddress.address2}</p>
              )}
              <p>
                {orderDetails.shippingAddress?.city},{' '}
                {orderDetails.shippingAddress?.province}{' '}
                {orderDetails.shippingAddress?.zip}
              </p>
              <p>{orderDetails.shippingAddress?.country}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <Button
            variant="default"
            className="w-full"
            onClick={() => router.push('/')}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  )
}
