import React from "react";
import Logo from '../Assets/mediqHomepageLogo.svg'
import Bell from '../Assets/Bell.svg'
import Settings from '../Assets/settings.svg'
import Arrow from '../Assets/BackArrow.svg'
import { useNavigate } from "react-router-dom";

const TopBarInside = () => {
    const navigate = useNavigate();

    const handleBackButton = () => {
        navigate(-1);
    }
    return(
        <nav className="p-4 flex justify-between items-center w-full">
            <button className="bg-[#56BDC5] rounded-md w-8 h-8 flex justify-center items-center" onClick={handleBackButton}>
                <img src={Arrow} alt="" />
            </button>
            <div className="flex items-center flex-grow justify-center w-24 h-9">
                <img src={Logo} alt="mediQ logo" className="h-9" />
            </div>
            <div className="flex gap-4">
                <button>
                    <img src={Bell} alt="Notification Bell" className="h-7" />
                </button>
                <button>
                    <img src={Settings} alt="Settings button" className="h-7"/>
                </button>
            </div>
        </nav>
    );
}

export default TopBarInside;