import { PageTabs } from 'components/common/PageTabs'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import React from 'react'
import { EndGame } from './EndGame'
import { NominatorList } from './NominatorList'
import { OperatorsList } from './OperatorsList'
import { PhaseInformation } from './PhaseInformation'
import { useStakeWarsData } from './hooks/useStakeWarsData'

const StakeWars = () => {
  const { data, loading } = useStakeWarsData()

  if (loading) return <Spinner />
  if (!data?.squidStatus) return <NotFound />

  return (
    <div className='flex w-full flex-col space-y-6'>
      <PageTabs isDesktop={true}>
        <PhaseInformation phaseKey='phase2' title='Phase 2 Operators' data={data}>
          Operators with highest rewards in Phase 2
          <OperatorsList currentBlock={data.squidStatus.height || 0} />
        </PhaseInformation>
        <PhaseInformation phaseKey='phase3' title='Phase 3 Nominators' data={data}>
          Nominators with highest rewards in Phase 3
          <NominatorList currentBlock={data.squidStatus.height || 0} />
        </PhaseInformation>
        <PhaseInformation phaseKey='endgame' title='End Game' data={data}>
          <EndGame currentBlock={data.squidStatus.height || 0} />
        </PhaseInformation>
      </PageTabs>
    </div>
  )
}

export default StakeWars
