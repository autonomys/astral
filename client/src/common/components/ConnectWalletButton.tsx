import { WalletIcon } from '@heroicons/react/24/outline'
import useMediaQuery from 'common/hooks/useMediaQuery'
import React, { useCallback, useState } from 'react'
import PreferredExtensionModal from '../../layout/components/PreferredExtensionModal'

export const ConnectWalletButton: React.FC = () => {
  const [walletModalIsOpen, setWalletModalIsOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const handleConnectWallet = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setWalletModalIsOpen(true)
  }, [])
  const handleWalletModalOnClose = useCallback(() => setWalletModalIsOpen(false), [])

  return (
    <>
      <button
        onClick={handleConnectWallet}
        className={`h-10 ${
          isDesktop ? 'w-36' : 'w-10 py-2 px-2'
        } text-white font-medium bg-gradient-to-r from-[#EA71F9] to-[#4D397A] rounded-full`}
      >
        {isDesktop ? 'Connect Wallet' : <WalletIcon className='w-6 h-6' />}
      </button>
      <PreferredExtensionModal isOpen={walletModalIsOpen} onClose={handleWalletModalOnClose} />
    </>
  )
}
