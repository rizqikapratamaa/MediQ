import React, { useEffect, useState } from "react";
import TopBarInside from "../HomePage/TopBarInside";
import SearchBar from "../Consultation/SearchBar";
import LayananUmum from "./LayananUmum";
import DoctorComponent from "./DoctorComponent";
import Photo from "../Assets/DummyPhoto.png"
import axios from 'axios'
import { useLocation } from "react-router-dom";
const DoctorChoosingHomepage = () =>{


    const [doctorsData, setDoctorsData] = useState([]);

    const location = useLocation();
    let JenisLayanan = location?.state?.data;
    

    const fetchData = async() => {
        try{
            
            const response = await axios.get(JenisLayanan.api);
            setDoctorsData(response.data.doctors);
            console.log(response.data.doctors);
        } catch(error){
            console.error('Error fetching data', error);
        }
    }
    useEffect(() => {
        fetchData();
    },[])

    const [data,setData] = useState('')
    const handleSearch = (value) =>{
        setData(value)
    }
 
    return(
        <div className="font-poppins flex flex-col justify-center">
            <TopBarInside/>
            <div className="m-10">
                <h1 className="font-semibold text-2xl mb-7">Pilih Dokter</h1>
                <SearchBar text={'Cari Dokter'} onSearch={handleSearch}/>
                <div className="w-full my-5"></div>
                <LayananUmum text={JenisLayanan.layanan}/>
                <DoctorComponent DoctorData={doctorsData} searchedData={data}/>
            </div>
            
        </div>
    )
}

export default DoctorChoosingHomepage;