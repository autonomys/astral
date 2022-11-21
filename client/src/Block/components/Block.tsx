import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

// common
import Spinner from 'common/components/Spinner';

// block
import { QUERY_BLOCK_BY_ID } from 'Block/query'
import BlockDetailsCard from './BlockDetailsCard'
import BlockDetailsTabs from './BlockDetailsTabs'

const Block: FC = () => {
  const { blockId } = useParams()

  const { data, error, loading } = useQuery(QUERY_BLOCK_BY_ID, {
    variables: { blockId: Number(blockId) },
  })

  if (loading) {
    return <Spinner />;
  }

  if (error || !data) {
    return <div>ERROR</div>
  }

  const [block] = data.blocks

  return (
    <div className="w-full">
      <BlockDetailsCard block={block} />
      <BlockDetailsTabs events={block.events} extrinsics={block.extrinsics} />
    </div>
  )
}

export default Block
