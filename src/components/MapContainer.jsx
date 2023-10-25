'use client'

import React, { useState } from 'react';
import { GoogleMap, Marker, LoadScript, InfoWindow, DirectionsService, DirectionsRenderer} from '@react-google-maps/api';
import { useGetChargePointsQuery } from '@/redux/features/chargePointsSlice';

// import a photo for the marker
import marker from '../assets/charging-station.png';

const MapContainer = ({ userLocation, directions }) => {
  const { data: chargePoints, error, isError, isLoading, isSuccess } = useGetChargePointsQuery()
  const [mapRef, setMapRef] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();
  let chargePointsEnableList = [];
  let chargePointsDisableList = [];

  const iconStyle = {
    width: '10px', // Adjust this value to set the desired width
    height: '310px', // Adjust this value to set the desired height
  };

  const mapStyles = {
    height: "100vh",
    width: "100%"
  }

  const coordinates = {
    lat: 6.25184,
    lng: -75.56359
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
          center={userLocation}
          options={mapOptions}
        >
          {chargePointsEnableList.map((point, index) => (
            <Marker
              key={index}
              position={point}
              // reduce the size of the marker
              icon='https://img.icons8.com/?size=32&id=11250&format=png'
              onClick={() => handleMarkerClick(point.id, point.lat, point.lng, point.name)}
            />
          ))}
          {chargePointsDisableList.map((point, index) => (
            <Marker
              key={index}
              position={point}
              icon='https://img.icons8.com/?size=32&id=J6mmb5NePrhV&format=png'
              onClick={() => handleMarkerClick(point.id, point.lat, point.lng, point.name)}
            />
          ))}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default MapContainer;
