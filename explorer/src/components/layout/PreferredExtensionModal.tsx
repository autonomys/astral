import { LinkIcon } from '@heroicons/react/24/outline'
import { getWallets } from '@subwallet/wallet-connect/dotsama/wallets'
import type { Wallet as SubstrateWallet } from '@subwallet/wallet-connect/types'
import { Modal } from 'components/common/Modal'
import {
  EVMWalletExtension,
  SubstrateAndEVMWalletExtension,
  SubstrateWalletExtension,
  SupportedWalletExtension,
} from 'constants/wallet'
import useWallet from 'hooks/useWallet'
import Image from 'next/image'
import React, { FC, useCallback, useMemo } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

type EVMWallet = {
  extensionName: EVMWalletExtension
  title: string
  installed: boolean
  installUrl?: string
}

type Wallet = SubstrateWallet | EVMWallet

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
      case EVMWalletExtension.MetaMask:
        return '/images/wallets/metamask.svg'
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
        <div className='text-center text-xs font-normal text-gray-900 dark:text-white '>
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

  const uniqueSubstrateWallets = useMemo(() => {
    const set = new Set(wallets.map((extension) => extension.extensionName))
    return Array.from(set)
      .map((e) => wallets.find((w) => w.extensionName === e))
      .filter((item): item is SubstrateWallet => item !== undefined)
  }, [wallets])
  const substrateAndEVMWallets = useMemo(
    () =>
      uniqueSubstrateWallets.filter(
        (item) =>
          (Object.values(SubstrateAndEVMWalletExtension) as string[]).includes(
            item.extensionName,
          ) && item,
      ),
    [uniqueSubstrateWallets],
  )
  const substrateOnlyWallets = useMemo(
    () =>
      uniqueSubstrateWallets.filter(
        (item) =>
          (Object.values(SubstrateWalletExtension) as string[]).includes(item.extensionName) &&
          item,
      ),
    [uniqueSubstrateWallets],
  )
  const evmOnlyWallets = useMemo(
    () =>
      [
        {
          extensionName: 'metamask',
          title: 'MetaMask',
          installed: true,
        },
      ] as EVMWallet[],
    [],
  )

  const SubstrateAndEVMWalletsOption = useMemo(
    () =>
      substrateAndEVMWallets.map((wallet, index) => (
        <WalletOption key={index} wallet={wallet} index={index} onClose={onClose} />
      )),
    [substrateAndEVMWallets, onClose],
  )

  const SubstrateOnlyWalletsOption = useMemo(
    () =>
      substrateOnlyWallets.map((wallet, index) => (
        <WalletOption key={index} wallet={wallet} index={index} onClose={onClose} />
      )),
    [substrateOnlyWallets, onClose],
  )

  const EVMOnlyWalletsOption = useMemo(
    () =>
      evmOnlyWallets.map((wallet, index) => (
        <WalletOption key={index} wallet={wallet} index={index} onClose={onClose} />
      )),
    [evmOnlyWallets, onClose],
  )

  return (
    <Modal title='Select your extension' onClose={onClose} isOpen={isOpen}>
      <h2 className='pb-2 text-sm'>Substrate and EVM extensions</h2>
      <div className='flex flex-col items-start gap-4'>
        <div className='flex flex-col items-center gap-4'>
          <div className='grid grid-cols-2 gap-4'>{SubstrateAndEVMWalletsOption}</div>
        </div>
      </div>
      <h2 className='py-2 text-sm'>Substrate only extensions</h2>
      <div className='flex flex-col items-start gap-4'>
        <div className='flex flex-col items-center gap-4'>
          <div className='grid grid-cols-2 gap-4'>{SubstrateOnlyWalletsOption}</div>
        </div>
      </div>
      <h2 className='py-2 text-sm'>EVM only extensions</h2>
      <div className='flex flex-col items-start gap-4'>
        <div className='flex flex-col items-center gap-4'>
          <div className='grid grid-cols-2 gap-4'>{EVMOnlyWalletsOption}</div>
        </div>
      </div>
      <div className='flex flex-col items-start gap-4 pt-2'>
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
