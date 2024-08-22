import { BlockIcon, DocIcon } from '@/components/icons'
import { useSquidQuery } from '@/hooks/useSquidQuery'
import { numberWithCommas } from '@/utils/number'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import {
  DomainsStatusQuery,
  DomainsStatusQueryVariables,
  Order_By as OrderBy,
} from 'gql/types/staking'
import useChains from 'hooks/useChains'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { QUERY_DOMAIN_STATUS } from './staking.query'

interface CardData {
  title: string
  description: string
  href: string
  icon: JSX.Element
  darkBgClass: string
  currentEpoch: number
  progress: number
}

export const DomainCards: FC = () => {
  const { ref, inView } = useInView()
  const { network } = useChains()
  const inFocus = useWindowFocus()

  const { data, loading, error, setIsVisible } = useSquidQuery<
    DomainsStatusQuery,
    DomainsStatusQueryVariables
  >(QUERY_DOMAIN_STATUS, {
    variables: {
      limit: 10,
      orderBy: [{ id: OrderBy.Asc }],
      where: {},
    },
    skip: !inFocus,
    pollInterval: 6000,
    context: { clientName: 'staking' },
  })

  const cards = useMemo<CardData[]>(() => {
    if (loading || error || !data) return []

    return data.domain.map((domain) => ({
      title: domain.name,
      description: domain.name === 'nova' ? 'EVM domain' : 'Identity domain',
      href: `/${network}/${domain.name === 'nova' ? Routes.nova : Routes.autoid}`,
      icon: domain.name === 'nova' ? <BlockIcon /> : <DocIcon />,
      darkBgClass:
        domain.name === 'nova'
          ? 'dark:bg-gradient-to-b dark:from-purpleLighterAccent dark:via-purpleShade dark:to-pastelPurple'
          : 'dark:bg-gradient-to-b dark:from-purpleUndertone dark:to-pastelBlue',
      currentEpoch: domain.completed_epoch,
      progress: Math.min(domain.last_domain_block_number % 100, 100),
    }))
  }, [data, loading, error, network])

  const noData = useMemo(() => {
    if (loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full items-center justify-center gap-5 overflow-x-auto' ref={ref}>
      {data
        ? cards.map(
            ({ title, description, href, icon, darkBgClass, currentEpoch, progress }, index) => (
              <Link key={index} href={href}>
                <div
                  className={'h-[280px] w-1/5 min-w-[200px] grow cursor-pointer md:min-w-[228px]'}
                >
                  <div
                    className={`flex h-full flex-col justify-between rounded-[20px] bg-white p-4 ${darkBgClass}`}
                  >
                    <div>
                      <div className='mb-4 flex w-full items-center justify-center align-middle'>
                        {icon}
                      </div>
                      <div className='flex w-full flex-col items-center justify-center align-middle'>
                        <h2 className='mb-2 text-center text-2xl font-normal text-gray-900 dark:text-white'>
                          {title}
                        </h2>
                        <p className='text-md text-center font-medium leading-relaxed dark:text-white'>
                          {description}
                        </p>
                      </div>
                    </div>
                    <div className='mt-4'>
                      <div className='flex justify-between text-sm text-grayDarker dark:text-white'>
                        <span>Epoch: {numberWithCommas(currentEpoch)}</span>
                      </div>
                      <div className='mt-2 h-2 w-full rounded-full bg-grayLight dark:bg-grayDarker'>
                        <div
                          className='h-2 rounded-full bg-gradient-to-r from-primaryAccent to-purpleUndertone dark:from-primaryAccent dark:to-pastelBlue'
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className='mt-1 text-right text-sm text-grayDarker dark:text-white'>
                        {progress}%
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ),
          )
        : noData}
    </div>
  )
}