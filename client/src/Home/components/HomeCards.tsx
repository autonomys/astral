import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

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

  return (
    <div className='w-full flex mb-12 items-center justify-center'>
      <Swiper
        spaceBetween={4}
        breakpoints={{
          425: {
            width: 425,
            slidesPerView: 1.5,
          },
          640: {
            width: 640,
            slidesPerView: 2,
          },
          768: {
            width: 768,
            slidesPerView: 2.5,
          },
          960: {
            width: 960,
            slidesPerView: 3,
          },
          1024: {
            width: 1024,
            slidesPerView: 3.5,
          },
          1440: {
            width: 1440,
            slidesPerView: 5,
          },
        }}
      >
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
