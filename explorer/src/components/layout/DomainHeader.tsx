'use client'

import { CpuChipIcon, GlobeAltIcon, QueueListIcon, TrophyIcon } from '@heroicons/react/24/outline'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useCallback, useMemo } from 'react'

// layout
import { chains } from 'constants/chains'
import { domains } from 'constants/domains'
import { ROUTES, Routes } from 'constants/routes'
import useDomains from 'hooks/useDomains'

// common
import { ConnectWalletButton } from 'components/common/ConnectWalletButton'
import useMediaQuery from 'hooks/useMediaQuery'
import useWallet from 'hooks/useWallet'

// chains
import { WalletSidekick } from 'components/WalletSideKick'
import AccountListDropdown from './AccountListDropdown'

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
    const className = `w-6 h-6 ${isActive ? 'text-white' : 'text-[#282929]'} dark:text-white`
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
            <button
              onClick={() => handleDomainSelected(item.name)}
              className={
                isActive
                  ? 'rounded-full bg-[#241235] px-4 py-2 text-white dark:bg-[#DE67E4]'
                  : 'bg-white text-[#282929] dark:bg-[#1E254E] dark:text-white'
              }
            >
              {isDesktop ? item.title : domainIcon(item, isActive)}
            </button>
          </div>
        )
      }),
    [handleDomainSelected, isDesktop, pathname, selectedChain.urls.page, domainIcon],
  )

  return (
    <div
      className='z-10 h-[60px] w-full bg-white dark:bg-[#1E254E]'
      id='accordion-open'
      data-accordion='open'
    >
      <div className='container mx-auto flex w-full items-center justify-between px-5 py-3 pb-2 md:px-[25px] 2xl:px-0'>
        <div className='flex gap-9'>{domainsOptions}</div>
        <div className='flex gap-4'>
          {!actingAccount ? (
            <ConnectWalletButton />
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
