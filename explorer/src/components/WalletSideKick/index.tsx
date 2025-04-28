'use client'

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { sendGAEvent } from '@next/third-parties/google'
import { LogoIcon } from 'components/icons/LogoIcon'
import { HeaderBackground } from 'components/layout/HeaderBackground'
import { ROUTE_EXTRA_FLAGS, ROUTE_EXTRA_FLAG_TYPE } from 'constants/routes'
import { WalletType } from 'constants/wallet'
import useIndexers from 'hooks/useIndexers'
import useMediaQuery from 'hooks/useMediaQuery'
import useWallet from 'hooks/useWallet'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { formatUnitsToNumber } from 'utils/number'
import { currentYear } from 'utils/time'
import { AccountHeader } from './AccountHeader'
import { AccountSummary } from './AccountSummary'
import { GetDiscordRoles } from './GetDiscordRoles'
import { LastExtrinsics } from './LastExtrinsics'
import { Leaderboard } from './Leaderboard'
import { PendingTransactions } from './PendingTransactions'
import { StakingSummary } from './StakingSummary'

type DrawerProps = {
  isOpen: boolean
  onCloseSidebar: () => void
}

export const WalletSidekick: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get(ROUTE_EXTRA_FLAG_TYPE.WALLET_SIDEKICK)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      try {
        replace(
          `?${ROUTE_EXTRA_FLAG_TYPE.WALLET_SIDEKICK}=${ROUTE_EXTRA_FLAGS.walletSidekick.OPEN}`,
        )
        setIsOpen(true)
      } catch (error) {
        console.error('Failed to open wallet sidekick:', error)
      }
    },
    [replace],
  )

  const onCloseSidebar = useCallback(() => {
    replace('?')
    setIsOpen(false)
  }, [replace])

  useEffect(() => {
    if (search === 'open') setIsOpen(true)
  }, [search])

  useEffect(() => {
    sendGAEvent('event', 'walletSideKick_open_close', { value: isOpen ? 'open' : 'close' })
  }, [isOpen])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onCloseSidebar()
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen, onCloseSidebar])

  return (
    <>
      <button
        onClick={onClick}
        className={`inline-flex items-center justify-center bg-white text-base hover:bg-gray-200 focus:outline-none ${
          isDesktop ? 'ml-2 rounded-full p-2' : 'w-10 rounded-r-full'
        } shadow-md dark:bg-buttonLightTo`}
      >
        <div className='flex h-6 min-h-6 w-6 min-w-6 items-center justify-center'>
          <Image
            src='/images/icons/wallet-addresses-small.webp'
            alt='Wallet list'
            width={24}
            height={24}
            className='h-[24px] min-h-[24px] w-[24px] min-w-[24px]'
          />
        </div>
      </button>
      {isOpen && (
        <div className='fixed inset-0 z-20 bg-gray-900 bg-opacity-25' onClick={onCloseSidebar} />
      )}
      <div
        className={`fixed right-0 top-0 z-30 h-full w-screen max-w-lg transform bg-light transition-transform duration-300 ease-in-out dark:bg-dark ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <Drawer isOpen={isOpen} onCloseSidebar={onCloseSidebar} />
      </div>
    </>
  )
}

const Drawer: FC<DrawerProps> = ({ isOpen, onCloseSidebar }) => {
  const { push } = useRouter()
  const { network, section } = useIndexers()
  const { api, actingAccount, sessionSubspaceAccount } = useWallet()
  const [tokenSymbol, setTokenSymbol] = useState<string>('')
  const [walletBalance, setWalletBalance] = useState<number>(0)

  const handleNavigate = useCallback(
    (url: string) => {
      onCloseSidebar()
      push(url)
    },
    [onCloseSidebar, push],
  )

  const loadData = useCallback(async () => {
    if (!api) return

    const properties = await api.rpc.system.properties()
    setTokenSymbol((properties.tokenSymbol.toJSON() as string[])[0])
  }, [api])

  const loadWalletBalance = useCallback(async () => {
    if (!api || !actingAccount) return

    if (actingAccount.type === WalletType.subspace) {
      const balance = await api.query.system.account(actingAccount.address)
      setWalletBalance(
        formatUnitsToNumber((balance.toJSON() as { data: { free: string } }).data.free),
      )
    }
  }, [api, actingAccount])

  useEffect(() => {
    loadData()
  }, [api, loadData])

  useEffect(() => {
    loadWalletBalance()
  }, [api, sessionSubspaceAccount, loadWalletBalance])

  if (!isOpen) return null
  if (!sessionSubspaceAccount) return null

  return (
    // backdrop
    <section onClick={(e) => e.stopPropagation()} className='w-screen max-w-lg'>
      <HeaderBackground />
      <article className='relative flex h-screen w-screen max-w-lg flex-col gap-2 overflow-y-scroll pb-10'>
        <div className='flex items-center justify-between p-5 align-middle'>
          <button
            onClick={() => handleNavigate(`/${network}/${section}`)}
            className='title-font flex items-center font-medium text-gray-900 dark:text-white'
          >
            <LogoIcon fillColor='currentColor' />
          </button>
          <div className='flex items-center gap-3'>
            <button
              className='items-center rounded-full bg-white px-4 py-2 dark:bg-blueAccent dark:text-white'
              onClick={onCloseSidebar}
            >
              x
            </button>
          </div>
        </div>
        <AccountHeader walletBalance={walletBalance} tokenSymbol={tokenSymbol} />
        {sessionSubspaceAccount && (
          <>
            <AccountSummary
              subspaceAccount={sessionSubspaceAccount}
              actingAccountName={actingAccount?.name}
              walletBalance={walletBalance}
              tokenSymbol={tokenSymbol}
            />
            <PendingTransactions subspaceAccount={sessionSubspaceAccount} />
            <GetDiscordRoles />
            <StakingSummary subspaceAccount={sessionSubspaceAccount} tokenSymbol={tokenSymbol} />
            <LastExtrinsics subspaceAccount={sessionSubspaceAccount} />
            <Leaderboard subspaceAccount={sessionSubspaceAccount} />
          </>
        )}
        <div className='flex'>
          <div className='flex flex-col flex-wrap justify-items-end pb-1 pl-5 pt-10 sm:hidden sm:flex-row'>
            <p className='text-gray text-center text-sm sm:text-left'>
              © {currentYear()} Autonomys Network, Inc. All Rights Reserved
            </p>
          </div>
        </div>
      </article>
    </section>
  )
}
