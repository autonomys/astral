import { indexers } from 'constants/indexers'
import { cookies, headers } from 'next/headers'

export const queryGraphqlServer = async <T>(query: string, variables: object, network?: string) => {
  try {
    // Get the selected chain from the cookies
    const searchParams = cookies()
    const headersList = headers()
    const referer = headersList.get('referer') || ''
    if (!network) network = referer.split('/')[3]
    const cookieNetwork = searchParams.get('selected-network')
    if (!network && cookieNetwork) network = cookieNetwork.value
    if (!network) throw new Error('No selected network')

    // Find the selected chain api
    const api = indexers.find((indexer) => indexer.network === network)
    if (!api) throw new Error('No selected chain api')

    // Fetch the data from the api
    const request = await fetch(api.indexer, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
    if (!request.ok) throw new Error(`API request failed with status ${request.status}`)
    const { data } = await request.json()

    // Return the data
    return data as T
  } catch (error) {
    console.error('Failed to fetch Astral Subsquid:', error)
    throw new Error('Failed to fetch Astral Subsquid')
  }
}
