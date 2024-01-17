import React from "react";
import Doctor from '../Assets/DoctorIcon.png'

const Greeting = ({name}) =>{
    return(
        <div className="flex flex-row m-10 mb-0 justify-between items-center">
            <div className="pb-7">
                <h1 className="font-semibold lg:text-4xl xl:text-4xl max-md:text-lg  mb-3">Halo, {name}!</h1>
                
                <h3 className="font-normal max-md:text-sm text-lg">Bagaimana kabarmu hari ini?</h3>
            </div>
            <div className="">
                <img src={Doctor} alt="" className="h-32"/>
            </div>
        </div>
    )
};

export default Greeting;
