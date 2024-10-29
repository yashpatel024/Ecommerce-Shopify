'use client'

import { useCart } from '@/context/cartContext'
import Image from 'next/image'

export function ProductSummary() {
  const { cart } = useCart()

  if (!cart) return null

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
      {cart.lines.map((item) => (
        <div key={item.id} className="flex items-center mb-4">
          <Image
            src={item.merchandise.image}
            alt={item.merchandise.title}
            width={80}
            height={80}
            className="rounded-md"
          />
          <div className="ml-4">
            <h3 className="text-lg font-medium">{item.merchandise.title}</h3>
            <p className="text-gray-600">Quantity: {item.quantity}</p>
            <p className="text-gray-600">
              ${(item.merchandise.price.amount * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
      <div className="border-t pt-4">
        <div className="flex justify-between">
          <span className="font-semibold">Subtotal:</span>
          <span className="font-semibold">
            ${cart.cost.subtotalAmount.amount}
          </span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-semibold">Tax:</span>
          <span className="font-semibold">
            ${cart.cost.totalTaxAmount.amount}
          </span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">${cart.cost.totalAmount.amount}</span>
        </div>
      </div>
    </div>
  )
}
