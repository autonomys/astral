import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import {
  DomainsStatusQuery,
  DomainsStatusQueryVariables,
  Order_By as OrderBy,
} from 'gql/types/staking'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { FC, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { capitalizeFirstLetter } from 'utils/string'
import { formatSeconds } from 'utils/time'
import { Tooltip } from '../common/Tooltip'
import { QUERY_DOMAIN_STATUS } from './staking.query'

interface Stat {
  title: string
  intervalSeconds: bigint | null
}

interface DomainData {
  domain: string
  stats: Stat[]
}

type DomainBlockTimeProgressProps = {
  domain: string
  currentEpochDuration: string | null
  blockCount: number | null
  lastEpochDuration: string | null
  last6EpochsDuration: string | null
  last144EpochsDuration: string | null
  last1kEpochDuration: string | null
}

export const DomainBlockTimeProgress: FC<DomainBlockTimeProgressProps> = ({
  domain,
  currentEpochDuration,
  blockCount,
  lastEpochDuration,
  last6EpochsDuration,
  last144EpochsDuration,
  last1kEpochDuration,
}) => {
  const domainData: DomainData[] = useMemo(() => {
    return [
      {
        domain,
        stats: [
          {
            title: 'Current Epoch',
            intervalSeconds:
              currentEpochDuration && blockCount
                ? BigInt(currentEpochDuration) /
                  BigInt(
                    Math.min(blockCount % 100, 100) * 1000 > 0
                      ? Math.min(blockCount % 100, 100) * 1000
                      : 1,
                  )
                : null,
          },
          {
            title: 'Last 1 Epoch',
            intervalSeconds: lastEpochDuration
              ? BigInt(lastEpochDuration) / BigInt(100 * 1000)
              : null,
          },
          {
            title: 'Last 6 Epochs',
            intervalSeconds: last6EpochsDuration
              ? BigInt(last6EpochsDuration) / BigInt(6 * 100 * 1000)
              : null,
          },
          {
            title: 'Last 144 Epochs',
            intervalSeconds: last144EpochsDuration
              ? BigInt(last144EpochsDuration) / BigInt(144 * 100 * 1000)
              : null,
          },
          {
            title: 'Last 1K Epochs',
            intervalSeconds: last1kEpochDuration
              ? BigInt(last1kEpochDuration) / BigInt(1008 * 100 * 1000)
              : null,
          },
        ],
      },
    ]
  }, [
    domain,
    currentEpochDuration,
    blockCount,
    lastEpochDuration,
    last6EpochsDuration,
    last144EpochsDuration,
    last1kEpochDuration,
  ])

  return domainData.length > 0 ? (
    domainData.map(({ domain, stats }, domainIndex) => (
      <div
        key={domainIndex}
        className='w-full min-w-80 rounded-[20px] bg-grayLight p-5 shadow dark:border-none dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset sm:w-1/2'
      >
        <h2 className='mb-4 text-lg font-bold text-grayDark dark:text-white sm:text-xl'>
          {capitalizeFirstLetter(domain)}
        </h2>
        {stats.map(({ title, intervalSeconds }, statIndex) => (
          <div key={statIndex} className='mb-3 sm:mb-4'>
            <div className='flex items-center justify-between'>
              <span className='text-base font-semibold text-grayDark dark:text-white sm:text-lg'>
                <Tooltip
                  text={
                    <div className='flex w-full flex-col gap-1'>
                      <span className='block text-xs'>
                        1 block = {formatSeconds(intervalSeconds ?? 0)}
                      </span>
                      <span className='block text-xs'>
                        1 epoch = {formatSeconds(BigInt(intervalSeconds ?? 0) * BigInt(100))}
                      </span>
                      <span className='block text-xs'>1 epoch = 100 blocks</span>
                    </div>
                  }
                >
                  {title}
                </Tooltip>
              </span>
              <span className='text-sm text-grayDark dark:text-white'>
                {intervalSeconds !== null ? intervalSeconds + 's per block' : 'N/A'}
              </span>
            </div>
          </div>
        ))}
      </div>
    ))
  ) : (
    <NotFound />
  )
}

export const DomainBlockTime: FC = () => {
  const { ref } = useInView()
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

  const cards = useMemo(() => {
    if (loading || error || !data) return []

    return data.domain.map((domain, index) => (
      <DomainBlockTimeProgress
        key={index}
        domain={domain.name}
        currentEpochDuration={domain.current_epoch_duration}
        blockCount={domain.last_domain_block_number}
        lastEpochDuration={domain.last_epoch_duration}
        last6EpochsDuration={domain.last6_epochs_duration}
        last144EpochsDuration={domain.last144_epoch_duration}
        last1kEpochDuration={domain.last1k_epoch_duration}
      />
    ))
  }, [data, loading, error])

  const noData = useMemo(() => {
    if (loading) return <Spinner isXSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  return (
    <div
      className='flex w-full flex-col items-center justify-center gap-2 px-2 sm:flex-row sm:gap-5 sm:px-4'
      ref={ref}
    >
      {data ? <>{cards}</> : noData}
    </div>
  )
}