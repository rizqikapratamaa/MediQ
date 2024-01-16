import React from "react";
import { Link } from "react-router-dom";
import RekapMedis from "../Assets/RekapMedis.svg"
import Booking from "../Assets/Booking.svg"
import Consult from "../Assets/Consult.svg"

const Layanan = () => {
    const services = [{
        image: RekapMedis, text: "Periksa Rekam Medis Pribadi", buttonText : "Open", navigate : "rekamMedis"
    }, {image: Booking, text : "Booking Antrian Faskes", buttonText : "Book", navigate: "/homepage/bookingPage"}, {image: Consult, text: "Konsultasi Dokter Online", buttonText: "Book", navigate : "/consultation"}];

    return(
        <div className="my-3 mx-10">
            <label htmlFor="Layanan" className="font-semibold text-xl">Layanan</label>

            
            <div className="flex flex-row justify-between my-5 w-full ">
                {services.map((service, index) => (
                    <div key={index} className="flex-col justify-center items-center flex">
                       <div className="w-36 h-48 border-[3px] border-[#F21F61] rounded-xl items-center flex-col flex text-center shadow-xl shadow-gray-300">
                           <img src={service.image} alt="" className="h-20 w-20 my-3"/>
                           <h3 className="text-md">{service.text} </h3>
                       </div>
                       <Link to={service.navigate} >                     
                        <button className="w-24 h-8 border-2 rounded-lg bg-white border-[#56BDC5] -m-4">{service.buttonText}    
                        </button>
                       </Link>
                   </div>             
                ))}
            </div>
    </div>
    );
}

export default Layanan;