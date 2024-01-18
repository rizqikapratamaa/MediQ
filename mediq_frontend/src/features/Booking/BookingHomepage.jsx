import React, {useState} from "react";
import TopBarInside from "../HomePage/TopBarInside";
import BookingTitle from "./bookingTitle";
import SearchBar from "../Consultation/SearchBar";
import Maps from "./Maps";
import PilihanClinic from "./PilihanClinic";
import Medical from '../Assets/medical_services.svg'
import axios from 'axios';
const BookingHomepage = () => {

    const [data, setData] = useState('');
    const [clinicData, setCLinicData] = useState(null);
    const handleSetData = (value) => {
        setData(value)
    }

    const [userLocation, setUserLocation] = useState({
        latitude : "",
        longitude : "",
    })

    const clinicDummy = [
        {name : 'Puskesmas A', alamat: 'Jl.Plered No.2, Kec.Antapani', Telpon: '0812-2190-2846', JumlahDokter : 4, Distance : 5, text: 'Jumlah Dokter'},{name : 'Puskesmas B', alamat: 'Jl.Plered No.2, Kec.Antapani', Telpon: '0812-2190-2846', JumlahDokter : 4, Distance : 5, text: 'Jumlah Dokter'},{name : 'Puskesmas C', alamat: 'Jl.Plered No.2, Kec.Antapani', Telpon: '0812-2190-2846', JumlahDokter : 4, Distance : 5, text: 'Jumlah Dokter'}
    ]
    const ButtonComponent = {
        buttonText : 'Book Antrian',
        buttonImage : Medical,
        titles : 'Pilihan klinik'
    }

    const getClinicsData = () => {
        // if(userLocation.latitude == ''){
        //     return;
        // }
        
        // const userLatitude = userLocation.latitude;
        // const userLongitude = userLocation.longitude;

        axios.get(`/api/booking-klinik`)
        .then(response => {

            const updatedClinicData = response.data.
            
            clinicUsers.map(clinic => ({
                ...clinic,
                text: 'Jumlah Dokter',
                Distance: 5, JumlahDokter : 3
              }));
              
            setCLinicData(updatedClinicData);
        })
        .catch(error => {
            console.error('Error fetching clinics:', error);
            // Handle error
        });


    };

    return(
        <div className="font-poppins">
            <TopBarInside/>
            <div className="mx-10 my-20  max-md:my-5 flex flex-col gap-5">
                <BookingTitle title={'Cari Klinik'}/>
                <SearchBar text={'Cari Klinik'} onSearch={handleSetData} />
                <BookingTitle /> 
                <Maps setUserLocation={setUserLocation} getClinicsData={getClinicsData} ClinicsData={clinicData}/>
                <PilihanClinic ButtonComponent={ButtonComponent} navigateId={1} ClinicData={clinicData}/>                
            </div>
        </div>
    );
}

export default BookingHomepage;