import { migrateProducts } from '@/services/migration/migration'
import { fetchWooProducts } from '@/services/wordpress/woocommerce'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { products, totalPages } = await fetchWooProducts()
    return NextResponse.json({
      count: products.length,
      totalPages,
      products,
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      {
        error: 'An error occurred while fetching products.',
      },
      { status: 500 },
    )
  }
}

export async function POST() {
  try {
    const results = await migrateProducts()
    const successCount = results.filter((r: any) => r.success).length

    return NextResponse.json({
      message: `Migration complete. ${successCount} out of ${results.length} products migrated successfully.`,
      results,
    })
  } catch (error) {
    console.error('Error migrating products:', error)
    return NextResponse.json(
      {
        error: 'An error occurred while migrating products.',
      },
      { status: 500 },
    )
  }
}
