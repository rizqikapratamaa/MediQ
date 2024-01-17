import React from "react";
import TopBarInside from "../HomePage/TopBarInside";
import Titles from "../JadwalConsultasi/Title";
import MyPdfViewer from "./PdfViewer";
const RekamMedisFileViewer = () => {
    return(
        <div className="">
            <TopBarInside/>
            <div className="m-10">
                <Titles text={'Rekam Medis'}/>
                <MyPdfViewer/>
            </div>
        </div>
    )
}

export default RekamMedisFileViewer;