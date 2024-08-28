import { indexers } from 'constants/indexers'
import { cookies } from 'next/headers'

export const queryGraphqlServer = async (query: string, variables: object) => {
  try {
    // Get the selected chain from the cookies
    const { get } = cookies()
    console.log('all-cookies', cookies())
    const callbackUrlCookie = get('next-auth.callback-url')
    if (!callbackUrlCookie) throw new Error('No callback URL cookie')

    // Extract the network ID from the callback URL
    const callbackUrl = decodeURIComponent(callbackUrlCookie.value)
    const url = new URL(callbackUrl)
    const networkId = url.pathname.split('/')[1] // The network ID is the second part of the path
    if (!networkId) throw new Error('No network ID found in callback URL')

    // Find the selected chain api
    const api = indexers.find((indexer) => indexer.network === networkId)
    if (!api) throw new Error('No selected chain api')

    // Fetch the data from the api
    const request = await fetch(api.squids.old, {
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
    return data
  } catch (error) {
    console.error('Failed to fetch Astral Subsquid:', error)
    throw new Error('Failed to fetch Astral Subsquid')
  }
}
