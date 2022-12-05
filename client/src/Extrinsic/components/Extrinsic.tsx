import { FC } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

// common
import Spinner from 'common/components/Spinner'

// extrinsic
import ExtrinsicDetailsCard from 'Extrinsic/components/ExtrinsicDetailsCard'
import ExtrinsicDetailsTab from 'Extrinsic/components/ExtrinsicDetailsTab'
import { QUERY_EXTRINSIC_BY_ID } from 'Extrinsic/query'
import useMediaQuery from 'common/hooks/useMediaQuery'

const Extrinsic: FC = () => {
  const { extrinsicId } = useParams()
  const { data, error, loading } = useQuery(QUERY_EXTRINSIC_BY_ID, {
    variables: {
      extrinsicId: extrinsicId,
    },
  })
  const isDesktop = useMediaQuery('(min-width: 1440px)')
  const isLargeDesktop = useMediaQuery('(min-width: 1440px)')

  if (loading) {
    return <Spinner />
  }

  if (error || !data) {
    return <div>ERROR</div>
  }

  const extrinsic = data.extrinsicById

  return (
    <div className='w-full'>
      <ExtrinsicDetailsCard extrinsic={extrinsic} isDesktop={isLargeDesktop} />
      <ExtrinsicDetailsTab events={extrinsic.block.events} isDesktop={isDesktop} />
    </div>
  )
}

export default Extrinsic
