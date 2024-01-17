import React, {useState} from "react";
import { useNavigate} from "react-router-dom";


const PilihanLayanan = ({detailLayanan, searchedValue, id}) => {

    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);


    if(detailLayanan == null){
        return(
            <div>
                <h1>Maaf saat ini belum tersedia layanan</h1>
            </div>
        )
    }
    let filteredLayanan = detailLayanan;

     const handleNavigate = (layanan, api) => {
        
        navigate('./doctor-choosing', { state: { data: {layanan, api} }});
    }

     const handleChangeLayanan = (index) => {
        console.log(index)
        setCurrentIndex(index)
     }

    if(searchedValue != null){
        filteredLayanan = detailLayanan.filter((layanan) => layanan.text.toLowerCase().includes(searchedValue.toLowerCase()));
    }

    return(
        
        <div className="w-full">
            {id === 0 &&
                filteredLayanan.map((layanan, index) => (
                <button
                    key={index}
                    className="w-full h-16 border-2 border-[#56BDC5] rounded-2xl bg-white my-5 flex items-center text-left p-4"
                    onClick={() => handleNavigate(layanan.text, layanan.api)}>
                    <h1 className="text-lg max-md:text-sm">{layanan.text}</h1>
                </button>
                ))}
            {id === 1 && 
                detailLayanan.map((layanan, index) => (    
                    <button
                        key={index}
                        className={`w-full h-16 border-2 border-[#56BDC5] rounded-2xl  my-5 flex items-center p-4 ${currentIndex === index ? 'bg-[#2ABDC9] bg-opacity-15' : 'bg-white opacity-100'}`}
                        onClick={() => handleChangeLayanan(index)}>
                        {/* <img src={layanan.photo} alt="" className="h-12 m-2" /> */}
                        <h1 className="text-lg max-md:text-sm text-left">{layanan.text}</h1>
                    </button>
                ))
            }
        </div>
    )
}

export default PilihanLayanan