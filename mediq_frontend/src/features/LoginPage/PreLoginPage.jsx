import React, { useEffect } from "react";
import {Link} from 'react-router-dom';
import mediqLogo from '../Assets/mediqLogo.svg'

/*
Used before the User Login
- If the user has login, this page won't show up
*/

const PreLoginPage = ({userLoggedOff}) => {

    useEffect(() => {
        userLoggedOff()
      }, []);
    return(
        <div className="w-full h-screen flex items-center gap-7 flex-col ">
            <div className="text-center mt-20 font-poppins font-semibold text-5xl">
                <h1>Selamat Datang</h1>
                <h1 className="mt-10">di MediQ!</h1></div>
            
            <div className="justify-center items-center w-60 h-60 flex ">
                <img className="w-60 h-60" src={mediqLogo} alt="MediQ Logo"></img>
            </div>

            <div>
                <div className="bg-gray-300 w-[30rem] h-[15rem] text-center justify-center flex items-center">
                    <p>ini text nantinya</p>
                </div>
            </div>

            <div className="flex-col text-center font-poppins">
                <p className="mb-4">Masuk melalui Nomor Telepon atau E-mail?</p>
                <div className="flex flex-row gap-5 text-white font-semibold text-[14px] ">
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
        </div>
    )
}

export default PreLoginPage;