import { WalletContext, WalletContextValue } from 'providers/WalletProvider'
import { useContext } from 'react'

export const useWallet = (): WalletContextValue => {
  const context = useContext(WalletContext)

  if (!context) throw new Error('ChainContext must be used within WalletProvider')

  return context
}

export default useWallet
