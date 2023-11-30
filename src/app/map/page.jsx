"use client"

import React, { useState, useEffect } from 'react';
import MapContainer from "@/components/MapContainer"
import DirectionsForm from "@/components/DirectionsForm"
import RoutePopUp from "@/components/RoutePopUp"
import { useGetChargePointsQuery } from '@/redux/features/chargePointsSlice';

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

  const { data: chargePoints, isSuccess } = useGetChargePointsQuery();

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
    if (selectedRoute && isSuccess) {
      const polyline = selectedRoute.informacion_ruta.overview_polyline;
      const arrayPath = google.maps.geometry.encoding.decodePath(polyline);
      
      // Assuming you have the array of charge points in `chargePoints`
      console.log('Charge Points:', chargePoints);
  
      // Calculate distances to find the nearest charge point
      const distances = chargePoints.map(chargePoint => {
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(arrayPath[0].lat(), arrayPath[0].lng()),
          new google.maps.LatLng(chargePoint.latitude, chargePoint.longitude)
        );
        return distance;
      });
  
      // Find the index of the charge point with the minimum distance
      const minDistanceIndex = distances.indexOf(Math.min(...distances));
  
      // Get the address of the nearest charge point
      const nearestChargePointAddress = chargePoints[minDistanceIndex].address;
      console.log('Nearest Charge Point Address:', nearestChargePointAddress);
  
      const directionsService = new window.google.maps.DirectionsService();
      const waypoints = [
        {
          location: nearestChargePointAddress,
          stopover: true,
        },
      ];
  
      directionsService.route(
        {
          origin: arrayPath[0],
          destination: arrayPath[arrayPath.length - 1],
          waypoints: selectedRoute.necesita_recargar ? waypoints : [],
          provideRouteAlternatives: true,
          travelMode: 'DRIVING',
        },
        (response, status) => {
          if (status === 'OK') {
            console.log('Directions before:', response);
            if (selectedRoute.necesita_recargar) {
              // Remove the first waypoint because it is the nearest charge point
              response.routes.forEach((route) => route.legs[0].steps.shift());
            } else {
              response.routes = response.routes.filter((route) => route.overview_polyline === polyline);
            }
            setDirections(response);
          } else {
            console.error('Error getting directions:', status);
          }
        }
      );
    }
  }, [selectedRoute, chargePoints]);
  

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
