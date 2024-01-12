import React from "react";
import TopBar from "../HomePage/TopBar";
import ClinicGreetings from "./ClinicGreetings";
import ClinicLayanan from "./ClinicLayanan";
import ClinicActivity from "./ClinicActivity";
const ClinicHomepage = () => {
    return(
        <div className="font-poppins">
            <TopBar/>
            <ClinicGreetings/>
            <ClinicLayanan/>
            <ClinicActivity/>
        </div>
    )
}

export default ClinicHomepage;