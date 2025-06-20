'use client'

import { cn } from '@/utils/cn'
import {
  Bars3Icon,
  CircleStackIcon,
  CodeBracketIcon,
  CpuChipIcon,
  GiftIcon,
  GlobeAltIcon,
  IdentificationIcon,
  LinkIcon,
  QueueListIcon,
  TrophyIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { WalletButton } from 'components/WalletButton'
import { WalletSidekick } from 'components/WalletSideKick'
import { ROUTES, Routes } from 'constants/routes'
import useMediaQuery from 'hooks/useMediaQuery'
import useWallet from 'hooks/useWallet'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { FC, useCallback, useMemo, useState } from 'react'
import type { ChainParam, Route } from 'types/app'
import { ProfileButton } from '../Profile/ProfileButton'
import AccountListDropdown from '../WalletButton/AccountListDropdown'

export const SectionHeader: FC = () => {
  const { chain } = useParams<ChainParam>()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isLargeDesktop = useMediaQuery('(min-width: 1536px)')
  const pathname = usePathname()
  const { actingAccount, sessionSubspaceAccount } = useWallet()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = useCallback(() => setSidebarOpen(!sidebarOpen), [sidebarOpen])

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

  const getNavbarTitle = useCallback(
    (item: Route, isActive: boolean) => {
      if (isLargeDesktop) {
        return item.title
      }
      if (isDesktop) {
        return item.shortTitle || item.title
      }
      return domainIcon(item, isActive)
    },
    [isDesktop, isLargeDesktop, domainIcon],
  )

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
              onClick={() => (isDesktop ? null : setSidebarOpen(false))}
            >
              <button
                className={
                  isActive
                    ? `rounded-full bg-buttonLightFrom ${isDesktop ? 'px-4' : 'px-2'} py-2 text-white dark:bg-primaryAccent`
                    : 'text-grayDark dark:text-white'
                }
              >
                {getNavbarTitle(item, isActive)}
              </button>
            </Link>
          </div>
        )
      }),
    [isDesktop, pathname, chain, getNavbarTitle],
  )

  const mobileNav = useMemo(() => {
    const filteredRoutes = ROUTES.filter(
      (item) => (!item.networks || (chain && item.networks?.includes(chain))) && !item.hidden,
    )

    return (
      <div
        className={`fixed inset-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}
      >
        {/* Overlay */}
        <button className='fixed inset-0 bg-black bg-opacity-50' onClick={toggleSidebar} />

        {/* Sidebar */}
        <div className='relative flex h-full w-64 flex-col overflow-y-auto bg-white px-4 py-5 shadow-lg dark:bg-headerDark'>
          <div className='mb-6 flex items-center justify-between'>
            <h2 className='text-xl font-bold dark:text-white'>Autonomys</h2>
            <button
              onClick={toggleSidebar}
              className='text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
            >
              <XMarkIcon className='h-6 w-6' />
            </button>
          </div>

          <div className='flex flex-col space-y-4'>
            {filteredRoutes.map((item, index) => {
              const isActive = pathname.includes(`${chain}/${item.name}`)
              return (
                <Link
                  key={`mobile-${item.name}-${index}`}
                  href={`/${chain}/${item.name}`}
                  className={`flex items-center space-x-3 rounded-md p-2 ${
                    isActive
                      ? 'bg-buttonLightFrom text-white dark:bg-primaryAccent'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={toggleSidebar}
                >
                  {domainIcon(item, isActive)}
                  <span className={`${isActive ? 'text-white' : 'text-gray-700 dark:text-white'}`}>
                    {item.title}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    )
  }, [sidebarOpen, chain, pathname, domainIcon, toggleSidebar])

  return (
    <>
      <div
        className='z-10 h-[60px] w-full bg-headerLight dark:bg-headerDark'
        id='accordion-open'
        data-accordion='open'
      >
        <div className='container mx-auto flex h-full w-full items-center justify-between px-5 pt-0 md:px-[25px] 2xl:px-0'>
          {isDesktop ? (
            <div className='flex gap-9 pr-2'>{domainsOptions}</div>
          ) : (
            <button
              onClick={toggleSidebar}
              className='mr-2 text-gray-700 hover:text-gray-900 dark:text-white'
            >
              <Bars3Icon className='h-6 w-6' />
            </button>
          )}

          <div className='flex gap-4'>
            {!actingAccount ? (
              <WalletButton />
            ) : (
              <div className={cn('flex', isDesktop && 'items-center')}>
                <AccountListDropdown />
                {sessionSubspaceAccount && <ProfileButton />}
                <WalletSidekick />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile sidebar */}
      {mobileNav}
    </>
  )
}
