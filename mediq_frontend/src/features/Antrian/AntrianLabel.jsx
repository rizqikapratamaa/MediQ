import React from "react";
import Location from '../Assets/location_black.svg'
import Telephone from '../Assets/call.svg'
import Person from '../Assets/person.svg'

const AntrianLabel = () => {
    return(
        <div>
            <div className="w-full h-44 from-[#B4F0EF] to-[#E7F7FA] bg-gradient-to-b rounded-xl my-10">
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
            </div>
        </div>
    )
}

export default AntrianLabel;