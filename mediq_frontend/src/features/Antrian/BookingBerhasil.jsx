import React from "react";
import { useNavigate } from "react-router-dom";
import TopBarInside from "../HomePage/TopBarInside";
import Centang from '../Assets/Centang.svg'
const BookingBerhasil = () =>{
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/homepage');   
    }


    return(
        <div className="h-screen font-poppins flex items-center flex-col">
            <TopBarInside/>
            <div className="flex justify-center items-center text-center">
                <div className="justify-center items-center flex flex-col m-10 w-80 h-auto gap-5 shadow-xl drop-shadow-xl rounded-2xl p-7">
                    <h1 className="font-semibold text-2xl">Berhasil !</h1>
                    <div className="w-full items-center flex justify-center h-12">
                        <h1 className="text-lg w-full  rounded-lg border-2 border-[#56BDC5]">Antrian Anda: 34</h1>
                    </div>
                    <img src={Centang} alt="" />
                    <p>Antrian Anda di puskesmas Cibiru berhasil dipesan. Silahkan cek halaman utama bagian “Aktivitas Mendatang” atau klik tombol dibawah ini untuk <b>melihat nomor antrian yang sedang berjalan.</b></p>
                    <button className="text-white bg-[#F21F61] rounded-xl h-11 w-48" onClick={handleNavigate}>CEK ANTRIAN</button>
                </div>
            </div>
        </div>
    )
}

export default BookingBerhasil;