import React, { useState }  from "react";
import TopBarInside from "../HomePage/TopBarInside";
import SearchBar from "./SearchBar";
import PilihanLayanan from "./PilihanLayanan";


import Photo from '../Assets/DummyPhoto.png'
const Consultation = () => {
    const dummyLayanan = [{
        text: 'Layanan Umum', photo : Photo,
    },{
        text: 'Layanan Gigi dan Mulut', photo : Photo,
    },{
        text: 'Layanan Gizi', photo : Photo,
    },{
        text: 'Layanan Anak dan Remaja', photo : Photo,
    },{
        text: 'Layanan Kesehatan Ibu dan KB', photo : Photo,
    },{
        text: 'Layanan Lansia', photo : Photo,
    }]
    
    const [data, setData] = useState('');
    
    const handleSearch = (value) => {
        setData(value);
    };

    return(
        <div className="font-poppins flex flex-col justify-center">
            <TopBarInside/>
            <div className="m-10">
                <h1 className="font-semibold text-2xl mb-7">Pilih Jenis Layanan Konsultasi</h1>
                <SearchBar text={'Cari jenis layanan konsultasi'} onSearch={handleSearch}/>
                <div className="w-full my-12"></div>
                <PilihanLayanan detailLayanan={dummyLayanan} searchedValue={data} id={0}/>
            </div>
        </div>
    );
};

export default Consultation;