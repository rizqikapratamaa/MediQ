import React, { useState } from "react";
import TopBarInside from "../HomePage/TopBarInside";
import SearchBar from "../Consultation/SearchBar";
import LayananUmum from "./LayananUmum";
import DoctorComponent from "./DoctorComponent";
import Photo from "../Assets/DummyPhoto.png"
import { useLocation } from "react-router-dom";
const DoctorChoosingHomepage = () =>{

    const DummyDoctorData = [{
        name: 'Aland Pratama', job: 'Dokter umum', experience : 5, rating: 4.7, place: 'Puskesmas Antapani',photo: Photo, price : '15.000'
    },{
        name: 'Fauzan Nurwahid', job: 'Dokter umum', experience : 6, rating: 5, place: 'Puskesmas Cibeunying', photo: Photo, price : '15.000'
    },{
        name: 'Melissa Widya Santoso', job: 'Dokter umum', experience : 4, rating: 4.5, place: 'Puskesmas Dago', photo: Photo, price : '15.000'
    },]

    const [data,setData] = useState('')
    const handleSearch = (value) =>{
        setData(value)
    }
    const location = useLocation();
    const JenisLayanan = location?.state?.data;

    return(
        <div className="font-poppins flex flex-col justify-center">
            <TopBarInside/>
            <div className="m-10">
                <h1 className="font-semibold text-2xl mb-7">Pilih Dokter</h1>
                <SearchBar text={'Cari Dokter'} onSearch={handleSearch}/>
                <div className="w-full my-5"></div>
                <LayananUmum text={JenisLayanan}/>
                <DoctorComponent DoctorData={DummyDoctorData} searchedData={data}/>
            </div>
            
        </div>
    )
}

export default DoctorChoosingHomepage;