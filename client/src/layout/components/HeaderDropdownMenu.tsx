import { FC, Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

// common
import { INTERNAL_ROUTES } from 'common/routes';

const HeaderDropdownMenu: FC = () => {
  return (
    <Popover className="relative font-['Montserrat']">
      <Popover.Button className="flex justify-center items-center text-[#282929] font-semibold">
        Blockchain
        <ChevronDownIcon className="ml-1 ui-open:rotate-180 ui-open:transform w-5 h-5" />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute">
          <div className="flex flex-col bg-white w-44 rounded-md p-6 z-50">
            <Link
              to={INTERNAL_ROUTES.accounts.list}
              className="text-[#282929] font-medium border-b py-1 border-b-[#E4ECF3]"
            >
              Accounts
            </Link>
            <Link
              to={INTERNAL_ROUTES.blocks.list}
              className="text-[#282929] font-medium border-b py-1 border-b-[#E4ECF3]"
            >
              Blocks
            </Link>
            <Link
              to={INTERNAL_ROUTES.extrinsics.list}
              className="text-[#282929] font-medium border-b py-1 border-b-[#E4ECF3]"
            >
              Extrinsics
            </Link>
            <Link
              to={INTERNAL_ROUTES.events.list}
              className="text-[#282929] font-medium py-1"
            >
              Events
            </Link>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default HeaderDropdownMenu;
