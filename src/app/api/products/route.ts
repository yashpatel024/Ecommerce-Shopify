import { getProducts, getProductsByHandles } from '@/services/shopify/products'
import { NextRequest, NextResponse } from 'next/server'

const ITEMS_PER_PAGE = 10

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const handles = searchParams.get('handles')?.split(',') || []
  const page = parseInt(searchParams.get('page') || '1', 10)

  // filter parameters
  const category = searchParams.get('category')?.split(',') || []
  const priceRange = searchParams.get('price')?.split(',') || []

  try {
    let filteredProducts = null

    if (handles.length > 0) {
      filteredProducts = await getProductsByHandles(handles)
    } else {
      // Get all products and apply filters
      const allProducts = await getProducts()

      filteredProducts = allProducts.filter((product) => {
        const matchesCategory =
          category.length === 0 || category.includes(product.productType)

        const matchesPrice =
          priceRange.length === 0 ||
          priceRange.some((range) => {
            const price = product.variants[0].price.amount
            switch (range) {
              case '$0-$50':
                return price <= 50
              case '$50-$100':
                return price > 50 && price <= 100
              case '$100-$200':
                return price > 100 && price <= 200
              case '$200+':
                return price > 200
              default:
                return false
            }
          })

        return matchesCategory && matchesPrice
      })
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
        totalProducts: filteredProducts.length,
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
