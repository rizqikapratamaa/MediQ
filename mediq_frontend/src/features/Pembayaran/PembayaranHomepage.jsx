import React from "react";
import TopBarInside from "../HomePage/TopBarInside";
import Title from "../JadwalConsultasi/Title.jsx";
import ChooseTitle from "../JadwalConsultasi/ChooseTitle.jsx";
import ProfilePembayaran from "./ProfilePembayaran.jsx";
const PembayaranHomepage =({dataDoctor}) => {
    return(
        <div>
            <TopBarInside/>
            <div className="m-10">
                <Title text={'Pembayaran'}/>
                <ChooseTitle title={'Rangkuman Pemesanan'}/>
                
                <ChooseTitle title={'Pilih Metode Pembayaran'}/>
            </div>
        </div>
    );
}

export default PembayaranHomepage;