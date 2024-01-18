import React, {useState} from "react";
import TopBarInside from "../HomePage/TopBarInside";
import BookingTitle from "./bookingTitle";
import SearchBar from "../Consultation/SearchBar";
import Maps from "./Maps";
import PilihanClinic from "./PilihanClinic";
import Medical from '../Assets/medical_services.svg'
const BookingHomepage = () => {

    const [data, setData] = useState('');

    const handleSetData = (value) => {
        setData(value)
    }

    const clinicDummy = [
        {name : 'Puskesmas A', alamat: 'Jl.Plered No.2, Kec.Antapani', Telpon: '0812-2190-2846', JumlahDokter : 4, Distance : 5, text: 'Jumlah Dokter'},{name : 'Puskesmas B', alamat: 'Jl.Plered No.2, Kec.Antapani', Telpon: '0812-2190-2846', JumlahDokter : 4, Distance : 5, text: 'Jumlah Dokter'},{name : 'Puskesmas C', alamat: 'Jl.Plered No.2, Kec.Antapani', Telpon: '0812-2190-2846', JumlahDokter : 4, Distance : 5, text: 'Jumlah Dokter'}
    ]
    const ButtonComponent = {
        buttonText : 'Book Antrian',
        buttonImage : Medical,
        titles : 'Pilihan klinik'
    }
    return(
        <div className="font-poppins">
            <TopBarInside/>
            <div className="mx-10 my-20  max-md:my-5 flex flex-col gap-5">
                <BookingTitle title={'Cari Klinik'}/>
                <SearchBar text={'Cari Klinik'} onSearch={handleSetData} />
                <BookingTitle /> 
                <Maps/>
                <PilihanClinic ButtonComponent={ButtonComponent} navigateId={1} ClinicData={clinicDummy}/>                
            </div>
        </div>
    );
}

export default BookingHomepage;