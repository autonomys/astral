'use client'

import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import { DomainByIdDocument, DomainByIdQuery, DomainByIdQueryVariables } from 'gql/graphql'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams, useRouter } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { OperatorsList } from '../Staking/OperatorsList'
import { DomainDetailsCard } from './DomainDetailsCard'

export const Domain: FC = () => {
  const { ref, inView } = useInView()
  const { domainId } = useParams<{ domainId?: string }>()
  const { push } = useRouter()
  const inFocus = useWindowFocus()
  const variables = useMemo(() => ({ domainId: domainId ?? '' }), [domainId])
  const { setIsVisible } = useIndexersQuery<DomainByIdQuery, DomainByIdQueryVariables>(
    DomainByIdDocument,
    {
      variables,
      skip: !inFocus,
    },
    Routes.domains,
    'domain',
  )

  const domain = useQueryStates((state) => state.domains.domain)
  const domainDetails = useMemo(
    () => hasValue(domain) && domain.value.staking_domains_by_pk,
    [domain],
  )

  const noData = useMemo(() => {
    if (isLoading(domain)) return <Spinner isSmall />
    if (!hasValue(domain)) return <NotFound />
    return null
  }, [domain])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

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
