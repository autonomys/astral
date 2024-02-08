import { useQuery } from '@apollo/client'
import { Bars3BottomRightIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// layout
import { HeaderChainDropdown, MobileHeader } from 'layout/components'

// common
import useDomains from 'common/hooks/useDomains'
import useMediaQuery from 'common/hooks/useMediaQuery'
import useWallet from 'common/hooks/useWallet'
import { LogoIcon } from 'common/icons'
import { useTheme } from 'common/providers/ThemeProvider'
import { INTERNAL_ROUTES } from 'common/routes'
import { QUERY_NOMINATOR_CONNECTION_LIST, QUERY_OPERATOR_CONNECTION_LIST } from 'Operator/query'

const OperatorHeader = () => {
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const pathName = location.pathname
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [isOpen, setIsOpen] = useState(false)
  const { selectedChain, selectedDomain } = useDomains()
  const { subspaceAccount } = useWallet()

  const { data: dataOperators, refetch: refetchOperators } = useQuery(
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

  const { data: dataNominators, refetch: refetchNominators } = useQuery(
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
        link: `/${selectedChain.urls.page}/${selectedDomain}`,
      },
      {
        title: 'Stake My Operator',
        link: `${INTERNAL_ROUTES.operators.stake}`,
      },
      // TODO: remove comment when these pages are added
      // {
      //   title: 'Nominate',
      //   link: `${INTERNAL_ROUTES.operators.nominate}`,
      // },
    ]
    if (operatorsConnection && operatorsConnection.length > 0)
      general.push({
        title: 'Manage My Operator',
        link: `${INTERNAL_ROUTES.operators.manage}`,
      })
    if (nominatorsConnection && nominatorsConnection.length > 0)
      general.push({
        title: 'Manage My Nomination',
        link: `${INTERNAL_ROUTES.operators.nomination}`,
      })
    return general
  }, [operatorsConnection, nominatorsConnection, selectedChain.urls.page, selectedDomain])

  useEffect(() => {
    refetchOperators()
    refetchNominators()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subspaceAccount])

  return (
    <header className="text-gray-600 body-font font-['Montserrat'] py-[30px] z-10">
      {isDesktop ? (
        <div className='container mx-auto flex flex-wrap justify-between py-5 md:px-[25px] 2xl:px-0 flex-col md:flex-row items-center'>
          <Link
            to={`/${selectedChain.urls.page}/${selectedDomain}`}
            className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'
          >
            <span className='text-xl text-[#282929] dark:text-white'>
              <LogoIcon fillColor='currentColor' />
            </span>
          </Link>
          <nav className='flex flex-wrap gap-10 items-center text-sm justify-center'>
            {menuList.map((item, index) => {
              const isCurrentPath = pathName.includes(item.link) && index !== 0
              const isInitialPath =
                pathName === `/${selectedChain.urls.page}/operators` && index === 0

              return (
                <Link
                  key={index}
                  className={
                    isCurrentPath || isInitialPath
                      ? 'leading-4 text-[13px] font-semibold text-white rounded-full px-5 py-3 block bg-[#241235] dark:bg-[#DE67E4]'
                      : 'leading-4 text-[13px] font-semibold text-[#282929] dark:text-white bg-none'
                  }
                  to={item.link}
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
              className='ml-4 inline-flex items-center dark:bg-[#FFFFFF] bg-[#241235] py-2 px-2 focus:outline-none hover:bg-gray-200 text-base rounded-full'
            >
              {isDark ? (
                <SunIcon
                  viewBox='0 0 24 24'
                  strokeWidth={1}
                  fill='black'
                  stroke='black'
                  className='w-6 h-6'
                />
              ) : (
                <MoonIcon
                  viewBox='0 0 24 24'
                  strokeWidth={1}
                  fill='white'
                  stroke='white'
                  className='w-6 h-6'
                />
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className='flex flex-row justify-between px-5 items-center'>
          <Link
            to={INTERNAL_ROUTES.home}
            className='flex title-font font-medium items-center text-gray-900 dark:text-white'
          >
            <LogoIcon fillColor='currentColor' />
          </Link>
          <div className='flex gap-4 items-center'>
            <HeaderChainDropdown />
            <button
              className='bg-[#241235] text-white p-3 items-center rounded-full dark:bg-white dark:text-[#1E254E]'
              onClick={() => setIsOpen(true)}
            >
              <Bars3BottomRightIcon className='w-4 h-4' fill='currentColor' stroke='currentColor' />
            </button>
          </div>
          <MobileHeader menuList={menuList} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      )}
    </header>
  )
}

export default OperatorHeader
