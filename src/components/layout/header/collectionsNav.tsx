import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Collection } from 'shopify-buy'
import { getHostUrl } from '@/lib/utils'

export default async function CollectionsNav() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const hostUrl = getHostUrl()

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch(`${hostUrl}/api/collections`)

        if (!response.ok) {
          throw new Error('Failed to fetch collections')
        }

        const data = await response.json()
        setCollections(data.collections)
      } catch (error) {
        console.error('Error fetching collections:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCollections()
  }, [hostUrl])

  if (isLoading) {
    return <div>Loading collections...</div>
  }

  return (
    <div className="space-y-2">
      <h3 className="font-semibold px-4 py-2 text-gray-700">Collections</h3>
      <ul>
        {collections.map((collection) => (
          <li key={collection.id}>
            <Link
              href={`/collections/${collection.handle}`}
              className="block py-2 px-4 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900"
            >
              {collection.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
