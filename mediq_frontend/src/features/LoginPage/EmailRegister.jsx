import React, { useEffect, useState } from "react";
import BackButton from '../Assets/BackArrow.svg'
import { Link } from "react-router-dom";
import VisibilityOn from "../Assets/visibility.svg"
import VisibilityOff from "../Assets/visibility_off.svg"
import axios from 'axios';

const EmailRegister = () =>{


    const [nik, setNik] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBorn] = useState('');
    const [fullName, setName] = useState('');
    const role = 'patient';
    const [gender, setJenisKelamin] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] =  useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const handleEmail = (event) => {
        let selectedEmail = event.target.value;
        setEmail(selectedEmail);
    }

    const passwordChecker = () => {
        if(showPassword != showConfirmPassword){
            alert("Password yang dimasukkan tidak sama")
            return false
        }
        return true
    }


    const handlePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const handlePasswordConfirmVisibility = () => {
        setShowConfirmPassword((prevShowPassword) => ! prevShowPassword);
    }

    const getFormattedMinDate = () => {
        const minDate = new Date("1900-01-01");
        return minDate.toISOString().split("T")[0];
      };


     const checkEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const checkBorn = () => {
        let minimumTime = getFormattedMinDate();
        let today = new Date();
        today = today.toISOString().split("T")[0];
        if(birthDate < minimumTime || birthDate > today){
            setBorn(minimumTime);
            alert("Tanggal Lahir Tidak Valid")
            return false;
        }
        return true;
    }

    const handeName = (value) => {
        let selectedName = value.target.value;
        setName(selectedName);
    }

    const handlePassword = (value) => {
        let selectedPassword = value.target.value
        setPassword(selectedPassword)
    }
    const handleConfirmPassword = (value) => {
        let selectedConfirm = value.target.value
        setConfirmPassword(selectedConfirm);
    }
    const checkNik = () => {
        if(nik.length != 16){
            alert("Panjang NIK Kurang dari 16")
            return false
        }
        return true
    }
    const handleSubmission = async(event) => {
        //Check nik
        event.preventDefault();
        if(checkEmail() && checkBorn() && checkNik() && passwordChecker()){
            try{
                
                const response = await axios.post("http://localhost:8000/signup-email",{
                    email,
                    phoneNumber: '',
                    gender,
                    fullName,
                    birthDate,
                    nik,
                    password,
                    role
                })
            } catch (error){
                console.error(error.response.data);
            }
        } 
    }

    const handleJenisKelamin = (event) => {
        setJenisKelamin(event.target.value);
    }

    const handleBornDate = (event) => {
        const selectedDate = event.target.value;
        setBorn(selectedDate);
    }


    
    const handleNIKCounter = (event) =>{
        let inputValue = event.target.value;

        inputValue = inputValue.replace(/\D/g, '');
        if(inputValue.length <= 16){
            setNik(inputValue);
        }
        else{
            alert('!!! Maksimal Panjang NIK adalah 16')
        }
    };
    return (
        <div className="m-10 flex flex-col font-poppins">
            <button className="w-7 bg-[#75E6E2] rounded-md h-7 items-center flex justify-center my-4">
                <Link to="/">
                    <img src={BackButton} alt="Back Button" className="w-max h-max"/>
                </Link>
            </button>
            <h1 className="font-bold text-3xl">Masukkan Identitas Diri</h1>
            <h3 className="font-light text-sm mt-4">Lengkapilah identitas diri agar Anda dapat <br></br>terhubung dengan fasilitas kesehatan yang tersedia</h3>
            <div className="w-full h-[1px] bg-black my-5"></div>
            <form onSubmit={handleSubmission} >
                <div className="flex flex-col w-full ">
                    <div className="flex flex-col w-full">
                <label htmlFor="Email" className="font-light text-[15px]">E-mail</label>
                    <input type="email" id="Email" required placeholder="Masukkan alamat email"
                        className="w-full border-[1.5px] border-solid border-[#B3B3B3] rounded-md text-center placeholder:font-poppins placeholder:font-light placeholder:text-[15px] placeholder:text-[#A1A0A0] mt-2" onChange={handleEmail} value={email}></input>
                </div>
                </div>
                <br></br>
                <div>
                    <label htmlFor="JenisKelamin" className="font-light text-[15px]">Jenis Kelamin</label>
                    <div className="mt-2">
                        <select  id="JenisKelamin" required onChange={handleJenisKelamin} value={gender} className="block w-full text-center text-[#A1A0A0] font-light text-[15px] border-[1.5px] rounded-md border-solid border-[#B3B3B3] focus:outline-none ">
                            <option disable="true" value="">Pilih Jenis Kelamin</option>
                            <option value="Laki-Laki">Laki-Laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>
                </div>
                <br>
                </br>
                <div>
                    <label htmlFor="Names" className="font-light text-[15px]">Nama Lengkap</label>
                    <input type="text" id="Names" required onChange={handeName} value={fullName} placeholder="Masukkan nama lengkap sesuai KTP"
                        className="w-full border-[1.5px] border-solid border-[#B3B3B3] rounded-md text-center placeholder:font-poppins placeholder:font-light placeholder:text-[15px] placeholder:text-[#A1A0A0] mt-2"></input>
                </div>
                <br />
                <div className="flex-col flex font-light">
                    <label htmlFor="Dates">Tanggal Lahir</label>
                    <input placeholder= "Masukkan tanggal lahir" type="date" autoSave="true" className="mt-2 w-full text-[#A1A0A0] leading-tight font-light border-[1.5px] border-solid border- rounded-md text-center border-[#B3B3B3]" onChange={handleBornDate} value={birthDate}/>
                </div> 
                <br />
                <div className="flex-col flex font-light">
                    <label htmlFor="NIK">NIK</label>
                    
                    <input type="text" pattern="[0-9]*" inputMode="numeric" placeholder="Masukkan NIK sesuai KTP" className="placeholder:font-light placeholder:text-[#A1A0A0] placeholder:text-[15px] border-[1.5px] border-solid text-center rounded-md border-[#B3B3B3]" onChange={handleNIKCounter} value={nik} /> 
                </div>
                <p className="text-end mt-1 font-light text-[10px] text-[#727171]"><span>{nik.length}</span>/16</p>
                <div className="font-light">
                    <label htmlFor="Password" className=" text-[15px]">Kata Sandi</label>
                    <div className=" flex flex-row justify-center items-center">
                    <input type={showPassword ? "text" : "password"} id="Password" required  placeholder="Masukkan Kata Sandi"
                        className="w-full border-[1.5px] border-solid border-[#B3B3B3] rounded-md text-center placeholder:font-poppins placeholder:font-light placeholder:text-[15px] placeholder:text-[#A1A0A0] mt-2" value={password} onChange={handlePassword}></input>
                    <button onClick={handlePasswordVisibility}>    
                        <img src={showPassword ? VisibilityOn : VisibilityOff} alt="" className="h-5 absolute right-11 -translate-y-1"/>
                    </button>
                    </div>
                    </div>
                <div className="my-6 font-light">
                    <label htmlFor="Password" className="text-[15px]">Konfirmasi Kata Sandi</label>
                    <div className=" flex flex-row justify-center items-center">
                    <input type={showConfirmPassword ? "text" : "password"} id="Password" required  placeholder="Masukkan Kata Sandi"
                        className="w-full border-[1.5px] border-solid border-[#B3B3B3] rounded-md text-center placeholder:font-poppins placeholder:font-light placeholder:text-[15px] placeholder:text-[#A1A0A0] mt-2" value={confirmPassword} onChange={handleConfirmPassword}></input>
                    <button onClick={handlePasswordConfirmVisibility}>    
                        <img src={showConfirmPassword ? VisibilityOn : VisibilityOff} alt="" className="h-5 absolute right-11 -translate-y-1"/>
                    </button>
                    </div>
                </div>
            <div className="my-10 justify-center flex ">
                <button className="w-60 h-8 bg-[#75E6E2] rounded-lg text-white font-semibold text-md" type="submit" onSubmit={handleSubmission}>
                DAFTAR
                </button>
            </div>
            </form> 
        </div>
    )
}

export default EmailRegister;