import React, { useState } from "react";
import Bca from '../Assets/Bank/bca.svg';
import Mandiri from '../Assets/Bank/mandiri.svg';
import Bpjs from '../Assets/Bank/bpjs 1.svg';
import Dana from '../Assets/Bank/dana.svg';
import Gopay from '../Assets/Bank/gopay.svg';

const TipePembayaran = () => {
    const metodePembayaran = [{
        text: 'Transfer Bank',
        img: [Bca, Mandiri]
    }, {
        text: 'E-wallet',
        img: [Dana, Gopay],
    }, {
        text: 'BPJS Kesehatan',
        img: [Bpjs]
    }];
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleClick = (index) => {
        setSelectedIndex(index);
    }

    return (
        <div className="rounded-xl border-[#56BDC5] border-2 border-solid shadow-md drop-shadow-md grid grid-cols-1 grid-rows-3 gap-5 w-full h-auto max-md:text-xs justify-evenly">
            {metodePembayaran.map((item, index) => (
                <div className="items-center" key={index}>
                    <div className="flex gap-5 items-center mx-4 mb-1 h-20 text-xl max-md:text-sm max-md:gap-1">
                        <h1 className=" font-poppins">{item.text}</h1>
                        {item.img.map((img, imgIndex) => (
                            <img src={img} alt="" className="h-max" key={imgIndex} />
                        ))}
                        <div className="flex-grow"></div>
                        <button
                            className={`rounded-full border-[#56BDC5] border-2 h-10 w-10 max-md:h-5 max-md:w-5 ${selectedIndex === index ? 'bg-[#56BDC5] opacity-25 border-2' : 'bg-white '}`}
                            onClick={() => handleClick(index)}
                        ></button>
                    </div>
                    {index !== 2 ? (
                        <div className="h-0.5 w-full bg-[#56BDC5]"></div>
                    ) : null}
                </div>
            ))}
        </div>
    );
}

export default TipePembayaran;
