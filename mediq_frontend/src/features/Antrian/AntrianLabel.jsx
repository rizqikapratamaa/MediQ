import Location from '../Assets/location_black.svg'
import Telephone from '../Assets/call.svg'
import Person from '../Assets/person.svg'
const AntrianLabel = ({data}) => {

    return(
        <div className="mt-5 font-poppins">
            <div className="w-full h-44 from-[#B4F0EF] to-[#E7F7FA] bg-gradient-to-b rounded-xl relative max-md:h-32">
                <div className="absolute bg-[#F21F61] rounded-l-xl rounded-tr-xl w-28 h-8 right-0 text-center text-white flex justify-center items-center max-md:h-6 max-md:w-20 max-md:text-xs ">5.6 km</div>
                <div className="p-5"> 
                    <h1 className="text-lg max-md:text-sm mb-2">{data.name}</h1>
                    <div className="flex gap-3 items-center mb-1 max-md:text-xs">
                        <img src={Location} alt="" className="h-5"/>
                        <p>{data.alamat}</p>
                    </div>
                    <div className="flex gap-3 items-center mb-1 max-md:text-xs">
                        <img src={Telephone} alt="" className="h-5"/>
                        <p>No. Telp : {data.phone}</p>
                    </div>
                    <div className="flex gap-3 items-center mb-1 max-md:text-xs">
                        <img src={Person} alt="" className="h-5"/>
                        <p>Jumlah dokter : {data.dokter}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AntrianLabel;