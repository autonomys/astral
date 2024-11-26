import { useQuery } from '@apollo/client'
import { activate, NetworkId } from '@autonomys/auto-utils'
import { EXTERNAL_ROUTES } from 'constants/routes'
import { LastBlockQuery } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import Link from 'next/link'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { LAST_BLOCK } from './query'

const NORMAL_BLOCKS_DIVERGENCE = 120

const OutOfSyncBanner: FC = () => {
  const { network } = useIndexers()
  return (
    <div className="container mx-auto mb-4 flex grow justify-center px-5 font-['Montserrat'] md:px-[25px] 2xl:px-0">
      <div className='sticky top-0 z-50 w-full'>
        <div className='w-full rounded-[20px] bg-[#DDEFF1] p-5 shadow dark:border-none dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2]'>
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
  const [lastChainBlock, setLastChainBlock] = useState<number | null>(null)

  const { data } = useQuery<LastBlockQuery>(LAST_BLOCK, {
    pollInterval: 30000,
  })

  const getChainLastBlock = useCallback(async () => {
    const api = await activate({ networkId: network })

    const block = await api.rpc.chain.getBlock()

    setLastChainBlock(block.block.header.number.toNumber())
  }, [network])

  const lastBlock = useMemo(() => data && parseInt(data.lastBlock[0].height), [data])

  const outOfSyncBanner = useMemo(
    () =>
      data &&
      lastBlock &&
      lastChainBlock !== null &&
      lastBlock + NORMAL_BLOCKS_DIVERGENCE < lastChainBlock ? (
        <OutOfSyncBanner />
      ) : null,
    [data, lastBlock, lastChainBlock],
  )

  useEffect(() => {
    getChainLastBlock()
  }, [getChainLastBlock])

  return outOfSyncBanner
}
