import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { type ShopifyProduct } from '@/types/shopify.types'
import { motion } from 'framer-motion'

interface NewProductProps {
  product: ShopifyProduct
  variant: 'one' | 'two'
}

export default function NewProduct({ product, variant }: NewProductProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 p-4 rounded-lg relative lg:h-full lg:w-full"
    >
      {variant === 'one' ? (
        <>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex justify-between items-center mb-2 "
          >
            <span className="bg-primary-500 bg-primary text-wh te px-2 py-1 rounded">
              New
            </span>
            <span className="font-semibold">${'00'}</span>
          </motion.div>
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="flex justify-center mb-2 lg:object-contain"
          >
            <Image
              src={product.images[0].src}
              alt={product.images[0].altText || product.title}
              width={400}
              height={400}
              className="w-full h-auto lg:h-40 lg:object-scale-down"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-sm text-gray-600">{product.tags}</p>
            </div>
            <Button
              variant="outline"
              className="w-1/3 text-xs mt-2 border-[1px] bg-transparent border-gray-400 px-4 py-2 hover:bg-primary text-primary-typography"
            >
              Buy Now
            </Button>
          </motion.div>
        </>
      ) : (
        <>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="text-xl font-bold mb-2 text-center lg:text-right"
          >
            New Product 2021
          </motion.h2>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="flex justify-center lg:justify-start mb-2"
          >
            <Image
              src={product.images[0].src}
              alt={product.images[0].altText || product.title}
              width={400}
              height={400}
              className="w-full h-auto lg:h-40 lg:object-scale-down"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="flex justify-end"
          >
            <Button className="w-1/3 text-xs mt-2 text-white border-[1px] bg-primary border-gray-400 px-4 py-2">
              Buy Now
            </Button>
          </motion.div>
        </>
      )}
    </motion.div>
  )
}
