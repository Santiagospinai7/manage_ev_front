"use client"

import React, { useState, useEffect, use } from 'react';
import MapContainer from "@/components/MapContainer"
import DirectionsForm from "@/components/DirectionsForm"

const Map = () => {
  const [directions, setDirections] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [recommendedRoutes, setRecommendedRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);

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

  useEffect(() => {
    const originalOverflowStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflowStyle;
    };
  }, []);

  // render route in the map each time that the selected route changes
  useEffect(() => {
    if (selectedRoute) {
      const polyline = selectedRoute.informacion_ruta.overview_polyline

      console.log('polyline', polyline)
      const arrayPath = google.maps.geometry.encoding.decodePath(polyline)
      console.log('arrayPath', arrayPath)

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: arrayPath[0],
          destination: arrayPath[arrayPath.length - 1],
          travelMode: 'DRIVING',
        },
        (response, status) => {
          if (status === 'OK') {
            setDirections(response);
          } else {
            console.error('Error getting directions:', status);
          }
        }
      );
    }
  }, [selectedRoute]);

  return (
    <div className="flex h-full overscroll-none">
      <div className="flex-1 relative h-full">
        <MapContainer userLocation={userLocation} directions={directions} />
        <div className="absolute top-0 left-0 p-4">
          <DirectionsForm 
            onSubmit={handleFormSubmit} 
            recommendedRoutes={recommendedRoutes} 
            setRecommendedRoutes={setRecommendedRoutes} 
            setSelectedRoute={setSelectedRoute}
          />
        </div>
      </div>
    </div>
  );
};

export default Map;
