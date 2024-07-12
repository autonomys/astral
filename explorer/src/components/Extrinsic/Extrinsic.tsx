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
import useDomains from 'hooks/useDomains'
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
  const { selectedChain } = useDomains()
  const isDesktop = useMediaQuery('(min-width: 1440px)')
  const isLargeDesktop = useMediaQuery('(min-width: 1440px)')

  const { setIsVisible } = useSquidQuery<ExtrinsicsByIdQuery, ExtrinsicsByIdQueryVariables>(
    QUERY_EXTRINSIC_BY_ID,
    {
      variables: { extrinsicId: extrinsicId ?? '' },
      skip: !inFocus,
    },
    selectedChain?.isDomain ? Routes.nova : Routes.consensus,
    'extrinsic',
  )

  const {
    consensus: { extrinsic: consensusEntry },
    nova: { extrinsic: evmEntry },
  } = useQueryStates()

  const loading = useMemo(() => {
    if (selectedChain?.isDomain) return isLoading(evmEntry)
    return isLoading(consensusEntry)
  }, [evmEntry, consensusEntry, selectedChain])

  const data = useMemo(() => {
    if (selectedChain?.isDomain && hasValue(evmEntry)) return evmEntry.value
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry, evmEntry, selectedChain])

  const extrinsic = useMemo(() => data && (data.extrinsicById as ExtrinsicResult), [data])
  const novaExplorerBanner = useEvmExplorerBanner(extrinsic ? 'tx/' + extrinsic.hash : 'tx/')

  const noData = useMemo(() => {
    if (loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='w-full'>
      {novaExplorerBanner}
      <div ref={ref}>
        {extrinsic ? (
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
