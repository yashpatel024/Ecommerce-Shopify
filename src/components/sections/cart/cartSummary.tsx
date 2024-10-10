import { ShopifyProduct } from '@/types/shopify.types'
import Button from '@/components/ui/button'
import { CartItem } from '@/context/cartContext'

interface CartSummaryProps {
  cartItems: CartItem[]
  products: ShopifyProduct[]
}

export default function CartSummary({ cartItems, products }: CartSummaryProps) {
  const subtotal = cartItems.reduce((total, item) => {
    const product = products.find((p) => p.handle === item.handle)
    return total + (product ? product.price * item.quantity : 0)
  }, 0)
  const tax = subtotal * 0.1 // Assuming 10% tax
  const total = subtotal + tax

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
                ${subtotal.toFixed(2)}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                Tax
              </dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">
                ${tax.toFixed(2)}
              </dd>
            </dl>
          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
            <dt className="text-base font-bold text-gray-900 dark:text-white">
              Total
            </dt>
            <dd className="text-base font-bold text-gray-900 dark:text-white">
              ${total.toFixed(2)}
            </dd>
          </dl>
        </div>

        <Button
          variant="primary"
          className="w-full"
          onClick={{
            action: 'redirect',
            path: '/checkout/',
          }}
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
