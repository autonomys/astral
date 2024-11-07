import { ArchivedHistoryIcon, BlockIcon, DocIcon, PieChartIcon, WalletIcon } from 'components/icons'
import { FC, useMemo } from 'react'
import { HomeInfoCard } from './HomeInfoCard'

type Props = {
  signedExtrinsics?: string
  rewardAddresses?: string
  spacePledged?: string
  blocksCount?: string
  historySize?: string
}

export const HomeCards: FC<Props> = ({
  signedExtrinsics = '0',
  rewardAddresses = '0',
  spacePledged = '0',
  blocksCount = '0',
  historySize = '0',
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
        title: 'Extrinsics',
        icon: <DocIcon />,
        value: signedExtrinsics,
        darkBgClass: 'dark:bg-gradient-to-b dark:from-purpleUndertone dark:to-pastelBlue',
      },
      {
        title: 'Wallet addresses',
        icon: <WalletIcon />,
        value: rewardAddresses,
        darkBgClass: 'dark:bg-gradient-to-b dark:from-pastelPurple dark:to-pastelPink',
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
    [blocksCount, historySize, rewardAddresses, signedExtrinsics, spacePledged],
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
