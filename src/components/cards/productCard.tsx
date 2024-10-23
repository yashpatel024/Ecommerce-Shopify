import Image from 'next/image'
import Link from 'next/link'
import { ShopifyProduct } from '@/types/shopify.types'
import { Button } from '@/components/ui/button'
// import AddToCartButton from '@/components/sections/cart/addToCart'
import { useRouter } from 'next/navigation'

export interface ProductCardProps {
  product: ShopifyProduct
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageSrc = product.images[0].src || product.variants[0].image.url
  const imageAlt = product.title
  const productTitle = product.title
  const productDescription = product.description
  const productPrice = product.variants[0].price.amount
  const productPriceCurrency = product.variants[0].price.currencyCode

  const router = useRouter()

  return (
    <div className="flex flex-col bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-square w-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 640px) 100vw, 
                 (max-width: 1024px) 50vw,
                 (max-width: 1280px) 33vw,
                 25vw"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-grow">
        <Link href={`/product/${product.handle}`} className="cursor-pointer">
          <h2 className="text-lg font-semibold text-gray-800 hover:text-primary transition-colors duration-300 line-clamp-1">
            {productTitle}
          </h2>
        </Link>
        <p className="text-sm text-gray-600 line-clamp-2">
          {productDescription}
        </p>
        <div className="mt-auto pt-4 flex justify-between items-center">
          <p className="text-lg font-bold text-primary">
            {productPriceCurrency} {productPrice}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/product/${product.handle}`)}
            >
              Buy now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
