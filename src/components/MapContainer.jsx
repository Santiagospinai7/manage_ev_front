'use client'
import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const MapContainer = ({ userLocation, directions }) => {
  const mapStyles = {
    height: "100vh",
    width: "100%"
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

  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={15}
          center={userLocation} // Center on user's location
          options={mapOptions}
        >
          {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default MapContainer;
