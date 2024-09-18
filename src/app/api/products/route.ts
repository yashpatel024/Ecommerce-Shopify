import { getProducts } from '@/services/shopify/products'
import { ShopifyProduct } from '@/types/shopify.types'

export async function GET(request: Request) {
  try {
    console.log('Fetching products')
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
