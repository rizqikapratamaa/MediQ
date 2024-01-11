import React, { useState } from "react";
import './datepicker.css'
const ConsultationDate = () => {
    const today = new Date();
    const [time, setTime] = useState("");
    const [timeDescription, updateDescription] = useState("Hari ini");
    const [selectedButton, setSelectedButton] = useState(0);
    
    const [formattedDateIndonesia, setFormattedDateIndonesia] = useState(
        today.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
    );

    const getWeekDates = (currentDate) => {
        const weekDates = [];

        for(let date = 0; date < 7; date++){
            const currentDay = new Date(currentDate);
            currentDay.setDate(currentDate.getDate() + date);
            weekDates.push(currentDay)
        }
        return weekDates.map((date) => ({
            date: date.toLocaleDateString('en-US', { day: 'numeric' , month : 'numeric', year : 'numeric'}),
            day: date.toLocaleDateString('id-ID', { weekday: 'long' }),
          }));
    }
    const [datesOption, setDatesOption] = useState(getWeekDates(today));
     
    const optionsIndonesia = { year: 'numeric', month: 'long', day: 'numeric' };

    const handleTimeDescription = (selectedTime)     => {
        const currentDay = today.toLocaleDateString('id-ID', {weekday: 'long'});
        if(selectedTime === currentDay){
            updateDescription("Hari ini");
        } else{
            updateDescription(selectedTime);
        }
    }

    const handleButtonClick = (index) => {
        setSelectedButton(index);
        const selectedDate = new Date(datesOption[index].date);
        const formatttedDate = selectedDate.toLocaleDateString('id-ID',optionsIndonesia);
        setFormattedDateIndonesia(formatttedDate);
        setTime(selectedDate.toISOString());
        handleTimeDescription(datesOption[index].day);
        }

    const handleTimeData = (event) => {
        const selectedTime = event.target.value;
        setTime(selectedTime);
        
        const selectedDate = new Date(selectedTime);
        const formattedDate = selectedDate.toLocaleDateString('id-ID', optionsIndonesia);
        setFormattedDateIndonesia(formattedDate);
        setDatesOption(getWeekDates(selectedDate))
        handleTimeDescription(getWeekDates(selectedDate)[0].day);
        setSelectedButton(0);
        }
    
    return(
        <div>
            <div className="items-center gap-3 font-poppins text-[#104935]  text-lg flex">
                <h3>{timeDescription}, {formattedDateIndonesia}</h3>
                <div className="">
                    <span className="datepicker-toggle h-6">
                    <span className="datepicker-toggle-button"></span>
                    <input type="date" min={today.toISOString().split('T')[0]} className="datepicker-input" onChange={handleTimeData} value={time}/>
                    </span>
                </div>
            </div>
            <div className="w-full justify-evenly bg-[#E2F9F9] rounded-lg h-fit py-5 grid grid-flow-col">
                {datesOption.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                    <button className={`rounded-xl bg-opacity-15 h-24 w-24  text-[#319CA5] text-center text-xl max-md:size-14 max-md:text-[12px] ${index === selectedButton ? 'border-[#319CA5] border-2 border-solid bg-[#2ABDC9]':''}`} onClick={() => handleButtonClick(index)}>
                    <p>{item.date.split('/')[1]}</p>
                    <p className="max-md:text-[12px] text-xs  ">{item.day}</p>
                 </button>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default ConsultationDate;