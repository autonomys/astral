'use client'

import { useQuery } from '@apollo/client'
import { useEvmExplorerBanner } from 'components/common/EvmExplorerBanner'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import useMediaQuery from 'hooks/useMediaQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams } from 'next/navigation'
import { FC, useMemo } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { Extrinsic as ExtrinsicResult, ExtrinsicsByIdQuery } from '../gql/graphql'
import { ExtrinsicDetailsCard } from './ExtrinsicDetailsCard'
import { ExtrinsicDetailsTab } from './ExtrinsicDetailsTab'
import { QUERY_EXTRINSIC_BY_ID } from './query'

export const Extrinsic: FC = () => {
  const { extrinsicId } = useParams()
  const inFocus = useWindowFocus()
  const { data, error, loading } = useQuery<ExtrinsicsByIdQuery>(QUERY_EXTRINSIC_BY_ID, {
    variables: { extrinsicId },
    skip: !inFocus,
  })
  const isDesktop = useMediaQuery('(min-width: 1440px)')
  const isLargeDesktop = useMediaQuery('(min-width: 1440px)')
  const extrinsic = useMemo(() => data && (data.extrinsicById as ExtrinsicResult), [data])
  const novaExplorerBanner = useEvmExplorerBanner(extrinsic ? 'tx/' + extrinsic.hash : 'tx/')

  useErrorHandler(error)

  if (loading) return <Spinner />
  if (!extrinsic || !data || !data.extrinsicById) return <NotFound />

  return (
    <div className='w-full'>
      {novaExplorerBanner}
      <ExtrinsicDetailsCard extrinsic={extrinsic} isDesktop={isLargeDesktop} />
      <ExtrinsicDetailsTab events={extrinsic.events} isDesktop={isDesktop} />
    </div>
  )
}
