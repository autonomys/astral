'use client'

import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import { BlockByIdDocument, BlockByIdQuery, BlockByIdQueryVariables } from 'gql/graphql'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import useMediaQuery from 'hooks/useMediaQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { BlockIdParam } from 'types/app'
import { BlockDetailsCard } from './BlockDetailsCard'
import { BlockDetailsTabs } from './BlockDetailsTabs'

export const Block: FC = () => {
  const { ref, inView } = useInView()
  const { blockId } = useParams<BlockIdParam>()
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const inFocus = useWindowFocus()

  const { loading, setIsVisible } = useIndexersQuery<BlockByIdQuery, BlockByIdQueryVariables>(
    BlockByIdDocument,
    {
      variables: { blockId: blockId ?? '0', blockHash: blockId ?? '' },
      skip: !inFocus,
    },
    Routes.consensus,
    'block',
  )

  const consensusEntry = useQueryStates((state) => state.consensus.block)

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const block = useMemo(() => data && data.consensus_blocks[0], [data])

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
              extrinsicsCount={block.extrinsics_count}
              eventsCount={block.events_count}
              logsCount={block.logs_count}
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
