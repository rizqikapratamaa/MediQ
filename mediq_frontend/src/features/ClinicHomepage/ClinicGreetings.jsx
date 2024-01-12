import React,{useEffect, useState} from "react";
import Doctor from '../Assets/DoctorIcon.png'
import { useLocation } from "react-router-dom";
const ClinicGreetings = () => {
    const location = useLocation();
    const [clinicData, setClinicData] = useState({
        clinicName : '', id : ''
    })
    useEffect(() => {
        let data = location?.state?.data;
        if(data){
            setClinicData(data);
        }
    },[])
    return(
        <div className="h-96 w-full  bg-gradient-to-br  from-half-opacity-blue to-[#75E6E2] px-16 pt-10 inline-block ">
            <h1 className="max-md:text-lg text-3xl xl:text-4xl font-bold">Selamat Datang !</h1>
            <br></br>
            <div className="flex justify-between">
                <div className="rounded-lg shadow-md drop-shadow-md max-w-2xl mt-10 w-80 max-h-36 h-28 bg-white p-6">
                    <h1 className="mb-3 font-medium text-lg">Puskesmas Cibiru</h1>
                    <h3>Nomor ID: 00875242</h3>
                </div>
                <div className="bottom-0">

                    <img src={Doctor} alt="" className="h-72 translate-y-2"/>
                </div>
            </div>
        </div>
    )
}

export default ClinicGreetings;