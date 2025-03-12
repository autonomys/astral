import { useQuery } from '@apollo/client'
// import { blockNumber } from '@autonomys/auto-consensus' // To re-implement as soon as the fix is released
import { activate, NetworkId } from '@autonomys/auto-utils'
import { EXTERNAL_ROUTES } from 'constants/routes'
import { LastBlockDocument, LastBlockQuery } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import Link from 'next/link'
import React, { FC, useCallback, useEffect, useMemo } from 'react'
import { useConsensusStates } from 'states/consensus'

const NORMAL_BLOCKS_DIVERGENCE = 120
const POLL_INTERVAL = 12000

const OutOfSyncBanner: FC = () => {
  const { network } = useIndexers()
  return (
    <div className='container mx-auto mb-4 flex grow justify-center px-5 md:px-[25px] 2xl:px-0'>
      <div className='sticky top-0 z-10 w-full'>
        <div className='w-full rounded-[20px] bg-[#DDEFF1] p-5 shadow dark:border-none dark:bg-boxDark'>
          <div className='flex flex-col gap-4'>
            <div className='text-[20px] font-bold text-[#282929] dark:text-white'>
              Indexer Currently Out of Sync
            </div>
            <div className='text-[15px] text-[#282929] dark:text-white'>
              The indexer is currently out of sync. We are working to resolve this issue as soon as
              possible. Please check back later or visit Subscan for the most up-to-date information
              or use Polkadot.js Apps to interact with the chain.
            </div>
            <div>
              {network === NetworkId.MAINNET && (
                <Link href={EXTERNAL_ROUTES.subscan} target='_blank'>
                  <button className='self-start rounded-[20px] bg-white px-[33px] py-[13px] text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-[#1E254E] dark:text-white'>
                    Visit Subscan
                  </button>
                </Link>
              )}
              <Link className='ml-4' href={EXTERNAL_ROUTES.polkadot(network)} target='_blank'>
                <button className='self-start rounded-[20px] bg-white px-[33px] py-[13px] text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-[#1E254E] dark:text-white'>
                  Visit Polkadot.js Apps
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const useOutOfSyncBanner = () => {
  const { network } = useIndexers()

  const lastBlockNumber = useConsensusStates((state) => state.lastBlockNumber[network])
  const setLastBlockNumber = useConsensusStates((state) => state.setLastBlockNumber)

  const { data } = useQuery<LastBlockQuery>(LastBlockDocument, {
    pollInterval: POLL_INTERVAL,
  })

  const getChainLastBlock = useCallback(async () => {
    try {
      const api = await activate({ networkId: network })
      const block = await api.rpc.chain.getBlock()
      const lastBlock = parseInt(block.block.header.number.toString())
      setLastBlockNumber(network, lastBlock)
      await api.disconnect()
    } catch (error) {
      console.error('Error getting chain last block', error)
    }
  }, [network, setLastBlockNumber])

  const lastBlock = useMemo(() => data && data.lastBlock && parseInt(data.lastBlock.value), [data])

  const outOfSyncBanner = useMemo(
    () =>
      data &&
      lastBlock &&
      lastBlockNumber !== null &&
      lastBlock + NORMAL_BLOCKS_DIVERGENCE < lastBlockNumber ? (
        <OutOfSyncBanner />
      ) : null,
    [data, lastBlock, lastBlockNumber],
  )

  useEffect(() => {
    getChainLastBlock()
    const interval = setInterval(() => {
      getChainLastBlock()
    }, POLL_INTERVAL)

    return () => clearInterval(interval)
  }, [getChainLastBlock])

  return outOfSyncBanner
}
