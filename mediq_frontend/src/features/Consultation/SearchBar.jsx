import React, { useState } from "react";
import searchLogo from '../Assets/search.svg'

const SearchBar = ({text, onSearch}) =>{
    const [searchText, setSearchText] = useState("");

    const handleInputChange = (e) => {
        setSearchText(e.target.value)
        if(onSearch){
            onSearch(e.target.value);
        }
    }
    return(
        <div className="flex items-center ">
            <input type="text"
            value={searchText} 
            onChange = {handleInputChange}
            placeholder={text}
            className="border-2 border-[#F21F61] rounded-full h-12 w-full px-5 text-[#F64E82] focus:outline-none placeholder:text-[#F64E82] placeholder:font-poppins"/>
            <img src={searchLogo} alt="Search Logo" className="w-8 absolute right-14"/>
        </div>
    )
}

export default SearchBar;