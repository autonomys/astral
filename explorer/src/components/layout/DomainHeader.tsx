'use client'

import { CpuChipIcon, GlobeAltIcon, QueueListIcon, TrophyIcon } from '@heroicons/react/24/outline'
import { WalletButton } from 'components/WalletButton'
import { WalletSidekick } from 'components/WalletSideKick'
import { chains } from 'constants/chains'
import { domains } from 'constants/domains'
import { ROUTES, Routes } from 'constants/routes'
import useDomains from 'hooks/useDomains'
import useMediaQuery from 'hooks/useMediaQuery'
import useWallet from 'hooks/useWallet'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useCallback, useMemo } from 'react'
import AccountListDropdown from '../WalletButton/AccountListDropdown'

export const DomainHeader: FC = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const pathname = usePathname()

  const { push } = useRouter()

  const { setSelectedChain, selectedChain, setSelectedDomain } = useDomains()
  const { actingAccount } = useWallet()

  const handleDomainSelected = useCallback(
    (domain: string) => {
      setSelectedDomain(domain)
      if (domain === Routes.nova) setSelectedChain(domains[0])
      else setSelectedChain(chains[0])
      push(`/${selectedChain.urls.page}/${domain}`)
    },
    [push, setSelectedChain, setSelectedDomain, selectedChain.urls.page],
  )

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
        const isActive = pathname.includes(`${selectedChain.urls.page}/${item.name}`)
        return (
          <div className='flex items-center text-[13px] font-semibold' key={`${item}-${index}`}>
            <Link
              href={`/${selectedChain.urls.page}/${item.name}`}
              className='title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0'
            >
              <button
                onClick={() => handleDomainSelected(item.name)}
                className={
                  isActive
                    ? 'bg-grayDarker dark:bg-purpleAccent rounded-full px-4 py-2 text-white'
                    : 'text-grayDark dark:bg-blueAccent bg-white dark:text-white'
                }
              >
                {isDesktop ? item.title : domainIcon(item, isActive)}
              </button>
            </Link>
          </div>
        )
      }),
    [handleDomainSelected, isDesktop, pathname, selectedChain.urls.page, domainIcon],
  )

  return (
    <div
      className='dark:bg-blueAccent z-10 h-[60px] w-full bg-white'
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
