import { blockchainSize } from '@autonomys/auto-consensus'
import { activate } from '@autonomys/auto-utils'
import { useBlockchainData } from './useBlockchainData'

interface UseHistorySizeReturn {
  historySizeVal: number
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

const blockchainSizeFetcher = async (api: Awaited<ReturnType<typeof activate>>) =>
  Number(await blockchainSize(api))

export const useHistorySize = (chain: string): UseHistorySizeReturn => {
  const { value, loading, error, refetch } = useBlockchainData(
    chain,
    blockchainSizeFetcher,
    'blockchain size',
    0,
  )

  return {
    historySizeVal: value,
    loading,
    error,
    refetch,
  }
}
