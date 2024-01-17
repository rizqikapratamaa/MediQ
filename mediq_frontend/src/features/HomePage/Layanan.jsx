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
        <div className="max-md:my-3 my-10 mx-10">
            <label htmlFor="Layanan" className="font-semibold text-xl">Layanan</label>

            
            <div className="grid grid-cols-3 grid-rows-1 justify-evenly my-5 w-full gap-10">
                {services.map((service, index) => (
                    <div key={index} className="flex-col justify-center items-center flex">
                       <div className="w-52 h-64 max-md:w-24 max-md:h-32 border-[3px] border-[#F21F61] rounded-xl items-center flex-col flex text-center shadow-xl shadow-gray-300">
                           <img src={service.image} alt="" className="h-28  my-3 max-md:h-12"/>
                           <h3 className="text-xl max-md:text-xs">{service.text} </h3>
                       </div>
                       <Link to={service.navigate} >                     
                        <button className="w-32 h-16 border-2 rounded-lg bg-white border-[#56BDC5] -m-4 max-md:w-16 max-md:text-sm text-lg max-md:h-6 max-md:-translate-y-3">{service.buttonText}    
                        </button>
                       </Link>
                   </div>             
                ))}
            </div>
    </div>
    );
}

export default Layanan;