import React from "react";
import DataGridSection from "../../components/Landing/DataGrid/DataGridSection.component";
import HeroSection from "../../components/Landing/HeroSection.component";
import NavBar from "../../components/NavBar.component";

const Landing = () => {
    return (
        <div>
            <NavBar/>
            <HeroSection/>
            <DataGridSection/>
        </div>
    )
}

export default Landing;