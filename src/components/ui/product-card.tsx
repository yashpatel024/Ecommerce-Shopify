import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import type { Product } from 'shopify-buy'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div
      key={product.id}
      className="w-[30%] bg-white shadow-md rounded-xl p-4 flex flex-col gap-4 hover:shadow-lg"
    >
      <Image
        src={product.images[0].url}
        alt={product.title}
        width={300}
        height={300}
      />
      <Link href={`/product/${product.handle}`} className="cursor-pointer">
        <h2 className="text-2xl font-bold text-secondary-typography">
          {product.title}
        </h2>
      </Link>

      <p className="text-light-typography">{product.description}</p>
      {/* Show the variants of the product from product.variants[0] */}
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-secondary-typography">
          ${product.variants[0].price.amount}
        </p>
      </div>
    </div>
  )
}
