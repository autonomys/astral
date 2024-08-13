'use client'

import { useEvmExplorerBanner } from 'components/common/EvmExplorerBanner'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import {
  BlockByIdDomainQueryVariables,
  BlockByIdQueryVariables,
  Block as BlockResult,
} from 'gql/graphql'
import useChains from 'hooks/useChains'
import useMediaQuery from 'hooks/useMediaQuery'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { BlockIdParam } from 'types/app'
import { BlockByIdDomainQuery, BlockByIdQuery } from '../gql/graphql'
import { BlockDetailsCard } from './BlockDetailsCard'
import { BlockDetailsTabs } from './BlockDetailsTabs'
import { QUERY_BLOCK_BY_ID, QUERY_BLOCK_BY_ID_DOMAIN } from './query'

export const Block: FC = () => {
  const { ref, inView } = useInView()
  const { blockId } = useParams<BlockIdParam>()
  const { isEvm } = useChains()
  const novaExplorerBanner = useEvmExplorerBanner('block/' + blockId)
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const inFocus = useWindowFocus()

  const query = useMemo(() => (isEvm ? QUERY_BLOCK_BY_ID_DOMAIN : QUERY_BLOCK_BY_ID), [isEvm])
  const { loading, setIsVisible } = useSquidQuery<
    BlockByIdDomainQuery | BlockByIdQuery,
    BlockByIdDomainQueryVariables | BlockByIdQueryVariables
  >(
    query,
    {
      variables: { blockId: Number(blockId) },
      skip: !inFocus,
      context: { clientName: isEvm ? 'nova' : 'consensus' },
    },
    isEvm ? Routes.nova : Routes.consensus,
    'block',
  )

  const {
    consensus: { block: consensusEntry },
    nova: { block: evmEntry },
  } = useQueryStates()

  const dataLoading = useMemo(() => {
    if (isEvm) return isLoading(evmEntry)
    return isLoading(consensusEntry)
  }, [evmEntry, consensusEntry, isEvm])

  const data = useMemo(() => {
    if (isEvm && hasValue(evmEntry)) return evmEntry.value
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry, evmEntry, isEvm])

  const block = useMemo(() => data && (data.blocks[0] as BlockResult), [data])

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
        {!loading && block ? (
          <>
            <BlockDetailsCard block={block} isDesktop={isDesktop} />
            <BlockDetailsTabs
              logs={block.logs}
              extrinsicsCount={block.extrinsicsCount}
              eventsCount={block.eventsCount}
              isDesktop={isDesktop}
            />
          </>
        ) : (
          noData
        )}
      </div>
    </div>
  )
}
