'use client'

import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import type { DomainByIdQuery, DomainByIdQueryVariables } from 'gql/graphql'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams, useRouter } from 'next/navigation'
import { FC, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { OperatorsList } from '../Staking/OperatorsList'
import { DomainDetailsCard } from './DomainDetailsCard'
import { QUERY_DOMAIN_BY_ID } from './query'

export const Domain: FC = () => {
  const { ref, inView } = useInView()
  const { domainId } = useParams<{ domainId?: string }>()
  const { push } = useRouter()
  const inFocus = useWindowFocus()

  // eslint
  const variables = useMemo(() => ({ domainId: domainId ?? '' }), [domainId])
  const { data, loading } = useIndexersQuery<DomainByIdQuery, DomainByIdQueryVariables>(
    QUERY_DOMAIN_BY_ID,
    {
      variables,
    },
    inView,
    inFocus,
  )

  const domainDetails = useMemo(() => data && data.staking_domains_by_pk, [data])

  const noData = useMemo(() => {
    if (loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  return (
    <div className='flex w-full flex-col space-y-4' ref={ref}>
      {domainDetails ? (
        <>
          <DomainDetailsCard domain={domainDetails} />
          <div className='mt-5 flex w-full flex-col align-middle'>
            <div className='mb-5 flex justify-between'>
              <button
                className='rounded-full bg-grayDarker p-4 px-4 py-2 text-white dark:bg-primaryAccent'
                onClick={() => push((parseInt(domainDetails.id) - 1).toString())}
                disabled={parseInt(domainDetails.id) === 0}
              >
                Prev Domain
              </button>
              <button
                className='rounded-full bg-grayDarker p-4 px-4 py-2  text-white dark:bg-primaryAccent'
                onClick={() => push((parseInt(domainDetails.id) + 1).toString())}
              >
                Next Domain
              </button>
            </div>
            <OperatorsList domainId={domainDetails.id} />
          </div>
        </>
      ) : (
        noData
      )}
    </div>
  )
}
