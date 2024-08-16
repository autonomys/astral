import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import {
  DomainsStatusQuery,
  DomainsStatusQueryVariables,
  Order_By as OrderBy,
} from 'gql/types/staking'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { FC, useMemo } from 'react'
import { capitalizeFirstLetter } from 'utils/string'
import { QUERY_DOMAIN_STATUS } from './staking.query'

export const DomainBlockTimeProgress: FC = () => {
  const { data, loading, error } = useSquidQuery<DomainsStatusQuery, DomainsStatusQueryVariables>(
    QUERY_DOMAIN_STATUS,
    {
      variables: {
        limit: 10,
        orderBy: [{ id: OrderBy.Asc }],
        where: {},
      },
      pollInterval: 2000,
      context: { clientName: 'staking' },
    },
  )

  const domainData = useMemo(() => {
    if (loading || error || !data) return []

    return data.domain.map((domain) => {
      return {
        domain: domain.name,
        stats: [
          { title: 'Last 1 Hour', intervalSeconds: 2 },
          { title: 'Last 1 Day', intervalSeconds: 2 },
          { title: 'Last 7 Days', intervalSeconds: 2 },
        ],
      }
    })
  }, [data, loading, error])

  const noData = useMemo(() => {
    if (loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  return (
    <div className='flex w-full flex-col justify-center gap-4 px-4 sm:flex-row sm:gap-6 sm:px-6'>
      {domainData.length > 0
        ? domainData.map(({ domain, stats }, domainIndex) => (
            <div
              key={domainIndex}
              className='w-full rounded-[20px] bg-grayLight p-5 shadow dark:border-none dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset sm:w-1/2'
            >
              <h2 className='mb-4 text-lg font-bold text-grayDark dark:text-white sm:text-xl'>
                {capitalizeFirstLetter(domain)}
              </h2>
              {stats.map(({ title, intervalSeconds }, statIndex) => (
                <div key={statIndex} className='mb-3 sm:mb-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-base font-semibold text-grayDark dark:text-white sm:text-lg'>
                      {title}
                    </span>
                    <span className='text-sm text-grayDark dark:text-white'>
                      {intervalSeconds ? intervalSeconds.toFixed(2) + 's per block' : 'N/A'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))
        : noData}
    </div>
  )
}
