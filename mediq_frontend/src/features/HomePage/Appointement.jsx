import React, { useEffect, useState } from "react";
import Photo from '../Assets/DummyPhoto.png'
import Line from '../Assets/Line.svg'
import Clock from '../Assets/Clock.svg'
import Calendar from '../Assets/candera.svg'
import Camera from '../Assets/Camera.svg'
const Appointment = ({data}) => {
    const hasAppointment = data && data.hour && data.hour.time !== undefined;

    return(
        <div className="text-poppins my-3 mx-10">
            <label htmlFor="Appointment" className="font-semibold text-[16px]">
                Aktivitas Mendatang
            </label>
            {hasAppointment ? (
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
                            {data.hour.time}
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
            {hasAppointment ? (
                <div className="flex items-end justify-end mr-8 max-md:mr-3 -translate-y-4">
                <div className="rounded-xl w-32 bg-white h-10 border-white border-[3px] font-semibold text-[#56BDC5] max-md:w-28 max-md:text-xs">
                    <button className=" w-full h-full rounded-xl border-2 bg-white border-[#56BDC5] flex items-center justify-center gap-2">
                    <img src={Camera} alt="Camera Logo" className="h-5 max-md:h-3"/>
                    <p>Join Call</p>
                    </button>
                </div>
            </div>
            ): (null)}
            
        </div>
    )
};

export default Appointment;