import useWallet from 'hooks/useWallet'
import { useCallback } from 'react'
import { useDomainsStates } from 'states/domains'
import type { Domain, OperatorAllowList } from 'types/domain'

export const useDomainsData = () => {
  const { api } = useWallet()
  const { setDomains, setMinOperatorStake } = useDomainsStates()

  const loadData = useCallback(async () => {
    if (!api) return

    const [domains, domainRegistry, properties] = await Promise.all([
      api.consts.domains,
      api.query.domains.domainRegistry.entries(),
      api.rpc.system.properties(),
    ])

    setDomains(
      domainRegistry.map((domain) => {
        return {
          domainId: (domain[0].toPrimitive() as string[])[0],
          domainName: (domain[1].toJSON() as { domainConfig: { domainName: string } }).domainConfig
            .domainName,
          operatorAllowList: (
            domain[1].toJSON() as { domainConfig: { operatorAllowList: OperatorAllowList } }
          ).domainConfig.operatorAllowList,
        } as Domain
      }),
    )
    const _tokenDecimals = (properties.tokenDecimals.toPrimitive() as number[])[0]
    setMinOperatorStake((domains.minOperatorStake.toPrimitive() as number) / 10 ** _tokenDecimals)
  }, [api, setDomains, setMinOperatorStake])

  return { loadData }
}
