import React from "react";
import DataGridSection from "../../components/Landing/DataGrid/DataGridSection.component";
import Footer from "../../components/Landing/Footer.component";
import HeroSection from "../../components/Landing/HeroSection.component";
import NavBar from "../../components/NavBar.component";
import "../../components/component.styles.scss";

const Landing = () => {
  return (
    <div className="container-spacex">
      <div className="content">
        <NavBar />
        <HeroSection />
        <DataGridSection />
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
