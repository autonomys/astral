import { FC } from 'react'

// common/icons
import BlockIcon from 'common/icons/BlockIcon'
import DocIcon from 'common/icons/DocIcon'
import WalletIcon from 'common/icons/WalletIcon'
import PieChartIcon from 'common/icons/PieChartIcon'
import MaximizeIcon from 'common/icons/MaximizeIcon'
import ClosedWalletIcon from 'common/icons/ClosedWalletIcon'
import CoinIcon from 'common/icons/CoinIcon'

// home
import HomeInfoCard from 'Home/components/HomeInfoCard'

const HomeChainInfo: FC = () => {
  const listOfCards = [
    {
      title: 'Archived Blocks',
      icon: <BlockIcon />,
      value: '788.687',
    },
    {
      title: 'Signed Extrinsics',
      icon: <DocIcon />,
      value: '2.598',
    },
    {
      title: 'Qualified Reward Addresses',
      icon: <WalletIcon />,
      value: '88.687',
    },
    {
      title: 'Total Space Pledged',
      icon: <PieChartIcon />,
      value: '487.64 TB',
    },
    {
      title: 'Best Block',
      icon: <BlockIcon />,
      value: '713.256',
    },
    {
      title: 'Total Rewards Unlocked',
      icon: <CoinIcon />,
      value: '8.687M',
    },
    {
      title: 'Total Reward Addresses',
      icon: <ClosedWalletIcon />,
      value: '88.687',
    },
    {
      title: 'Blockchain History Size',
      icon: <MaximizeIcon />,
      value: '87.87 GB',
    },
  ]

  const half = Math.ceil(listOfCards.length / 2)

  return (
    <div className="w-full">
      <div className="flex pb-6">
        {listOfCards.slice(0, half).map(({ title, value, icon }, index) => (
          <HomeInfoCard
            key={`${title}-${index}`}
            additionalClass={index !== half - 1 ? 'pr-4' : ''}
            icon={icon}
            title={title}
            value={value}
          />
        ))}
      </div>
      <div className="flex pb-6">
        {listOfCards.slice(half).map(({ title, value, icon }, index) => (
          <HomeInfoCard
            key={`${title}-${index}`}
            additionalClass={index !== half - 1 ? 'pr-4' : ''}
            icon={icon}
            title={title}
            value={value}
          />
        ))}
      </div>
    </div>
  )
}

export default HomeChainInfo
