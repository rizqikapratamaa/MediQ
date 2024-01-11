import React from "react";
import { useNavigate } from "react-router-dom";
import Job from '../Assets/work.svg'
import Star from '../Assets/star.svg'
import Locate from '../Assets/location.svg'
import Calendar from '../Assets/BlueCalendar.svg'

const DoctorComponent = ({DoctorData, searchedData}) =>{
    const navigate = useNavigate();

    if(DoctorData == null) {
        return(
            <div>
                maaf, Saat ini tidak ada dokter yang dapat melayani
            </div>
        )
    }

    const handleJadwalButton = (jadwal) => {
        navigate('jadwal', {state: {data: jadwal}});
    }

    let filteredDoctor = DoctorData

    filteredDoctor = DoctorData.filter((Data) => Data.name.toLowerCase().includes(searchedData.toLowerCase()));

    return(
        <div>
            {filteredDoctor.map((data,index) => (
            <div key={index}>
                 <div className="bg-gradient-to-b from-[#B4F0EF] to-[#E7F7FA] h-52 mt-5 rounded-xl overflow-hidden flex border-t-2 border-solid border-[#B4F0EF] ">
                 <img src={data.photo} alt="Foto default dokter"  className="absolute h-24 m-4"/> 
                 <div className="flex flex-col justify-end">
                             <div className="bg-[#F21F61] text-white text-sm w-28 h-6  rounded-r-md pl-2 pt-1">
                                 Rp {data.price},00
                             </div>
                     </div>
                     <div className="ml-4 mt-2">
                         <h1 className="font-medium text-lg">{data.name}</h1>
                         <h3 className="text-sm mt-1 mb-4">{data.job}</h3>
                         <div className="flex gap-2">
                             <img src={Job} alt="" className="h-5"/>
                             <p className="text-sm">Pengalaman: {data.experience}+ tahun</p>
                         </div>
                         <div className="flex gap-2">
                             <img src={Star} alt="" className="h-5"/>
                             <p className="text-sm">Rating : {data.rating}</p>
                         </div>
                         <div className="flex gap-2">
                             <img src={Locate} alt="" className="h-5"/>
                             <p className="text-sm">Lokasi praktik : {data.place}</p>
                         </div>
                     </div>
                 
                 </div>
                 <div className="flex items-end justify-end mr-8 -translate-y-4">
                     <div className="rounded-xl w-36 bg-white h-10 border-white border-[3px] font-medium text-[#56BDC5]">
                         <button className=" w-full h-full rounded-xl border-2 bg-white border-[#56BDC5] flex items-center justify-center gap-2" onClick={() => handleJadwalButton(data)}>
                         <img src={Calendar} alt="Camera Logo" className="h-5"/>
                         <p>Lihat Jadwal</p>
                         </button>
                     </div>
                 </div>
             </div>
            ))}
           
        </div>
    )
}

export default DoctorComponent;