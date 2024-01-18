import Modal from 'common/components/Modal'
import useWallet from 'common/hooks/useWallet'
import PolkadotIcon from 'common/icons/PolkadotIcon'
import SubWalletIcon from 'common/icons/SubWalletIcon'

import React, { FC } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const PreferredExtensionModal: FC<Props> = ({ isOpen, onClose }) => {
  const { handleSelectFirstWalletFromExtension } = useWallet()

  const handleExtensionSelect = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    extension: string,
  ) => {
    e.preventDefault()
    handleSelectFirstWalletFromExtension(extension)
    onClose()
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className='flex flex-col gap-4 items-start'>
        <div className='flex flex-col gap-4 items-center'>
          <div className='leading-relaxed text-xl font-medium text-center dark:text-white mt-5'>
            Select your preferred extension
          </div>
          <button
            onClick={(e) => handleExtensionSelect(e, 'polkadot-js')}
            className='flex gap-3 bg-[#d9eef2] dark:bg-white px-4 py-2 rounded-md items-center justify-center'
          >
            <div className='h-5 w-5'>
              <PolkadotIcon />
            </div>
            <div className='text-gray-900 font-normal text-center text-xs dark:text-gray-900 '>
              Polkadot.js
            </div>
          </button>
          <button
            onClick={(e) => handleExtensionSelect(e, 'subwallet-js')}
            className='flex gap-3 bg-[#d9eef2] dark:bg-white px-4 py-2 rounded-md items-center justify-center'
          >
            <div className='h-6 w-6'>
              <SubWalletIcon />
            </div>
            <div className='text-gray-900 font-normal text-center text-xs dark:text-gray-900'>
              Subwallet
            </div>
          </button>
        </div>

        <button
          className='px-4 py-1 text-white font-medium bg-gradient-to-r from-[#EA71F9] to-[#4D397A] rounded-[20px]'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}

export default PreferredExtensionModal
