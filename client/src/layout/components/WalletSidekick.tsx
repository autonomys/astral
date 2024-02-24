import { useQuery } from '@apollo/client'
import Identicon from '@polkadot/react-identicon'
import dayjs from 'dayjs'
import {
  ExtrinsicsConnection,
  Nominator,
  NominatorsConnection,
  OperatorsConnection,
} from 'gql/graphql'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// layout
import { HeaderBackground } from 'layout/components'

// common
import { Accordion, CopyButton, List, Spinner, StatusIcon, StyledListItem } from 'common/components'
import {
  bigNumberToNumber,
  formatUnitsToNumber,
  limitNumberDecimals,
  shortString,
} from 'common/helpers'
import useDomains from 'common/hooks/useDomains'
import useWallet from 'common/hooks/useWallet'
import { LogoIcon, WalletIcon } from 'common/icons'
import { INTERNAL_ROUTES } from 'common/routes'

// operator
import { QUERY_EXTRINSIC_LIST_CONNECTION } from 'Extrinsic/query'
import { QUERY_NOMINATOR_CONNECTION_LIST, QUERY_OPERATOR_CONNECTION_SUMMARY } from 'Operator/query'

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

  const handleNavigate = useCallback(
    (url: string) => {
      setIsOpen(false)
      navigate(url)
    },
    [setIsOpen, navigate],
  )
  const theme = selectedChain.isDomain ? 'ethereum' : 'beachball'

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
      first: 100,
      orderBy: 'id_ASC',
      // eslint-disable-next-line camelcase
      where: subspaceAccount ? { operatorOwner_eq: subspaceAccount } : {},
    }),
    [subspaceAccount],
  )
  const nominatorsConnectionVariables = useMemo(
    () => ({
      first: 100,
      after: undefined,
      orderBy: 'id_ASC',
      // eslint-disable-next-line camelcase
      where: subspaceAccount ? { account: { id_eq: subspaceAccount } } : {},
    }),
    [subspaceAccount],
  )
  const lastExtrinsicsVariables = useMemo(
    () => ({
      first: 10,
      after: undefined,
      orderBy: 'id_ASC',
      // eslint-disable-next-line camelcase
      where: subspaceAccount ? { signer: { id_eq: subspaceAccount } } : {},
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

  const {
    data: lastExtrinsicsData,
    error: lastExtrinsicsError,
    loading: lastExtrinsicsLoading,
  } = useQuery(QUERY_EXTRINSIC_LIST_CONNECTION, {
    variables: lastExtrinsicsVariables,
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

  const lastExtrinsics: ExtrinsicsConnection['edges'] = useMemo(
    () =>
      lastExtrinsicsData &&
      lastExtrinsicsData.extrinsicsConnection &&
      lastExtrinsicsData.extrinsicsConnection.edges
        ? lastExtrinsicsData.extrinsicsConnection.edges
        : [],
    [lastExtrinsicsData],
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
        <article className='relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full gap-6'>
          <div className='flex items-center align-middle justify-between p-5'>
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
          <div className='p-5 m-2 bg-[#DDEFF1] rounded-[20px] dark:bg-[#1E254E] dark:text-white'>
            {subspaceAccount && (
              <Accordion
                title={
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
                      <Identicon value={subspaceAccount} size={48} theme={theme} />
                      <div className='relative'>
                        {actingAccount && (
                          <span className='hidden sm:block ml-2 truncate w-5 text-lg underline md:w-full text-[#241235] font-medium dark:text-white'>
                            {actingAccount.name}
                          </span>
                        )}
                        <span className='hidden sm:block ml-2 truncate w-5 text-lg underline md:w-full text-[#241235] font-medium dark:text-white'>
                          {shortString(subspaceAccount)}
                        </span>
                      </div>
                    </div>
                  </Link>
                }
              >
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
                      {subspaceAccount && (
                        <CopyButton value={subspaceAccount} message='Wallet address copied'>
                          <span className='hidden sm:block ml-2 truncate w-5 text-sm md:w-full text-[#241235] font-medium dark:text-white'>
                            {subspaceAccount}
                          </span>
                        </CopyButton>
                      )}
                    </div>
                    <div className='flex items-center m-2 pt-4'>
                      <span className='text-[#241235] text-base font-medium dark:text-white'>
                        Your Subspace Wallet Balance
                      </span>
                    </div>
                    <div className='flex items-center m-2'>
                      {limitNumberDecimals(walletBalance)} {tokenSymbol}
                    </div>
                  </>
                )}
              </Accordion>
            )}
          </div>
          {totalStake !== '0' && (
            <div className='p-5 m-2 mt-0 bg-[#DDEFF1] rounded-[20px] dark:bg-[#1E254E] dark:text-white'>
              <Accordion
                title={
                  <div className='flex items-center m-2 mb-0 pt-4'>
                    <span className='text-[#241235] text-base font-medium dark:text-white'>
                      Staking Summary
                    </span>
                  </div>
                }
              >
                <List>
                  <StyledListItem title='Your total staked'>
                    {bigNumberToNumber(totalStake)} {tokenSymbol}
                  </StyledListItem>
                  {totalOperatorStake !== '0' && (
                    <StyledListItem title='Your total staked in your own operators'>
                      {bigNumberToNumber(totalOperatorStake)} {tokenSymbol}
                    </StyledListItem>
                  )}
                  {totalNominatedStake !== '0' && (
                    <StyledListItem title='Your total nominated to other operators'>
                      {bigNumberToNumber(totalNominatedStake)} {tokenSymbol}
                    </StyledListItem>
                  )}
                  {totalOperatorCount > 0 && (
                    <StyledListItem title='Amount of operators you control'>
                      {totalOperatorCount}
                    </StyledListItem>
                  )}
                  {totalNominatedCount > 0 && (
                    <StyledListItem title='Amount of nomination'>
                      {totalNominatedCount}
                    </StyledListItem>
                  )}
                </List>
              </Accordion>
            </div>
          )}

          <div className='p-5 m-2 mt-0 bg-[#DDEFF1] rounded-[20px] dark:bg-[#1E254E] dark:text-white'>
            <Accordion
              title={
                <div className='flex items-center m-2 mb-0 pt-4'>
                  <span className='text-[#241235] text-base font-medium dark:text-white'>
                    Last extrinsics
                  </span>
                </div>
              }
            >
              {lastExtrinsics && lastExtrinsics.length > 0 ? (
                <List>
                  {lastExtrinsics.map((extrinsic, index) => (
                    <StyledListItem
                      key={index}
                      title={dayjs(extrinsic.node.block.timestamp).fromNow(true)}
                    >
                      {extrinsic.node.name.split('.')[1].toUpperCase()}
                      <StatusIcon status={extrinsic.node.success} />
                    </StyledListItem>
                  ))}
                </List>
              ) : (
                <div className='flex items-center m-2 pt-4'>
                  <span className='text-[#241235] text-base font-medium dark:text-white'>
                    {!lastExtrinsicsLoading &&
                      lastExtrinsicsError &&
                      'We are unable to load your extrinsics data'}
                    {lastExtrinsicsLoading && <Spinner />}
                    {!lastExtrinsicsError && !lastExtrinsicsLoading && 'No extrinsics to show'}
                  </span>
                </div>
              )}
            </Accordion>
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
