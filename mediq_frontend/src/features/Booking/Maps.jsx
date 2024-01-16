import React, { useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Maps = () => {
  const [map, setMap] = useState(null);
  const [userMarker, setUserMarker] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2ZS1hIiwiYSI6ImNscmM0cGozYzAya20yaWxha2x2cWx0dXgifQ.7f0Sla8l5Lvj70AlEiYGQQ';

    const newMap = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 1,
    });

    setMap(newMap);

    return () => {
      newMap.remove();
    };
  }, []);

  const trackUserLocation = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {latitude, longitude} = position.coords;
          const marker = new mapboxgl.Marker()
          .setLngLat([longitude,latitude])
          .setPopup(new mapboxgl.Popup().setHTML("<h3>User Location</h3>"))
          .addTo(map);
          map.flyTo({
            center : [longitude, latitude],
            zoom : 15,
            essential : true,
          });
          
          setUserMarker(marker);
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
    <div className="h-96 border-black border-2 rounded-xl relative">
      <div className="overflow-hidden h-full w-full rounded-xl">
          <div id="map" className="h-full"></div>
      </div>
      <div className="absolute bottom-0 w-64 h-20 z-10 left-28 translate-y-12 border-[6px] bg-white border-white rounded-3xl">
          <button
          onClick={trackUserLocation}
          className="h-full w-full right-4 bg-white text-[#56BDC5] rounded-3xl shadow-md  font-poppins text-lg border-[#56BDC5] border-2 border-solid shaodw-lg drop-shadow-xl"
        >
          Cari Klinik Terdekat
        </button>
        </div>
    </div>
  );
};

export default Maps;
