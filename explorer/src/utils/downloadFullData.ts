import { MAX_DOWNLOADER_BATCH_SIZE } from '@/constants/general'
import type { ApolloClient, DocumentNode } from '@apollo/client'

export const downloadFullData = async (
  apolloClient: ApolloClient<object>,
  query: DocumentNode,
  path: string,
  variables?: object,
  delimiterKey: [string, string] = ['first', 'after'],
  context: object = {},
) => {
  const entries: unknown[] = []

  let hasNextPage = true
  while (hasNextPage) {
    const _variables = {
      [delimiterKey[0]]: MAX_DOWNLOADER_BATCH_SIZE,
      [delimiterKey[1]]: entries.length ? entries.length.toString() : undefined,
    }
    const { data } = await apolloClient.query({
      query,
      variables: variables ? { ..._variables, ...variables } : _variables,
      context,
    })
    if (data[path].edges && data[path].edges.length > 0) {
      const newEntries = extractNestedData(data, path + '.edges')

      entries.push(...newEntries)

      hasNextPage = entries.length < data[path].totalCount
    } else if (data[path + '_aggregate']) {
      const totalCount = data[path + '_aggregate'].aggregate.count
      const newEntries = data[path]
      entries.push(...newEntries)

      hasNextPage = entries.length < totalCount
    }
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
