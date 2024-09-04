import { getProducts } from '@/services/shopify-services'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Products() {
  // Design a Products Page with a list of products as a component and pass the products to it, Product will have a Link to each product,
  // and will have a button to add to cart, and a button to remove from cart, Also it shuold be box shadowed with a hover effect, Minimal design, sleek, modern, responsive,
  // Also it should have a search bar, and a filter button, and a sort button
  // Also it should have a pagination
  // Also it should have a sidebar with filters and sort options
  // Also it should have a cart icon and a button to checkout
  // Also it should have a wishlist icon and a button to add to wishlist

  const products = await getProducts()

  return (
    <main className="flex flex-col items-center justify-center py-8">
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.handle}`}>
            <div
              key={product.id}
              className="w-[30%] bg-white shadow-md rounded-lg p-4 flex flex-col gap-4 hover:shadow-lg cursor-pointer"
            >
              <Image
                src={product.images[0].url}
                alt={product.title}
                width={300}
                height={300}
              />
              <h2 className="text-2xl font-bold text-secondary-typography">
                {product.title}
              </h2>
              <p className="text-light-typography">{product.description}</p>
              {/* Show the variants of the product from product.variants[0] */}
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-secondary-typography">
                  ${product.variants[0].price.amount}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
