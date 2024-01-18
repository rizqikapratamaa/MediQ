import React, { useState } from "react";
import TopBarInside from "../HomePage/TopBarInside";
import Title from "../JadwalConsultasi/Title.jsx";
import ChooseTitle from "../JadwalConsultasi/ChooseTitle.jsx";
import ProfilePembayaran from "./ProfilePembayaran.jsx";
import TipePembayaran from "./TipePembayaran.jsx";
import ButtonPembayaran from "./ButtonPembayaran.jsx";
import { useLocation } from "react-router-dom";
const PembayaranHomepage =() => {
    const location = useLocation();

    let selectedData = location?.state?.data;

    const label = 'Konsultasi Online'
    let finalData = {...selectedData, label}
    return(
        <div>
            <TopBarInside/>
            <div className="m-10 font-poppins">
                <Title text={'Pembayaran'}/>
                <ChooseTitle title={'Rangkuman Pemesanan'}/>
                <ProfilePembayaran doctorData={selectedData}/>
                <ChooseTitle title={'Pilih Metode Pembayaran'}/>
                <TipePembayaran/>
                <ButtonPembayaran id={1} text={'Bayar'} data={finalData}/>
            </div>
        </div>
    );
}

export default PembayaranHomepage;