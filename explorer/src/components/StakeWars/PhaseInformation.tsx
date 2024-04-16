import { STAKE_WARS_PHASES } from '@/constants'
import { numberWithCommas } from '@/utils/number'
import { GetCurrentBlockNumberQuery } from 'gql/rewardTypes'
import { FC } from 'react'
import Badge from '../common/Badge'
import { Tab } from '../common/Tabs'
import { phaseState } from './helpers/phaseState'

type Props = {
  phaseKey: 'phase2' | 'phase3' | 'endgame'
  title: string
  data: GetCurrentBlockNumberQuery | undefined
  children: React.ReactNode
}

export const PhaseInformation: FC<Props> = ({ phaseKey, title, children, data }) => {
  const currentBlock = numberWithCommas(data?.squidStatus?.height || 0)
  const phase = STAKE_WARS_PHASES[phaseKey]
  const currentBlockHigh = data?.squidStatus?.height || 0
  const badgeStyle =
    currentBlockHigh >= phase.start && currentBlockHigh <= phase.end ? 'info' : 'default'

  return (
    <Tab title={title}>
      <div className='flex w-full flex-col space-y-4'>
        <div className='flex w-full items-center justify-center gap-2 text-base text-[#282929] dark:text-white'>
          <span>Phase State - Current Block:</span>
          <span>{currentBlock}</span>
          <Badge type={badgeStyle}>{phaseState(phaseKey, currentBlockHigh)}</Badge>
        </div>
        <div className='flex w-full items-center justify-center gap-1 text-sm text-[#282929] dark:text-white'>
          From block
          <span className='font-bold'>{numberWithCommas(phase.start)}</span> to
          <span className='font-bold'>{numberWithCommas(phase.end)}</span>
        </div>
        <div className='flex w-full items-center justify-center'>
          <div className='font-large  w-full text-base text-[#282929] dark:text-white'>
            {children}
          </div>
        </div>
      </div>
    </Tab>
  )
}
