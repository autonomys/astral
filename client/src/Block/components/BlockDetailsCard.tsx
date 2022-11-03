import { Block } from "gql/graphql";
import { FC } from "react";

type Props = {
  block: Block;
};

const BlockDetailsCard: FC<Props> = ({ block }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <h3 className="font-semibold leading-none text-gray-900 text-2xl">
          Block #{block.height}
        </h3>
      </div>
      <div className="border border-slate-100 bg-white shadow rounded-lg mb-4 p-4 sm:p-6 w-full">
        <div className="flow-root">
          <ul className="divide-y divide-gray-200">
            <li className="py-3 sm:py-4">
              <div className="flex space-x-4 justify-between">
                <div className="min-w-0">
                  <p className="text-md font-light text-gray-900 truncate">
                    Timestamp
                  </p>
                </div>
                <div className="inline-flex text-base font-normal text-gray-600 items-end">
                  {block.timestamp}
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className=" min-w-0">
                  <p className="text-md font-light text-gray-900 truncate">
                    Block Time
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-600"></div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex justify-between space-x-4">
                <div className="min-w-0">
                  <p className="text-md font-light text-gray-900 truncate">
                    Hash
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-normal text-gray-600">
                  {block.hash}
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex justify-between space-x-4">
                <div className=" min-w-0">
                  <p className="text-md font-light text-gray-900 truncate">
                    Parent Hash
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-normal text-gray-600">
                  {block.parentHash}
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex justify-between space-x-4">
                <div className=" min-w-0">
                  <p className="text-md text-gray-900 truncate font-light">
                    Extrinsics Root
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-normal text-gray-600">
                  {block.extrinsicsRoot}
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex justify-between space-x-4">
                <div className=" min-w-0">
                  <p className="text-md font-light text-gray-900 truncate">
                    Spec Version
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-normal text-gray-600">
                  {block.spec.specVersion}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlockDetailsCard;
