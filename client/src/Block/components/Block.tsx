import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

// common
import useMediaQuery from 'common/hooks/useMediaQuery'
import { ErrorFallback, Spinner } from 'common/components'

// layout
import { NotFound } from 'layout/components'

// block
import { QUERY_BLOCK_BY_ID } from 'Block/query'
import { BlockDetailsCard, BlockDetailsTabs } from 'Block/components'

const Block: FC = () => {
  const { blockId } = useParams()

  const { data, error, loading } = useQuery(QUERY_BLOCK_BY_ID, {
    variables: { blockId: Number(blockId) },
  })

  const isDesktop = useMediaQuery('(min-width: 640px)')

  if (loading) {
    return <Spinner />
  }

  if (error || !data) {
    return <ErrorFallback error={error} />
  }

  if (!data.blocks.length) {
    return <NotFound />
  }

  const [block] = data.blocks

  return (
    <div className='w-full'>
      <BlockDetailsCard block={block} isDesktop={isDesktop} />
      <BlockDetailsTabs
        events={block.events}
        extrinsics={block.extrinsics}
        logs={block.logs}
        isDesktop={isDesktop}
      />
    </div>
  )
}

export default Block
