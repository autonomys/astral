'use client'

import { useEvmExplorerBanner } from 'components/common/EvmExplorerBanner'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import {
  Extrinsic as ExtrinsicResult,
  ExtrinsicsByIdQuery,
  ExtrinsicsByIdQueryVariables,
} from 'gql/graphql'
import useChains from 'hooks/useChains'
import useMediaQuery from 'hooks/useMediaQuery'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { ExtrinsicIdParam } from 'types/app'
import { ExtrinsicDetailsCard } from './ExtrinsicDetailsCard'
import { ExtrinsicDetailsTab } from './ExtrinsicDetailsTab'
import { QUERY_EXTRINSIC_BY_ID } from './query'

export const Extrinsic: FC = () => {
  const { ref, inView } = useInView()
  const { extrinsicId } = useParams<ExtrinsicIdParam>()
  const inFocus = useWindowFocus()
  const { isEvm } = useChains()
  const isDesktop = useMediaQuery('(min-width: 1440px)')
  const isLargeDesktop = useMediaQuery('(min-width: 1440px)')

  const { loading, setIsVisible } = useSquidQuery<
    ExtrinsicsByIdQuery,
    ExtrinsicsByIdQueryVariables
  >(
    QUERY_EXTRINSIC_BY_ID,
    {
      variables: { extrinsicId: extrinsicId ?? '' },
      skip: !inFocus,
      context: { clientName: isEvm ? 'nova' : 'consensus' },
    },
    isEvm ? Routes.nova : Routes.consensus,
    'extrinsic',
  )

  const {
    consensus: { extrinsic: consensusEntry },
    nova: { extrinsic: evmEntry },
  } = useQueryStates()

  const dataLoading = useMemo(() => {
    if (isEvm) return isLoading(evmEntry)
    return isLoading(consensusEntry)
  }, [evmEntry, consensusEntry, isEvm])

  const data = useMemo(() => {
    if (isEvm && hasValue(evmEntry)) return evmEntry.value
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry, evmEntry, isEvm])

  const extrinsic = useMemo(() => data && (data.extrinsicById as ExtrinsicResult), [data])
  const novaExplorerBanner = useEvmExplorerBanner(extrinsic ? 'tx/' + extrinsic.hash : 'tx/')

  const noData = useMemo(() => {
    if (loading || dataLoading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, dataLoading, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='w-full'>
      {novaExplorerBanner}
      <div ref={ref}>
        {!loading && extrinsic ? (
          <>
            <ExtrinsicDetailsCard extrinsic={extrinsic} isDesktop={isLargeDesktop} />
            <ExtrinsicDetailsTab events={extrinsic.events} isDesktop={isDesktop} />
          </>
        ) : (
          noData
        )}
      </div>
    </div>
  )
}
