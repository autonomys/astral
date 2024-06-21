import { BlockIcon, DocIcon, PieChartIcon, WalletIcon } from '@/components/icons'
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
          'dark:bg-gradient-to-b dark:from-purpleLighterAccent dark:via-purpleMedium dark:to-purplePale',
      },
      {
        title: 'Signed Extrinsics',
        icon: <DocIcon />,
        value: signedExtrinsics,
        darkBgClass: 'dark:bg-gradient-to-b dark:from-purpleDeep dark:to-purplePastel',
      },
      {
        title: selectedDomain === Routes.nova ? 'Wallet addresses' : 'Qualified Reward Addresses',
        icon: <WalletIcon />,
        value: rewardAddresses,
        darkBgClass: 'dark:bg-gradient-to-b dark:from-purpleTint dark:to-purpleTinge',
      },
      {
        title: 'Total Space Pledged',
        icon: <PieChartIcon />,
        value: spacePledged,
        darkBgClass:
          'dark:bg-gradient-to-b dark:from-purpleLighterAccent dark:via-purpleMedium dark:to-purplePale',
      },
      // TODO: uncomment when we have support for best blocks, currently all blocks are archived
      // {
      //   title: 'Best Block',
      //   icon: <BlockIcon />,
      //   value: bestBlock,
      //   darkBgClass: 'dark:bg-gradient-to-b dark:from-purpleDeep dark:to-purplePastel',
      // },
      {
        title: 'Archived History Size',
        icon: <WalletIcon />,
        value: historySize,
        darkBgClass: 'dark:bg-gradient-to-b dark:from-purpleTint dark:to-purpleTinge',
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
