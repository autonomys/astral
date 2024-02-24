import { useQuery } from '@apollo/client'
import dayjs from 'dayjs'
import { Nominator, NominatorsConnection, OperatorsConnection } from 'gql/graphql'
import { minidenticon } from 'minidenticons'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// layout
import { HeaderBackground } from 'layout/components'

// common
import {
  bigNumberToNumber,
  formatUnitsToNumber,
  limitNumberDecimals,
  shortString,
} from 'common/helpers'
import useDomains from 'common/hooks/useDomains'
import useWallet from 'common/hooks/useWallet'
import { CopyIcon, LogoIcon, WalletIcon } from 'common/icons'
import { INTERNAL_ROUTES } from 'common/routes'

// operator
import { QUERY_NOMINATOR_CONNECTION_LIST, QUERY_OPERATOR_CONNECTION_SUMMARY } from 'Operator/query'
import { Spinner } from 'common/components'

type DrawerProps = {
  isOpen: boolean
  setIsOpen: (update: boolean | ((prevState: boolean) => boolean)) => void
}

interface WalletSidekickProps extends DrawerProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const WalletSidekick: FC<WalletSidekickProps> = ({ onClick, isOpen, setIsOpen }) => {
  return (
    <>
      <button
        onClick={onClick}
        className='inline-flex items-center bg-white py-2 px-2 focus:outline-none hover:bg-gray-200 text-base rounded-full dark:bg-gradient-to-r from-[#EA71F9] to-[#4D397A]'
      >
        <WalletIcon width='24' height='24' />
      </button>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}

const Drawer: FC<DrawerProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate()
  const { selectedChain, selectedDomain } = useDomains()
  const { api, actingAccount } = useWallet()
  const { subspaceAccount } = useWallet()
  const [tokenSymbol, setTokenSymbol] = useState<string>('')
  const [walletBalance, setWalletBalance] = useState<number>(0)

  const avatar = useMemo(
    () =>
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(minidenticon(subspaceAccount ?? 'no-wallet', 50, 50)),
    [subspaceAccount],
  )

  const handleNavigate = useCallback(
    (url: string) => {
      setIsOpen(false)
      navigate(url)
    },
    [setIsOpen, navigate],
  )

  const handleCopyWallet = useCallback(() => {
    if (subspaceAccount) {
      navigator.clipboard.writeText(subspaceAccount)
    }
  }, [subspaceAccount])

  const loadData = useCallback(async () => {
    if (!api || !api[selectedChain.urls.page]) return

    const properties = await api[selectedChain.urls.page].rpc.system.properties()
    setTokenSymbol((properties.tokenSymbol.toJSON() as string[])[0])
  }, [api, selectedChain])

  const loadWalletBalance = useCallback(async () => {
    if (!api || !actingAccount || !api[selectedChain.urls.page]) return

    const balance = await api[selectedChain.urls.page].query.system.account(actingAccount.address)
    setWalletBalance(
      formatUnitsToNumber((balance.toJSON() as { data: { free: string } }).data.free),
    )
  }, [api, actingAccount, selectedChain])

  const operatorsConnectionVariables = useMemo(
    () => ({
      first: 1000,
      orderBy: 'id_ASC',
      // eslint-disable-next-line camelcase
      where: subspaceAccount ? { operatorOwner_eq: subspaceAccount } : {},
    }),
    [subspaceAccount],
  )
  const nominatorsConnectionVariables = useMemo(
    () => ({
      first: 1000,
      after: undefined,
      orderBy: 'id_ASC',
      // eslint-disable-next-line camelcase
      where: subspaceAccount ? { account: { id_eq: subspaceAccount } } : {},
    }),
    [subspaceAccount],
  )

  const {
    data: operatorsConnectionData,
    error: operatorsConnectionError,
    loading: operatorsConnectionLoading,
  } = useQuery(QUERY_OPERATOR_CONNECTION_SUMMARY, {
    variables: operatorsConnectionVariables,
    pollInterval: 6000,
  })

  const {
    data: nominatorsConnectionData,
    error: nominatorsConnectionError,
    loading: nominatorsConnectionLoading,
  } = useQuery(QUERY_NOMINATOR_CONNECTION_LIST, {
    variables: nominatorsConnectionVariables,
    pollInterval: 6000,
  })

  const operators: OperatorsConnection = useMemo(
    () =>
      operatorsConnectionData && operatorsConnectionData.operatorsConnection
        ? operatorsConnectionData.operatorsConnection
        : [],
    [operatorsConnectionData],
  )
  const totalOperatorCount = useMemo(() => (operators ? operators.totalCount : 0), [operators])
  const totalOperatorStake = useMemo(
    () =>
      operators && operators.edges
        ? operators.edges
            .reduce((acc, operator) => acc + BigInt(operator.node.currentTotalStake), BigInt(0))
            .toString()
        : '0',
    [operators],
  )

  const nominators: NominatorsConnection = useMemo(
    () =>
      nominatorsConnectionData && nominatorsConnectionData.nominatorsConnection
        ? nominatorsConnectionData.nominatorsConnection
        : [],
    [nominatorsConnectionData],
  )
  const nominatorsConnection: Nominator[] = useMemo(
    () =>
      nominators && nominators.edges ? nominators.edges.map((nominator) => nominator.node) : [],
    [nominators],
  )
  const totalNominatedCount = useMemo(() => (nominators ? nominators.totalCount : 0), [nominators])
  const totalNominatedStake = useMemo(
    () =>
      nominatorsConnection
        .reduce(
          (acc, nominator) =>
            acc +
            (BigInt(nominator.operator.currentTotalStake) /
              BigInt(nominator.operator.totalShares)) *
              BigInt(nominator.shares),
          BigInt(0),
        )
        .toString(),
    [nominatorsConnection],
  )
  const totalStake = useMemo(
    () => (BigInt(totalOperatorStake) + BigInt(totalNominatedStake)).toString(),
    [totalOperatorStake, totalNominatedStake],
  )

  useEffect(() => {
    loadData()
  }, [api, loadData])

  useEffect(() => {
    loadWalletBalance()
  }, [api, actingAccount, loadWalletBalance])

  if (operatorsConnectionLoading) return <Spinner />

  return (
    <nav
      className={
        ' fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ' +
        (isOpen
          ? ' transition-opacity opacity-100 duration-500 translate-x-0 z-max '
          : ' transition-all delay-500 opacity-0 translate-x-full  ')
      }
    >
      <section
        className={
          'w-screen max-w-lg right-0 absolute bg-light dark:bg-dark h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform -z-10' +
          (isOpen ? ' translate-x-0 ' : ' translate-x-full ')
        }
      >
        <HeaderBackground />
        <article className='relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full gap-10'>
          <div className='flex items-center align-middle justify-between p-5 mb-6'>
            <button
              onClick={() => handleNavigate(`/${selectedChain.urls.page}/${selectedDomain}`)}
              className='flex title-font font-medium items-center text-gray-900 dark:text-white'
            >
              <LogoIcon fillColor='currentColor' />
            </button>
            <div className='flex gap-3 items-center'>
              <button
                className='bg-white px-4 py-2 items-center rounded-full dark:bg-[#1E254E] dark:text-white'
                onClick={() => setIsOpen(false)}
              >
                x
              </button>
            </div>
          </div>
          <div className='p-5 m-2 mt-8 bg-[#DDEFF1] rounded-[20px] dark:bg-[#1E254E] dark:text-white'>
            {subspaceAccount && (
              <Link
                data-testid='wallet-link'
                className='hover:text-[#DE67E4]'
                to={INTERNAL_ROUTES.accounts.id.page(
                  selectedChain.urls.page,
                  'consensus',
                  subspaceAccount,
                )}
              >
                <div className='flex items-center m-2'>
                  <img src={avatar} alt={subspaceAccount} width={60} />
                  <span className='hidden sm:block ml-2 truncate w-5 text-lg underline md:w-full text-white'>
                    {shortString(subspaceAccount)}
                  </span>
                </div>
              </Link>
            )}
            {operatorsConnectionLoading ||
            nominatorsConnectionLoading ||
            operatorsConnectionError ||
            nominatorsConnectionError ? (
              <>
                {(operatorsConnectionLoading || nominatorsConnectionLoading) && <Spinner />}
                {(operatorsConnectionError || nominatorsConnectionError) && (
                  <div className='flex items-center m-2 pt-4'>
                    <span className='text-[#241235] text-base font-medium dark:text-white'>
                      We are unable to load your wallet data
                    </span>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className='flex items-center m-2 pt-4'>
                  <span className='text-[#241235] text-base font-medium dark:text-white'>
                    Your Subspace Wallet Address
                  </span>
                </div>
                <div className='flex items-center m-2'>
                  <span className='hidden sm:block ml-2 truncate w-5 text-sm md:w-full text-white'>
                    {subspaceAccount && subspaceAccount}
                  </span>
                  <CopyIcon onClick={handleCopyWallet} fill='white' />
                </div>
                <div className='flex items-center m-2 pt-4'>
                  <span className='text-[#241235] text-base font-medium dark:text-white'>
                    Your Subspace Wallet Balance
                  </span>
                </div>
                <div className='flex items-center m-2'>
                  {limitNumberDecimals(walletBalance)} {tokenSymbol}
                </div>
                <div className='flex items-center m-2 pt-4'>
                  <span className='text-[#241235] text-base font-medium dark:text-white'>
                    Your total staked
                  </span>
                </div>
                <div className='flex items-center m-2'>
                  {bigNumberToNumber(totalStake)} {tokenSymbol}
                </div>
                <div className='flex items-center m-2 pt-4'>
                  <span className='text-[#241235] text-base font-medium dark:text-white'>
                    Your total staked in your own operators
                  </span>
                </div>
                <div className='flex items-center m-2'>
                  {bigNumberToNumber(totalOperatorStake)} {tokenSymbol} - {totalOperatorCount}{' '}
                  operators
                </div>
                <div className='flex items-center m-2 pt-4'>
                  <span className='text-[#241235] text-base font-medium dark:text-white'>
                    Your total staked nominated to other operators
                  </span>
                </div>
                <div className='flex items-center m-2'>
                  {bigNumberToNumber(totalNominatedStake)} {tokenSymbol} - {totalNominatedCount}{' '}
                  nomination
                </div>
              </>
            )}
          </div>
          <div className='flex'>
            <div className='justify-items-end pt-10 pb-1 pl-5 flex flex-wrap sm:hidden flex-col sm:flex-row'>
              <p className='text-gray text-sm text-center sm:text-left'>
                © {dayjs().year()} Subspace Labs, Inc. All Rights Reserved
              </p>
            </div>
          </div>
        </article>
      </section>
    </nav>
  )
}
