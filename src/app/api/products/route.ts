import { getProducts, getProductsByHandles } from '@/services/shopify/products'
import { ShopifyProduct } from '@/types/shopify.types'
import { NextRequest, NextResponse } from 'next/server'

const ITEMS_PER_PAGE = 10

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const ids = searchParams.get('ids')?.split(',') || []
  const handles = searchParams.get('handles')?.split(',') || []
  const page = parseInt(searchParams.get('page') || '1', 10)

  try {
    let filteredProducts = null

    if (handles.length > 0) {
      // Fetch products by handles
      filteredProducts = await getProductsByHandles(handles)
    } else {
      // Fetch all products and filter by ids if provided
      const allProducts = await getProducts()
      filteredProducts =
        ids.length > 0
          ? allProducts.filter((product) => ids.includes(product.id))
          : allProducts
    }

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
    const paginatedProducts = filteredProducts.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE,
    )

    return Response.json(
      {
        products: paginatedProducts,
        totalPages,
        currentPage: page,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error fetching products:', error)
    return Response.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

/**
 * Post request to fetch products by handles
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const handles = body.handles || []

    if (handles.length === 0) {
      return NextResponse.json(
        { error: 'No product handles provided' },
        { status: 400 },
      )
    }

    const products = await getProductsByHandles(handles)

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 },
    )
  }
}
