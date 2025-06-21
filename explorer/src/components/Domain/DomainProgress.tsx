import { capitalizeFirstLetter } from '@autonomys/auto-utils'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import {
  DomainsStatusDocument,
  DomainsStatusQuery,
  DomainsStatusQueryVariables,
  Order_By as OrderBy,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { FC, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { numberWithCommas } from 'utils/number'
import { formatSeconds } from 'utils/time'

interface CardData {
  title: string
  href: string
  currentEpoch: number
  lastBlock: number
  progress: number
  estimatedRemainingTime: bigint
}

const CountdownTimer: FC<{ initialTime: bigint }> = ({ initialTime }) => {
  const [remainingTime, setRemainingTime] = useState<bigint>(initialTime)

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - BigInt(1))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span>
      Estimated Remaining Time: {remainingTime > BigInt(0) ? formatSeconds(remainingTime) : '0'}
    </span>
  )
}

export const DomainProgress: FC = () => {
  const { ref } = useInView()
  const { network } = useIndexers()
  const inFocus = useWindowFocus()

  const { data, loading, error } = useIndexersQuery<
    DomainsStatusQuery,
    DomainsStatusQueryVariables
  >(DomainsStatusDocument, {
    variables: {
      limit: 10,
      orderBy: [{ id: OrderBy.Asc }],
      where: {},
    },
    skip: !inFocus,
    pollInterval: 2000,
    context: { clientName: 'staking' },
  })

  const cards = useMemo<CardData[]>(() => {
    if (loading || error || !data) return []

    return data.staking_domains.map((domain) => {
      const progress = Math.min(domain.last_domain_block_number % 100, 100)
      return {
        title: domain.name,
        href: `/${network}/${domain.name === 'nova' ? Routes.autoevm : Routes.autoid}`,
        currentEpoch: domain.completed_epoch,
        lastBlock: domain.last_domain_block_number,
        progress,
        estimatedRemainingTime: progress < 100 ? BigInt(100 - progress) * BigInt(6) : BigInt(0),
      }
    })
  }, [data, loading, error, network])

  const noData = useMemo(() => {
    if (loading) return <Spinner isXSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  return (
    <div
      className='flex w-full flex-col items-center justify-center gap-2 px-2 sm:gap-5 sm:px-4'
      ref={ref}
    >
      {data
        ? cards.map(
            ({ title, currentEpoch, lastBlock, progress, estimatedRemainingTime }, index) => (
              <div
                key={index}
                className='w-full min-w-80 rounded-[10px] bg-grayLight p-3 shadow dark:border-none dark:bg-gradient-to-r dark:from-gradientFrom dark:via-gradientVia dark:to-gradientTo sm:rounded-lg sm:p-5'
              >
                <div className='flex items-center justify-between'>
                  <span className='text-base font-semibold text-grayDark dark:text-white sm:text-lg'>
                    {capitalizeFirstLetter(title)}
                  </span>
                  <span className='font-sbold text-xs text-grayDark dark:text-white sm:text-sm'>
                    {progress}%
                  </span>
                </div>
                <div className='mt-1 h-1.5 w-full rounded-lg bg-grayLight dark:bg-blueUndertone sm:mt-2 sm:h-2'>
                  <div
                    className='from-blueLighterAccent h-full rounded-lg bg-gradient-to-r to-pastelPink dark:from-primaryAccent dark:to-pastelBlue'
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className='flex justify-between text-xs text-grayDarker dark:text-whiteOpaque sm:text-sm'>
                  <span>Epoch: {numberWithCommas(currentEpoch)}</span>
                  <span>Last Block: {numberWithCommas(lastBlock)}</span>
                </div>
                <div className='flex justify-between text-xs text-grayDarker dark:text-whiteOpaque sm:text-sm'>
                  <CountdownTimer initialTime={estimatedRemainingTime} />
                </div>
              </div>
            ),
          )
        : noData}
    </div>
  )
}
