import { MAX_DOWNLOADER_BATCH_SIZE } from '@/constants/general'
import type { ApolloClient, DocumentNode } from '@apollo/client'

export const downloadFullData = async (apolloClient: ApolloClient<object>, query: DocumentNode) => {
  const entries: unknown[] = []

  let hasNextPage = true
  while (hasNextPage) {
    const { data } = await apolloClient.query({
      query,
      variables: {
        first: MAX_DOWNLOADER_BATCH_SIZE,
        after: entries.length ? entries.length.toString() : undefined,
      },
    })

    const accounts = extractNestedData(data, 'accountRewardsConnection.edges')

    entries.push(...accounts)

    hasNextPage = entries.length < data.accountRewardsConnection.totalCount
  }

  return entries
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extractNestedData = (data: any, path: any) => {
  const keys = path.split('.')
  let result = data

  for (const key of keys) {
    if (result[key] === undefined) {
      return []
    }
    result = result[key]
  }

  return Array.isArray(result) ? result.map((item) => item.node) : []
}
