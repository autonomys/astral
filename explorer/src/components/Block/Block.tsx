'use client'

import { useQuery } from '@apollo/client'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import useDomains from 'hooks/useDomains'
import useMediaQuery from 'hooks/useMediaQuery'
import { useParams } from 'next/navigation'
import { FC } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import type { BlockIdParam } from 'types/app'
import { BlockDetailsCard } from './BlockDetailsCard'
import { BlockDetailsTabs } from './BlockDetailsTabs'
import { QUERY_BLOCK_BY_ID, QUERY_BLOCK_BY_ID_DOMAIN } from './query'

export const Block: FC = () => {
  const { blockId } = useParams<BlockIdParam>()

  const { selectedChain } = useDomains()

  const BlockIdQuery = selectedChain.isDomain ? QUERY_BLOCK_BY_ID_DOMAIN : QUERY_BLOCK_BY_ID

  const { data, error, loading } = useQuery(BlockIdQuery, {
    variables: { blockId: Number(blockId) },
  })

  const isDesktop = useMediaQuery('(min-width: 640px)')

  useErrorHandler(error)

  if (loading) {
    return <Spinner />
  }

  if (!data.blocks.length) {
    return <NotFound />
  }

  const [block] = data.blocks

  return (
    <div className='w-full'>
      <BlockDetailsCard block={block} isDesktop={isDesktop} />
      <BlockDetailsTabs
        logs={block.logs}
        extrinsicsCount={block.extrinsicsCount}
        eventsCount={block.eventsCount}
        isDesktop={isDesktop}
      />
    </div>
  )
}
