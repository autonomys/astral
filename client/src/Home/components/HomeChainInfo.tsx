import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// common/icons
import BlockIcon from "common/icons/BlockIcon";
import DocIcon from "common/icons/DocIcon";
import WalletIcon from "common/icons/WalletIcon";
import PieChartIcon from "common/icons/PieChartIcon";

// home
import HomeInfoCard from "Home/components/HomeInfoCard";

const HomeChainInfo: FC = () => {
  const listOfCards = [
    {
      title: "Archived Blocks",
      icon: <BlockIcon />,
      value: "788.687",
    },
    {
      title: "Signed Extrinsics",
      icon: <DocIcon />,
      value: "2.598",
    },
    {
      title: "Qualified Reward Addresses",
      icon: <WalletIcon />,
      value: "88.687",
    },
    {
      title: "Total Space Pledged",
      icon: <PieChartIcon />,
      value: "487.64 TB",
    },
    {
      title: "Best Block",
      icon: <BlockIcon />,
      value: "713.256",
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
      value: "87.87 GB",
    },
  ];

  return (
    <div className="w-full flex mb-12 items-center justify-center">
      <Swiper spaceBetween={4} slidesPerView={5.5}>
        {listOfCards.map(({ title, value, icon }, index) => (
          <SwiperSlide>
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
  );
};

export default HomeChainInfo;
