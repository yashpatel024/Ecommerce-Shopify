import Image from 'next/image'
import Link from 'next/link'
import { ShopifyProduct } from '@/types/shopify.types'
import { Button } from '@/components/ui/button'
import AddToCartButton from '@/components/sections/cart/addToCart'

export interface ProductCardProps {
  product: ShopifyProduct
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageSrc = product.images[0].src || product.variants[0].image.url
  const imageAlt = product.title
  // const imageAlt = product.images[0].altText || product.title
  const productTitle = product.title
  const productDescription = product.description
  const productPrice = product.variants[0].price.amount
  const productPriceCurrency = product.variants[0].price.currencyCode

  // const router = useRouter()

  return (
    <div className="w-full sm:w-[48%] md:w-[30%] bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-square">
        <Image
          src={imageSrc}
          alt={imageAlt}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <Link href={`/product/${product.handle}`} className="cursor-pointer">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 hover:text-primary transition-colors duration-300">
            {productTitle}
          </h2>
        </Link>
        <p className="text-sm text-gray-600 line-clamp-2">
          {productDescription}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-bold text-primary">
            {productPriceCurrency} {productPrice}
          </p>
          <div className="flex gap-2">
            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/checkout/' + product.handle)}
            >
              Buy now
            </Button> */}
            {/* TODO: Selected Variant ID */}
            <AddToCartButton variantId={product.variants[0].id} />
          </div>
        </div>
      </div>
    </div>
  )
}
