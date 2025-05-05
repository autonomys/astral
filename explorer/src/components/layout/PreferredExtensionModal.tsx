import { cn } from '@/utils/cn'
import { ChevronLeftIcon, LinkIcon } from '@heroicons/react/24/outline'
import { getWallets, type Wallet } from '@talismn/connect-wallets'
import { Modal } from 'components/common/Modal'
import { SupportedWalletExtension } from 'constants/wallet'
import useWallet from 'hooks/useWallet'
import Image from 'next/image'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

type PreferredExtensionModalProps = {
  isOpen: boolean
  onClose: () => void
}

type WalletOptionProps = {
  wallet: Wallet
  index: number
  onInstall: (wallet: Wallet) => void
  onConnect: (wallet: Wallet) => void
}

type ConnectingStateProps = {
  wallet: Wallet
  onBack: () => void
  error: string | null
}

const getConnectingError = (error: string) => {
  if (error.includes('No accounts found')) {
    return 'No accounts found in this wallet.'
  }
  if (error.includes('No matching account')) {
    return 'No matching account available.'
  }
  if (error.includes('Failed to get injector')) {
    return 'Extension not responding.'
  }
  return 'Please try again or use a different wallet.'
}

const getIcon = (extensionName: string) => {
  switch (extensionName) {
    case SupportedWalletExtension.PolkadotJs:
      return '/images/wallets/polkadot.svg'
    case SupportedWalletExtension.SubwalletJs:
      return '/images/wallets/subwallet.svg'
    case SupportedWalletExtension.Talisman:
      return '/images/wallets/talisman.svg'
    case SupportedWalletExtension.Nova:
      return '/images/wallets/nova.svg'
    default:
      return ''
  }
}

const ConnectingState: FC<ConnectingStateProps> = ({ wallet, onBack, error }) => {
  const icon = getIcon(wallet.extensionName)

  return (
    <div className='flex flex-col items-center justify-center gap-6 py-12'>
      <button
        onClick={onBack}
        className='absolute left-5 top-5 rounded p-1 text-gray-600 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-400'
      >
        <ChevronLeftIcon className='size-5' />
      </button>

      <div className='flex flex-col items-center gap-6 p-5'>
        <div className='relative'>
          {!error ? (
            <div className='absolute -inset-2 animate-spin rounded-full border-2 border-b-primaryAccent border-l-transparent border-r-primaryAccent border-t-transparent p-8 opacity-50'></div>
          ) : (
            <div className='absolute -inset-2 rounded-full border-2 border-red-500 p-8 opacity-50'></div>
          )}
          <Image src={icon} alt={wallet.title} width={60} height={60} className='rounded-full' />
        </div>

        <div className='flex flex-col items-center gap-4 text-center'>
          <h3 className='text-xl font-medium text-gray-900 dark:text-white'>{wallet.title}</h3>

          {error ? (
            <>
              <p className='text-center text-base font-medium text-red-500 dark:text-red-400'>
                Connection Failed
              </p>
              <p className='text-center text-sm text-gray-500 dark:text-gray-400'>
                {getConnectingError(error)}
              </p>
              <button
                onClick={onBack}
                className='mt-2 rounded-md bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
              >
                Go Back
              </button>
            </>
          ) : (
            <>
              <p className='text-center text-base text-gray-600 dark:text-gray-300'>
                Requesting Connection
              </p>
              <p className='text-center text-sm text-gray-500 dark:text-gray-400'>
                Open the {wallet.title} browser
                <br />
                extension to connect your wallet.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const WalletOption: FC<WalletOptionProps> = ({ wallet, index, onInstall, onConnect }) => {
  const icon = getIcon(wallet.extensionName)

  const handleExtensionSelect = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      if (wallet.installed) {
        onConnect(wallet)
      } else {
        onInstall(wallet)
      }
    },
    [onConnect, onInstall, wallet],
  )

  return (
    <button
      onClick={handleExtensionSelect}
      key={`${wallet.extensionName}-${index}`}
      className='flex flex-col gap-3 rounded-md border border-primaryAccent p-2 hover:bg-gray-100 dark:hover:bg-transparent/10'
    >
      <div className='flex items-center gap-3'>
        <Image src={icon} alt={wallet.title} width={32} height={32} />
        <div className='text-center text-xs font-normal text-gray-900 dark:text-white'>
          {wallet?.title}
        </div>
      </div>
      {wallet?.installed ? (
        <></>
      ) : (
        <div className='justify-self-end text-xs font-medium text-primaryAccent dark:text-primaryAccent'>
          <a
            href={wallet.installUrl}
            rel='noreferrer'
            target='_blank'
            className='flex items-center gap-1'
            onClick={(e) => e.stopPropagation()}
          >
            Install
            <LinkIcon className='size-3' />
          </a>
        </div>
      )}
    </button>
  )
}

type InstallWalletViewProps = {
  wallet: Wallet
  onBack: () => void
}

const InstallWalletView: FC<InstallWalletViewProps> = ({ wallet, onBack }) => {
  const icon = getIcon(wallet.extensionName)

  return (
    <div className='flex flex-col gap-6'>
      <button
        onClick={onBack}
        className='absolute left-5 top-5 rounded p-1 text-gray-600 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-400'
      >
        <ChevronLeftIcon className='size-5' />
      </button>

      <div className='flex flex-col items-center gap-4 p-5'>
        <Image src={icon} alt={wallet.title} width={64} height={64} />
        <h3 className='text-lg font-medium text-gray-900 dark:text-white'>Get {wallet.title}</h3>
        <p className='text-center text-sm text-gray-600 dark:text-gray-300'>
          You need to install the {wallet.title} extension to connect with this wallet.
        </p>
        <a
          href={wallet.installUrl}
          target='_blank'
          rel='noreferrer'
          className='mt-2 flex items-center gap-2 rounded-md bg-gradient-to-r from-buttonLightFrom to-buttonLightTo px-4 py-1 font-normal text-white dark:bg-boxDark dark:from-buttonDarkFrom dark:to-buttonDarkTo'
        >
          Install {wallet.title}
          <LinkIcon className='size-4' />
        </a>
      </div>
    </div>
  )
}

export const PreferredExtensionModal: FC<PreferredExtensionModalProps> = ({ isOpen, onClose }) => {
  const wallets = getWallets()
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null)
  const [connectingWallet, setConnectingWallet] = useState<Wallet | null>(null)
  const [connectingError, setConnectingError] = useState<string | null>(null)
  const { handleSelectFirstWalletFromExtension, connectionError } = useWallet()

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSelectedWallet(null)
        setConnectingWallet(null)
        setConnectingError(null)
      }, 200)
    }
  }, [isOpen])

  useEffect(() => {
    if (connectionError) {
      console.log('Connection error detected:', connectionError.message)
      setConnectingError(connectionError.message)
    }
  }, [connectionError])

  const uniqueWallets = useMemo(() => {
    const set = new Set(wallets.map((extension) => extension.extensionName))
    return Array.from(set)
      .map((e) => wallets.find((w) => w.extensionName === e))
      .filter((item): item is Wallet => item !== undefined)
  }, [wallets])

  const supportedWallets = useMemo(
    () =>
      uniqueWallets.filter(
        (item) =>
          (Object.values(SupportedWalletExtension) as string[]).includes(item.extensionName) &&
          item,
      ),
    [uniqueWallets],
  )

  const handleInstallWallet = useCallback((wallet: Wallet) => {
    setSelectedWallet(wallet)
  }, [])

  const handleBack = useCallback(() => {
    setSelectedWallet(null)
    setConnectingWallet(null)
  }, [])

  const handleConnectWallet = useCallback(
    async (wallet: Wallet) => {
      try {
        setConnectingWallet(wallet)
        setConnectingError(null)

        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error('Connection timed out. Please check if your extension is running.'))
          }, 30000)
        })

        await Promise.race([
          handleSelectFirstWalletFromExtension(wallet.extensionName),
          timeoutPromise,
        ])

        onClose()
      } catch (err) {
        console.error('Failed to connect wallet:', err)
        setConnectingError(err instanceof Error ? err.message : 'Failed to connect')
      }
    },
    [handleSelectFirstWalletFromExtension, onClose],
  )

  const modalTitle = useMemo(() => {
    if (connectingWallet) {
      return connectingWallet.title
    }
    if (selectedWallet) {
      return `Get ${selectedWallet.title}`
    }
    return 'Select your extension'
  }, [connectingWallet, selectedWallet])

  const WalletsOption = useMemo(
    () =>
      supportedWallets.map((wallet, index) => (
        <WalletOption
          key={index}
          wallet={wallet}
          index={index}
          onInstall={handleInstallWallet}
          onConnect={handleConnectWallet}
        />
      )),
    [supportedWallets, handleInstallWallet, handleConnectWallet],
  )

  return (
    <Modal
      title={modalTitle}
      showTitle={false}
      onClose={onClose}
      isOpen={isOpen}
      size='sm'
      closeButtonClassName={cn(
        'top-3 right-4',
        (selectedWallet || connectingWallet) && 'top-5 right-5',
      )}
      contentClassName={cn('py-4', (selectedWallet || connectingWallet) && 'p-5')}
    >
      <div className='flex flex-col gap-4'>
        {connectingWallet ? (
          <ConnectingState wallet={connectingWallet} onBack={handleBack} error={connectingError} />
        ) : selectedWallet ? (
          <InstallWalletView wallet={selectedWallet} onBack={handleBack} />
        ) : (
          <>
            <p className='text-base font-medium text-gray-800 dark:text-gray-300'>Connect Wallet</p>
            <div className='grid grid-cols-2 gap-4 pb-4 pt-2'>{WalletsOption}</div>
          </>
        )}
      </div>
    </Modal>
  )
}
