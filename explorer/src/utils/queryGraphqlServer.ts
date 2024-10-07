import { defaultIndexer, indexers } from 'constants/indexers'

export const queryGraphqlServer = async (query: string, variables: object) => {
  try {
    // Find the selected chain api
    const api = indexers.find((indexer) => indexer.network === defaultIndexer.network)
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
    return data
  } catch (error) {
    console.error('Failed to fetch Astral Subsquid:', error)
    throw new Error('Failed to fetch Astral Subsquid')
  }
}
