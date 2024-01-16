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
    const ButtonComponent = {
        buttonText : 'Book Antrian',
        buttonImage : Medical,
        titles : 'Pilihan klinik'
    }
    return(
        <div className="font-poppins">
            <TopBarInside/>
            <div className="mx-10 my-20 flex flex-col gap-5">
                <BookingTitle title={'Cari Klinik'}/>
                <SearchBar text={'Cari Klinik'} onSearch={handleSetData} />
                <BookingTitle /> 
                <Maps/>
                <PilihanClinic ButtonComponent={ButtonComponent} navigateId={1}/>
                
            </div>
        </div>
    );
}

export default BookingHomepage;