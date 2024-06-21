'use client'

import { useQuery } from '@apollo/client'
import { useEvmExplorerBanner } from 'components/common/EvmExplorerBanner'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Block as BlockResult } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import useMediaQuery from 'hooks/useMediaQuery'
import { useParams } from 'next/navigation'
import { FC, useMemo } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import type { BlockIdParam } from 'types/app'
import { BlockByIdDomainQuery, BlockByIdQuery } from '../gql/graphql'
import { BlockDetailsCard } from './BlockDetailsCard'
import { BlockDetailsTabs } from './BlockDetailsTabs'
import { QUERY_BLOCK_BY_ID, QUERY_BLOCK_BY_ID_DOMAIN } from './query'

export const Block: FC = () => {
  const { blockId } = useParams<BlockIdParam>()
  const { selectedChain } = useDomains()
  const novaExplorerBanner = useEvmExplorerBanner('block/' + blockId)
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const query = useMemo(
    () => (selectedChain.isDomain ? QUERY_BLOCK_BY_ID_DOMAIN : QUERY_BLOCK_BY_ID),
    [selectedChain.isDomain],
  )
  const { data, error, loading } = useQuery<BlockByIdDomainQuery | BlockByIdQuery>(query, {
    variables: { blockId: Number(blockId) },
  })

  const block = useMemo(() => data && (data.blocks[0] as BlockResult), [data])

  useErrorHandler(error)

  if (loading) return <Spinner />

  if (!block || !data || !data.blocks.length) return <NotFound />

  return (
    <div className='w-full'>
      {novaExplorerBanner}
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
