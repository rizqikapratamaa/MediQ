import React, {useEffect, useState} from "react";
import Appointment from "./Appointement";
import StuntingPagination from "./StuntingPagination";
import TopBar from "./TopBar";
import Greeting from "./Greetings";
import Layanan from "./Layanan";
import BookingAppointment from "./BookingActivity";
import {useLocation} from 'react-router-dom'

const Homepage = () =>{
    const location = useLocation();
    const [name, setName] = useState('');
    const [activity, setActivity] = useState('')
    const [booking, setBooking] = useState('')
    const [hasActivity, sethasActivity] = useState(false);
    const [type, setType] = useState(0);
    useEffect(() => {
        let selectedData = location?.state?.data;
        console.log(selectedData);
        if(selectedData){
            if(typeof selectedData === 'string'){
                setName(selectedData);
            } else{
                sethasActivity(true);
                if(selectedData.queueNumber !== undefined){
                    setBooking(selectedData);
                    setType(1);
                } else{
                    console.log(selectedData.hour.time);
                    setActivity(selectedData);
                    setType(0);
                }
            }
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
                <label htmlFor="Appointment" className="font-semibold text-[16px] ml-10">
                    Aktivitas Mendatang
                </label>
                <Appointment data={activity} hasActivity ={hasActivity}/>
                <BookingAppointment data={booking} hasActivity={hasActivity}/>
            </div>
        </div>
    )
}

export default Homepage;