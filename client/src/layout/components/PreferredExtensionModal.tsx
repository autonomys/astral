import { LinkIcon } from '@heroicons/react/24/outline'
import { getWallets } from '@subwallet/wallet-connect/dotsama/wallets'

import Modal from 'common/components/Modal'
import useWallet from 'common/hooks/useWallet'

import React, { FC } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const PreferredExtensionModal: FC<Props> = ({ isOpen, onClose }) => {
  const dotsamaWallets = getWallets()

  const { handleSelectFirstWalletFromExtension } = useWallet()

  const handleExtensionSelect = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    extension: string,
  ) => {
    e.preventDefault()
    handleSelectFirstWalletFromExtension(extension)
    onClose()
  }

  const supportedWallets = dotsamaWallets.filter((item) => {
    if (item.extensionName === 'polkadot-js' || item.extensionName === 'subwallet-js') {
      return item
    }
  })

  return (
    <Modal title='Select your extension' onClose={onClose} isOpen={isOpen}>
      <div className='flex flex-col gap-4 items-start'>
        <div className='flex flex-col gap-4 items-center'>
          <div className='grid grid-cols-2 gap-4'>
            {supportedWallets.map((wallet, index) => (
              <button
                onClick={(e) => handleExtensionSelect(e, wallet.extensionName)}
                key={`${wallet.extensionName}-${index}`}
                className='flex flex-col gap-3 rounded-md border border-[#DE67E4] px-2 py-2 hover:bg-gray-100 dark:hover:bg-transparent/10'
              >
                <div className='flex gap-3 items-center'>
                  <img alt={wallet.logo?.alt} className='h-5 w-5' src={wallet.logo?.src} />
                  <div className='text-gray-900 font-normal text-center text-xs dark:text-white '>
                    {wallet?.title}
                  </div>
                </div>
                {wallet?.installed ? (
                  <></>
                ) : (
                  <div className='text-xs text-indigo-500 dark:text-[#DE67E4] font-medium justify-self-end'>
                    <div className='flex gap-1 items-center'>
                      <a href={wallet.installUrl} rel='noreferrer' target='_blank'>
                        Install
                      </a>
                      <LinkIcon className='h-3 w-3' />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <button
          className='w-full max-w-fit flex px-2 gap-2 text-sm md:text-base items-center md:space-x-4 rounded-full bg-[#241235] text-white font-medium dark:bg-[#1E254E]'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}

export default PreferredExtensionModal
