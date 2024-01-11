import Homepage from './features/HomePage/Homepage_Patients';
import Navbar from './features/HomePage/Navbar';
import Consultation from './features/Consultation/Consultation';
import DoctorChoosingHomepage from './features/DoctorChoosing/DoctorChoosingHomepage';
import JadwalHomepage from './features/JadwalConsultasi/JadwalHomepage';
import PreLoginPage from './features/LoginPage/PreLoginPage';
import PhoneRegister from './features/LoginPage/PhoneRegister';
import EmailRegister from './features/LoginPage/EmailRegister';
import PembayaranHomepage from './features/Pembayaran/PembayaranHomepage';
import LoginForm from './features/LoginPage/LoginForm';
import {BrowserRouter as Router, Routes,Route,Link, Navigate} from 'react-router-dom'

import ScrollToTop from './ScrollToTop';
import { useEffect, useState } from 'react';
import axios from 'axios'

function App() {
  const [backendData, setBackendData] = useState([{}]);
  const isAuthenticated = false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
        setBackendData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // You can add additional error handling logic here
      }
    };
  
    fetchData();
  }, []);
  return (
    <div>
      <Router>
        <ScrollToTop/>
        <Routes>
          {isAuthenticated ? (
            <>
            <Route path='/' element={<Homepage />}/>
            <Route path = "/preLogin" element={<PreLoginPage/>}/>
            </>
          ): (
            <Route path='/' element={<PreLoginPage/>} />
          )}
  
          <Route path='register-email' element={<EmailRegister/>}/>
          <Route path='register-phone' element={<PhoneRegister/>}/>
          <Route path='login' element={<LoginForm/>} />
          <Route path='homepage' element={<Homepage/>}/>
          <Route path='consultation' element={<Consultation/>}/>
          <Route path='consultation/doctor-choosing' element={<DoctorChoosingHomepage/>}/>
          <Route path='consultation/doctor-choosing/jadwal' element={<JadwalHomepage/>}/>
          <Route path='consultation/doctor-choosing/jadwal/pembayaran' element={<PembayaranHomepage/>}/>
        </Routes>
      <div className='h-20 max-h-max  w-full'></div>
      <Navbar/>
      </Router>
    </div>
  );
}

export default App;
