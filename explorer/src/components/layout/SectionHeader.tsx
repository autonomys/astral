'use client'

import { CpuChipIcon, GlobeAltIcon, QueueListIcon, TrophyIcon } from '@heroicons/react/24/outline'
import { WalletButton } from 'components/WalletButton'
import { WalletSidekick } from 'components/WalletSideKick'
// import { indexers } from 'constants/indexers'
// import { domains } from 'constants/domains'
import { ROUTES, Routes } from 'constants/routes'
// import useChains from 'hooks/useChains'
import useMediaQuery from 'hooks/useMediaQuery'
import useWallet from 'hooks/useWallet'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { FC, useCallback, useMemo } from 'react'
import type { ChainParam } from 'types/app'
import AccountListDropdown from '../WalletButton/AccountListDropdown'

export const SectionHeader: FC = () => {
  const { chain } = useParams<ChainParam>()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const pathname = usePathname()

  // const { push } = useRouter()

  // const { setSelectedChain, selectedChain, setSelectedDomain } = useChains()
  const { actingAccount } = useWallet()

  // const handleDomainSelected = useCallback(
  //   (domain: string) => {
  //     setSelectedDomain(domain)
  //     if (domain === Routes.nova) setSelectedChain(domains[0])
  //     else setSelectedChain(chains[0])
  //     push(`/${network}/${domain}`)
  //   },
  //   [push, setSelectedChain, setSelectedDomain, network],
  // )

  const domainIcon = useCallback((domain: (typeof ROUTES)[0], isActive: boolean) => {
    const className = `w-6 h-6 ${isActive ? 'text-white' : 'text-grayDark'} dark:text-white`
    switch (domain.name) {
      case Routes.nova:
        return <GlobeAltIcon className={className} />
      case Routes.consensus:
        return <QueueListIcon className={className} />
      case Routes.leaderboard:
        return <TrophyIcon className={className} />
      case Routes.staking:
        return <CpuChipIcon className={className} />
      default:
        return null
    }
  }, [])

  const domainsOptions = useMemo(
    () =>
      ROUTES.map((item, index) => {
        const isActive = pathname.includes(`${chain}/${item.name}`)
        return (
          <div className='flex items-center text-[13px] font-semibold' key={`${item}-${index}`}>
            <Link
              href={`/${chain}/${item.name}`}
              className='title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0'
            >
              <button
                className={
                  isActive
                    ? 'rounded-full bg-grayDarker px-4 py-2 text-white dark:bg-primaryAccent'
                    : 'bg-white text-grayDark dark:bg-blueAccent dark:text-white'
                }
              >
                {isDesktop ? item.title : domainIcon(item, isActive)}
              </button>
            </Link>
          </div>
        )
      }),
    [isDesktop, pathname, chain, domainIcon],
  )

  return (
    <div
      className='z-10 h-[60px] w-full bg-white dark:bg-blueAccent'
      id='accordion-open'
      data-accordion='open'
    >
      <div className='container mx-auto flex w-full items-center justify-between px-5 py-3 pb-2 md:px-[25px] 2xl:px-0'>
        <div className='flex gap-9'>{domainsOptions}</div>
        <div className='flex gap-4'>
          {!actingAccount ? (
            <WalletButton />
          ) : (
            <div className='flex'>
              <AccountListDropdown />
              <WalletSidekick />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
