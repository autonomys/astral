import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { RewardEvent } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { FC } from 'react'
import { AccountIdParam } from 'types/app'
import { bigNumberToNumber } from 'utils/number'

dayjs.extend(relativeTime)

interface AccountLatestRewardsProps {
  isDesktop: boolean
  rewards: RewardEvent[]
}

export const AccountLatestRewards: FC<AccountLatestRewardsProps> = ({ rewards }) => {
  const { selectedChain, selectedDomain } = useDomains()
  const { accountId } = useParams<AccountIdParam>()
  const { push } = useRouter()

  return (
    <div className='dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset flex w-full flex-col rounded-[20px] border border-gray-200 bg-white px-4 dark:border-none dark:bg-gradient-to-r'>
      <div className='flex w-full flex-col gap-6 pl-4'>
        <div className='flex w-full justify-between'>
          <div className='text-purpleShade2 flex-1 grow text-[13px] font-normal dark:text-white/75'>
            Block Number
          </div>
          <div className='text-purpleShade2 flex-1 grow text-center text-[13px] font-normal dark:text-white/75'>
            Type
          </div>
          <div className='text-purpleShade2 flex-1 grow text-end text-[13px] font-normal dark:text-white/75'>
            Amount
          </div>
        </div>
        <div className='w-full'>
          <ol className='border-purpleLight dark:border-blueShade1 relative w-full border-l'>
            {rewards.map(({ id, name, block, amount }, index) => (
              <li
                key={`${id}-account-rewards-block`}
                className={`flex w-full justify-between ${
                  index !== rewards.length - 1 && 'mb-[26px]'
                }`}
              >
                <div className='w-full flex-1 grow'>
                  <div
                    className={`absolute -left-1.5 size-3 rounded-full ${
                      index === 0
                        ? 'bg-purpleAccent dark:bg-purpleAccent'
                        : 'bg-purpleLight dark:bg-blueShade1'
                    }`}
                  ></div>
                  <div className='text-grayDark -mt-1 ml-4 flex-1 grow text-[13px] font-normal dark:text-white '>
                    <Link
                      key={`${id}-account-index`}
                      className='hover:text-purpleAccent'
                      href={INTERNAL_ROUTES.blocks.id.page(
                        selectedChain.urls.page,
                        selectedDomain,
                        block?.height,
                      )}
                    >
                      {block?.height}
                    </Link>
                  </div>
                </div>
                <div className='text-grayDark -mt-1 w-full flex-1 grow text-center text-[13px] font-normal dark:text-white'>
                  {name
                    .split('.')[1]
                    .split(/(?=[A-Z])/)
                    .join(' ')}
                </div>
                <div className='text-grayDark -mt-1 w-full flex-1 grow text-end text-[13px] font-normal dark:text-white'>
                  {bigNumberToNumber(amount)} {selectedChain.token.symbol}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      {rewards.length > 0 ? (
        <button
          onClick={() =>
            push(
              INTERNAL_ROUTES.accounts.rewards.page(
                selectedChain.urls.page,
                selectedDomain,
                accountId || '',
              ),
            )
          }
          className='bg-blueLight dark:bg-whiteTransparent mt-4 w-full rounded-[20px] py-4 dark:text-white'
        >
          See All Rewards
        </button>
      ) : (
        <div className='mt-5 flex size-full justify-center rounded-[20px] py-4 align-middle text-[13px] font-semibold text-gray-900 dark:text-white'>
          No Rewards
        </div>
      )}
    </div>
  )
}
