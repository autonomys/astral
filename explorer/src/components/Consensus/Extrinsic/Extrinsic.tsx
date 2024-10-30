'use client'

import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import { ExtrinsicsByIdQuery, ExtrinsicsByIdQueryVariables } from 'gql/graphql'
import useMediaQuery from 'hooks/useMediaQuery'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
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

  const { loading, setIsVisible } = useSquidQuery<
    ExtrinsicsByIdQuery,
    ExtrinsicsByIdQueryVariables
  >(
    QUERY_EXTRINSIC_BY_ID,
    {
      variables: { extrinsicId: extrinsicId ?? '' },
      skip: !inFocus,
    },
    Routes.consensus,
    'extrinsic',
  )

  const {
    consensus: { extrinsic: consensusEntry },
  } = useQueryStates()

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
            <ExtrinsicDetailsTab events={extrinsic.events} isDesktop={isDesktop} />
          </>
        ) : (
          noData
        )}
      </div>
    </div>
  )
}
