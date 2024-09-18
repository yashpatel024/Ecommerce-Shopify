// src/components/checkout/ProductSummary.tsx
import Image from 'next/image'

interface Product {
  id: string
  name: string
  price: number
  image: string
}

interface ProductSummaryProps {
  product: Product
}

export function ProductSummary({ product }: ProductSummaryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
      <div className="flex items-center mb-4">
        <Image
          src={product.image}
          alt={product.name}
          width={80}
          height={80}
          className="rounded-md"
        />
        <div className="ml-4">
          <h3 className="text-lg font-medium">{product.name}</h3>
          <p className="text-gray-600">${(product.price / 100).toFixed(2)}</p>
        </div>
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">
            ${(product.price / 100).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}
