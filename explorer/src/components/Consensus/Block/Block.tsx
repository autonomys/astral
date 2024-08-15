'use client'

import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import {
  BlockByIdDomainQuery,
  BlockByIdDomainQueryVariables,
  BlockByIdQuery,
  BlockByIdQueryVariables,
  Block as BlockResult,
} from 'gql/graphql'
import useMediaQuery from 'hooks/useMediaQuery'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { BlockIdParam } from 'types/app'
import { BlockDetailsCard } from './BlockDetailsCard'
import { BlockDetailsTabs } from './BlockDetailsTabs'
import { QUERY_BLOCK_BY_ID } from './query'

export const Block: FC = () => {
  const { ref, inView } = useInView()
  const { blockId } = useParams<BlockIdParam>()
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const inFocus = useWindowFocus()

  const { loading, setIsVisible } = useSquidQuery<
    BlockByIdDomainQuery | BlockByIdQuery,
    BlockByIdDomainQueryVariables | BlockByIdQueryVariables
  >(
    QUERY_BLOCK_BY_ID,
    {
      variables: { blockId: Number(blockId) },
      skip: !inFocus,
    },
    Routes.consensus,
    'block',
  )

  const {
    consensus: { block: consensusEntry },
  } = useQueryStates()

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const block = useMemo(() => data && (data.blocks[0] as BlockResult), [data])

  const noData = useMemo(() => {
    if (loading || isLoading(consensusEntry)) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [consensusEntry, data, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='w-full'>
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
