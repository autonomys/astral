import { Routes } from '@/constants/routes'
import { NetworkId, NetworkName } from '@autonomys/auto-utils'
import useIndexers from 'hooks/useIndexers'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { FC } from 'react'

export const UnsupportedNetworkBanner: FC = () => {
  const { network } = useIndexers()
  const pathName = usePathname()

  return (
    !pathName.includes(network) && (
      <div className='container mx-auto mb-4 flex grow justify-center px-5 md:px-[25px] 2xl:px-0'>
        <div className='sticky top-0 z-10 w-full'>
          <div className='w-full rounded-[20px] bg-[#DDEFF1] p-5 shadow dark:border-none dark:bg-boxDark'>
            <div className='flex flex-col gap-4'>
              <div className='text-[20px] font-bold text-[#282929] dark:text-white'>
                Unsupported Network
              </div>
              <div className='text-[15px] text-[#282929] dark:text-white'>
                The current network selected is not supported, please select one of the supported
                networks from the network selector.
              </div>
              <div>
                <Link href={`/${NetworkId.MAINNET}/${Routes.consensus}`}>
                  <button className='self-start rounded-[20px] bg-white px-[33px] py-[13px] text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-[#1E254E] dark:text-white'>
                    Visit {NetworkName.MAINNET}
                  </button>
                </Link>

                <Link className='ml-4' href={`/${NetworkId.TAURUS}/${Routes.consensus}`}>
                  <button className='self-start rounded-[20px] bg-white px-[33px] py-[13px] text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-[#1E254E] dark:text-white'>
                    Visit {NetworkName.TAURUS}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
