import React,{useEffect, useState} from "react";
import TopBarInside from "../HomePage/TopBarInside";
import BookingTitle from "../Booking/bookingTitle";
import { useLocation } from "react-router-dom";
import AntrianLabel from "./AntrianLabel";
import PilihanLayanan from "../Consultation/PilihanLayanan";
import Photo from '../Assets/DummyPhoto.png'
import ButtonPembayaran from "../Pembayaran/ButtonPembayaran";
import Medical from '../Assets/medical_services.svg'
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AntrianHomepage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [dataAntrian, setDataAntrian] = useState({
        name: '',
        alamat : '',
        phone: '',
        dokter: '',
        clinicId : '',
    });

    const[navData, setNavData] = useState(null);

    const [indexLayanan, setIndex] = useState(0);

    const dummyLayanan = [{
        text: 'Layanan Umum', photo : Photo, api : '/umum'
    },{
        text: 'Layanan Gigi dan Mulut', photo : Photo, api : '/gigi-mulut'
    },{
        text: 'Layanan Gizi', photo : Photo, api : '/gizi'
    },{
        text: 'Layanan Anak dan Remaja', photo : Photo, api : '/anak-remaja'
    },{
        text: 'Layanan Kesehatan Ibu dan KB', photo : Photo, api: '/ibu-kb'
    },{
        text: 'Layanan Lansia', photo : Photo, api: '/lansia'
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

    const handleDataAntrian = async () => {
        console.log('tests');
        const apiKey = dummyLayanan[indexLayanan].api;
        try{
            const response = await axios.get(`/api/booking-klinik/${dataAntrian.clinicId}/pilih-layanan${apiKey}`);

            let data = response.data.data;
            console.log(data);
            navigate('bookingBerhasil', {state: {data: data}}); 
            
        } catch(error){
            console.error(error);
        }
    }

    return(
        <div className="font-poppins">
            <TopBarInside/>
            <div className="m-10">
                <BookingTitle title={'Booking Antrian'}/>
                
                <p className="text-sm my-2">Booking antrian hanya dapat dilakukan untuk hari ini</p>
                <AntrianLabel data={dataAntrian}/>
                <PilihanLayanan id={1} detailLayanan={dummyLayanan} selectedIndex={setIndex}/>
                <ButtonPembayaran id={2} text={'Book Antrian'} data={navData} handleAntrian={handleDataAntrian}/>
            </div>
        </div>
    )
}

export default AntrianHomepage;