import { FC } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// common
import { EXTERNAL_ROUTES } from "common/routes";
import LogoIcon from "common/icons/LogoIcon";

const Footer: FC = () => {
  return (
    <footer className="text-white body-font rounded-xl bg-[#241235] font-['Montserrat'] m-[50px]">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="flex flex-col justify-between">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link
              to="/"
              className="flex title-font font-medium items-center mb-4 "
            >
              <LogoIcon />
            </Link>
          </div>
          <div className="container mx-auto pt-20 pb-1 pr-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-white text-sm text-center sm:text-left">
              © {dayjs().year()} Subspace Labs, Inc. All Rights Reserved
            </p>
          </div>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font uppercase font-semibold text-white tracking-widest text-sm mb-3">
              Links:
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a
                  href={EXTERNAL_ROUTES.subspace}
                  className="text-[#ffffffb3] hover:text-gray-800"
                >
                  Subspace
                </a>
              </li>
              <li>
                <a
                  href={EXTERNAL_ROUTES.forum}
                  className="text-[#ffffffb3] hover:text-gray-800"
                >
                  Forum
                </a>
              </li>
              <li>
                <a
                  href={EXTERNAL_ROUTES.docs}
                  className="text-[#ffffffb3] hover:text-gray-800"
                >
                  Docs
                </a>
              </li>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
