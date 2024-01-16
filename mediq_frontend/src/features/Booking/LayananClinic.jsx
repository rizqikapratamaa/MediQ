import React from "react";
import { useNavigate} from "react-router-dom";

const PilihanKlinik = ({detailLayanan, searchedValue}) => {
    
    const navigate = useNavigate();
    if(detailLayanan == null){
        return(
            <div>
                <h1>Maaf saat ini belum tersedia layanan</h1>
            </div>
        )
    }
    let filteredLayanan = detailLayanan;

     const handleNavigate = (layanan) => {
        navigate('./doctor-choosing', { state: { data: layanan } });
    }

    if(searchedValue != null){
        filteredLayanan = detailLayanan.filter((layanan) => layanan.text.toLowerCase().includes(searchedValue.toLowerCase()));
    }

    return(
        
        <div className="w-full">
            {filteredLayanan.map((layanan, index) => (

                <button key={index} className="w-full h-16 border-2 border-[#56BDC5] rounded-2xl bg-white my-5 flex items-center" onClick={() => handleNavigate(layanan.text)}>
                <img src={layanan.photo} alt="" className="h-12 m-2" />
                <h1 className="text-lg">{layanan.text}</h1>
                </button>                                
            ))}

        </div>
    )
}

export default PilihanKlinik