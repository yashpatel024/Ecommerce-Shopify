import { migrateProducts } from '@/services/migration/migration'
import { fetchWooProducts } from '@/services/wordpress/woocommerce'

export async function GET() {
  try {
    const { products, totalPages } = await fetchWooProducts()
    return Response.json(
      { count: products.length, totalPages, products },
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

export async function POST(request: Request) {
  try {
    const results = await migrateProducts()
    const successCount = results.filter((r: any) => r.success).length

    return Response.json(
      {
        message: `Migration complete. ${successCount} out of ${results.length} products migrated successfully.`,
        results,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error migrating products:', error)
    return Response.json(
      {
        error: 'An error occurred while migrating products.',
      },
      { status: 500 },
    )
  }
}
