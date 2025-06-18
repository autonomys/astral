import { FC, ReactNode } from 'react'

interface EthersProviderProps {
  children: ReactNode
}

const EthersProvider: FC<EthersProviderProps> = ({ children }) => {
  // This is a placeholder - you can add actual ethers provider logic here
  return <>{children}</>
}

export default EthersProvider
