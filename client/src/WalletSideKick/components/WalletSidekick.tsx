/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import dayjs from 'dayjs'
import { FC, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// layout
import { HeaderBackground } from 'layout/components'

// common
import { formatUnitsToNumber } from 'common/helpers'
import useDomains from 'common/hooks/useDomains'
import useMediaQuery from 'common/hooks/useMediaQuery'
import useWallet from 'common/hooks/useWallet'
import { LogoIcon, WalletIcon } from 'common/icons'

// walletSidekick
import { AccountHeader } from './AccountHeader'
import { AccountSummary } from './AccountSummary'
import { LastExtrinsics } from './LastExtrinsics'
import { Leaderboard } from './Leaderboard'
import { StakingSummary } from './StakingSummary'

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
  const { api, actingAccount, subspaceAccount } = useWallet()
  const [tokenSymbol, setTokenSymbol] = useState<string>('')
  const [walletBalance, setWalletBalance] = useState<number>(0)

  const handleNavigate = useCallback(
    (url: string) => {
      onClose()
      navigate(url)
    },
    [onClose, navigate],
  )

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

  useEffect(() => {
    loadData()
  }, [api, loadData])

  useEffect(() => {
    loadWalletBalance()
  }, [api, actingAccount, loadWalletBalance])

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
            <AccountHeader
              subspaceAccount={subspaceAccount}
              walletBalance={walletBalance}
              tokenSymbol={tokenSymbol}
            />
            <AccountSummary
              subspaceAccount={subspaceAccount}
              actingAccountName={actingAccount?.name}
              walletBalance={walletBalance}
              tokenSymbol={tokenSymbol}
            />
            <StakingSummary tokenSymbol={tokenSymbol} />
            <LastExtrinsics subspaceAccount={subspaceAccount} />
            <Leaderboard subspaceAccount={subspaceAccount} />
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
