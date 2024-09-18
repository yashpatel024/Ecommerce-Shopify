/**
 * TODO: Create a Form Payment FOrm, on submit, call this API with Strip as well as Shopify
 * @param request
 * @param response
 * @returns
 */

import { createOrder } from '@/services/shopify/orders'

export default async function (request: Request, response: Response) {
  if (request.method != 'POST') {
    return Response.json(
      { error: 'Method not allowed' },
      { status: 405, headers: { Allow: 'POST' } },
    )
  }

  const { body } = await request.json()

  if (!body.oredrData) {
    return Response.json({ error: 'Order ID is required' }, { status: 400 })
  }

  try {
    const order = await createOrder(body.oredrData)
    return Response.json(order)
  } catch (error) {
    console.error('Error fetching order:', error)
    return Response.json(
      {
        error: 'An error occurred while fetching order.',
      },
      { status: 500 },
    )
  }
}
