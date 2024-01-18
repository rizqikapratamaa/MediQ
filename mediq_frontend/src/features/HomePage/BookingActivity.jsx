import React, { useEffect, useState } from "react";
import Camera from '../Assets/Camera.svg'
const BookingAppointment = ({data, hasActivity}) => {
    const hasAppointment = data && data.queueNumber !== undefined;

    // const hours = data?.hour.time
    return(
        <div className="text-poppins my-3 mx-10">
            <label htmlFor="Appointment" className="font-semibold text-[16px]">
                Aktivitas Mendatang
            </label>
            {(hasAppointment && hasActivity) ? (
                <div className="bg-gradient-to-b from-[#B4F0EF] to-[#E7F7FA] h-36 mt-5 rounded-xl overflow-hidden flex border-t-2 border-solid border-[#B4F0EF] max-md:h-28">

                <div className="flex flex-col justify-end">
                    <div className="bg-[#F21F61] text-white text-sm w-36 h-6 rounded-r-md pl-2 pt-1 max-md:w-28 max-md:h-5 max-md:text-xs justify-start items-start text-left">
                        <h1 className="text-center -translate-x-1">
                        Booking Antrian    
                        </h1>
                    </div>
                </div>
                <div className="flex flex-col justify-center -translate-x-20">
                    <h1 className="font-semibold text-lg max-md:text-xs">{data.fullName}</h1>
                    <h3 className="max-md:text-xs text-sm mt-2">Antrian Anda: {data.queueNumber}</h3>
                </div>
                <div className="items-start justify-end h-max absolute right-10 -translate-x-0.5">
                    <div className="flex flex-row bg-white rounded-bl-xl h-7 w-56 rounded-tr-xl max-md:text-xs max-md:w-40 max-md:h-6 text-center justify-center ">
                        <div className="flex gap-2 items-center text-center text-[#F21F61] ">
                            Layanan Umum
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

export default BookingAppointment;