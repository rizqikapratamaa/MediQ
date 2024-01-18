import React from "react";
import { useNavigate } from "react-router-dom";

const ButtonPembayaran = ({id, text, data, handleAntrian}) => {
    const navigate = useNavigate();

    const handleNavigate = async () => {
        switch(id){
            case(1) : 
                navigate('pembayaranBerhasil', {state: {data : data}}); 
                break
            case(2) : 
                await handleAntrian();
                break;
            default :                
                break;
        }
        
    }

    return(
        <div className="justify-items-center text-center text-white text-2xl w-full h-fit mt-10">
                <button className="bg-[#F21F61] rounded-xl w-80 h-16" onClick={handleNavigate}>
                    {text}
            </button>
        </div>
    )
}

export default ButtonPembayaran;