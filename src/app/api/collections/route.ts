import {
  getCollections,
  getCollectionWithProducts,
} from '@/services/shopify/collections'

const ITEMS_PER_PAGE = 10

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const collectionId = searchParams.get('collectionId')

  try {
    if (!collectionId) {
      // Fetch all collections with their products
      const collections = await getCollections()
      const totalPages = Math.ceil(collections.length / ITEMS_PER_PAGE)
      const paginatedCollections = collections.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE,
      )

      return Response.json(
        {
          collections: paginatedCollections,
          totalPages,
          currentPage: page,
          totalCollections: collections.length,
        },
        {
          status: 200,
          headers: {
            'Cache-Control':
              'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        },
      )
    } else {
      // Fetch single collection with products
      const collection = await getCollectionWithProducts(collectionId)

      return Response.json(
        {
          collection: {
            ...collection,
          },
        },
        { status: 200 },
      )
    }
  } catch (error) {
    console.error('Error fetching collections:', error)
    return Response.json(
      { error: 'Failed to fetch collections' },
      { status: 500 },
    )
  }
}
