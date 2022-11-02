import { FC } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// common
import { EXTERNAL_ROUTES } from "common/routes";

const Footer: FC = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link
            to="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 "
          >
            <span className="text-xl">SUBSPACE</span>
          </Link>
          <p className="mt-2 text-sm text-gray-500">
            Subspace is a fourth generation blockchain built for the next wave
            of crypto creators
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              Links
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a
                  href={EXTERNAL_ROUTES.subspace}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Subspace
                </a>
              </li>
              <li>
                <a
                  href={EXTERNAL_ROUTES.forum}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Forum
                </a>
              </li>
              <li>
                <a
                  href={EXTERNAL_ROUTES.docs}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Docs
                </a>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {dayjs().year()} Subspace
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
