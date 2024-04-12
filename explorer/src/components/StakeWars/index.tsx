import { STAKE_WARS_PHASES } from '@/constants'
import { numberWithCommas } from '@/utils/number'
import { useQuery } from '@apollo/client'
import { PageTabs } from 'components/common/PageTabs'
import { Spinner } from 'components/common/Spinner'
import { Tab } from 'components/common/Tabs'
import { NotFound } from 'components/layout/NotFound'
import { GetCurrentBlockNumberQuery } from 'gql/rewardTypes'
import React from 'react'
import { useErrorHandler } from 'react-error-boundary'
import Badge from '../common/Badge'
import { EndGame } from './EndGame'
import { NominatorList } from './NominatorList'
import { OperatorsList } from './OperatorsList'
import { phaseState } from './helpers/phaseState'
import { GET_CURRENT_BLOCK_NUMBER } from './rewardsQuery'

const StakeWars = () => {
  const { data, loading, error } = useQuery<GetCurrentBlockNumberQuery>(GET_CURRENT_BLOCK_NUMBER, {
    context: { clientName: 'rewards' },
  })

  useErrorHandler(error)

  if (loading) return <Spinner />
  if (!data?.squidStatus) return <NotFound />

  return (
    <div className='flex w-full flex-col space-y-6'>
      <div className='flex w-full flex-col space-y-10'>
        <div className='text-base font-medium text-[#282929] dark:text-white'>
          Stake Wars Leaderboard
        </div>
        <PageTabs isDesktop={true}>
          <Tab title='Phase 2 Operators'>
            <div className='flex flex-col space-y-4'>
              <div className='flex flex-col space-y-2'>
                <div className='flex flex-col justify-between space-y-6'>
                  <div className='flex w-full flex-col items-center justify-center space-y-4'>
                    <div className='flex w-full items-center justify-center gap-2 text-base text-[#282929] dark:text-white'>
                      <span>Phase State - Current Block:</span>{' '}
                      <span> {numberWithCommas(data.squidStatus.height || 0)} </span>
                      <Badge style='bg-gray-100 text-gray-800 me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500'>
                        {phaseState('phase2', data.squidStatus.height || 0)}
                      </Badge>
                    </div>
                    <div className='flex w-full items-center justify-center'>
                      <div className='font-large text-base text-[#282929] dark:text-white'>
                        Operators with hightest rewards in Phase 2 - From block{' '}
                        <span className=' font-bold'>
                          {numberWithCommas(STAKE_WARS_PHASES.phase2.start)}
                        </span>{' '}
                        to{' '}
                        <span className=' font-bold'>
                          {numberWithCommas(STAKE_WARS_PHASES.phase2.end)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center justify-center'>
                    <OperatorsList />
                  </div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab title='Phase 3 Nominators'>
            <div className='flex flex-col space-y-4'>
              <div className='flex flex-col space-y-2'>
                <div className='flex flex-col'>
                  <div className='flex w-full flex-col items-center justify-center space-y-4'>
                    <div className='flex w-full items-center justify-center gap-2 text-base text-[#282929] dark:text-white'>
                      <span>Phase State - Current Block:</span>{' '}
                      <span> {numberWithCommas(data.squidStatus.height || 0)} </span>
                      <Badge style='border-blue-400 bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-400'>
                        {phaseState('phase3', data.squidStatus.height || 0)}
                      </Badge>
                    </div>
                    <div className='flex w-full items-center justify-center'>
                      <div className='font-large text-base text-[#282929] dark:text-white'>
                        Nominators with hightest rewards in Phase 3 - From block{' '}
                        <span className=' font-bold'>
                          {numberWithCommas(STAKE_WARS_PHASES.phase3.start)}
                        </span>{' '}
                        to{' '}
                        <span className=' font-bold'>
                          {numberWithCommas(STAKE_WARS_PHASES.phase3.end)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='text-sm font-medium text-[#282929] dark:text-white'>
                    <div className='flex items-center'>
                      <NominatorList />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab title='End Game'>
            <div className='flex flex-col space-y-4'>
              <div className='flex flex-col space-y-2'>
                <div className='flex flex-col'>
                  <div className='flex w-full flex-col items-center justify-center space-y-4'>
                    <div className='flex w-full items-center justify-center gap-2 text-base text-[#282929] dark:text-white'>
                      <span>Phase State - Current Block:</span>{' '}
                      <span> {numberWithCommas(data.squidStatus.height || 0)} </span>
                      <Badge style='bg-gray-100 text-gray-800 me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500'>
                        {phaseState('endgame', data.squidStatus.height || 0)}
                      </Badge>
                    </div>
                    <div className='flex w-full items-center justify-center'>
                      <div className='font-large text-base text-[#282929] dark:text-white'>
                        <span className='font-bold'>End Game</span> - Results of stake wars - From
                        block{' '}
                        <span className='font-bold'>
                          {numberWithCommas(STAKE_WARS_PHASES.endgame.start)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='text-sm font-medium text-[#282929] dark:text-white'>
                    <div className='flex w-full items-center justify-center'>
                      <EndGame currentBlock={data.squidStatus.height || 0} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
        </PageTabs>
      </div>
    </div>
  )
}

export default StakeWars
