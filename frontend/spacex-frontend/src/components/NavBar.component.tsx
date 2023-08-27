import React from "react";
import logo from "../assets/spacex-logo.svg";

const NavBar = () => {
  return (
    <header className="bg-white shadow-md w-full h-auto py-4 text-white">
      <nav>
        <div className="flex justify-center md:justify-start w-full items-center">
          <img
            className="max-w-xs w-auto h-8 ml-4 md:ml-0"
            src={logo}
            alt="SpacexLogo"
          />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
