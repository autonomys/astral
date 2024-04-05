'use client'

import { useQuery } from '@apollo/client'
import { useParams } from 'next/navigation'
import { FC } from 'react'
import { useErrorHandler } from 'react-error-boundary'

// common
import { Spinner } from 'components/common/Spinner'
import useMediaQuery from 'hooks/useMediaQuery'

// layout
import { NotFound } from 'components/layout/NotFound'

// extrinsic
import { ExtrinsicDetailsCard } from './ExtrinsicDetailsCard'
import { ExtrinsicDetailsTab } from './ExtrinsicDetailsTab'
import { QUERY_EXTRINSIC_BY_ID } from './query'

export const Extrinsic: FC = () => {
  const { extrinsicId } = useParams()
  const { data, error, loading } = useQuery(QUERY_EXTRINSIC_BY_ID, { variables: { extrinsicId } })
  const isDesktop = useMediaQuery('(min-width: 1440px)')
  const isLargeDesktop = useMediaQuery('(min-width: 1440px)')

  useErrorHandler(error)

  const extrinsic = data.extrinsicById

  if (loading) return <Spinner />
  if (!data.extrinsicById) return <NotFound />

  return (
    <div className='w-full'>
      <ExtrinsicDetailsCard extrinsic={extrinsic} isDesktop={isLargeDesktop} />
      <ExtrinsicDetailsTab events={extrinsic.events} isDesktop={isDesktop} />
    </div>
  )
}
