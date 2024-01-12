import React, {useState} from "react";

const ClinicLayanan = () => {

    const [layanans, setLayanans] = useState([{
        text : 'Periksa Antrian Pasien'
    }, {text : 'Manajemen Konsultasi Online Pasien'}])
    return (
        <div className="grid grid-rows-1 grid-cols-2 justify-items-center gap-10 mx-10 my-10">
            {layanans.map((item,index) => (
                <button key={index}className="justify-center w-full h-24  text-start pl-10 rounded-xl border-2 border-[#F21F61] ">
                    {item.text}
                </button>
            ))}
        </div>
    )
}

export default ClinicLayanan;