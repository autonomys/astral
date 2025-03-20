'use client'

import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import {
  ExtrinsicsByIdDocument,
  ExtrinsicsByIdQuery,
  ExtrinsicsByIdQueryVariables,
} from 'gql/graphql'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import useMediaQuery from 'hooks/useMediaQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { ExtrinsicIdParam } from 'types/app'
import { ExtrinsicDetailsCard } from './ExtrinsicDetailsCard'
import { ExtrinsicDetailsTab } from './ExtrinsicDetailsTab'

export const Extrinsic: FC = () => {
  const { ref, inView } = useInView()
  const { extrinsicId } = useParams<ExtrinsicIdParam>()
  const inFocus = useWindowFocus()
  const isDesktop = useMediaQuery('(min-width: 1440px)')
  const isLargeDesktop = useMediaQuery('(min-width: 1440px)')

  const { loading, setIsVisible } = useIndexersQuery<
    ExtrinsicsByIdQuery,
    ExtrinsicsByIdQueryVariables
  >(
    ExtrinsicsByIdDocument,
    {
      variables: { extrinsicId: extrinsicId ?? '' },
      skip: !inFocus,
    },
    Routes.consensus,
    'extrinsic',
  )

  const consensusEntry = useQueryStates((state) => state.consensus.extrinsic)

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const extrinsic = useMemo(() => data && data.consensus_extrinsics[0], [data])

  const noData = useMemo(() => {
    if (loading || isLoading(consensusEntry)) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, consensusEntry, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='w-full'>
      <div ref={ref}>
        {!loading && extrinsic ? (
          <>
            <ExtrinsicDetailsCard extrinsic={extrinsic} isDesktop={isLargeDesktop} />
            <ExtrinsicDetailsTab
              eventsCount={extrinsic.events_count}
              extrinsicId={extrinsic.id}
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
