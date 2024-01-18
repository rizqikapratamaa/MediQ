import React, { useState } from "react";
import Location from '../Assets/location_black.svg'
import Telephone from '../Assets/call.svg'
import Person from '../Assets/person.svg'

import { useNavigate } from "react-router-dom";
const PilihanClinic = ({ButtonComponent, navigateId, ClinicData}) => {
    const navigate = useNavigate();
    
    const handleNavigate = (id) => {
        const { fullName, address, phoneNumber, JumlahDokter, clinicId, Distance} = ClinicData[id];
    
        switch (navigateId) {
            case 1:
                navigate('antrian', {
                    state: {
                        data: {
                            fullName,
                            address,
                            phoneNumber,
                            JumlahDokter,
                            clinicId, 
                            Distance
                        }
                    }
                });
                break;
            case 2:
                navigate('file');
                break;
            default:
                break;
        }
    }
    console.log(ClinicData);
    if(!ClinicData){
        return(
            <div className="mt-5 font-poppins">
            <p>{ButtonComponent.titles}</p>
            <br />
            <p className="text-sm">Tidak ada data Clinic.</p>
            <p className="text-xs text-red-600 font-bold mt-1">Dimohon menekan tombol Cari Klinik Terdekat</p>
        </div>
        )
    }
    
    return(
        <div className="mt-5 font-poppins">
            <p>{ButtonComponent.titles}</p>
            <br></br>
            <div className="flex flex-col gap-10">
                {ClinicData.map((data,index) => (
                <div className="w-full h-44 from-[#B4F0EF] to-[#E7F7FA] bg-gradient-to-b rounded-xl relative" key={index}>
                    <div className="absolute bg-[#F21F61] rounded-l-xl rounded-tr-xl w-28 h-8 right-0 text-center text-white flex justify-center items-center max-md:h-6 max-md:w-24 max-md:text-xs ">{data.Distance} km</div>
                    <div className="p-5 max-md:translate-y-5"> 
                        <h1 className="text-lg max-md:text-sm mb-2">{data.fullName}</h1>
                        <div className="flex gap-3 items-center mb-1 max-md:text-xs">
                            <img src={Location} alt="" className="h-5"/>
                            <p>{data.address}</p>
                        </div>
                        <div className="flex gap-3 items-center mb-1 max-md:text-xs">
                            <img src={Telephone} alt="" className="h-5"/>
                            <p>No. Telp : {data.phoneNumber}</p>
                        </div>
                        <div className="flex gap-3 items-center mb-1 max-md:text-xs">
                            <img src={Person} alt="" className="h-5"/>
                            <p>{data.text} : {data.JumlahDokter}</p>
                        </div>
                    </div>
                    <div className="absolute bottom-0  h-16 z-10 translate-y-8 border-[5px] bg-white border-white rounded-3xl max-md:text-sm max-md:h-12 max-md:w-40 w-56 translate-x-1/2 right-1/3">
                        <button className=" justify-center items-center flex-row flex border-2 border-[#56BDC5] rounded-full overflow-hidden w-full shadow-lg h-full " onClick={() => handleNavigate(index)}>
                            <img src={ButtonComponent.buttonImage} alt="" className="h-6 translate-x-2"/>
                            <div
                            className="w-full right-4 text-[#56BDC5] font-poppins text-lg max-md:text-sm"
                            >
                            {ButtonComponent.buttonText}
                            </div>
                        </button>
                        </div>
                </div>
                ))
                }
            </div>
        </div>
    )
}

export default PilihanClinic;