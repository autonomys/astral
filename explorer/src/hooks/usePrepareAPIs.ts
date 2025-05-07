import { ApiPromise } from '@polkadot/api'
import { useCallback } from 'react'

type PrepareApiFn = {
  chain: string | undefined
  activate: (chain: string | undefined) => Promise<ApiPromise>
}

export const usePrepareAPIs = ({ chain = '', activate }: PrepareApiFn) => {
  const prepareApi = useCallback(async () => {
    try {
      const api = await activate(chain)
      if (!api) return

      await api.isReady

      if (typeof api.rpc.state?.subscribeRuntimeVersion === 'function') {
        api.rpc.state.subscribeRuntimeVersion(async () => {
          try {
            console.log(`[${chain}] Runtime version changed, updating metadata...`)

            // This will automatically update the API's metadata
            await api.rpc.state.getMetadata()

            console.log(`[${chain}] ✅ Metadata updated successfully.`)
          } catch (error) {
            console.error(`[${chain}] ❌ Error updating API metadata:`, error)
          }
        })
      }

      return api
    } catch (error) {
      console.error(`❌ Failed to prepare API for chain ${chain}:`, error)
    }
  }, [chain, activate])

  return prepareApi
}
