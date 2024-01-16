import React from "react";
import TopBarInside from "../HomePage/TopBarInside";
import Title from "../JadwalConsultasi/Title.jsx";
import ChooseTitle from "../JadwalConsultasi/ChooseTitle.jsx";
import ProfilePembayaran from "./ProfilePembayaran.jsx";
import TipePembayaran from "./TipePembayaran.jsx";
import ButtonPembayaran from "./ButtonPembayaran.jsx";
const PembayaranHomepage =({dataDoctor}) => {
    
    return(
        <div>
            <TopBarInside/>
            <div className="m-10 font-poppins">
                <Title text={'Pembayaran'}/>
                <ChooseTitle title={'Rangkuman Pemesanan'}/>
                <ProfilePembayaran/>
                <ChooseTitle title={'Pilih Metode Pembayaran'}/>
                <TipePembayaran/>
                <ButtonPembayaran id={1} text={'Bayar'}/>
            </div>
        </div>
    );
}

export default PembayaranHomepage;