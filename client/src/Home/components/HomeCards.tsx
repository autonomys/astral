import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// common
import useMediaQuery from 'common/hooks/useMediaQuery'

// common/icons
import BlockIcon from 'common/icons/BlockIcon'
import DocIcon from 'common/icons/DocIcon'
import WalletIcon from 'common/icons/WalletIcon'
import PieChartIcon from 'common/icons/PieChartIcon'

// home
import HomeInfoCard from 'Home/components/HomeInfoCard'

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
  const isXlDesktop = useMediaQuery('(min-width: 1536px)')

  const isLargeDesktop = useMediaQuery('(min-width: 1440px)')

  const isMediumDesktop = useMediaQuery('(min-width: 960px)')

  const isSmallDesktop = useMediaQuery('(min-width: 640px)')

  const listOfCards = [
    {
      title: 'Archived Block',
      icon: <BlockIcon />,
      value: archivedBlock,
    },
    {
      title: 'Signed Extrinsics',
      icon: <DocIcon />,
      value: signedExtrinsics,
    },
    {
      title: 'Qualified Reward Addresses',
      icon: <WalletIcon />,
      value: rewardAddresses,
    },
    {
      title: 'Total Space Pledged',
      icon: <PieChartIcon />,
      value: spacePledged,
    },
    {
      title: 'Best Block',
      icon: <BlockIcon />,
      value: bestBlock,
    },
    {
      title: 'Blockchain History Size',
      icon: <WalletIcon />,
      value: historySize,
    },
  ]

  const slidesPerScreenSize = isXlDesktop
    ? 5.5
    : isLargeDesktop
    ? 4.5
    : isMediumDesktop
    ? 3.5
    : isSmallDesktop
    ? 2.5
    : 1.3

  return (
    <div className='w-full flex mb-12 items-center justify-center'>
      <Swiper spaceBetween={4} slidesPerView={slidesPerScreenSize}>
        {listOfCards.map(({ title, value, icon }, index) => (
          <SwiperSlide key={`${title}-${value}`}>
            <HomeInfoCard key={`${title}-${index}`} title={title} value={value} icon={icon} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default HomeCards
