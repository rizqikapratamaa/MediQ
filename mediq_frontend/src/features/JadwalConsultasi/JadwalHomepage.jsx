import React, { useState } from "react";
import TopBarInside from "../HomePage/TopBarInside";
import SeparateDoctorComponent from "../DoctorChoosing/IndividualDoctorComponent";
import Jam from "./Jam";
import ChooseTitle from "./ChooseTitle";
import ConsultationDate from "./ConsultationDate";
import { useLocation } from "react-router-dom";
import Title from "./Title";
const JadwalHomepage = () =>{
    const location = useLocation();
    let doctorData = location?.state?.data;
    const [date, setDate] = useState(new Date());
    return(
        <div>
            <TopBarInside/>
            <div className="m-10">
                <Title text={'Pilih Jadwal Konsultasi'}/>
                <SeparateDoctorComponent data={doctorData}/>
                <ChooseTitle title={'Pilih tanggal'}/>
                <ConsultationDate setDate={setDate}/>
                <ChooseTitle title={'Pilih jam'}/>
                <Jam doctorData={doctorData} dateData={date}/>
            </div>

        </div>
    )
}

export default JadwalHomepage;