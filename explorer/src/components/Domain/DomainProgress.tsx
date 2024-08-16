import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import {
  DomainsStatusQuery,
  DomainsStatusQueryVariables,
  Order_By as OrderBy,
} from 'gql/types/staking'
import useChains from 'hooks/useChains'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { FC, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { numberWithCommas } from 'utils/number'
import { capitalizeFirstLetter } from 'utils/string'
import { QUERY_DOMAIN_STATUS } from './staking.query'

interface CardData {
  title: string
  href: string
  currentEpoch: number
  lastBlock: number
  progress: number
}

export const DomainProgress: FC = () => {
  const { ref } = useInView()
  const { network } = useChains()
  const inFocus = useWindowFocus()

  const { data, loading, error } = useSquidQuery<DomainsStatusQuery, DomainsStatusQueryVariables>(
    QUERY_DOMAIN_STATUS,
    {
      variables: {
        limit: 10,
        orderBy: [{ id: OrderBy.Asc }],
        where: {},
      },
      skip: !inFocus,
      pollInterval: 2000,
      context: { clientName: 'staking' },
    },
  )

  const cards = useMemo<CardData[]>(() => {
    if (loading || error || !data) return []

    return data.domain.map((domain) => ({
      title: domain.name,
      href: `/${network}/${domain.name === 'nova' ? Routes.nova : Routes.autoid}`,
      currentEpoch: domain.completed_epoch,
      lastBlock: domain.last_domain_block_number,
      progress: Math.min(domain.last_domain_block_number % 100, 100),
    }))
  }, [data, loading, error, network])

  const noData = useMemo(() => {
    if (loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  return (
    <div
      className='flex w-full flex-col items-center justify-center gap-2 px-2 sm:gap-5 sm:px-4'
      ref={ref}
    >
      {data
        ? cards.map(({ title, currentEpoch, lastBlock, progress }, index) => (
            <div
              key={index}
              className='w-full rounded-[10px] bg-grayLight p-3 shadow dark:border-none dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset sm:rounded-[20px] sm:p-5'
            >
              <div className='flex items-center justify-between'>
                <span className='text-base font-semibold text-grayDark dark:text-white sm:text-lg'>
                  {capitalizeFirstLetter(title)}
                </span>
                <span className='text-xs text-grayDark dark:text-white sm:text-sm'>
                  {progress}%
                </span>
              </div>
              <div className='mt-1 h-1.5 w-full rounded-full bg-grayLight dark:bg-purpleDeep sm:mt-2 sm:h-2'>
                <div
                  className='h-full rounded-full bg-gradient-to-r from-purpleLighterAccent to-purpleTint dark:from-purpleAccent dark:to-purplePastel'
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className='flex justify-between text-xs text-grayDarker dark:text-whiteOpaque sm:text-sm'>
                <span>Epoch: {numberWithCommas(currentEpoch)}</span>
                <span>Last Block: {numberWithCommas(lastBlock)}</span>
              </div>
            </div>
          ))
        : noData}
    </div>
  )
}
