'use client'

import React, { useState } from 'react';
import { GoogleMap, Marker, LoadScript, InfoWindow, DirectionsRenderer, useLoadScript } from '@react-google-maps/api';
import { useGetChargePointsQuery } from '@/redux/features/chargePointsSlice';

const MapContainer = ({ userLocation, directions }) => {
  const enableChargePoint = "https://img.icons8.com/emoji/48/high-voltage.png";
  const disableChargePoint = "https://img.icons8.com/color/48/000000/lightning-bolt.png";

  const { data: chargePoints, isSuccess } = useGetChargePointsQuery();
  const [mapRef, setMapRef] = useState();
  const [infoWindow, setInfoWindow] = useState();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const handleMarkerClick = (id, lat, lng, name, activate, company) => {
    setInfoWindow({ id, lat, lng, name, activate, company });
  };

  const handleInfoWindowClose = () => {
    setInfoWindow(null);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={{
          height: '100vh',
          width: '100%',
        }}
        zoom={15}
        center={userLocation}
        options={{
          mapId: '68e9e5ab349f2ca6',
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMapRef(map)}
      >
        {isSuccess && chargePoints.map((point, index) => (
          <Marker
            key={index}
            position={{
              lat: parseFloat(point.latitude),
              lng: parseFloat(point.longitude),
            }}
            icon={{
              url: point.activate ? enableChargePoint : disableChargePoint,
              scaledSize: new window.google.maps.Size(50, 50),
            }}
            onClick={() =>
              handleMarkerClick(
                point.id,
                point.latitude,
                point.longitude,
                point.name_point,
                point.activate,
                point.company,
              )
            }
          />
        ))}
        <Marker position={userLocation} />
        {infoWindow && (
          <InfoWindow
            position={{ lat: infoWindow.lat, lng: infoWindow.lng }}
            onCloseClick={handleInfoWindowClose}
          >
            <div>
              <h2>{infoWindow.name}</h2>
              <p>Disponible: {infoWindow.activate ? 'Sí' : 'No'}</p>
              <p>Compañia: {infoWindow.company} </p>
            </div>
          </InfoWindow>
        )}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
};

export default MapContainer;