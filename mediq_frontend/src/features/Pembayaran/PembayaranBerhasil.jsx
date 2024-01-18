import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopBarInside from "../HomePage/TopBarInside";
import Centang from '../Assets/Centang.svg'
const PembayaranBerhasil = () =>{
    const navigate = useNavigate();
    const location = useLocation();

    let selectedData = location?.state?.data;
    console.log(selectedData);

    const handleNeededData = () => {
        let name, bidang, hour, dateData, label, photo;
        ({name, bidang, hour, dateData, label, photo} = selectedData);
        return {name, bidang, hour, dateData, label, photo};
    }
    const handleNavigate = () => {
        console.log(handleNeededData());
        navigate('/homepage', {state : {data : handleNeededData()}});   
    }
    return(
        <div className="h-screen font-poppins flex items-center flex-col">
            <TopBarInside/>
            <div className="flex justify-center items-center text-center">
                <div className="justify-center items-center flex flex-col m-10 w-80 h-auto gap-5 shadow-xl drop-shadow-xl rounded-2xl p-7">
                    <h1 className="font-semibold text-2xl">Berhasil !</h1>
                    <img src={Centang} alt="" />
                    <p>Layanan konsultasi yang Anda pilih berhasil dipesan. Silahkan cek tiket Anda pada halaman utama bagian “Aktivitas Mendatang” atau klik tombol dibawah ini.</p>
                    <button className="text-white bg-[#F21F61] rounded-xl h-11 w-48" onClick={handleNavigate}>Cek Tiket</button>
                </div>
            </div>
        </div>
    )
}

export default PembayaranBerhasil;