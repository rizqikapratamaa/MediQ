import React, { useEffect, useState } from "react";
import Line from '../Assets/Line.svg'
import Clock from '../Assets/Clock.svg'
import Calendar from '../Assets/candera.svg'
import Photo from '../Assets/DoctorPalsu.png'
const ProfilePembayaran = () => {
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
        <div className="text-poppins my-3 font-poppins">
            <label htmlFor="Appointment" className="font-semibold text-lg ">
                Aktivitas Mendatang
            </label>
            <div className="bg-gradient-to-b from-[#B4F0EF] border-t-2 border-[#B4F0EF]  border-solid to-[#E7F7FA] rounded-xl mt-4">
                <div className=" h-36 mt-5 overflow-hidden flex ">
                <img src={Appointement.photo} alt="Foto default dokter"  className="absolute h-20 m-10"/>
                <div className="flex flex-col justify-center ml-36">
                    <h1 className="font-semibold text-xl">{Appointement.name}</h1>
                    <h3 className="text-lg mt-2">{Appointement.job}</h3>

                </div>
                <div className="flex justify-items-center absolute left-1/3 -translate-y-5">
                    <div className="flex flex-row bg-white h-9 w-64 justify-around rounded-xl">
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
            <div  className="m-10 p-8 bg-white rounded-xl -translate-y-5 flex-col">
                <div className="justify-between flex mb-4 text-lg">    
                    <h1>Biaya Konsultasi</h1>
                    <h1>Rp 15.000,00</h1>
                </div>
                <div className="justify-between flex mb-4 text-lg">    
                    <h1>Biaya admin</h1>
                    <h1>Rp 5.000,00</h1>
                </div>
                <div className="h-0.5 bg-slate-200"></div>
                <div className="justify-between flex mt-2 text-lg">
                    <h1>Total biaya</h1>
                    <h1>Rp 20.000,00</h1>
                </div>
            </div>
            </div>
        </div>
    )
};

export default ProfilePembayaran;