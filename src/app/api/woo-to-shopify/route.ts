import { migrateProducts } from '@/services/migration'
import { fetchWooProducts } from '@/services/woocommerce'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { products, totalPages } = await fetchWooProducts()
    return NextResponse.json({ count: products.length, totalPages, products })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({
      error: 'An error occurred while fetching products.',
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const results = await migrateProducts()
    const successCount = results.filter((r: any) => r.success).length

    return NextResponse.json({
      message: `Migration complete. ${successCount} out of ${results.length} products migrated successfully.`,
      results,
    })
  } catch (error) {
    console.error('Error migrating products:', error)
    return NextResponse.json({
      error: 'An error occurred while migrating products.',
    })
  }
}
