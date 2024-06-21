import {
  ArchivedHistoryIcon,
  BlockIcon,
  DocIcon,
  PieChartIcon,
  WalletIcon,
} from '@/components/icons'
import { Routes } from 'constants/routes'
import useDomains from 'hooks/useDomains'
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
  const { selectedDomain } = useDomains()

  const listOfCards = useMemo(
    () => [
      {
        title: 'Processed Blocks',
        icon: <BlockIcon />,
        value: blocksCount,
        darkBgClass:
          'dark:bg-gradient-to-b dark:from-[#6E6ECD] dark:via-[#A196E1] dark:to-[#C2B0EE]',
      },
      {
        title: 'Signed Extrinsics',
        icon: <DocIcon />,
        value: signedExtrinsics,
        darkBgClass: 'dark:bg-gradient-to-b dark:from-[#5649A3] dark:to-[#8EABE4]',
      },
      {
        title: selectedDomain === Routes.nova ? 'Wallet addresses' : 'Qualified Reward Addresses',
        icon: <WalletIcon />,
        value: rewardAddresses,
        darkBgClass: 'dark:bg-gradient-to-b dark:from-[#AC70E1] dark:to-[#E6ADDC]',
      },
      {
        title: 'Total Space Pledged',
        icon: <PieChartIcon />,
        value: spacePledged,
        darkBgClass:
          'dark:bg-gradient-to-b dark:from-[#6E6ECD] dark:via-[#A196E1] dark:to-[#C2B0EE]',
      },
      // TODO: uncomment when we have support for best blocks, currently all blocks are archived
      // {
      //   title: 'Best Block',
      //   icon: <BlockIcon />,
      //   value: bestBlock,
      //   darkBgClass: 'dark:bg-gradient-to-b dark:from-[#5649A3] dark:to-[#8EABE4]',
      // },
      {
        title: 'Archived History Size',
        icon: <ArchivedHistoryIcon />,
        value: historySize,
        darkBgClass: 'dark:bg-gradient-to-b dark:from-[#AC70E1] dark:to-[#E6ADDC]',
      },
    ],
    [blocksCount, historySize, selectedDomain, rewardAddresses, signedExtrinsics, spacePledged],
  )

  const visibleCards = useMemo(
    () =>
      selectedDomain === Routes.nova
        ? listOfCards.filter(
            (card) =>
              card.title !== 'Total Space Pledged' && card.title !== 'Blockchain History Size',
          )
        : listOfCards,
    [selectedDomain, listOfCards],
  )

  return (
    <div className='mb-12 flex w-full items-center gap-5 overflow-x-auto'>
      {visibleCards.map(({ title, value, icon, darkBgClass }, index) => (
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
