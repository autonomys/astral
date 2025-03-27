'use client'

import { PreferredExtensionModal } from 'components/layout/PreferredExtensionModal'
import useMediaQuery from 'hooks/useMediaQuery'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'

export const WalletButton: React.FC = () => {
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
          isDesktop ? 'w-36' : 'w-10 p-2'
        } rounded-full bg-gradient-to-r from-buttonLightFrom to-buttonLightTo font-medium text-white dark:bg-boxDark dark:from-buttonDarkFrom dark:to-buttonDarkTo md:mt-3`}
      >
        {isDesktop ? (
          'Connect Wallet'
        ) : (
          <Image
            src='/images/icons/wallet-addresses-small.webp'
            alt='Wallet list'
            width={24}
            height={24}
          />
        )}
      </button>
      <PreferredExtensionModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
