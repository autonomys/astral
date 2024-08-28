import { Block } from '@/types/consensus'
import useWallet from 'hooks/useWallet'
import { useCallback, useEffect, useState } from 'react'
import { useDomainsStates } from 'states/domains'

export const useDomainsData = () => {
  const { domainsApis } = useWallet()
  const { setDomainsLastBlockNumber } = useDomainsStates()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const loadData = useCallback(async () => {
    if (!domainsApis || isLoading || isLoaded) return
    setIsLoading(true)
    try {
      const domainsLastBlockNumbers = new Map()
      const domainsBlocks = await Promise.all(
        Object.values(domainsApis).map((d) => d.rpc.chain.getBlock()),
      )
      domainsBlocks.map((block, index) =>
        domainsLastBlockNumbers.set(
          index.toString(),
          (block.toJSON() as Block).block.header.number,
        ),
      )
      setDomainsLastBlockNumber(domainsLastBlockNumbers)
      setIsLoaded(true)
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to load domains data', error)
    }
  }, [domainsApis, isLoading, isLoaded, setDomainsLastBlockNumber])

  useEffect(() => {
    if (!isLoaded) loadData()
  }, [isLoaded, loadData])

  return { loadData }
}
