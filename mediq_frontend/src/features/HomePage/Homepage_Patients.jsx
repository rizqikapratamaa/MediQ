import React, {useEffect, useState} from "react";
import Appointment from "./Appointement";
import StuntingPagination from "./StuntingPagination";
import TopBar from "./TopBar";
import Greeting from "./Greetings";
import Layanan from "./Layanan";
import {useLocation} from 'react-router-dom'

const Homepage = () =>{
    const location = useLocation();
    const [name, setName] = useState('Dave');

    useEffect(() => {
        let selectedName = location?.state?.data;
        setName(selectedName);
    }, [])
    return(
        <div className="flex flex-col font-poppins">
            <TopBar id={1}/>
            <Greeting name={name}/>
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