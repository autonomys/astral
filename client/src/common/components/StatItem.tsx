import { FC } from "react";

type Props = {
  title: string;
  value: string;
};

const StatItem: FC<Props> = ({ title, value }) => {
  return (
    <div className="flex flex-col">
      <span className="text-[#857EC2] font-normal text-xs">{title}</span>
      <span className="font-medium text-[#282929] text-sm">{value}</span>
    </div>
  );
};

export default StatItem;
