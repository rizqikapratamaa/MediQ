import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Jam = ({doctorData, dateData}) => {
    const navigate = useNavigate();
    const[selectedHours, setSelectedHours] = useState(0);
    
    const handleJanji = () => {
        const selectedData = {...doctorData, dateData, hour};
        navigate('pembayaran', {state: {data : selectedData}});
    } 
    const dummyData = [
        { id: 1, times: '09:00' },
        { id: 2, times: '10:00' },
        { id: 3, times: '11:00' },
        { id: 4, times: '12:00' },
        { id: 5, times: '13:00' },
        { id: 6, times: '14:00' },
        { id: 7, times: '15:00' },
        { id: 8, times: '16:00' },
        { id: 9, times: '17:00' },
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
                    
                <button className={`shadow-md drop-shadow-md shadow-[#6B779A] h-24 w-40 max-md:h-10  max-md:w-24 border-[#56BDC5] border-solid text-center justify-center rounded-2xl border-2 max-md:text-sm ${index === selectedHours ? 'bg-[#2ABDC9] bg-opacity-20 text-[#0E464A]':'background-white text-[#6B779A]'}`} key={index} onClick={()=> handleSelectedHours(index)}>
                    {item.times}
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