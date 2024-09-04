import { getProducts } from '@/services/shopify-services'
// import Button from '@/components/ui/Button'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from 'shopify-buy'

export default async function Home() {
  const products: Product[] = await getProducts()
  console.log(products[0].images[0].url)
  return (
    // Design a Home Page with Products List as a component and pass the products to it, Product wil have a Link to each product,
    // and will have a button to add to cart, and a button to remove from cart, Also it shuold be box shadowed with a hover effect, Minimal design, sleek, modern, responsive,
    <main className="flex flex-col items-center justify-center py-8">
      <h1 className="text-4xl font-bold mb-8 text-primary-typography">
        Welcome to Brave Furniture Store 👋
      </h1>
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[30%] bg-white shadow-md rounded-xl p-4 flex flex-col gap-4 hover:shadow-lg cursor-pointer"
          >
            <Image
              src={product.images[0].url}
              alt={product.title}
              width={300}
              height={300}
              objectFit="fit"
            />
            <Link href={`/product/${product.handle}`}>
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
        ))}
      </div>
    </main>
  )
}
