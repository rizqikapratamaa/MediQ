import React from "react";
import Doctor from '../Assets/DoctorIcon.png'

const Greeting = () =>{
    return(
        <div className="flex flex-row m-10 mb-0 justify-between items-center">
            <div className="pb-7">
                <h1 className="font-semibold text-4xl mb-3">Halo, Davis!</h1>
                
                <h3 className="font-normal text-lg">Bagaimana kabarmu hari ini?</h3>
            </div>
            <div className="">
                <img src={Doctor} alt="" className="w-44 h-40"/>
            </div>
        </div>
    )
};

export default Greeting;
