import React, { useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Maps = ({setUserLocation, getClinicsData,ClinicsData}) => {
  const [map, setMap] = useState(null);
  const [userMarker, setUserMarker] = useState(null);
  const [clinicMarker, setClinicMarker] = useState(null);
  const handleUserLocation = (userlatitude, userlongitude) =>{
    setUserLocation({
      latitude : userlatitude,
      longitude : userlongitude,
    })
  }
  const [userLocation, setCurrentLocation] = useState({
    longitude : 0, latitude : 0
  });

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2ZS1hIiwiYSI6ImNscmM0cGozYzAya20yaWxha2x2cWx0dXgifQ.7f0Sla8l5Lvj70AlEiYGQQ';

    const newMap = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [0,0],
      zoom: -1,
    },[]);

    setMap(newMap);

    
    return () => {
      newMap.remove();
    };
  }, []);

  const handleClinicsMarker = () => {
    console.error(ClinicsData);
      if(ClinicsData){
        if(clinicMarker){
          setClinicMarker(null)
        }
        console.error(ClinicsData);

        const newClinicMarkers = ClinicsData.map(clinic => {
          return new mapboxgl.Marker({color : '#F21F61'})
          .setLngLat([clinic.location.longitude, clinic.location.latitude])
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${clinic.fullName}</h3>`))
          .addTo(map);
        })

        setClinicMarker(newClinicMarkers);
      }

  }

  const trackUserLocation = async () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const {latitude, longitude} = position.coords;
          handleUserLocation(latitude, longitude)
          await getClinicsData();
          const marker = new mapboxgl.Marker()
          .setLngLat([longitude,latitude])
          .setPopup(new mapboxgl.Popup().setHTML("<h3>User Location</h3>"))
          .addTo(map);
          handleClinicsMarker();
          map.flyTo({
            center : [longitude, latitude],
            zoom : 15,
            essential : true,
          });
         
          setUserMarker(marker);
          
          setCurrentLocation({longitude : longitude, latitude: latitude})
        },(error) => {
          console.error(error);
          // Handle errors, e.g., show a message to the user
        },
        
        { enableHighAccuracy: true }
        
      )
    } else{
      console.error("Geolocation is not supported by this browser");
    }
  }
  return (
    <div className="h-96 max-md:h-44 border-black border-2 rounded-xl relative">
      <div className="overflow-hidden h-full w-full rounded-xl">
          <div id="map" className="h-full"></div>
      </div>
      <div className="absolute bottom-0 w-64 h-20 z-10 left-28 translate-y-12 border-[6px] bg-white border-white rounded-3xl max-md:w-36 max-md:h-12 max-md:text-xs text-lg max-md:translate-y-8">
          <button
          onClick={trackUserLocation}
          className="h-full w-full right-4 bg-white text-[#56BDC5] rounded-3xl shadow-md  font-poppins  border-[#56BDC5] border-2 border-solid shaodw-lg drop-shadow-xl "
        >
          Cari Klinik Terdekat
        </button>
        </div>
    </div>
  );
};

export default Maps;
