'use client'

import { LogoIcon } from '@/components/icons'
import { useQuery } from '@apollo/client'
import { Bars3BottomRightIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import {
  QUERY_NOMINATOR_CONNECTION_LIST,
  QUERY_OPERATOR_CONNECTION_LIST,
} from 'components/Operator/query'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { NominatorsConnectionQuery, OperatorsConnectionQuery } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import useMediaQuery from 'hooks/useMediaQuery'
import useWallet from 'hooks/useWallet'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'providers/ThemeProvider'
import { useEffect, useMemo, useState } from 'react'
import { HeaderChainDropdown } from './HeaderChainDropdown'
import { MobileHeader } from './MobileHeader'

export const OperatorHeader = () => {
  const { isDark, toggleTheme } = useTheme()
  const pathname = usePathname()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [isOpen, setIsOpen] = useState(false)
  const { selectedChain } = useDomains()
  const { subspaceAccount } = useWallet()

  const { data: dataOperators, refetch: refetchOperators } = useQuery<OperatorsConnectionQuery>(
    QUERY_OPERATOR_CONNECTION_LIST,
    {
      variables: {
        first: 1,
        after: undefined,
        // eslint-disable-next-line camelcase
        where: { operatorOwner_eq: subspaceAccount ? subspaceAccount : '' },
        orderBy: 'id_ASC',
      },
      pollInterval: 6000,
    },
  )

  const { data: dataNominators, refetch: refetchNominators } = useQuery<NominatorsConnectionQuery>(
    QUERY_NOMINATOR_CONNECTION_LIST,
    {
      variables: {
        first: 1,
        after: undefined,
        // eslint-disable-next-line camelcase
        where: subspaceAccount ? { account: { id_eq: subspaceAccount } } : {},
        orderBy: 'id_ASC',
      },
      pollInterval: 6000,
    },
  )

  const operatorsConnection = useMemo(
    () =>
      dataOperators && dataOperators.operatorsConnection
        ? dataOperators.operatorsConnection.edges.map((operator) => operator.node)
        : [],
    [dataOperators],
  )

  const nominatorsConnection = useMemo(
    () =>
      dataNominators && dataNominators.nominatorsConnection
        ? dataNominators.nominatorsConnection.edges.map((operator) => operator.node)
        : [],
    [dataNominators],
  )

  const menuList = useMemo(() => {
    const general = [
      {
        title: 'Operators',
        link: `/${selectedChain.urls.page}/${Routes.operators}`,
      },
      {
        title: 'Stake My Operator',
        link: `/${selectedChain.urls.page}/${Routes.operators}/${INTERNAL_ROUTES.operators.stake}`,
      },
    ]
    if (operatorsConnection && operatorsConnection.length > 0)
      general.push({
        title: 'Manage My Operator',
        link: `/${selectedChain.urls.page}/${Routes.operators}/${INTERNAL_ROUTES.operators.manage}`,
      })
    general.push({
      title: 'Nominators',
      link: `/${selectedChain.urls.page}/${Routes.operators}/${INTERNAL_ROUTES.operators.nominators}`,
    })
    if (nominatorsConnection && nominatorsConnection.length > 0)
      general.push({
        title: 'Manage My Nomination',
        link: `/${selectedChain.urls.page}/${Routes.operators}/${INTERNAL_ROUTES.operators.nomination}`,
      })
    return general
  }, [operatorsConnection, nominatorsConnection, selectedChain.urls.page])

  useEffect(() => {
    refetchOperators()
    refetchNominators()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subspaceAccount])

  return (
    <header className="body-font z-9 py-[30px] font-['Montserrat'] text-gray-600">
      {isDesktop ? (
        <div className='container mx-auto flex flex-col flex-wrap items-center justify-between py-5 md:flex-row md:px-[25px] 2xl:px-0'>
          <Link
            href={`/${selectedChain.urls.page}/${Routes.operators}`}
            className='title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0'
          >
            <span className='text-xl text-grayDark dark:text-white'>
              <LogoIcon fillColor='currentColor' />
            </span>
          </Link>
          <nav className='flex flex-wrap items-center justify-center gap-10 text-sm'>
            {menuList.map((item, index) => {
              const isCurrentPath = pathname.includes(item.link) && index !== 0
              const isInitialPath =
                pathname === `/${selectedChain.urls.page}/operators` && index === 0

              return (
                <Link
                  key={index}
                  className={
                    isCurrentPath || isInitialPath
                      ? 'block rounded-full bg-grayDarker px-5 py-3 text-[13px] font-semibold leading-4 text-white dark:bg-purpleAccent'
                      : 'bg-none text-[13px] font-semibold leading-4 text-grayDark dark:text-white'
                  }
                  href={item.link}
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>
          <div className='flex justify-center'>
            <HeaderChainDropdown />
            <button
              onClick={toggleTheme}
              className='ml-4 inline-flex items-center rounded-full bg-grayDarker p-2 text-base hover:bg-gray-200 focus:outline-none dark:bg-white'
            >
              {isDark ? (
                <SunIcon
                  viewBox='0 0 24 24'
                  strokeWidth={1}
                  fill='black'
                  stroke='black'
                  className='size-6'
                />
              ) : (
                <MoonIcon
                  viewBox='0 0 24 24'
                  strokeWidth={1}
                  fill='white'
                  stroke='white'
                  className='size-6'
                />
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className='flex flex-row items-center justify-between px-5'>
          <Link
            href={INTERNAL_ROUTES.home}
            className='title-font flex items-center font-medium text-gray-900 dark:text-white'
          >
            <LogoIcon fillColor='currentColor' />
          </Link>
          <div className='flex items-center gap-4'>
            <HeaderChainDropdown />
            <button
              className='items-center rounded-full bg-grayDarker p-3 text-white dark:bg-white dark:text-blueAccent'
              onClick={() => setIsOpen(true)}
            >
              <Bars3BottomRightIcon className='size-4' fill='currentColor' stroke='currentColor' />
            </button>
          </div>
          <MobileHeader menuList={menuList} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      )}
    </header>
  )
}
