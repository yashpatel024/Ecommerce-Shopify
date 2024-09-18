import Image from 'next/image'
import Link from 'next/link'
import { ShopifyProduct } from '@/types/shopify.types'
import { Button } from '@/components/ui/button'

export interface ProductCardProps {
  product: ShopifyProduct
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageSrc = product.images[0].src
  const imageAlt = product.images[0].alt
  const productTitle = product.title
  const productDescription = product.description
  const productPrice = product.variants[0].price.amount

  return (
    <div className="w-[30%] bg-white shadow-md rounded-xl p-4 flex flex-col gap-4 justify-between hover:shadow-lg">
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

      <p className="text-secondary-typography">{productDescription}</p>
      {/* Show the variants of the product from product.variants[0] */}
      <div className="flex justify-between items-end">
        <p className="text-sm font-medium text-secondary-typography">
          ${productPrice}
        </p>

        <Button
          variant="primary"
          className="mt-6"
          onClick={{
            action: 'redirect',
            path: '/products',
          }}
        >
          Buy now
        </Button>
      </div>
    </div>
  )
}
