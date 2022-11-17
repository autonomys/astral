import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

// common
import { INTERNAL_ROUTES } from "common/routes";
import LogoIcon from "common/icons/LogoIcon";
import HeaderDropdownMenu from "./HeaderDropdownMenu";
import HeaderChainDropdown from "./HeaderChainDropdown";

const Header: FC = () => {
  const location = useLocation();
  const pathName = location.pathname;

  const isHomeActive = pathName === "/";
  return (
    <header className="text-gray-600 body-font font-['Montserrat'] py-[30px] mx-[50px] z-10">
      <div className="container mx-auto flex flex-wrap py-5 flex-col md:flex-row items-center">
        <Link
          to={INTERNAL_ROUTES.home}
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span className="text-xl">
            <LogoIcon fillColor="#282929" />
          </span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link
            to={INTERNAL_ROUTES.home}
            className={
              isHomeActive
                ? "text-white font-semibold mr-5 text-xs px-5 py-3 rounded-full block bg-[#241235] "
                : "text-[#282929] font-semibold mr-5 hover:text-gray-900"
            }
          >
            Home
          </Link>
          <HeaderDropdownMenu />
        </nav>
        <div className="flex">
          <HeaderChainDropdown />
          <button className="ml-4 inline-flex items-center bg-[#241235] py-2 px-2 focus:outline-none hover:bg-gray-200 text-base rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
