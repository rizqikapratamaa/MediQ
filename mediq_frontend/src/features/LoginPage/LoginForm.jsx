import React, {isValidElement, useState} from "react";
import { Link , useNavigate} from "react-router-dom";
import BackButton from '../Assets/BackArrow.svg'
import VisibilityOn from "../Assets/visibility.svg"
import VisibilityOff from "../Assets/visibility_off.svg"
import axios from 'axios'

const LoginForm = () =>{
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handlePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const handleSubmission = async(event) =>{
        event.preventDefault();
        const identifier = document.getElementsByName('identifier')[0].value;

        if(validEmail(email) || validPhone()){
            try{
                const response = await axios.post("http://localhost:8000/login" ,{
                    identifier: identifier, password
                });

                if(response.request.status === 200){
                    console.log(response.json());
                    navigate('/homepage')
                }
            } catch(error){
                // alert(error.response.data);
                console.log(error);
                alert(error.response.data);
            }
        } else{
            if(phone.length > 0){
                alert("No Telepon tidak Valid");
            } else if(email.length > 0){
                alert("Email Tidak Valid")
            }
        }
    }
    
    const validPhone = () => {
       return phone.length >= 8 && phone.length <= 12

    }
    const hasNonNumber = (text) =>{
        const nonNumberRegex = /[^0-9]/
        return nonNumberRegex.test(text);
    }
    
    const validEmail = (text) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(text);
    }
    const handleData = (event) => {
        let selectedData = event.target.value;
        if(hasNonNumber(selectedData)){
            setEmail(selectedData)
            setPhone("")
        } else{
            setPhone(selectedData);
            setEmail("");
        }
    }

    const handlePassword = (value) => {
        let selectedPassword = value.target.value
        setPassword(selectedPassword)
    }

    return(
        <div className="m-10 flex flex-col font-poppins h-screen">
            <button className="w-7 bg-[#75E6E2] rounded-md h-7 items-center flex justify-center my-4">
                <Link to="/">
                    <img src={BackButton} alt="Back Button" className="w-max h-max"/>
                </Link>
            </button>
            <h1 className="font-bold text-3xl">Masukkan Email/No.Telp</h1>
            <h3 className="font-light text-sm mt-4">Lengkapilah identitas diri agar Anda dapat <br></br>terhubung dengan fasilitas kesehatan yang tersedia</h3>
            <div className="w-full h-[1px] bg-black my-5"></div>
            <form className="h-1/2" onSubmit={handleSubmission}>
                <div className="flex flex-col w-full ">
                    <div className="flex flex-col w-full">
                <label htmlFor="identifier" className="font-light text-[15px]">E-mail/No.telepon</label>
                    <input type="text" name="identifier" required placeholder="Masukkan alamat email"
                        className="w-full border-[1.5px] border-solid border-[#B3B3B3] rounded-md text-center placeholder:font-poppins placeholder:font-light placeholder:text-[15px] placeholder:text-[#A1A0A0] mt-2" onChange={handleData} value={email||phone}></input>
                    </div>
                </div>
                <br></br>
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
                <div className="h-full items-center flex-col flex justify-end ">
                    <div className="flex justify-center bottom-0 "><p className="">Belum punya akun mediQ? <span className="font-bold"><Link to="/" className="text-[#F21F61] ml-3 text-lg">DAFTAR</Link></span></p></div>
                    <div className="my-5 justify-center flex">
                        <button className="w-72 h-14 bg-[#75E6E2] rounded-lg text-white font-semibold text-lg" type="submit" onSubmit={handleSubmission}>
                        MASUK
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;