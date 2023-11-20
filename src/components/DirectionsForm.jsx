'use client'

import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import React, { useState, useRef, useEffect } from 'react';

// ... (imports)

const DirectionsForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    departure: '',
    destination: '',
    batteryLevel: '',
  });

  const originInputRef = useRef(null);
  const destinationInputRef = useRef(null);
  // const [autocompleteService, setAutocompleteService] = useState(null);
  const [autocompleteServiceDestination, setAutocompleteServiceDestination] = useState(null);
  const [autocompleteServiceOrigin, setAutocompleteServiceOrigin] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSetCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({
            ...formData,
            departure: `${latitude}, ${longitude}`,
          });
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser');
    }
  };

  const handlePlaceChanged = (autocomplete, inputRef) => {
    const place = autocomplete.getPlace();
    if (place && place.formatted_address) {
      setFormData({
        ...formData,
        [inputRef]: place.name,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const routeData = {
      departure: formData.departure,
      destination: formData.destination,
      batteryLevel: formData.battery,
    };
    onSubmit(routeData);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  useEffect(() => {
    if (isLoaded) {
      // setAutocompleteService(new window.google.maps.places.AutocompleteService());
      setAutocompleteServiceDestination(new window.google.maps.places.AutocompleteService());
      setAutocompleteServiceOrigin(new window.google.maps.places.AutocompleteService());
    }
  }, [isLoaded]);

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg p-6" style={{ transition: 'height 0.2s ease-out', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {isLoaded && (
        <form onSubmit={handleSubmit} className={`w-full`}>
          <div className="mb-4">
        <label htmlFor="departure" className="block text-gray-700 font-bold mb-2">Punto origen:</label>
        <Autocomplete
          onLoad={(autocomplete) => setAutocompleteServiceOrigin(autocomplete)}
          onPlaceChanged={() => handlePlaceChanged(autocompleteServiceOrigin, 'departure')}
        >
          <input
            type="text"
            id="departure"
            name="departure"
            value={formData.departure}
            onChange={(e) => handleChange(e)}
            ref={(input) => { originInputRef.current = input; }}
            required
            className="border border-gray-300 rounded w-full py-2 px-3"
            placeholder="Ingrese origen"
          />
        </Autocomplete>
        {/* <button
          type="button"
          onClick={handleSetCurrentPosition}
          className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Usar posición actual
        </button> */}
      </div>
      <div className="mb-4">
        <label htmlFor="destination" className="block text-gray-700 font-bold mb-2">Punto destino:</label>
        <Autocomplete
          onLoad={(autocomplete) => setAutocompleteServiceDestination(autocomplete)}
          onPlaceChanged={() => handlePlaceChanged(autocompleteServiceDestination, 'destination')}
        >
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={(e) => handleChange(e)}
            ref={(input) => { destinationInputRef.current = input; }}
            required
            className="border border-gray-300 rounded w-full py-2 px-3"
            placeholder="Ingrese destino"
          />
        </Autocomplete>
      </div>

          <div className="mb-4">
            <label htmlFor="battery" className="block text-gray-700 font-bold mb-2">Batería:</label>
            <input
              type="text"
              id="battery"
              name="battery"
              value={formData.battery}
              onChange={(e) => handleChange(e)}
              required
              className="border border-gray-300 rounded w-full py-2 px-3"
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Buscar ruta
          </button>
        </form>
      )}
    </div>
  );
};

export default DirectionsForm;
