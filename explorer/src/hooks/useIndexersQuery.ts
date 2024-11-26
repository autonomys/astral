import {
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  useQuery,
} from '@apollo/client'
import { useEffect } from 'react'
import { useErrorHandler } from 'react-error-boundary'

interface UseCustomQueryOptions<TData, TVariables extends OperationVariables>
  extends QueryHookOptions<TData, TVariables> {
  pollInterval?: number
}

export const useIndexersQuery = <TData, TVariables extends OperationVariables>(
  query: DocumentNode,
  options: UseCustomQueryOptions<TData, TVariables>,
  inView: boolean,
  inFocus: boolean,
): QueryResult<TData, TVariables> => {
  const queryResult = useQuery<TData, TVariables>(query, { ...options, skip: !inFocus })

  const { stopPolling, error } = queryResult

  useErrorHandler(error)

  useEffect(() => {
    if (!inView) stopPolling()
  }, [inView, stopPolling])

  return queryResult
}
