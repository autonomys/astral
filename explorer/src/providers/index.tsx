'use client'

import { indexers } from 'constants/indexers'
import { Routes } from 'constants/routes'
import useChains from 'hooks/useChains'
import { SessionProvider } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { ChainProvider } from 'providers/ChainProvider'
import { ThemeProvider } from 'providers/ThemeProvider'
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
  const { setIndexerSet, setSection, network, section } = useChains()

  const pathname = usePathname()

  useEffect(() => {
    const regex = new RegExp('^/([^/]+)/([^/]+)')

    const match = pathname.match(regex)

    if (match && Object.values(Routes).includes(match[2] as Routes) && match[2] !== section)
      setSection(match[2] as Routes)

    if (match && match[1] !== network) {
      const urlSelectedPage = match[1]

      const newNetwork = indexers.find((indexer) => indexer.network === urlSelectedPage)
      if (newNetwork) setIndexerSet(newNetwork)
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
