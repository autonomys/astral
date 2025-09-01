import { EXTERNAL_ROUTES } from '../../constants/routes'
import Link from 'next/link'
import { useIndexers } from 'hooks/useIndexers'
import { NetworkId } from '@autonomys/auto-utils'

export const DeprecatingBanner = () => {
  const { network } = useIndexers()
  return (
    <div className='container mx-auto mb-4 flex grow justify-center px-5 md:px-[25px] 2xl:px-0'>
      <div className='sticky top-0 z-10 w-full'>
        <div className='w-full rounded-lg bg-[#DDEFF1] p-5 shadow dark:border-none dark:bg-boxDark'>
          <div className='flex flex-col gap-4 text-center md:text-left'>
            <div className='text-[20px] font-bold text-[#282929] dark:text-white'>
              Astral will be deprecated soon
            </div>
            <div className='text-[15px] text-[#282929] dark:text-white'>
              Astral will be deprecated soon. From that point Subscan will be the only way to access
              up-to-date network data and features. You can also use Polkadot.js Apps to interact
              with the chain.
            </div>
            <div className='flex flex-col items-center gap-4 md:flex-row md:items-center'>
              {network === NetworkId.MAINNET && (
                <Link href={EXTERNAL_ROUTES.subscan} target='_blank'>
                  <button className='self-start rounded-lg bg-white px-[33px] py-[13px] text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-[#1E254E] dark:text-white'>
                    Visit Subscan
                  </button>
                </Link>
              )}
              <Link className='ml-4' href={EXTERNAL_ROUTES.polkadot(network)} target='_blank'>
                <button className='self-start rounded-lg bg-white px-[33px] py-[13px] text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-[#1E254E] dark:text-white'>
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
