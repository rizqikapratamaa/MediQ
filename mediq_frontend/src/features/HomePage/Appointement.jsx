import React, { useEffect, useState } from "react";
import Photo from '../Assets/DummyPhoto.png'
import Line from '../Assets/Line.svg'
import Clock from '../Assets/Clock.svg'
import Calendar from '../Assets/candera.svg'
import Camera from '../Assets/Camera.svg'
const Appointment = ({data, hasActivity}) => {
    const hasAppointment = data && data.hour !== undefined;

    // const hours = data?.hour.time
    return(
        <div className="text-poppins my-3 mx-10">
            {(hasAppointment && hasActivity) ? (
                        <div className="bg-gradient-to-b from-[#B4F0EF] to-[#E7F7FA] h-36 mt-5 rounded-xl overflow-hidden flex border-t-2 border-solid border-[#B4F0EF] max-md:h-28">
                        <img src={data.photo} alt="Foto default dokter"  className="absolute h-20 m-4 max-md:h-[72px] max-md:m-3"/>
                        <div className="flex flex-col justify-end">
                            <div className="bg-[#F21F61] text-white text-sm w-36 h-6 rounded-r-md pl-2 pt-1 max-md:w-28 max-md:h-5 max-md:text-xs justify-start items-start text-left">
                                <h1 className="text-center -translate-x-1">
                                {data.label}    
                                </h1>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h1 className="font-semibold text-lg max-md:text-xs">{data.name}</h1>
                            <h3 className="max-md:text-xs text-sm mt-2">dokter {data.bidang}</h3>
                        </div>
                        <div className="items-start justify-end h-max absolute right-10 -translate-x-0.5">
                            <div className="flex flex-row bg-white rounded-bl-xl h-7 w-56 justify-around rounded-tr-xl max-md:text-xs max-md:w-52 max-md:h-6">
                                <div className="flex gap-2 items-center text-[#F21F61] ">
                                    <img src={Clock} alt="" className="w-7 h-auto max-md:w-5"/>
                                    {data.hour.times}
                                </div>
                                <img src={Line} alt="Line" />
                                <div className="flex gap-2 items-center text-[#F21F61] ">
                                    <img src={Calendar} alt="" className="w-7 h-7 max-md:w-5"/>
                                    {data.dateData}
                                </div>
                            </div>
        
                        </div>
                    </div>

            ):(<p className="mt-5 text-[#F21F61] font-bold">
                Tidak ada Aktivitas Mendatang
            </p>)}            
        </div>
    )
};

export default Appointment;