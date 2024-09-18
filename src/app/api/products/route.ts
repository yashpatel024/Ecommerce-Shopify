import { getProduct, getProducts } from '@/services/shopify/products'
import { ShopifyProduct } from '@/types/shopify.types'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  console.log('HERE', request.nextUrl.searchParams)
  try {
    //Check for the product handle in the query params
    const productHandle = await request.nextUrl.searchParams.get('handle')

    console.log('Fetching product with handle:', productHandle)

    if (productHandle) {
      //If the product handle is present, fetch the prodsuct
      const product: ShopifyProduct | null = await getProduct(productHandle)

      if (!product) {
        return Response.json(
          {
            error: 'Product not found',
          },
          { status: 404 },
        )
      }
      return Response.json(product)
    }

    //If the product handle is not present, fetch all products
    const products: ShopifyProduct[] = await getProducts()
    return Response.json(
      {
        count: products.length,
        products,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error fetching products:', error)
    return Response.json(
      {
        error: 'An error occurred while fetching products.',
      },
      { status: 500 },
    )
  }
}
