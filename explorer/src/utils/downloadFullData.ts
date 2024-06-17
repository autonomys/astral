import { MAX_DOWNLOADER_BATCH_SIZE } from '@/constants/general'
import type { ApolloClient, DocumentNode } from '@apollo/client'

export const downloadFullData = async (
  apolloClient: ApolloClient<object>,
  query: DocumentNode,
  path: string,
  variables?: object,
) => {
  const entries: unknown[] = []

  let hasNextPage = true
  const _variables = {
    first: MAX_DOWNLOADER_BATCH_SIZE,
    after: entries.length ? entries.length.toString() : undefined,
  }
  while (hasNextPage) {
    const { data } = await apolloClient.query({
      query,
      variables: variables ? { ...variables, ..._variables } : _variables,
    })

    const newEntries = extractNestedData(data, path + '.edges')

    entries.push(...newEntries)

    hasNextPage = entries.length < data[path].totalCount
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
