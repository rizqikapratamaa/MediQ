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

    const dummyData = [{name: '06/12/2023', alamat: 'Puskesmas Cibiru - Jl. AH Nasution No 47A, Kec. Cibiru', Distance : 1.1, Telpon : '0811-216-560', JumlahDokter: 'Dr.Ahmad Fadil', text : 'Dokter'},{name: '06/12/2023', alamat: 'Puskesmas Cilengkrang - Jl. Cilengkrang, Kec. Cibiru', Distance: 1.7, Telpon: '0812-2055-5656', JumlahDokter : 'Dr. Yenni Trenggo', text : 'Dokter'},{name: '06/12/2023', alamat: 'Dr. Yenni Trenggono', Distance: 2, Telpon: '0823-2524-2321', JumlahDokter : 'Dr. Rajendra Farras', text : 'Dokter'}]
    return(
        <div className="font-poppins">
            <TopBarInside/>
            <div className="mx-10 my-5 flex flex-col">
                <div className="translate-y-5">
                    <Titles text={'Draf Rekam Medis Anda'}/>
                </div>
                <PilihanClinic ButtonComponent={ButtonComponent} navigateId={2} ClinicData={dummyData}/>
            </div>
        </div>
    )
}

export default RekamMedisHomepage;