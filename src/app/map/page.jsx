"use client"

import React, { useState, useEffect } from 'react';
import MapContainer from "@/components/MapContainer"
import DirectionsForm from "@/components/DirectionsForm"
import RecommendedRoutes from "@/components/RecommendedRoutes"

const Map = () => {
  const [directions, setDirections] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [recommendedRoutes, setRecommendedRoutes] = useState([]);

  const handleFormSubmit = async (routeData) => {
    console.log('routeData', routeData)
    try {
      const reponse = await fetch(`http://localhost:8000/api_Model/ruta_optima/?origen=${routeData.departure}&destino=${routeData.destination}&bateria_actual=${routeData.batteryLevel}`)
      const data = await reponse.json()
      console.log('data', data)

      setRecommendedRoutes(data.rutas);
    } catch (error) {
      console.error(error)
    }


    // if (routeData.departure && routeData.destination) {
    //   const directionsService = new window.google.maps.DirectionsService();
    //   directionsService.route(
    //     {
    //       origin: routeData.departure,
    //       destination: routeData.destination,
    //       travelMode: 'DRIVING',
    //     },
    //     (response, status) => {
    //       if (status === 'OK') {
    //         setDirections(response);
    //       } else {
    //         console.error('Error getting directions:', status);
    //       }
    //     }
    //   );
    // } else {
    //   console.error('Please provide both departure and destination');
    // }
  };

  const handleGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
    
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  };

  useEffect(() => {
    handleGeolocation(); // Get user's current location on component mount
  }, []);

  return (
    <div className="flex h-full overscroll-none">
      <div className="flex-1 relative h-full">
        <MapContainer userLocation={userLocation} directions={directions} />
        <div className="absolute top-0 left-0 p-4">
          <DirectionsForm onSubmit={handleFormSubmit} recommendedRoutes={recommendedRoutes} />
        </div>
      </div>
    </div>
  );
};

export default Map;
