import { WalletContext, WalletContextValue } from 'common/providers/WalletProvider'
import { useContext } from 'react'

export const useWallet = (): WalletContextValue => {
  const context = useContext(WalletContext)

  if (!context) throw new Error('ChainContext must be used within ChainProvider')

  return context
}

export default useWallet
