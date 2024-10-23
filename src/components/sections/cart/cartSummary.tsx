'use client'

import { ShopifyProduct } from '@/types/shopify.types'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Cart } from '@/context/cartContext'

interface CartSummaryProps {
  cartCost: Cart['cost']
}

export default function CartSummary({ cartCost }: CartSummaryProps) {
  const router = useRouter()

  return (
    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <p className="text-xl font-semibold text-gray-900 dark:text-white">
          Order summary
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                Subtotal
              </dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">
                ${cartCost.subtotalAmount.amount}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                Tax
              </dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">
                ${cartCost.totalTaxAmount.amount}
              </dd>
            </dl>
          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
            <dt className="text-base font-bold text-gray-900 dark:text-white">
              Total
            </dt>
            <dd className="text-base font-bold text-gray-900 dark:text-white">
              ${cartCost.totalAmount.amount}
            </dd>
          </dl>
        </div>

        <Button
          variant="default"
          className="w-full"
          onClick={() => router.push('/checkout/')}
        >
          Proceed to Checkout
        </Button>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            or
          </span>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  )
}
