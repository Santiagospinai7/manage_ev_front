"use client"

import React, { useState, useEffect } from 'react';
import MapContainer from "@/components/MapContainer"
import DirectionsForm from "@/components/DirectionsForm"
import RoutePopUp from "@/components/RoutePopUp"

const Map = () => {
  const [directions, setDirections] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [recommendedRoutes, setRecommendedRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routePopUp, setRoutePopUp] = useState(false);

  const handleFormSubmit = async (routeData) => {
  try {
    const response = await fetch(`http://localhost:8000/api_Model/ruta_optima/?origen=${routeData.departure}&destino=${routeData.destination}&bateria_actual=${routeData.batteryLevel}`);
    const data = await response.json();

    console.log('Recommended Routes:', data);

    setRecommendedRoutes(data.rutas);
    
    // Assuming you want to select the first route by default
    if (data.rutas.length > 0) {
      setSelectedRoute(data.rutas[0]);
    }
  } catch (error) {
    console.error(error);
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

  const handleConfirmRoute = () => {
    console.log('Selected Route confirmed:', selectedRoute);
    setRoutePopUp(true);
  };

  const onCancel = () => {
    setRoutePopUp(false);
    setSelectedRoute(null);
    setRecommendedRoutes([]);
    setDirections(null);
  };

  useEffect(() => {
    handleGeolocation();
  }, []);

  useEffect(() => {
    const originalOverflowStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflowStyle;
    };
  }, []);

  useEffect(() => {
    if (selectedRoute) {
      const polyline = selectedRoute.informacion_ruta.overview_polyline;
      const arrayPath = google.maps.geometry.encoding.decodePath(polyline);

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: arrayPath[0],
          destination: arrayPath[arrayPath.length - 1],
          provideRouteAlternatives: true,
          travelMode: 'DRIVING',
        },
        (response, status) => {
          if (status === 'OK') {
            response.routes = response.routes.filter((route) => route.overview_polyline === polyline); 
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
        
        {
          !routePopUp && (
            <div className="absolute top-0 left-0 p-4">
              <DirectionsForm 
                onSubmit={handleFormSubmit} 
                recommendedRoutes={recommendedRoutes} 
                setRecommendedRoutes={setRecommendedRoutes} 
                setSelectedRoute={setSelectedRoute}
                handleConfirmRoute={handleConfirmRoute}
                setDirections={setDirections}
              /> 
            </div>
          )
        }
        {
          routePopUp && (
            <div className="absolute top-0 left-0 p-4 w-full">
              <RoutePopUp selectedRoute={selectedRoute} onCancel={onCancel} />
            </div>
          )
        }
        
      </div>
    </div>
  );
};

export default Map;
