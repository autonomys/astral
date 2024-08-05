import { Block } from '@/types/consensus'
import useWallet from 'hooks/useWallet'
import { useDomainsStates } from 'states/domains'

export const useDomainsData = () => {
  const { domainsApis } = useWallet()
  const { setDomainsLastBlockNumber } = useDomainsStates()

  const loadData = async () => {
    if (!domainsApis) return
    try {
      const domainsBlocks = await Promise.all(
        Object.values(domainsApis).map((d) => d.rpc.chain.getBlock()),
      )
      domainsBlocks.map((block, index) =>
        setDomainsLastBlockNumber(index.toString(), (block.toJSON() as Block).block.header.number),
      )
    } catch (error) {
      console.error('Failed to load domains data', error)
    }
  }

  return { loadData }
}
