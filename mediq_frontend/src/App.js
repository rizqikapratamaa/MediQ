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
import ClinicHomepage from './features/ClinicHomepage/ClinicHomepage';
import PembayaranBerhasil from './features/Pembayaran/PembayaranBerhasil';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'

import ScrollToTop from './ScrollToTop';
import { useState } from 'react';
import BookingHomepage from './features/Booking/BookingHomepage';
import AntrianHomepage from './features/Antrian/AntrianHomepage';
import BookingBerhasil from './features/Antrian/BookingBerhasil';
import RekamMedisHomepage from './features/RekamMedis/RekamMedisHomepage';
import RekamMedisFileViewer from './features/RekamMedis/RekamMedisFileViewer';

function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogin = () => {
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
  }

  return (
    <div>
      <Router>
        <ScrollToTop/>
        <Routes>

          <Route path='/' element={<PreLoginPage userLoggedOff={handleLogout}/>} />
          <Route path='register-email' element={<EmailRegister/>}/>
          <Route path='register-phone' element={<PhoneRegister/>}/>
          <Route path='login' element={<LoginForm handleLogin={handleLogin}/>} />
          <Route path='homepage' element={<Homepage/>}/>
          <Route path='consultation' element={<Consultation/>}/>
          <Route path='consultation/doctor-choosing' element={<DoctorChoosingHomepage/>} />
          <Route path='consultation/doctor-choosing/jadwal' element={<JadwalHomepage/>}/>
          <Route path='consultation/doctor-choosing/jadwal/pembayaran' element={<PembayaranHomepage/>}/>
          <Route path='clinicHomepage' element={<ClinicHomepage/>} />
          <Route path='consultation/doctor-choosing/jadwal/pembayaran/pembayaranBerhasil' element={<PembayaranBerhasil/>}/>
          <Route path='homepage/bookingPage' element={<BookingHomepage/>}/>
          <Route path='homepage/bookingPage/antrian' element={<AntrianHomepage/>}/>
          <Route path='homepage/bookingPage/antrian/bookingBerhasil' element={<BookingBerhasil/>}/>
          <Route path='homepage/rekamMedis' element={<RekamMedisHomepage/>}/>
          <Route path='homepage/rekamMedis/file' element={<RekamMedisFileViewer/>}/>
        </Routes>
      <div className='h-20 max-h-max  w-full'></div>
      <>
      {
        isAuthenticated ? (<Navbar/>) : null
      }
      </>
      </Router>
    </div>
  );
}

export default App;
