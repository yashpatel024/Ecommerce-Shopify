import { fetchWooProducts } from '@/services/wordpress/woocommerce'

export default async function GET(request: Request) {
  try {
    const { products, totalPages } = await fetchWooProducts()
    return Response.json({ count: products.length, totalPages, products })
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
