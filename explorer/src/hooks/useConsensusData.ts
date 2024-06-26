import useWallet from 'hooks/useWallet'
import { useCallback } from 'react'
import { useConsensusStates } from 'states/consensus'

export const useConsensusData = () => {
  const { setTokenDecimals, setTokenSymbol } = useConsensusStates()
  const { api } = useWallet()

  const loadData = useCallback(async () => {
    if (!api) return

    const [properties] = await Promise.all([api.rpc.system.properties()])

    const _tokenDecimals = (properties.tokenDecimals.toPrimitive() as number[])[0]
    setTokenDecimals(_tokenDecimals)
    setTokenSymbol((properties.tokenSymbol.toJSON() as string[])[0])
  }, [api, setTokenDecimals, setTokenSymbol])

  return { loadData }
}
