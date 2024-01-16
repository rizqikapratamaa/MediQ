import React from "react";
import TopBarInside from "../HomePage/TopBarInside";
import PilihanClinic from "../Booking/PilihanClinic";
import Document from '../Assets/document.svg'
import Titles from "../JadwalConsultasi/Title";
const RekamMedisHomepage = () => {
    const ButtonComponent = {
        buttonText : 'Lihat',
        buttonImage : Document
    }

    return(
        <div className="font-poppins">
            <TopBarInside/>
            <div className="mx-10 my-5 flex flex-col">
                <div className="translate-y-5">
                    <Titles text={'Draf Rekam Medis Anda'}/>
                </div>
                <PilihanClinic ButtonComponent={ButtonComponent} navigateId={2}/>
            </div>
        </div>
    )
}

export default RekamMedisHomepage;