import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useQuery } from '@apollo/client'
import BN from 'bn.js'

// common
import ErrorFallback from 'common/components/ErrorFallback'

// common/icons
import BlockIcon from 'common/icons/BlockIcon'
import DocIcon from 'common/icons/DocIcon'
import WalletIcon from 'common/icons/WalletIcon'
import PieChartIcon from 'common/icons/PieChartIcon'

// home
import HomeInfoCard from 'Home/components/HomeInfoCard'
import { formatSpacePledged } from 'common/helpers'
import { QUERY_HOME_LISTS } from 'Home/query'
import HomeChainInfoSkeleton from './HomeChainInfoSkeleton'
import useMediaQuery from 'common/hooks/useMediaQuery'

const HomeChainInfo: FC = () => {
  const ACCOUNT_MIN_VAL = new BN(0.3)

  const { data, error, loading } = useQuery(QUERY_HOME_LISTS, {
    variables: { accountTotal: ACCOUNT_MIN_VAL },
  })

  const isXlDesktop = useMediaQuery('(min-width: 1536px)')

  const isMediumDesktop = useMediaQuery('(min-width: 960px)')

  const isSmallDesktop = useMediaQuery('(min-width: 640px)')

  if (loading) {
    return <HomeChainInfoSkeleton />
  }

  if (error || !data) {
    return <ErrorFallback error={error} />
  }

  const [block] = data.blocks
  // won't have any archived blocks if there are less than 100 blocks
  const archivedBlock = block.height > 100 ? block.height - 100 : 0
  const spacePledgedVal = Number(block.spacePledged)
  const spacePledged = formatSpacePledged(spacePledgedVal)
  const historySizeVal = Number(block.blockchainSize)
  const historySize = formatSpacePledged(historySizeVal)
  const rewardAddresses = data.accountsConnection.totalCount
  const signedExtrinsics = data.extrinsicsConnection.totalCount

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
      value: block.height,
    },
    {
      title: 'Blockchain History Size',
      icon: <WalletIcon />,
      value: historySize,
    },
  ]

  const slidesPerScreenSize = isXlDesktop ? 5.5 : isMediumDesktop ? 3.5 : isSmallDesktop ? 2.5 : 1.3

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

export default HomeChainInfo
