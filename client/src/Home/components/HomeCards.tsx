import { FC } from 'react'

// common/icons
import { BlockIcon, DocIcon, WalletIcon, PieChartIcon } from 'common/icons'

// home
import { HomeInfoCard } from 'Home/components'

type Props = {
  archivedBlock?: string
  signedExtrinsics?: string
  rewardAddresses?: string
  spacePledged?: string
  bestBlock?: string
  historySize?: string
}

const HomeCards: FC<Props> = ({
  archivedBlock = '0',
  signedExtrinsics = '0',
  rewardAddresses = '0',
  spacePledged = '0',
  bestBlock = '0',
  historySize = '0',
}) => {
  const listOfCards = [
    {
      title: 'Archived Block',
      icon: <BlockIcon />,
      value: archivedBlock,
      darkBgClass: 'dark:bg-gradient-to-b dark:from-[#6E6ECD] dark:via-[#A196E1] dark:to-[#C2B0EE]',
    },
    {
      title: 'Signed Extrinsics',
      icon: <DocIcon />,
      value: signedExtrinsics,
      darkBgClass: 'dark:bg-gradient-to-b dark:from-[#5649A3] dark:to-[#8EABE4]',
    },
    {
      title: 'Qualified Reward Addresses',
      icon: <WalletIcon />,
      value: rewardAddresses,
      darkBgClass: 'dark:bg-gradient-to-b dark:from-[#AC70E1] dark:to-[#E6ADDC]',
    },
    {
      title: 'Total Space Pledged',
      icon: <PieChartIcon />,
      value: spacePledged,
      darkBgClass: 'dark:bg-gradient-to-b dark:from-[#6E6ECD] dark:via-[#A196E1] dark:to-[#C2B0EE]',
    },
    {
      title: 'Best Block',
      icon: <BlockIcon />,
      value: bestBlock,
      darkBgClass: 'dark:bg-gradient-to-b dark:from-[#5649A3] dark:to-[#8EABE4]',
    },
    {
      title: 'Blockchain History Size',
      icon: <WalletIcon />,
      value: historySize,
      darkBgClass: 'dark:bg-gradient-to-b dark:from-[#AC70E1] dark:to-[#E6ADDC]',
    },
  ]

  return (
    <div className='w-full flex mb-12 items-center overflow-x-auto gap-5'>
      {listOfCards.map(({ title, value, icon, darkBgClass }, index) => (
        <HomeInfoCard key={`${title}-${index}`} title={title} value={value} icon={icon} darkBgClass={darkBgClass} />
      ))}
    </div>
  )
}

export default HomeCards
