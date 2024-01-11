import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Jam = () => {
    const navigate = useNavigate();
    const[selectedHours, setSelectedHours] = useState(0);
    
    const handleJanji = () => {
        navigate('pembayaran');
    } 
    const dummyData = [
        { id: 1, time: '09:00' },
        { id: 2, time: '10:00' },
        { id: 3, time: '11:00' },
        { id: 4, time: '12:00' },
        { id: 5, time: '13:00' },
        { id: 6, time: '14:00' },
        { id: 7, time: '15:00' },
        { id: 8, time: '16:00' },
        { id: 9, time: '17:00' },
        // Add more items as needed
      ];
    const [hour, setHour] = useState(dummyData[0]);
    const handleSelectedHours = (index) => {
        setSelectedHours(index);
        setHour(dummyData[index]);
    }
    return(
        <div className="flex flex-col justify-center items-center">

            <br></br>
            <div className=" max-md:grid-rows-3 max-lg:grid-cols-3 gap-8 grid-rows-3 grid-cols-5 grid-flow-row inline-grid max-md:text-sm text-lg">
                { dummyData.map((item, index) => (
                    
                <button className={`shadow-md drop-shadow-md shadow-[#6B779A] h-24 w-40 max-md:h-16 max-md:w-36 border-[#56BDC5] border-solid text-center justify-center rounded-2xl border-2 ${index === selectedHours ? 'bg-[#2ABDC9] bg-opacity-20':'background-white'}`} key={index} onClick={()=> handleSelectedHours(index)}>
                    {item.time}
                </button>
                ))

                }
            </div>
            <br></br>
            <button className='bg-[#F21F61] rounded-lg h-11 w-56 text-white font-semibold text-lg mt-10' onClick={() => handleJanji()}>
                Buat Janji
            </button>
        </div>

    );
}

export default Jam;