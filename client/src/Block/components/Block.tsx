import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { useErrorHandler } from 'react-error-boundary'

// common
import useMediaQuery from 'common/hooks/useMediaQuery'
import { Spinner } from 'common/components'

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

export default Block
