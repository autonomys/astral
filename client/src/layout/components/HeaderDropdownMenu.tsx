import { FC } from "react";
import { Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

// common
import { INTERNAL_ROUTES } from "common/routes";

const HeaderDropdownMenu: FC = () => {
  return (
    <Popover className="relative font-['Montserrat']">
      <Popover.Button className="flex justify-center items-center text-[#282929] font-semibold">
        Blockchain
        <ChevronDownIcon className="ml-1 ui-open:rotate-180 ui-open:transform w-5 h-5" />
      </Popover.Button>

      <Popover.Panel className="absolute">
        <div className="flex flex-col bg-white w-44 rounded-md p-6 z-50">
          <Link
            to={INTERNAL_ROUTES.accounts.list}
            className="text-[#282929] font-medium"
          >
            Accounts
          </Link>
          <Link
            to={INTERNAL_ROUTES.blocks.list}
            className="text-[#282929] font-medium"
          >
            Blocks
          </Link>
          <Link
            to={INTERNAL_ROUTES.extrinsics.list}
            className="text-[#282929] font-medium"
          >
            Extrinsics
          </Link>
          <Link
            to={INTERNAL_ROUTES.events.list}
            className="text-[#282929] font-medium"
          >
            Events
          </Link>
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default HeaderDropdownMenu;
