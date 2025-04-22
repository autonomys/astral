'use client'

import {
  CircleStackIcon,
  CodeBracketIcon,
  CpuChipIcon,
  GiftIcon,
  GlobeAltIcon,
  IdentificationIcon,
  LinkIcon,
  QueueListIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline'
import { WalletButton } from 'components/WalletButton'
import { WalletSidekick } from 'components/WalletSideKick'
import { ROUTES, Routes } from 'constants/routes'
import useMediaQuery from 'hooks/useMediaQuery'
import useWallet from 'hooks/useWallet'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { FC, useCallback, useMemo } from 'react'
import type { ChainParam } from 'types/app'
import { ProfileButton } from '../Profile/ProfileButton'
import AccountListDropdown from '../WalletButton/AccountListDropdown'

export const SectionHeader: FC = () => {
  const { chain } = useParams<ChainParam>()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const pathname = usePathname()
  const { actingAccount, sessionSubspaceAccount } = useWallet()

  const domainIcon = useCallback((domain: (typeof ROUTES)[0], isActive: boolean) => {
    const className = `w-6 h-6 ${isActive ? 'text-white' : 'text-grayDark'} dark:text-white`
    switch (domain.name) {
      case Routes.consensus:
        return <QueueListIcon className={className} />
      case Routes.farming:
        return <CpuChipIcon className={className} />
      case Routes.staking:
        return <CircleStackIcon className={className} />
      case Routes.leaderboard:
        return <TrophyIcon className={className} />
      case Routes.domains:
        return <GlobeAltIcon className={className} />
      case Routes.autoevm:
        return <CodeBracketIcon className={className} />
      case Routes.autoid:
        return <IdentificationIcon className={className} />
      case Routes.testnetRewards:
        return <GiftIcon className={className} />
      default:
        return <LinkIcon className={className} />
    }
  }, [])

  const domainsOptions = useMemo(
    () =>
      ROUTES.filter(
        (item) => (!item.networks || (chain && item.networks?.includes(chain))) && !item.hidden,
      ).map((item, index) => {
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
                    ? 'rounded-full bg-buttonLightFrom px-2 py-2 text-white dark:bg-primaryAccent'
                    : 'text-grayDark dark:text-white'
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
      className='z-10 h-[60px] w-full bg-headerLight dark:bg-headerDark'
      id='accordion-open'
      data-accordion='open'
    >
      <div className='container mx-auto flex w-full items-center justify-between px-5 pb-2 pt-0 md:px-[25px] 2xl:px-0'>
        <div className='flex gap-2 pt-3'>{domainsOptions}</div>
        <div className='flex gap-4'>
          {!actingAccount ? (
            <WalletButton />
          ) : (
            <div className={`flex ${isDesktop ? '' : 'mb-2'}`}>
              <AccountListDropdown />
              {sessionSubspaceAccount && <ProfileButton />}
              <WalletSidekick />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
