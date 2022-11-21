import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Block } from "gql/graphql";

// common/icons
import BlockIcon from "common/icons/BlockIcon";
import DocIcon from "common/icons/DocIcon";
import WalletIcon from "common/icons/WalletIcon";
import PieChartIcon from "common/icons/PieChartIcon";

// home
import HomeInfoCard from "Home/components/HomeInfoCard";
import { formatSpacePledged } from "common/helpers";

interface Props {
  blocks: Block[];
}

const HomeChainInfo: FC<Props> = ({ blocks }) => {
  const [block] = blocks;
  const archivedBlock = block.height - 100;
  const spacePledgedVal = Number(block.spacePledged);
  const spacePledged = formatSpacePledged(spacePledgedVal);
  const historySizeVal = Number(block.blockchainSize);
  const historySize = formatSpacePledged(historySizeVal);

  const listOfCards = [
    {
      title: "Archived Block",
      icon: <BlockIcon />,
      value: archivedBlock,
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
      value: spacePledged,
    },
    {
      title: 'Best Block',
      icon: <BlockIcon />,
      value: block.height,
    },
    {
      title: "Total Rewards Unlocked",
      icon: <BlockIcon />,
      value: "8.687M",
    },
    {
      title: "Total Reward Addresses",
      icon: <PieChartIcon />,
      value: "88.687",
    },
    {
      title: "Blockchain History Size",
      icon: <WalletIcon />,
      value: historySize,
    },
  ]

  return (
    <div className="w-full flex mb-12 items-center justify-center">
      <Swiper spaceBetween={4} slidesPerView={5.5}>
        {listOfCards.map(({ title, value, icon }, index) => (
          <SwiperSlide key={`${title}-${value}`}>
            <HomeInfoCard
              key={`${title}-${index}`}
              title={title}
              value={value}
              icon={icon}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default HomeChainInfo
