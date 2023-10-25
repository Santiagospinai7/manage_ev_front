'use client'
import React, { useState } from 'react';
import { GoogleMap, Marker, LoadScript, InfoWindow, DirectionsService, DirectionsRenderer} from '@react-google-maps/api';
import { useGetChargePointsQuery } from '@/redux/features/chargePointsSlice';

const MapContainer = () => {
  const { data: chargePoints, error, isError, isLoading, isSuccess } = useGetChargePointsQuery()
  const [mapRef, setMapRef] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();
  let chargePointsEnableList = [];
  let chargePointsDisableList = [];

  const mapStyles = {
    height: "100vh",
    width: "100%"
  }
  
  const coordinates = {
    lat: 6.2584,
    lng: -75.5659
  }
  const mapOptions = {
    mapId: '68e9e5ab349f2ca6',
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false
  }
  
  const handleMarkerClick = (id, lat, lng, name) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, name });
    setIsOpen(true);
  };

  if (isSuccess) {
    let location;
    for (let i = 0; i < chargePoints.length; i++) {
      location = {
        lat: parseFloat(chargePoints[i].latitude),
        lng: parseFloat(chargePoints[i].longitude),
        name: chargePoints[i].name_point
      }
      if (chargePoints[i].activate){
        chargePointsEnableList.push(location)
      }else{
        chargePointsDisableList.push(location)
      }
      
    }
    
  }
  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={15}
          center={coordinates} // Center on user's location
          options={mapOptions}
        >
         {chargePointsEnableList.map(({ lat, lng, name },ind) => (
            <Marker 
              key={ind}
              position={{ lat, lng }} 
              icon={"http://maps.google.com/mapfiles/ms/icons/blue-pushpin.png"}
              
            />
          ))}
          {chargePointsDisableList.map(({ lat, lng, name },ind) => (
            <Marker 
              key={ind}
              position={{ lat, lng }} 
              icon={"http://maps.google.com/mapfiles/ms/icons/red-pushpin.png"}
              
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default MapContainer
