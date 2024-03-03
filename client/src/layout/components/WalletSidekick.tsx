/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useQuery } from '@apollo/client'
import {
  ExclamationTriangleIcon,
  LockClosedIcon,
  PaperAirplaneIcon,
  PencilIcon,
  QrCodeIcon,
} from '@heroicons/react/24/outline'
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
import {
  Accordion,
  CopyButton,
  List,
  Spinner,
  StatusIcon,
  StyledListItem,
  Tooltip,
} from 'common/components'
import {
  bigNumberToNumber,
  formatUnitsToNumber,
  limitNumberDecimals,
  numberPositionSuffix,
  shortString,
} from 'common/helpers'
import useDomains from 'common/hooks/useDomains'
import useMediaQuery from 'common/hooks/useMediaQuery'
import useWallet from 'common/hooks/useWallet'
import { LogoIcon, WalletIcon } from 'common/icons'
import { INTERNAL_ROUTES } from 'common/routes'

// query
import { QUERY_EXTRINSIC_LIST_CONNECTION } from 'Extrinsic/query'
import {
  QUERY_NOMINATORS_REWARDS_LIST,
  QUERY_OPERATORS_REWARDS_LIST,
  QUERY_REWARDS_LIST,
} from 'Leaderboard/querys'
import { QUERY_NOMINATOR_CONNECTION_LIST, QUERY_OPERATOR_CONNECTION_SUMMARY } from 'Operator/query'

type DrawerProps = {
  isOpen: boolean
  onClose: () => void
}

export const WalletSidekick: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const onClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setIsOpen(true)
  }, [])
  const onClose = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <button
        onClick={onClick}
        className={`inline-flex items-center bg-white py-2 px-2 focus:outline-none hover:bg-gray-200 text-base ${
          isDesktop ? 'ml-4 rounded-full' : 'rounded-r-full'
        } dark:bg-gradient-to-r shadow-md from-[#EA71F9] to-[#4D397A]`}
      >
        <WalletIcon width='24' height='24' />
      </button>
      <Drawer isOpen={isOpen} onClose={onClose} />
    </>
  )
}

const Drawer: FC<DrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const { selectedChain, selectedDomain } = useDomains()
  const { api, actingAccount } = useWallet()
  const { subspaceAccount } = useWallet()
  const [tokenSymbol, setTokenSymbol] = useState<string>('')
  const [walletBalance, setWalletBalance] = useState<number>(0)

  const handleNavigate = useCallback(
    (url: string) => {
      onClose()
      navigate(url)
    },
    [onClose, navigate],
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
  const topFarmersVariables = useMemo(
    () => ({
      first: 100,
      after: undefined,
      orderBy: 'amount_DESC',
      // eslint-disable-next-line camelcase
      where: { vote_gt: '0', vote_isNull: false, OR: { block_gt: '0', block_isNull: false } },
    }),
    [],
  )
  const topOperatorsVariables = useMemo(
    () => ({
      first: 100,
      after: undefined,
      orderBy: 'amount_DESC',
      // eslint-disable-next-line camelcase
      where: {},
    }),
    [],
  )
  const topNominatorsVariables = useMemo(
    () => ({
      first: 100,
      after: undefined,
      orderBy: 'operator_DESC',
      // eslint-disable-next-line camelcase
      where: { operator_gt: '0', operator_isNull: false },
    }),
    [],
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
  const {
    data: topFarmersData,
    error: topFarmersError,
    loading: topFarmersLoading,
  } = useQuery(QUERY_REWARDS_LIST, {
    variables: topFarmersVariables,
    pollInterval: 6000,
  })
  const {
    data: topOperatorsData,
    error: topOperatorsError,
    loading: topOperatorsLoading,
  } = useQuery(QUERY_OPERATORS_REWARDS_LIST, {
    variables: topOperatorsVariables,
    pollInterval: 6000,
  })
  const {
    data: topNominatorsData,
    error: topNominatorsError,
    loading: topNominatorsLoading,
  } = useQuery(QUERY_NOMINATORS_REWARDS_LIST, {
    variables: topNominatorsVariables,
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

  const topFarmers = useMemo(() => {
    if (!topFarmersData || !topFarmersData.accountRewardsConnection) return 0
    const account = topFarmersData.accountRewardsConnection.edges.find(
      (edge) => edge.node.id === subspaceAccount,
    )
    if (!account) return 0
    return account.cursor
  }, [topFarmersData, subspaceAccount])

  const topOperators = useMemo(() => {
    if (!topOperatorsData || !topOperatorsData.accountRewardsConnection) return 0
    const account = topOperatorsData.accountRewardsConnection.edges.find(
      (edge) => edge.node.id === subspaceAccount,
    )
    if (!account) return 0
    return account.cursor
  }, [topOperatorsData, subspaceAccount])

  const topNominators = useMemo(() => {
    if (!topNominatorsData || !topNominatorsData.accountRewardsConnection) return 0
    const account = topNominatorsData.accountRewardsConnection.edges.find(
      (edge) => edge.node.id === subspaceAccount,
    )
    if (!account) return 0
    return account.cursor
  }, [topNominatorsData, subspaceAccount])

  const hasTopPositions = useMemo(
    () => topFarmers > 0 || topOperators > 0 || topNominators > 0,
    [topFarmers, topOperators, topNominators],
  )

  useEffect(() => {
    loadData()
  }, [api, loadData])

  useEffect(() => {
    loadWalletBalance()
  }, [api, actingAccount, loadWalletBalance])

  if (operatorsConnectionLoading) return <Spinner />

  return (
    // backdrop
    <div onClick={onClose}>
      <nav
        className={
          'fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ' +
          (isOpen
            ? ' transition-opacity opacity-100 duration-500 translate-x-0 z-max'
            : ' transition-all delay-500 opacity-0 translate-x-full')
        }
      >
        <section
          onClick={(e) => e.stopPropagation()}
          className={
            'w-screen max-w-lg right-0 absolute bg-light dark:bg-dark h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform -z-10' +
            (isOpen ? ' translate-x-0 ' : ' translate-x-full ')
          }
        >
          <HeaderBackground />
          <article className='relative w-screen max-w-lg pb-10 flex flex-col overflow-y-scroll h-full gap-2'>
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
                  onClick={onClose}
                >
                  x
                </button>
              </div>
            </div>
            {subspaceAccount && (
              <div className='flex gap-3 items-center justify-center'>
                <Tooltip text='Send tSSC'>
                  <button className='flex items-center justify-center cursor-default m-2 p-2 rounded-full bg-[#DE67E4]'>
                    <PaperAirplaneIcon className='w-8 text-white' />
                  </button>
                </Tooltip>
                <Tooltip text='Receive tSSC'>
                  <button className='flex items-center justify-center cursor-default m-2 p-2 rounded-full bg-[#DE67E4]'>
                    <QrCodeIcon className='w-8 text-white' />
                  </button>
                </Tooltip>
                <Tooltip text='Sign Message'>
                  <button className='flex items-center justify-center cursor-default m-2 p-2 rounded-full bg-[#DE67E4]'>
                    <LockClosedIcon className='w-8 text-white' />
                  </button>
                </Tooltip>
                <Tooltip text='Send Remark'>
                  <button className='flex items-center justify-center cursor-default m-2 p-2 rounded-full bg-[#DE67E4]'>
                    <PencilIcon className='w-8 text-white' />
                  </button>
                </Tooltip>
              </div>
            )}
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
                  {topFarmersLoading ? (
                    <Spinner />
                  ) : (
                    topFarmers > 0 && (
                      <Link
                        data-testid='topFarmers-link'
                        className='hover:text-[#DE67E4]'
                        to={`../${selectedChain.urls.page}/leaderboard/${INTERNAL_ROUTES.leaderboard.farmers}`}
                      >
                        <span className='bg-[#DE67E4] rounded-full p-2 text-[#241235] text-base font-medium dark:text-white'>
                          Top {Math.ceil(topFarmers / 10) * 10} Farmer
                        </span>
                      </Link>
                    )
                  )}
                  {topFarmersError && (
                    <ExclamationTriangleIcon className='h-5 w-5' stroke='orange' />
                  )}
                  {topOperatorsLoading ? (
                    <Spinner />
                  ) : (
                    topOperators > 0 && (
                      <Link
                        data-testid='topOperators-link'
                        className='hover:text-[#DE67E4]'
                        to={`../${selectedChain.urls.page}/leaderboard/${INTERNAL_ROUTES.leaderboard.operators}`}
                      >
                        <span className='bg-[#DE67E4] rounded-full p-2 text-[#241235] text-base font-medium dark:text-white'>
                          Top {Math.ceil(topOperators / 10) * 10} Operator
                        </span>
                      </Link>
                    )
                  )}
                  {topOperatorsError && (
                    <ExclamationTriangleIcon className='h-5 w-5' stroke='orange' />
                  )}
                  {topNominatorsLoading ? (
                    <Spinner />
                  ) : (
                    topNominators > 0 && (
                      <Link
                        data-testid='topNominators-link'
                        className='hover:text-[#DE67E4]'
                        to={`../${selectedChain.urls.page}/leaderboard/${INTERNAL_ROUTES.leaderboard.nominators}`}
                      >
                        <span className='bg-[#DE67E4] rounded-full p-2 text-[#241235] text-base font-medium dark:text-white'>
                          Top {Math.ceil(topNominators / 10) * 10} Nominator
                        </span>
                      </Link>
                    )
                  )}
                  {topNominatorsError && (
                    <ExclamationTriangleIcon className='h-5 w-5' stroke='orange' />
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
                {totalStake !== '0' ? (
                  <List>
                    <StyledListItem title='Your total staked'>
                      {bigNumberToNumber(totalStake)} {tokenSymbol}
                    </StyledListItem>
                    {totalOperatorStake !== '0' && (
                      <li key={'totalOperatorStake'}>
                        <Link
                          data-testid='totalOperatorStake-link'
                          className='hover:text-[#DE67E4]'
                          to={`../${selectedChain.urls.page}/operators/${INTERNAL_ROUTES.operators.manage}`}
                        >
                          <StyledListItem title='Your total staked in your own operators'>
                            {bigNumberToNumber(totalOperatorStake)} {tokenSymbol}
                          </StyledListItem>
                        </Link>
                      </li>
                    )}
                    {totalNominatedStake !== '0' && (
                      <li key={'totalNominatedStake'}>
                        <Link
                          data-testid='totalNominatedStake-link'
                          className='hover:text-[#DE67E4]'
                          to={`../${selectedChain.urls.page}/operators/${INTERNAL_ROUTES.operators.nomination}`}
                        >
                          <StyledListItem title='Your total nominated to other operators'>
                            {bigNumberToNumber(totalNominatedStake)} {tokenSymbol}
                          </StyledListItem>
                        </Link>
                      </li>
                    )}
                    {totalOperatorCount > 0 && (
                      <li key={'totalOperatorCount'}>
                        <Link
                          data-testid='totalOperatorCount-link'
                          className='hover:text-[#DE67E4]'
                          to={`../${selectedChain.urls.page}/operators/${INTERNAL_ROUTES.operators.manage}`}
                        >
                          <StyledListItem title='Amount of operators you control'>
                            {totalOperatorCount}
                          </StyledListItem>
                        </Link>
                      </li>
                    )}
                    {totalNominatedCount > 0 && (
                      <li key={'totalNominatedCount'}>
                        <Link
                          data-testid='totalNominatedCount-link'
                          className='hover:text-[#DE67E4]'
                          to={`../${selectedChain.urls.page}/operators/${INTERNAL_ROUTES.operators.nomination}`}
                        >
                          <StyledListItem title='Amount of nomination'>
                            {totalNominatedCount}
                          </StyledListItem>
                        </Link>
                      </li>
                    )}
                  </List>
                ) : (
                  <div className='flex items-center m-2 pt-4'>
                    <Link
                      data-testid='totalNominatedCount-link'
                      className='hover:text-[#DE67E4]'
                      to={`../${selectedChain.urls.page}/operators/${INTERNAL_ROUTES.operators.list}`}
                    >
                      <span className='text-[#241235] text-sm font-medium dark:text-white'>
                        Your wallet has not staked any {tokenSymbol} yet! Head over to the operators
                        page to stake your {tokenSymbol}
                      </span>
                    </Link>
                  </div>
                )}
              </Accordion>
            </div>
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
                      <li key={index}>
                        <Link
                          data-testid='extrinsic-link'
                          className='hover:text-[#DE67E4]'
                          to={INTERNAL_ROUTES.extrinsics.id.page(
                            selectedChain.urls.page,
                            'consensus',
                            extrinsic.node.id,
                          )}
                        >
                          <StyledListItem
                            title={dayjs(extrinsic.node.block.timestamp).fromNow(true)}
                          >
                            {extrinsic.node.name.split('.')[1].toUpperCase()}
                            <StatusIcon status={extrinsic.node.success} />
                          </StyledListItem>
                        </Link>
                      </li>
                    ))}
                  </List>
                ) : (
                  <div className='flex items-center m-2 pt-4'>
                    <span className='text-[#241235] text-sm font-medium dark:text-white'>
                      {!lastExtrinsicsLoading &&
                        lastExtrinsicsError &&
                        'We are unable to load your extrinsics data'}
                      {lastExtrinsicsLoading && <Spinner />}
                      {!lastExtrinsicsError &&
                        !lastExtrinsicsLoading &&
                        'Your wallet has no extrinsics!'}
                    </span>
                  </div>
                )}
              </Accordion>
            </div>
            <div className='p-5 m-2 mt-0 bg-[#DDEFF1] rounded-[20px] dark:bg-[#1E254E] dark:text-white'>
              <Accordion
                title={
                  <div className='flex items-center m-2 mb-0 pt-4'>
                    <span className='text-[#241235] text-base font-medium dark:text-white'>
                      Leaderboard
                    </span>
                  </div>
                }
              >
                {hasTopPositions ? (
                  <List>
                    {topFarmers > 0 && (
                      <li key='topFarmers'>
                        <Link
                          data-testid='topFarmers-link'
                          className='hover:text-[#DE67E4]'
                          to={`../${selectedChain.urls.page}/leaderboard/${INTERNAL_ROUTES.leaderboard.farmers}`}
                        >
                          <StyledListItem title='Top Farmer'>
                            {numberPositionSuffix(topFarmers)} place
                          </StyledListItem>
                        </Link>
                      </li>
                    )}
                    {topOperators > 0 && (
                      <li key='topOperators'>
                        <Link
                          data-testid='topOperators-link'
                          className='hover:text-[#DE67E4]'
                          to={`../${selectedChain.urls.page}/leaderboard/${INTERNAL_ROUTES.leaderboard.operators}`}
                        >
                          <StyledListItem title='Top Operator'>
                            {numberPositionSuffix(topOperators)} place
                          </StyledListItem>
                        </Link>
                      </li>
                    )}
                    {topNominators > 0 && (
                      <li key='topNominators'>
                        <Link
                          data-testid='topNominators-link'
                          className='hover:text-[#DE67E4]'
                          to={`../${selectedChain.urls.page}/leaderboard/${INTERNAL_ROUTES.leaderboard.nominators}`}
                        >
                          <StyledListItem title='Top Nominator'>
                            {numberPositionSuffix(topNominators)} place
                          </StyledListItem>
                        </Link>
                      </li>
                    )}
                  </List>
                ) : (
                  <div className='flex items-center m-2 pt-4'>
                    <Link
                      data-testid='totalNominatedCount-link'
                      className='hover:text-[#DE67E4]'
                      to={`../${selectedChain.urls.page}/leaderboard/${INTERNAL_ROUTES.leaderboard.farmers}`}
                    >
                      <span className='text-[#241235] text-sm font-medium dark:text-white'>
                        Your wallet is not in any of the top 100 leaderboard positions!
                      </span>
                    </Link>
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
    </div>
  )
}
