import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { type ShopifyProduct } from '@/types/shopify.types'

type ProductCarouselProps = {
  products: ShopifyProduct[]
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  console.log('products', products)
  return (
    <Carousel plugins={[Autoplay({ delay: 2000 })]}>
      <CarouselContent>
        {products.length > 0 &&
          products.map((product) => (
            <CarouselItem key={product.id}>
              <div>
                <Image
                  src={product.images[0].src}
                  alt={product.title}
                  width={400}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <button>View Product</button>
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  )
}
