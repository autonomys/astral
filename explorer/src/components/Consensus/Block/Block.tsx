'use client'

import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { BlockByIdQuery, BlockByIdQueryVariables } from 'gql/graphql'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import useMediaQuery from 'hooks/useMediaQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams } from 'next/navigation'
import { FC, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import type { BlockIdParam } from 'types/app'
import { BlockDetailsCard } from './BlockDetailsCard'
import { BlockDetailsTabs } from './BlockDetailsTabs'
import { QUERY_BLOCK_BY_ID } from './query'

export const Block: FC = () => {
  const { ref, inView } = useInView()
  const { blockId } = useParams<BlockIdParam>()
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const inFocus = useWindowFocus()

  const { data, loading } = useIndexersQuery<BlockByIdQuery, BlockByIdQueryVariables>(
    QUERY_BLOCK_BY_ID,
    {
      variables: { blockId: blockId ?? '0', blockHash: blockId?.toString() ?? '' },
    },
    inView,
    inFocus,
  )

  const block = useMemo(() => data && data.consensus_blocks[0], [data])

  const noData = useMemo(() => {
    if (loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  return (
    <div className='w-full'>
      <div ref={ref}>
        {!loading && block ? (
          <>
            <BlockDetailsCard block={block} isDesktop={isDesktop} />
            <BlockDetailsTabs
              logs={block.logs}
              extrinsicsCount={block.extrinsics_count}
              eventsCount={block.events_count}
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
