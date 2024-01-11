import React from "react";
import Job from '../Assets/work.svg'
import Star from '../Assets/star.svg'
import Locate from '../Assets/location.svg'

const SeparateDoctorComponent = ({data}) => {
    return(
        <div>
            <div className="bg-gradient-to-b from-[#B4F0EF] to-[#E7F7FA] h-44 mt-5 rounded-xl overflow-hidden flex border-t-2 border-solid border-[#B4F0EF] ">
            <img src={data.photo} alt="Foto default dokter"  className="absolute h-24 m-4"/> 
            <div className="flex flex-col justify-end">
                        <div className="bg-[#F21F61] text-white text-sm w-28 h-6  rounded-r-md pl-3 pt-0.5 items-start flex">
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
             </div>
    );
}

export default SeparateDoctorComponent;