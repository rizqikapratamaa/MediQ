import React from "react";
import Appointment from "./Appointement";
import StuntingPagination from "./StuntingPagination";
import TopBar from "./TopBar";
import Greeting from "./Greetings";
import Layanan from "./Layanan";
const Homepage = () =>{
    return(
        <div className="flex flex-col font-poppins">
            <TopBar/>
            <Greeting/>
            <div className="flex justify-center items-center">
                <StuntingPagination/>
            </div>
            <Layanan/>
            <div className="w-full mb-14">
                <Appointment/>
            </div>
        </div>
    )
}

export default Homepage;