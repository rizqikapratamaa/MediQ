import React, { useEffect, useState } from "react";
import './datepicker.css'
const ConsultationDate = ({setDate}) => {
    const today = new Date();
    const [time, setTime] = useState("");
    const [timeDescription, updateDescription] = useState("Hari ini");
    const [selectedButton, setSelectedButton] = useState(0);
    
    const [formattedDateIndonesia, setFormattedDateIndonesia] = useState(
        today.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
    );


    const handleFormattedDate = (date) =>{
        const currentDate = new Date(date);
        let formattedDate =  `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;   
        return formattedDate;
    }

    useEffect(() => {
        const data = today.toISOString().split('T')[0]; 
        setDate(handleFormattedDate(data));
    },[])
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

    const handleTimeDescription = (selectedTime)  => {
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
        const adjustedDate = new Date(selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000);
        adjustedDate.setDate(adjustedDate.getDate() + 1);
        const formatDate = adjustedDate.toISOString().split('T')[0];
        setFormattedDateIndonesia(selectedDate.toLocaleDateString('id-ID', optionsIndonesia));
        setTime(selectedDate.toISOString());
        handleTimeDescription(datesOption[index].day);
        let stringFormattedDate = handleFormattedDate(formatDate);
        setDate(stringFormattedDate);
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
        const adjustedDate = new Date(selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000);
        adjustedDate.setDate(adjustedDate.getDate() + 1);
        const formatDate = adjustedDate.toISOString().split('T')[0];
        
        let stringFormattedDate = handleFormattedDate(formatDate);
        setDate(stringFormattedDate);
        }
    
    return(
        <div>
            <div className="items-center gap-3 font-poppins text-[#104935]  text-lg flex max-md:text-sm">
                <h3>{timeDescription}, {formattedDateIndonesia}</h3>
                <div className="">
                    <span className="datepicker-toggle h-6">
                    <span className="datepicker-toggle-button"></span>
                    <input type="date" min={today.toISOString().split('T')[0]} className="datepicker-input" onChange={handleTimeData} value={time}/>
                    </span>
                </div>
            </div>
            <br />
            <div className="w-full justify-evenly bg-[#E2F9F9] rounded-lg h-fit p-5 max-md:p-2 grid-flow-col inline-grid ">
                {datesOption.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                    <button className={`rounded-xl bg-opacity-15 h-24 w-24  text-[#319CA5] text-center text-xl max-md:size-10 max-md:text-xs ${index === selectedButton ? 'border-[#319CA5] border-2 border-solid bg-[#2ABDC9]':''}`} onClick={() => handleButtonClick(index)}>
                    <p>{item.date.split('/')[1]}</p>
                    <p className="max-md:text-[10px] max-md:-translate-y-1 text-lg  ">{item.day}</p>
                 </button>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default ConsultationDate;