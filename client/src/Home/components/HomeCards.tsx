import { FC, useMemo } from 'react'

// common/icons
import { BlockIcon, DocIcon, PieChartIcon, WalletIcon } from 'common/icons'

// home
import { HomeInfoCard } from 'Home/components'
import useDomains from 'common/hooks/useDomains'

type Props = {
  signedExtrinsics?: string
  rewardAddresses?: string
  spacePledged?: string
  blocksCount?: string
  historySize?: string
}

const HomeCards: FC<Props> = ({
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
        title: selectedDomain === 'evm' ? 'Wallet addresses' : 'Qualified Reward Addresses',
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
        title: 'Blockchain History Size',
        icon: <WalletIcon />,
        value: historySize,
        darkBgClass: 'dark:bg-gradient-to-b dark:from-[#AC70E1] dark:to-[#E6ADDC]',
      },
    ],
    [blocksCount, historySize, selectedDomain, rewardAddresses, signedExtrinsics, spacePledged],
  )

  const visibleCards = useMemo(
    () =>
      selectedDomain === 'evm'
        ? listOfCards.filter(
            (card) =>
              card.title !== 'Total Space Pledged' && card.title !== 'Blockchain History Size',
          )
        : listOfCards,
    [selectedDomain, listOfCards],
  )

  return (
    <div className='w-full flex mb-12 items-center overflow-x-auto gap-5'>
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

export default HomeCards
