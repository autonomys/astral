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
  while (hasNextPage) {
    const _variables = {
      first: MAX_DOWNLOADER_BATCH_SIZE,
      after: entries.length ? entries.length.toString() : undefined,
    }
    const { data } = await apolloClient.query({
      query,
      variables: variables ? { ..._variables, ...variables } : _variables,
    })
    console.log('data', data)

    const newEntries = extractNestedData(data, path + '.edges')
    console.log('linesCount', newEntries.length)

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
