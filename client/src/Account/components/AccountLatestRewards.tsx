import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { RewardEvent } from 'gql/graphql'

// common
import { INTERNAL_ROUTES } from 'common/routes'
import { formatUnits } from 'common/helpers'
import useDomains from 'common/hooks/useDomains'

dayjs.extend(relativeTime)

interface AccountLatestRewardsProps {
  isDesktop: boolean
  rewards: RewardEvent[]
}

const AccountLatestRewards: FC<AccountLatestRewardsProps> = ({ rewards }) => {
  const { selectedChain } = useDomains()

  const { accountId } = useParams<{ accountId?: string }>()

  const navigate = useNavigate()

  return (
    <div className='flex flex-col p-4 w-full border border-gray-200 dark:border-none rounded-[20px] bg-white dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2]'>
      <div className='w-full flex flex-col gap-6 py-4 pl-4'>
        <div className='w-full grid grid-cols-3 gap-14 xl:gap-32'>
          <div className='col-span-1 text-[13px] font-normal text-[#857EC2] dark:text-white/75'>
            Block Number
          </div>
          <div className='col-span-1 text-[13px] font-normal text-[#857EC2] dark:text-white/75'>
            Type
          </div>
          <div className='col-span-1 text-[13px] font-normal text-[#857EC2] dark:text-white/75'>
            Amount
          </div>
        </div>
        <div className='w-full'>
          <ol className='relative border-l border-[#E6EAFA] dark:border-[#6C6BCF]'>
            {rewards.map(({ id, name, block, amount }, index) => (
              <li
                key={`${id}-account-rewards-block`}
                className={`grid grid-cols-3 gap-14 xl:gap-32 ${
                  index !== rewards.length - 1 && 'mb-[26px]'
                }`}
              >
                <div className=''>
                  <div
                    className={`absolute w-3 h-3 -left-1.5 rounded-full ${
                      index === 0
                        ? 'bg-[#DE67E4] dark:bg-[#DE67E4]'
                        : 'bg-[#E6EAFA] dark:bg-[#6C6BCF]'
                    }`}
                  ></div>
                  <div className='ml-4 -mt-1 text-[13px] font-normal text-[#282929 ] dark:text-white '>
                    <Link
                      key={`${id}-account-index`}
                      className='hover:text-[#DE67E4]'
                      to={INTERNAL_ROUTES.blocks.id.page(selectedChain.urls.page, block?.height)}
                    >
                      {block?.height}
                    </Link>
                  </div>
                </div>
                <div className='-mt-1 text-[13px] font-normal text-[#282929 ] dark:text-white'>
                  {name
                    .split('.')[1]
                    .split(/(?=[A-Z])/)
                    .join(' ')}
                </div>
                <div className='-mt-1 text-[13px] font-normal text-[#282929 ] dark:text-white'>
                  {formatUnits(amount, 18)} tSSC
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <button
        onClick={() =>
          navigate(INTERNAL_ROUTES.accounts.rewards.page(selectedChain.urls.page, accountId || ''))
        }
        className='w-full bg-[#F3FBFF] rounded-[20px] py-4 mt-5 dark:bg-[#ffffff1a] dark:text-white'
      >
        See All Rewards
      </button>
    </div>
  )
}

export default AccountLatestRewards
