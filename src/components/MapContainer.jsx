'use client'

import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapContainer = () => {
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

  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          center={coordinates}
          zoom={15}
          options={mapOptions}
        />
      </LoadScript>
    </div>
  )
}

export default MapContainer
