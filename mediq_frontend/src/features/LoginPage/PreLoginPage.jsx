import React, { useEffect } from "react";
import {Link} from 'react-router-dom';
import mediqLogo from '../Assets/mediqLogo.svg'
import CentangBiru from '../Assets/CentangBiru.svg'
/*

Used before the User Login
- If the user has login, this page won't show up
*/

const PreLoginPage = ({userLoggedOff}) => {

    useEffect(() => {
        userLoggedOff()
      }, []);
    return(

        <div className="h-screen flex items-center gap-7 flex-col w-screen flex-grow">
            <div className="text-center mt-20 font-poppins font-semibold max-md:text-4xl text-5xl w-full justify-center">
                <h1 >Selamat Datang</h1>
                <h1 className="mt-10 max-md:mt-5">di MediQ!</h1></div>
            
            <div className="justify-center items-center w-60 h-60 flex ">
                <img className="w-60 h-60" src={mediqLogo} alt="MediQ Logo"></img>
            </div>

            <div className="w-full">
                <div className="bg-gray-white w-full h-[15rem] text-center justify-center flex flex-col gap-4 ">
                    <p className="text-[#F21F61] text-lg"><i><b>#BerobatJadiMudah</b></i> hanya di MediQ!</p>
                    <div className="flex flex-col gap-3 text-lg">
                        <div className="flex flex-row justify-center items-center gap-4 text-[#319CA5] text-left">
                            <img src={CentangBiru} alt=""  className="h-5"/>
                            <p className="">Lihat rekam medis kamu secara <br></br>online dan aman</p>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-4 text-[#319CA5] text-left">
                            <img src={CentangBiru} alt=""  className="h-5"/>
                            <p className="">Lihat rekam medis kamu secara <br></br>online dan aman</p>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-4 text-[#319CA5] text-left">
                            <img src={CentangBiru} alt=""  className="h-5"/>
                            <p className="">Lihat rekam medis kamu secara <br></br>online dan aman</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-col text-center font-poppins">
                <p className="mb-4">Masuk melalui Nomor Telepon atau E-mail?</p>
                <div className="flex flex-row gap-5 text-white font-semibold text-[14px] justify-evenly ">
                    <Link to="/register-phone">
                        <button className="bg-[#75E6E2] w-36 h-10 rounded-xl">
                        Nomor Telepon
                        </button>
                    </Link>
                    <Link to="/register-email">                    
                        <button className="bg-[#75E6E2] w-36 h-10 rounded-xl">
                        Email
                        </button>
                    </Link>
                </div>
                <p className="mt-10">Sudah punya akun? <span className="font-bold"><Link to="/login" className="text-[#75E6E2]">MASUK</Link></span></p>
            </div>
            <div className="p-5"></div>
        </div>
    )
}

export default PreLoginPage;