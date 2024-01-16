import React from "react";
import Location from '../Assets/location_black.svg'
import Telephone from '../Assets/call.svg'
import Person from '../Assets/person.svg'

import { useNavigate } from "react-router-dom";
const PilihanClinic = ({ButtonComponent, navigateId}) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        switch(navigateId){
            case(1): 
                navigate('antrian');
                break;
            case(2) : 
                navigate('file');
                break;
            default : 
                break;
        }
    }
    return(
        <div className="mt-5 font-poppins">
            <p>{ButtonComponent.titles}</p>
            <br></br>
            <div className="w-full h-44 from-[#B4F0EF] to-[#E7F7FA] bg-gradient-to-b rounded-xl relative">
                <div className="absolute bg-[#F21F61] rounded-l-xl rounded-tr-xl w-28 h-8 right-10 text-center text-white flex justify-center items-center">5.6 km</div>
                <div className="p-5"> 
                    <h1 className="text-lg mb-2">Puskesmas Griya Antapani</h1>
                    <div className="flex gap-3 items-center mb-1">
                        <img src={Location} alt="" className="h-5"/>
                        <p>Alamat : Jl.Plered No. 2, Kec.Antapani</p>
                    </div>
                    <div className="flex gap-3 items-center mb-1">
                        <img src={Telephone} alt="" className="h-5"/>
                        <p>No. Telp : 0812-2190-2846</p>
                    </div>
                    <div className="flex gap-3 items-center mb-1">
                        <img src={Person} alt="" className="h-5"/>
                        <p>Jumlah dokter : 4</p>
                    </div>
                </div>
                <div className="absolute bottom-0 w-56 h-16 z-10 right-32 translate-y-8 border-[5px] bg-white border-white rounded-3xl">
                    <button className=" justify-center items-center flex-row flex border-2 border-[#56BDC5] rounded-full overflow-hidden w-full shadow-lg h-full" onClick={handleNavigate}>
                        <img src={ButtonComponent.buttonImage} alt="" className="h-6 translate-x-2"/>
                        <div
                        className="w-full right-4 text-[#56BDC5] font-poppins text-lg "
                        >
                        {ButtonComponent.buttonText}
                        </div>
                    </button>
                    </div>
            </div>
        </div>
    )
}

export default PilihanClinic;