'use client'

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/shadcn/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { type ShopifyProduct } from '@/types/shopify.types'

type ProductCarouselProps = {
  products: ShopifyProduct[]
  className?: string
}

export default function ProductCarousel({
  products,
  className,
}: ProductCarouselProps) {
  return (
    <Carousel
      plugins={[Autoplay({ delay: 4000 })]}
      opts={{ loop: true }}
      className={className}
    >
      <CarouselContent>
        {products.length > 0 &&
          products.map((product, index) => (
            <CarouselItem
              key={product.id}
              className="flex flex-row justify-normal items-center relative w-full h-full gap-4"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={{ duration: 0.5 }}
                className="flex flex-row justify-normal items-center relative w-full h-full gap-4"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col justify-center items-end relative w-1/2 h-full object-fill"
                >
                  <Image
                    src={product.images[0].src}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="w-full h-full"
                  />
                </motion.div>
                <div className="flex flex-col justify-center items-start relative w-1/2 h-full uppercase md:px-4">
                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: -20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-sm md:text-lg font-normal"
                  >
                    Welcome to our
                  </motion.p>
                  <motion.h3
                    variants={{
                      hidden: { opacity: 0, y: -20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-lg md:text-3xl font-semibold"
                  >
                    Furniture
                  </motion.h3>
                  {index == 1 ? (
                    <motion.p
                      variants={{
                        hidden: { opacity: 0, y: -20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="text-[0.35rem] md:text-xs text-gray-600 mt-1"
                    >
                      {product.description}
                    </motion.p>
                  ) : (
                    <motion.p
                      variants={{
                        hidden: { opacity: 0, y: -20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="text-xs md:text-base text-gray-600 mt-1"
                    >
                      Gallery 2024
                    </motion.p>
                  )}
                  <motion.button
                    variants={{
                      hidden: { opacity: 0, y: -20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="text-xs md:text-base mt-2 md:mt-6 border-[1px] border-gray-400 px-4 py-2"
                  >
                    View Product
                  </motion.button>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  )
}
