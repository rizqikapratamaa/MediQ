import React, {useEffect, useState} from "react";
import Appointment from "./Appointement";
import StuntingPagination from "./StuntingPagination";
import TopBar from "./TopBar";
import Greeting from "./Greetings";
import Layanan from "./Layanan";
import {useLocation} from 'react-router-dom'

const Homepage = () =>{
    const location = useLocation();
    const [name, setName] = useState('');
    const [activity, setActivity] = useState('')
    
    
    useEffect(() => {
        let selectedData = location?.state?.data;
        if(typeof selectedData === 'string'){
            setName(selectedData);
        } else{
            setActivity(selectedData);
        }
        console.log("selected Data : ",selectedData);
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
                <Appointment data={activity}/>
            </div>
        </div>
    )
}

export default Homepage;