import { ArchivedHistoryIcon, BlockIcon, PieChartIcon, WalletIcon } from 'components/icons'
import { FC, useMemo } from 'react'
import { HomeInfoCard } from './HomeInfoCard'

type Props = {
  blocksCount?: string
  spacePledged?: string
  nodeCount?: string
  historySize?: string
}

export const HomeCards: FC<Props> = ({
  blocksCount = '0',
  spacePledged = '0',
  historySize = '0',
  nodeCount = '0',
}) => {
  const listOfCards = useMemo(
    () => [
      {
        title: 'Processed Blocks',
        icon: <BlockIcon />,
        value: blocksCount,
        darkBgClass:
          'dark:bg-gradient-to-b dark:from-purpleLighterAccent dark:via-pastelPurple dark:to-pastelBlue',
      },
      {
        title: 'Total Nodes',
        icon: <WalletIcon />,
        value: nodeCount,
        darkBgClass:
          'dark:bg-gradient-to-b dark:from-purpleLighterAccent dark:via-purpleShade dark:to-pastelPurple',
      },
      {
        title: 'Total Space Pledged',
        icon: <PieChartIcon />,
        value: spacePledged,
        darkBgClass:
          'dark:bg-gradient-to-b dark:from-purpleLighterAccent dark:via-purpleShade dark:to-pastelPurple',
      },
      {
        title: 'Archived History Size',
        icon: <ArchivedHistoryIcon />,
        value: historySize,
        darkBgClass: 'dark:bg-gradient-to-b dark:from-pastelBlue dark:to-pastelPink',
      },
    ],
    [blocksCount, nodeCount, spacePledged, historySize],
  )

  return (
    <div className='mb-12 flex w-full items-center gap-5 overflow-x-auto'>
      {listOfCards.map(({ title, value, icon, darkBgClass }, index) => (
        <HomeInfoCard
          key={`${title}-${index}`}
          title={title}
          value={value}
          icon={icon}
          darkBgClass={darkBgClass}
        />
      ))}
    </div>
  )
}
