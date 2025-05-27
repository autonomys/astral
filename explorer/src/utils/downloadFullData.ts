import type { ApolloClient, DocumentNode } from '@apollo/client'
import { MAX_DOWNLOADER_BATCH_SIZE } from 'constants/general'

export const downloadFullData = async (
  apolloClient: ApolloClient<object>,
  query: DocumentNode,
  path: string,
  variables?: object,
  delimiterKey: [string, string] = ['limit', 'offset'],
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
      variables: variables ? { ...variables, ..._variables } : _variables,
    })
    if (data[path + '_aggregate']) {
      const totalCount = data[path + '_aggregate'].aggregate.count
      const newEntries = data[path]
      entries.push(...newEntries)

      hasNextPage = entries.length < totalCount
    }
  }

  return entries
}

export const exportFullData = async (
  apolloClient: ApolloClient<object>,
  query: DocumentNode,
  path: string,
  totalCount: number,
  variables?: object,
) => {
  const entries: unknown[] = []
  const offset = 0
  variables = { ...variables, offset: 0, limit: MAX_DOWNLOADER_BATCH_SIZE }

  let hasNextPage = true
  while (hasNextPage) {
    const { data } = await apolloClient.query({
      query,
      variables,
    })
    const newEntries = data[path]
    entries.push(...newEntries)

    hasNextPage = entries.length < totalCount
    variables = { ...variables, offset: offset + entries.length }

    console.log(entries.length, totalCount, entries)
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
