import React,{useEffect, useState} from "react";
import TopBarInside from "../HomePage/TopBarInside";
import BookingTitle from "../Booking/bookingTitle";
import { useLocation } from "react-router-dom";
import AntrianLabel from "./AntrianLabel";
import PilihanLayanan from "../Consultation/PilihanLayanan";
import Photo from '../Assets/DummyPhoto.png'
import ButtonPembayaran from "../Pembayaran/ButtonPembayaran";
import Medical from '../Assets/medical_services.svg'
const AntrianHomepage = () => {
    const location = useLocation();
    const [dataAntrian, setDataAntrian] = useState({
        name: '',
        alamat : '',
        phone: '',
        dokter: '',
    });

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

    const handleDataPassing = () => {
        const data = location?.state?.data;
        try{
            setDataAntrian(data);
        } catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        handleDataPassing();
    },[])

  
    return(
        <div className="font-poppins">
            <TopBarInside/>
            <div className="m-10">
                <BookingTitle title={'Booking Antrian'}/>
                
                <p className="text-sm my-2">Booking antrian hanya dapat dilakukan untuk hari ini</p>
                <AntrianLabel data={dataAntrian}/>
                <PilihanLayanan id={1} detailLayanan={dummyLayanan}/>
                <ButtonPembayaran id={2} text={'Book Antrian'}/>
            </div>
        </div>
    )
}

export default AntrianHomepage;