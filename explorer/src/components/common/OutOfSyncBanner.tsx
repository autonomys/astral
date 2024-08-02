import { useQuery } from '@apollo/client'
import { activate } from '@autonomys/auto-utils'
import { EXTERNAL_ROUTES } from 'constants/routes'
import { LastBlockQuery } from 'gql/oldSquidTypes'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { LAST_BLOCK } from './query'

const NORMAL_BLOCKS_DIVERGENCE = 120

export const OutOfSyncBanner: FC = () => {
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
              <Link href={EXTERNAL_ROUTES.subscan} target='_blank'>
                <button className='self-start rounded-[20px] bg-white px-[33px] py-[13px] text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-[#1E254E] dark:text-white'>
                  Visit Subscan
                </button>
              </Link>
              <Link className='ml-4' href={EXTERNAL_ROUTES.polkadot} target='_blank'>
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
  const { selectedChain } = useDomains()
  const [lastChainBlock, setLastChainBlock] = useState<number | null>(null)

  const { data } = useQuery<LastBlockQuery>(LAST_BLOCK, {
    pollInterval: 6000,
  })

  const getChainLastBlock = useCallback(async () => {
    const api = await activate({ networkId: selectedChain?.urls.page })

    const block = await api.rpc.chain.getBlock()

    setLastChainBlock(block.block.header.number.toNumber())
  }, [selectedChain])

  const lastBlock = useMemo(() => data && parseInt(data.lastBlock[0].height), [data])

  const outOfSyncBanner = useMemo(
    () =>
      !selectedChain.isDomain &&
      data &&
      lastBlock &&
      lastChainBlock !== null &&
      lastBlock + NORMAL_BLOCKS_DIVERGENCE < lastChainBlock ? (
        <OutOfSyncBanner />
      ) : null,
    [data, lastBlock, lastChainBlock, selectedChain.isDomain],
  )

  useEffect(() => {
    getChainLastBlock()
  }, [getChainLastBlock])

  return outOfSyncBanner
}
