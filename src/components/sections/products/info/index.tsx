'use client'

import { useState } from 'react'
import { ShopifyProduct } from '@/types/shopify.types'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import AddToCartButton from '@/components/sections/cart/addToCart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ProductInfoProps {
  product: ShopifyProduct
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        {product.title}
      </h1>

      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight text-gray-900">
          ${selectedVariant.price.amount}
        </p>
      </div>

      {/* Variants Selection */}
      {product.variants.length > 1 && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Variants</h3>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {product.variants.map((variant) => (
              <Button
                key={variant.id}
                variant={
                  selectedVariant.id === variant.id ? 'default' : 'outline'
                }
                onClick={() => setSelectedVariant(variant)}
              >
                {variant.title}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <AddToCartButton variantId={selectedVariant.id} />
        <Button variant="outline" size="icon">
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-8">
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4 prose">
            <div
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </TabsContent>
          <TabsContent value="details" className="mt-4">
            Details
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            Reviews
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
