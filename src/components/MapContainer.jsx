'use client'
import React, { useState } from 'react';
import { GoogleMap, Marker, LoadScript, InfoWindow, DirectionsService, DirectionsRenderer} from '@react-google-maps/api';
import { useGetChargePointsQuery } from '@/redux/features/chargePointsSlice';

const MapContainer = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [mapRef, setMapRef] = useState();
  const mapStyles = {
    height: "100vh",
    width: "100%"
  }
  const [infoWindowData, setInfoWindowData] = useState();
  
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

 

  const { data: chargePoints, error, isError, isLoading, isSuccess } = useGetChargePointsQuery('listChargePoints', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    pollingInterval: 300000
  })

  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    chargePoints?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  const handleMarkerClick = (id, lat, lng, name) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, name });
    setIsOpen(true);
  };

  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={15}
          center={coordinates} // Center on user's location
          options={mapOptions}
        >
         
          {chargePoints.map(({ name, lat, lng }, index) => (
            <Marker
              key={index}
              position={{ lat, lng }}
              onClick={() => {
                handleMarkerClick(ind, lat, lng, name);
              }}
            >
              {isOpen && infoWindowData?.id === ind && (
                <InfoWindow
                  onCloseClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <h3>{infoWindowData.name}</h3>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default MapContainer
