import { client } from '@/lib/config/shopify'
import { Collection } from 'shopify-buy'
import { cache } from 'react'

/**
 * Get all collections - Shopify Buy API
 */
const getCollections = cache(async (): Promise<Collection[]> => {
  try {
    const fetchedCollections: Collection[] = await client.collection.fetchAll()
    return fetchedCollections
  } catch (error) {
    console.error('Error fetching collections:', error)
    return []
  }
})

/**
 * Get a single collection with products - Shopify Buy API
 */
const getCollectionWithProducts = async (
  collectionId: string,
): Promise<Collection> => {
  try {
    const fetchedCollection: Collection =
      await client.collection.fetchWithProducts(collectionId)
    return fetchedCollection
  } catch (error) {
    throw new Error('Failed to fetch collection with products')
  }
}

export { getCollections, getCollectionWithProducts }
