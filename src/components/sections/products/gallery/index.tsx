'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ShopifyImage, ShopifyProduct } from '@/types/shopify.types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

interface ProductGalleryProps {
  images: ShopifyProduct['images']
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={images[selectedImage].src}
          alt={images[selectedImage].altText || 'Product image'}
          fill
          className="object-cover object-center"
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>

      {/* Thumbnail Gallery */}
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {images.map((image, idx) => (
            <CarouselItem key={idx} className="pl-2 basis-1/4">
              <button
                onClick={() => setSelectedImage(idx)}
                className={cn(
                  'relative aspect-square w-full overflow-hidden rounded-lg',
                  selectedImage === idx
                    ? 'ring-2 ring-black'
                    : 'ring-1 ring-gray-200',
                )}
              >
                <Image
                  src={image.src}
                  alt={image.altText || 'Product thumbnail'}
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 15vw, 25vw"
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
