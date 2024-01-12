import React from "react";
import Logo from '../Assets/mediqHomepageLogo.svg'
import Bell from '../Assets/Bell.svg'
import Settings from '../Assets/settings.svg'

const TopBar = ({id}) => {
    return(
        <nav className="p-4 flex justify-between items-center w-full">
            <div className="flex items-center flex-grow justify-center w-24 h-9">
                <img src={Logo} alt="mediQ logo" className="h-9" />
            </div>{
                id === 1 ? <div className="flex gap-4">
                <button>
                    <img src={Bell} alt="Notification Bell" className="h-7" />
                </button>
                <button>
                    <img src={Settings} alt="Settings button" className="h-7"/>
                </button>
            </div> : null
            }
            
        </nav>
    );
}

export default TopBar;