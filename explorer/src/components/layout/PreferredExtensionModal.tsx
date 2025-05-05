import { cn } from '@/utils/cn'
import { ChevronLeftIcon, LinkIcon } from '@heroicons/react/24/outline'
import { getWallets, type Wallet } from '@talismn/connect-wallets'
import { Modal } from 'components/common/Modal'
import { SupportedWalletExtension } from 'constants/wallet'
import useWallet from 'hooks/useWallet'
import Image from 'next/image'
import React, { FC, useCallback, useMemo, useState } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

type WalletOptionProps = {
  wallet: Wallet
  index: number
  onClose: () => void
  onInstall: (wallet: Wallet) => void
}

const WalletOption: FC<WalletOptionProps> = ({ wallet, index, onClose, onInstall }) => {
  const { handleSelectFirstWalletFromExtension } = useWallet()

  const handleExtensionSelect = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, extension: string) => {
      e.preventDefault()
      if (wallet.installed) {
        handleSelectFirstWalletFromExtension(extension)
        onClose()
      } else {
        onInstall(wallet)
      }
    },
    [handleSelectFirstWalletFromExtension, onClose, onInstall, wallet],
  )

  const icon = useMemo(() => {
    switch (wallet.extensionName) {
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
  }, [wallet.extensionName])

  return (
    <button
      onClick={(e) => handleExtensionSelect(e, wallet.extensionName)}
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
  const icon = useMemo(() => {
    switch (wallet.extensionName) {
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
  }, [wallet.extensionName])

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

export const PreferredExtensionModal: FC<Props> = ({ isOpen, onClose }) => {
  const wallets = getWallets()
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null)

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
  }, [])

  const WalletsOption = useMemo(
    () =>
      supportedWallets.map((wallet, index) => (
        <WalletOption
          key={index}
          wallet={wallet}
          index={index}
          onClose={onClose}
          onInstall={handleInstallWallet}
        />
      )),
    [supportedWallets, onClose, handleInstallWallet],
  )

  return (
    <Modal
      title='Select your extension'
      showTitle={false}
      onClose={onClose}
      isOpen={isOpen}
      size='sm'
      closeButtonClassName={cn('top-3 right-4', selectedWallet && 'top-5 right-5')}
      contentClassName={cn('py-4', selectedWallet && 'p-5')}
    >
      <div className='flex flex-col gap-4'>
        {selectedWallet ? (
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
