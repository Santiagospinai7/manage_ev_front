'use client'
import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useGetChargePointsQuery } from '@/redux/features/chargePointsSlice';

const MapContainer = ({ userLocation, directions }) => {
  const { data: chargePoints, error, isError, isLoading, isSuccess } = useGetChargePointsQuery()
  let chargePointsList = []

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

  if (isSuccess) {
    let location

    for (let i = 0; i < chargePoints.length; i++) {
      location = {
        lat: parseFloat(chargePoints[i].latitude),
        lng: parseFloat(chargePoints[i].longitude)
      }

      chargePointsList.push(location)
    }

    console.log(chargePointsList)
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
