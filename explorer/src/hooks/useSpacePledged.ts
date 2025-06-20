import { spacePledged } from '@autonomys/auto-consensus'
import { activate } from '@autonomys/auto-utils'
import { useBlockchainData } from './useBlockchainData'

interface UseSpacePledgedReturn {
  spacePledgedVal: number
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

const spacePledgedFetcher = async (api: Awaited<ReturnType<typeof activate>>) =>
  Number(await spacePledged(api))

export const useSpacePledged = (chain: string): UseSpacePledgedReturn => {
  const { value, loading, error, refetch } = useBlockchainData(
    chain,
    spacePledgedFetcher,
    'space pledged',
    0,
  )

  return {
    spacePledgedVal: value,
    loading,
    error,
    refetch,
  }
}
