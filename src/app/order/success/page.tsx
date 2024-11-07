import { Suspense } from 'react'
import OrderSuccessContent from '@/components/sections/order/orderSuccessContent'
import { notFound } from 'next/navigation'

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: { orderId: string }
}) {
  if (!searchParams.orderId) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
      <Suspense fallback={<div>Loading order details...</div>}>
        <OrderSuccessContent orderId={searchParams.orderId} />
      </Suspense>
    </div>
  )
}
