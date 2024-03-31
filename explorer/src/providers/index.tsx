'use client'

import { ChainProvider } from '@/providers/ChainProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { Routes } from 'constants/routes'
import useDomains from 'hooks/useDomains'
import { SessionProvider } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { FC, ReactNode, useEffect } from 'react'

type ProviderProps = {
  children?: ReactNode
}

type Props = {
  children: ReactNode
}

const WalletProvider = dynamic(
  () => import('providers/WalletProvider').then((m) => m.WalletProvider),
  {
    ssr: false,
  },
)

const UpdateSelectedChainByPath = ({ children }: Props) => {
  const { setSelectedChain, setSelectedDomain, selectedChain, selectedDomain, chains } =
    useDomains()

  const pathname = usePathname()

  useEffect(() => {
    const regex = new RegExp('^/([^/]+)/([^/]+)')

    const match = pathname.match(regex)

    if (match && Object.values(Routes).includes(match[2] as Routes) && match[2] !== selectedDomain)
      setSelectedDomain(match[2])

    if (match && match[1] !== selectedChain.urls.page) {
      const urlSelectedPage = match[1]

      const newChain = chains.find((chain) => chain.urls.page === urlSelectedPage)
      if (newChain) setSelectedChain(newChain)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return <>{children}</>
}

export const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <ChainProvider>
      <ThemeProvider>
        <SessionProvider>
          <WalletProvider>
            <UpdateSelectedChainByPath>{children}</UpdateSelectedChainByPath>
          </WalletProvider>
        </SessionProvider>
      </ThemeProvider>
    </ChainProvider>
  )
}
