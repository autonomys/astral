import { FC } from "react";

type Props = {
  additionClass?: string;
};

const TableLoadingSkeleton: FC<Props> = ({ additionClass = "" }) => {
  return (
    <div className={`${additionClass}`}>
      <div className="w-full shadow-md rounded border border-gray-200">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-300 mb-6"></div>
          <div className="py-3 px-6">
            <div className="h-5 bg-gray-300 mb-6 rounded"></div>
            <div className="h-5 bg-gray-200 mb-6 rounded"></div>
            <div className="h-5 bg-gray-300 mb-6 rounded"></div>
            <div className="h-5 bg-gray-200 mb-6 rounded"></div>
            <div className="h-4 bg-gray-300 mb-6 rounded"></div>
            <div className="h-4 bg-gray-200 mb-6 rounded"></div>
            <div className="h-4 bg-gray-300 mb-6 rounded"></div>
            <div className="h-4 bg-gray-200 mb-6 rounded"></div>
            <div className="h-4 bg-gray-300 mb-6 rounded"></div>
            <div className="h-4 bg-gray-200 mb-6 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableLoadingSkeleton;
