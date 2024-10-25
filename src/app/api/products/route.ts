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
  const brand = searchParams.get('brand')?.split(',') || []
  const size = searchParams.get('size')?.split(',') || []

  console.log('category', category)
  console.log('priceRange', priceRange)
  console.log('brand', brand)
  console.log('size', size)

  try {
    let filteredProducts = null

    if (handles.length > 0) {
      filteredProducts = await getProductsByHandles(handles)
    } else {
      const allProducts = await getProducts()
      filteredProducts = allProducts

      // Apply filters
      if (filteredProducts) {
        // Filter by category
        if (category.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            category.some(
              (cat) => product.productType.toLowerCase() === cat.toLowerCase(),
            ),
          )
        }

        // Filter by price range
        if (priceRange.length > 0) {
          filteredProducts = filteredProducts.filter((product) => {
            const price = product.variants[0].price.amount
            return priceRange.some((range) => {
              const [min, max] = range.split('-').map((p) => p.replace('$', ''))
              if (max === '+') {
                return price >= parseFloat(min)
              }
              return price >= parseFloat(min) && price <= parseFloat(max)
            })
          })
        }

        // Filter by brand
        if (brand.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            brand.some((b) => product.vendor.toLowerCase() === b.toLowerCase()),
          )
        }

        // Filter by size
        if (size.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            product.variants.some((variant) => size.includes(variant.title)),
          )
        }
      }
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
