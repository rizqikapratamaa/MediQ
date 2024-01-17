import React from "react";
import Home from '../Assets/HomeNav.svg'
import Layanan from '../Assets/LayananNav.svg'
import Profile from '../Assets/ProfileNav.svg'
import { useNavigate } from "react-router-dom";
const Navbar = () =>{
    const navigate = useNavigate();
    
    const handleHomeButton = () => {
        navigate('/homepage')
    }
    return(
        <nav className="fixed rounded-t-xl w-full h-14 justify-around border-t-[5px] border-x-[5px] flex shadow-2xl shadow-black bottom-0 bg-white z-20 items-center">
            <button className="flex-grow flex justify-center max-md:h-9">
               <img src={Layanan} alt="" className="h-full"/>
            </button>
            <button className="flex-grow flex justify-center max-md:h-9" onClick={handleHomeButton}>
               <img src={Home} alt="" className="h-full"/>
            </button>
            <button className="flex-grow flex justify-center max-md:h-9">
               <img src={Profile} alt="" className="h-full "/>
            </button>

        </nav>
    )
};

export default Navbar;
