import { ApiPromise } from '@polkadot/api'
import { useCallback } from 'react'

type Domain = {
  domainId: string
  rpcUrls: string[]
  [key: string]: unknown
}

type Network = {
  id: string
  domains: Domain[]
}

type CreateConnectionFn = (urls: string[]) => Promise<ApiPromise>

export const usePrepareDomainsAPIs = (
  chain: string,
  networks: Network[],
  createConnection: CreateConnectionFn,
) => {
  const prepareDomainsApis = useCallback(async () => {
    try {
      const network = networks.find((n) => n.id === chain)
      if (!network || !network.domains || network.domains.length === 0) return

      const domainConnections = await Promise.all(
        network.domains.map((domain) =>
          createConnection(domain.rpcUrls.map((url) => url.replace('https://', 'wss://'))),
        ),
      )

      const domainApis = await Promise.all(
        domainConnections.map(async (d, idx) => {
          const api = await d.isReady
          const domain = network.domains[idx]

          if (api && typeof api.rpc.state?.subscribeRuntimeVersion === 'function') {
            api.rpc.state.subscribeRuntimeVersion(async () => {
              try {
                console.log(
                  `[Domain ${domain.domainId}] Runtime upgrade detected. Updating metadata...`,
                )

                // This will automatically update the API's metadata
                await api.rpc.state.getMetadata()

                console.log(`[Domain ${domain.domainId}] ✅ Metadata updated.`)
              } catch (error) {
                console.error(`[Domain ${domain.domainId}] ❌ Error updating metadata:`, error)
              }
            })
          }

          return api
        }),
      )

      return network.domains.reduce<Record<string, unknown>>((acc, domain, index) => {
        acc[domain.domainId] = { ...domain, api: domainApis[index] }
        return acc
      }, {})
    } catch (error) {
      console.error(`❌ Failed to prepare domain APIs for chain ${chain}:`, error)
    }
  }, [chain, networks, createConnection])

  return prepareDomainsApis
}
