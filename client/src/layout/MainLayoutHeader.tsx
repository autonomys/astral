import React, { FC } from "react";
import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
    <header className="text-gray-600 body-font shadow-md shadow-slate-100">
      <div className="container mx-auto flex flex-wrap py-5 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 "
        >
          <span className="ml-3 text-xl">SUBSPACE</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="block" className="mr-5 hover:text-gray-900">
            Blocks
          </Link>
          <Link to="extrinsic" className="mr-5 hover:text-gray-900">
            Extrinsic
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
