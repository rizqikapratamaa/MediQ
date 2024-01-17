import React, { useEffect, useState } from "react";
import Line from '../Assets/Line.svg'
import Clock from '../Assets/Clock.svg'
import Calendar from '../Assets/candera.svg'
import Photo from '../Assets/DoctorPalsu.png'
import Job from '../Assets/work.svg'
import Star from '../Assets/star.svg'
import Locate from '../Assets/location.svg'
const ProfilePembayaran = ({doctorData}) => {
    const [hasAppointment, sethasAppointment] = useState(true);
    const defaultState = {
        name: 'Dr.Maharani Sabrina',
        job : 'Dokter umum',
        photo: Photo,
        time: '11:45',
        date: '15/05/2023',
        token : 23,
        experience : 5,
        rating: 4.7,
        place: 'Puskesmas Antapani'
    }
    const [Appointement, setAppointment] = useState(defaultState)

    return(
        <div className="text-poppins my-3 font-poppins">
            <label htmlFor="Appointment" className="font-semibold text-lg max-md:text-sm">
                Aktivitas Mendatang
            </label>
            <div className="bg-gradient-to-b from-[#B4F0EF] border-t-2 border-[#B4F0EF]  border-solid to-[#E7F7FA] rounded-xl mt-4 max-md:h-auto flex flex-col gap-5">
                <div className=" h-36 mt-5 overflow-visible flex relative mb-3">
                <img src={Appointement.photo} alt="Foto default dokter"  className="absolute h-20 m-10 max-md:m-5"/>
                <div className="flex-col">
                    <div className="flex justify-items-center  -translate-y-5 w-full relative mb-4">
                        <div className="flex flex-row bg-white h-9 w-64 justify-around rounded-xl md:w-64 sm:w-56 absolute left-1/2 top-0 -translate-x-1/2 max-md:text-xs ">
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
                    <div className="flex flex-col justify-center ml-36 max-md:ml-28 max-md:mt-5">
                        <h1 className="font-semibold text-xl max-md:text-lg">{Appointement.name}</h1>
                        <h3 className=" max-md:text-sm text-lg mt-2">{Appointement.job}</h3>
                        <div className="flex gap-2 items-center">
                            <img src={Job} alt="" className="h-5  max-md:h-4"/>
                            <p className="text-sm max-md:text-[10px]">Pengalaman: {Appointement.experience}+ tahun</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <img src={Star} alt="" className="h-5  max-md:h-4"/>
                            <p className="text-sm max-md:text-[10px]">Rating : {Appointement.rating}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <img src={Locate} alt="" className="h-5  max-md:h-4"/>
                            <p className="text-sm max-md:text-[10px]">Lokasi praktik : {Appointement.place}</p>
                        </div>

                    </div>
                </div>

            </div>
            <div  className="mx-10 mt-10 max-md:p-4 p-8 bg-white rounded-xl -translate-y-5 flex-col max-md:h-32 text-lg max-md:text-xs">
                <div className="justify-between flex mb-4 ">    
                    <h1>Biaya Konsultasi</h1>
                    <h1>Rp 15.000,00</h1>
                </div>
                <div className="justify-between flex mb-4 ">    
                    <h1>Biaya admin</h1>
                    <h1>Rp 5.000,00</h1>
                </div>
                <div className="h-0.5 bg-slate-200"></div>
                <div className="justify-between flex mt-2 ">
                    <h1>Total biaya</h1>
                    <h1>Rp 20.000,00</h1>
                </div>
            </div>
            </div>
        </div>
    )
};

export default ProfilePembayaran;