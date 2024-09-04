import { productQuery } from '@/utils/graphql'
import { StorefrontClient } from '@/utils/shopify'
import Image from 'next/image'
import React from 'react'

export type Props = {
  params: {
    handle: string
  }
}

export default async function Product({ params }: Props) {
  const { data, errors, extensions } = await StorefrontClient.request(
    productQuery,
    {
      variables: {
        handle: params.handle,
      },
    },
  )

  if (!data.product) {
    console.log(errors)
    console.log(extensions)
    return <div>Product not found</div>
  }

  const productData = data?.product

  return (
    <section
      id={productData.id}
      className="flex flex-col min-h-screen items-center justify-center py-8"
    >
      <h1 className="text-4xl font-bold mb-8 text-primary-typography">
        {productData.title}
      </h1>
      <Image
        src={productData.images.nodes[0].src}
        alt={productData.title}
        width={500}
        height={500}
      />
      <div className="flex flex-col justify-between items-center w-1/2">
        <p className="text-light-typography text-light-typography">
          {productData.description}
        </p>
        {/* Show the variants of the product from product.variants[0] */}
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-secondary-typography">
            Price - ${productData.priceRange.maxVariantPrice.amount}
          </p>
        </div>
      </div>
    </section>
  )
}
