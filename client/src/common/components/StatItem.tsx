import { FC } from 'react';

type Props = {
  title: string;
  value: string;
};

const StatItem: FC<Props> = ({ title, value }) => {
  return (
    <div className="flex flex-col">
      <span className="text-[#857EC2] font-normal text-xs dark:text-white/75">{title}</span>
      <span className="font-medium text-[#282929] text-sm dark:text-white">{value}</span>
    </div>
  );
};

export default StatItem;
