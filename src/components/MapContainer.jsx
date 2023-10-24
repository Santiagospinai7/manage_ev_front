'use client'
import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const MapContainer = () => {
  const mapStyles = {
    height: "100vh",
    width: "100%"
  }

  const coordinates = {
    lat: 6.214123407152054,
    lng: -75.59771763293003
  }

  const [directions, setDirections] = useState(null);

  const mapOptions = {
    mapId: '68e9e5ab349f2ca6',
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false
  }

  const onDirectionsLoad = (response) => {
    setDirections(response);
  }

  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={15}
          options={mapOptions}
        >
          {directions && <DirectionsRenderer directions={directions} />}
          <DirectionsService
            options={{
              destination: { lat: 6.26036, lng: -75.56359 },
              origin: { lat: 6.214123407152054, lng: -75.59771763293003 },
              travelMode: 'DRIVING',
            }}
            callback={onDirectionsLoad}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default MapContainer;
