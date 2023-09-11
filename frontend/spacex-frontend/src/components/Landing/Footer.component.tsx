import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-4 bg-[#005288] py-6">
      <h6 className="text-[#ffffff] text-center">
        &copy; {currentYear}. Spacex website built by Ebuka Peter
      </h6>
    </footer>
  );
};

export default Footer;
