import {
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  useQuery,
} from '@apollo/client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Components, ExplorerSection, useQueryStates } from 'states/query'

interface UseCustomQueryOptions<TData, TVariables extends OperationVariables>
  extends QueryHookOptions<TData, TVariables> {
  pollInterval: number
}

export const useSquidQuery = <TData, TVariables extends OperationVariables>(
  query: DocumentNode,
  options: UseCustomQueryOptions<TData, TVariables>,
  section?: ExplorerSection,
  component?: Components,
): QueryResult<TData, TVariables> & {
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
} => {
  const { setIsLoading, setValue, setError } = useQueryStates()

  const [_isVisible, _setIsVisible] = useState<{ [key: string]: boolean }>(
    section && component ? { [`${section}.${component}`]: true } : { '0': true },
  )

  const isVisible = useMemo(() => {
    if (section && component) return _isVisible[`${section}.${component}`] ?? false
    return _isVisible['0'] ?? false
  }, [component, section, _isVisible])

  const setIsVisible = useCallback(
    (isVisible: boolean) => {
      if (section && component) _setIsVisible({ [`${section}.${component}`]: isVisible })
      else _setIsVisible({ '0': isVisible })
    },
    [component, section],
  )

  const queryResult = useQuery<TData, TVariables>(query, {
    ...options,
    skip: section && component ? !_isVisible[`${section}.${component}`] : !_isVisible['0'],
  })

  const { data, stopPolling, error } = queryResult

  useEffect(() => {
    if (section && component) setIsLoading(section, component)
  }, [section, component, setIsLoading])

  useEffect(() => {
    if (!isVisible) stopPolling()
  }, [isVisible, stopPolling])

  useEffect(() => {
    if (data && section && component) setValue(section, component, data)
  }, [section, component, setValue, data])

  useEffect(() => {
    if (error && section && component) setError(section, component)
  }, [error, section, component, setError])

  return { ...queryResult, isVisible, setIsVisible }
}
