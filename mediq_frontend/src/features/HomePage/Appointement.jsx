import React, { useEffect, useState } from "react";
import Photo from '../Assets/DummyPhoto.png'
import Line from '../Assets/Line.svg'
import Clock from '../Assets/Clock.svg'
import Calendar from '../Assets/candera.svg'
import Camera from '../Assets/Camera.svg'
const Appointment = () => {
    const [hasAppointment, sethasAppointment] = useState(true);
    const defaultState = {
        name: 'Dr.Maharani Sabrina',
        job : 'Dokter umum',
        photo: Photo,
        time: '11:45',
        date: '15/05/2023',
        token : 23,
    }
    const [Appointement, setAppointment] = useState(defaultState)

    return(
        <div className="text-poppins my-3 mx-10">
            <label htmlFor="Appointment" className="font-semibold text-[16px]">
                Aktivitas Mendatang
            </label>
            {hasAppointment ? (
                <div className="bg-gradient-to-b from-[#B4F0EF] to-[#E7F7FA] h-36 mt-5 rounded-xl overflow-hidden flex border-t-2 border-solid border-[#B4F0EF] ">
                <img src={Appointement.photo} alt="Foto default dokter"  className="absolute h-20 m-4"/>
                <div className="flex flex-col justify-end">
                    <div className="bg-[#F21F61] text-white text-sm w-36 h-6 rounded-r-md pl-2 pt-1">
                        Konsultasi Online
                    </div>
                </div>
                <div className="flex flex-col justify-center items-stretch">
                    <h1 className="font-semibold text-lg">{Appointement.name}</h1>
                    <h3 className="text-sm mt-2">{Appointement.job}</h3>
                </div>
                <div className="items-start justify-end h-max absolute right-10 -translate-x-0.5">
                    <div className="flex flex-row bg-white rounded-bl-xl h-7 w-56 justify-around rounded-tr-xl">
                        <div className="flex gap-2 items-center text-[#F21F61] ">
                            <img src={Clock} alt="" className="w-7 h-7"/>
                            {Appointement.time}
                        </div>
                        <img src={Line} alt="Line" />
                        <div className="flex gap-2 items-center text-[#F21F61] ">
                            <img src={Calendar} alt="" className="w-7 h-7"/>
                            {Appointement.date}
                        </div>
                    </div>

                </div>
            </div>
            
            ):(null)}
            {hasAppointment ? (
                <div className="flex items-end justify-end mr-8 -translate-y-4">
                <div className="rounded-xl w-32 bg-white h-10 border-white border-[3px] font-semibold text-[#56BDC5]">
                    <button className=" w-full h-full rounded-xl border-2 bg-white border-[#56BDC5] flex items-center justify-center gap-2">
                    <img src={Camera} alt="Camera Logo" className="h-5"/>
                    <p>Join Call</p>
                    </button>
                </div>
            </div>
            ): (null)}
            
        </div>
    )
};

export default Appointment;