import { WalletIcon } from '@heroicons/react/24/outline'
import useMediaQuery from 'common/hooks/useMediaQuery'
import React, { useCallback, useState } from 'react'
import PreferredExtensionModal from '../../layout/components/PreferredExtensionModal'

export const ConnectWalletButton: React.FC = () => {
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
        className={`h-10 ${
          isDesktop ? 'w-36' : 'w-10 py-2 px-2'
        } text-white font-medium bg-gradient-to-r from-[#EA71F9] to-[#4D397A] rounded-full`}
      >
        {isDesktop ? 'Connect Wallet' : <WalletIcon className='w-6 h-6' />}
      </button>
      <PreferredExtensionModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
