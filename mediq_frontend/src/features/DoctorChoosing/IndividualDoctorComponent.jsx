import React from "react";
import Job from '../Assets/work.svg'
import Star from '../Assets/star.svg'
import Locate from '../Assets/location.svg'

const SeparateDoctorComponent = ({data}) => {
    return(
        <div>
            <div className="bg-gradient-to-b from-[#B4F0EF] to-[#E7F7FA] h-52 mt-5 rounded-xl overflow-hidden max-md:h-36  first-letter: flex border-t-2 border-solid border-[#B4F0EF]">
            <img src={data.photo} alt="Foto default dokter"  className="absolute h-24 m-4 max-md:h-20"/> 
            <div className="flex flex-col justify-end">
                        <div className="bg-[#F21F61] text-white text-sm w-28 h-6  rounded-r-md pl-3 pt-0.5 items-start flex max-md:h-5 max-md:w-24 max-md:text-xs">
                            Rp {data.price},00
                        </div>
                </div>
                <div className="ml-4 mt-2">
                    <h1 className="font-medium text-lg max-md:text-sm">{data.name}</h1>
                    <h3 className="text-sm mt-1 mb-4 max-md:mb-2 max-md:text-xs">{data.job}</h3>
                    <div className="flex gap-2 items-center">
                        <img src={Job} alt="" className="h-5  max-md:h-4"/>
                        <p className="text-sm max-md:text-[10px]">Pengalaman: {data.experience}+ tahun</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <img src={Star} alt="" className="h-5  max-md:h-4"/>
                        <p className="text-sm max-md:text-[10px]">Rating : {data.rating}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <img src={Locate} alt="" className="h-5  max-md:h-4"/>
                        <p className="text-sm max-md:text-[10px]">Lokasi praktik : {data.place}</p>
                    </div>
                </div>
            
            </div>
             </div>
    );
}

export default SeparateDoctorComponent;