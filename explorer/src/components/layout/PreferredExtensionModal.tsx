import { LinkIcon } from '@heroicons/react/24/outline'
import { getWallets, type Wallet } from '@talismn/connect-wallets'
import { Modal } from 'components/common/Modal'
import { SupportedWalletExtension } from 'constants/wallet'
import useWallet from 'hooks/useWallet'
import Image from 'next/image'
import React, { FC, useCallback, useMemo } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

type WalletOptionProps = {
  wallet: Wallet
  index: number
  onClose: () => void
}

const WalletOption: FC<WalletOptionProps> = ({ wallet, index, onClose }) => {
  const { handleSelectFirstWalletFromExtension } = useWallet()

  const handleExtensionSelect = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, extension: string) => {
      e.preventDefault()
      handleSelectFirstWalletFromExtension(extension)
      onClose()
    },
    [handleSelectFirstWalletFromExtension, onClose],
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
        <div className='justify-self-end text-xs font-medium text-indigo-500 dark:text-primaryAccent'>
          <div className='flex items-center gap-1'>
            <a href={wallet.installUrl} rel='noreferrer' target='_blank'>
              Install
            </a>
            <LinkIcon className='size-3' />
          </div>
        </div>
      )}
    </button>
  )
}

export const PreferredExtensionModal: FC<Props> = ({ isOpen, onClose }) => {
  const wallets = getWallets()

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

  const WalletsOption = useMemo(
    () =>
      supportedWallets.map((wallet, index) => (
        <WalletOption key={index} wallet={wallet} index={index} onClose={onClose} />
      )),
    [supportedWallets, onClose],
  )

  return (
    <Modal title='Select your extension' onClose={onClose} isOpen={isOpen}>
      <div className='flex flex-col items-start gap-4'>
        <div className='flex flex-col items-center gap-4'>
          <div className='grid grid-cols-2 gap-4'>{WalletsOption}</div>
        </div>

        <button
          className='flex w-full max-w-fit items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white dark:bg-blueAccent md:space-x-4 md:text-base'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}
