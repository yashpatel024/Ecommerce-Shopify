import Image from 'next/image'
import Link from 'next/link'
import type { ProductCardProps } from './ProductCard.types'

export default function ProductCard({ key, product }: ProductCardProps) {
  if (!product) {
    return <h1>Product not found</h1>
  }

  const imageSrc = product.images[0].src
  const imageAlt = product.images[0].alt
  const productTitle = product.title
  const productDescription = product.description
  const productPrice = product.variants[0].price.amount

  return (
    <div
      key={key}
      className="w-[30%] bg-white shadow-md rounded-xl p-4 flex flex-col gap-4 hover:shadow-lg"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={300}
        height={300}
        className="rounded-xl w-full h-250"
      />
      <Link href={`/product/${product.handle}`} className="cursor-pointer">
        <h2 className="text-2xl font-bold text-secondary-typography">
          {productTitle}
        </h2>
      </Link>

      <p className="text-light-typography">{productDescription}</p>
      {/* Show the variants of the product from product.variants[0] */}
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-secondary-typography">
          ${productPrice}
        </p>
      </div>
    </div>
  )
}
