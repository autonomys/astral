'use client'

import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { ExtrinsicsByIdQuery, ExtrinsicsByIdQueryVariables } from 'gql/graphql'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import useMediaQuery from 'hooks/useMediaQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams } from 'next/navigation'
import { FC, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { ExtrinsicIdParam } from 'types/app'
import { ExtrinsicDetailsCard } from './ExtrinsicDetailsCard'
import { ExtrinsicDetailsTab } from './ExtrinsicDetailsTab'
import { QUERY_EXTRINSIC_BY_ID } from './query'

export const Extrinsic: FC = () => {
  const { ref, inView } = useInView()
  const { extrinsicId } = useParams<ExtrinsicIdParam>()
  const inFocus = useWindowFocus()
  const isDesktop = useMediaQuery('(min-width: 1440px)')
  const isLargeDesktop = useMediaQuery('(min-width: 1440px)')

  const { data, loading } = useIndexersQuery<ExtrinsicsByIdQuery, ExtrinsicsByIdQueryVariables>(
    QUERY_EXTRINSIC_BY_ID,
    {
      variables: { extrinsicId: extrinsicId ?? '' },
    },
    inView,
    inFocus,
  )

  const extrinsic = useMemo(() => data && data.consensus_extrinsics[0], [data])

  const noData = useMemo(() => {
    if (loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  return (
    <div className='w-full'>
      <div ref={ref}>
        {!loading && extrinsic ? (
          <>
            <ExtrinsicDetailsCard extrinsic={extrinsic} isDesktop={isLargeDesktop} />
            <ExtrinsicDetailsTab
              eventsCount={extrinsic.events_aggregate.aggregate?.count ?? 0}
              isDesktop={isDesktop}
            />
          </>
        ) : (
          noData
        )}
      </div>
    </div>
  )
}
