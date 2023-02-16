import { FC } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

// common
import { Spinner, ErrorFallback } from 'common/components'
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

  if (loading) {
    return <Spinner />
  }

  if (error || !data) {
    // TODO: consider adding error monitoring
    console.error(error)
    return <ErrorFallback />
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
