import { FC } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { useErrorHandler } from 'react-error-boundary'

// common
import { Spinner } from 'common/components'
import useMediaQuery from 'common/hooks/useMediaQuery'

// layout
import { NotFound } from 'layout/components'

// extrinsic
import { ExtrinsicDetailsCard, ExtrinsicDetailsTab } from 'Extrinsic/components'
import { QUERY_EXTRINSIC_BY_ID } from 'Extrinsic/query'

const Extrinsic: FC = () => {
  const { extrinsicId } = useParams()
  const { data, error, loading } = useQuery(QUERY_EXTRINSIC_BY_ID, {
    variables: {
      extrinsicId: extrinsicId,
    },
  })
  const isDesktop = useMediaQuery('(min-width: 1440px)')
  const isLargeDesktop = useMediaQuery('(min-width: 1440px)')

  useErrorHandler(error)

  if (loading) {
    return <Spinner />
  }

  if (!data.extrinsicById) {
    return <NotFound />
  }

  const extrinsic = data.extrinsicById

  return (
    <div className='w-full'>
      <ExtrinsicDetailsCard extrinsic={extrinsic} isDesktop={isLargeDesktop} />
      <ExtrinsicDetailsTab events={extrinsic.events} isDesktop={isDesktop} />
    </div>
  )
}

export default Extrinsic
