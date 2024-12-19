import { ArchivedHistoryIcon, BlockIcon, PieChartIcon, WalletIcon } from 'components/icons'
import { FC, useMemo } from 'react'
import { HomeInfoCard } from './HomeInfoCard'

type Props = {
  blocksCount?: string
  spacePledged?: string
  nodeCount?: string
  historySize?: string
  accountsCount?: string
}

export const HomeCards: FC<Props> = ({
  blocksCount = '0',
  spacePledged = '0',
  historySize = '0',
  nodeCount = '0',
  accountsCount = '0',
}) => {
  const listOfCards = useMemo(
    () => [
      {
        title: 'Processed Blocks',
        icon: <BlockIcon />,
        value: blocksCount,
        darkBgClass: 'dark:bg-boxDark',
      },
      {
        title: 'Wallet addresses',
        icon: <WalletIcon />,
        value: accountsCount,
        darkBgClass: 'dark:bg-boxDark',
      },
      {
        title: 'Total Nodes',
        icon: <BlockIcon />,
        value: nodeCount,
        darkBgClass: 'dark:bg-boxDark',
      },
      {
        title: 'Total Space Pledged',
        icon: <PieChartIcon />,
        value: spacePledged,
        darkBgClass: 'dark:bg-boxDark',
      },
      {
        title: 'Archived History Size',
        icon: <ArchivedHistoryIcon />,
        value: historySize,
        darkBgClass: 'dark:bg-boxDark',
      },
    ],
    [blocksCount, nodeCount, spacePledged, historySize, accountsCount],
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
