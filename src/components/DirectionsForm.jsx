'use client'

import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import React, { useState, useRef, useEffect } from 'react';

const DirectionsForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    departure: '',
    destination: '',
    batteryLevel: '',
  });

  const [formVisible, setFormVisible] = useState(true); // Step 1: State variable for form visibility

  const originInputRef = useRef(null);
  const destinationInputRef = useRef(null);
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

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible); // Step 2: Toggle form visibility
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  useEffect(() => {
    if (isLoaded) {
      setAutocompleteServiceDestination(new window.google.maps.places.AutocompleteService());
      setAutocompleteServiceOrigin(new window.google.maps.places.AutocompleteService());
    }
  }, [isLoaded]);

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg p-6" style={{ transition: 'height 0.2s ease-out', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button onClick={toggleFormVisibility} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {formVisible ? (
          // SVG for hiding
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
          </svg>
        ) : (
          // SVG for showing
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
          </svg>
        )}
      </button>
      {isLoaded && formVisible && (
        <form onSubmit={handleSubmit} className={`w-full`}>
          <div className="mb-4 flex items-center"> {/* Use flex to align items horizontally */}
            <div style={{ flex: 1 }}> {/* Allow the departure input to take available space */}
              <label htmlFor="departure" className="block text-gray-700 font-bold mb-2">Punto origen:</label>
              <div className="relative w-full"> {/* Use relative positioning for the icon */}
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
                    className="border border-gray-300 rounded w-full py-2 px-3 pr-10"
                    placeholder="Ingrese origen"
                  />
                </Autocomplete>
                <button
                  type="button"
                  onClick={handleSetCurrentPosition}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                >
                  {/* SVG icon for current location */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-crosshair" viewBox="0 0 16 16">
                    <path d="M8.5.5a.5.5 0 0 0-1 0v.518A7.001 7.001 0 0 0 1.018 7.5H.5a.5.5 0 0 0 0 1h.518A7.001 7.001 0 0 0 7.5 14.982v.518a.5.5 0 0 0 1 0v-.518A7.001 7.001 0 0 0 14.982 8.5h.518a.5.5 0 0 0 0-1h-.518A7.001 7.001 0 0 0 8.5 1.018V.5Zm-6.48 7A6.001 6.001 0 0 1 7.5 2.02v.48a.5.5 0 0 0 1 0v-.48a6.001 6.001 0 0 1 5.48 5.48h-.48a.5.5 0 0 0 0 1h.48a6.002 6.002 0 0 1-5.48 5.48v-.48a.5.5 0 0 0-1 0v.48A6.001 6.001 0 0 1 2.02 8.5h.48a.5.5 0 0 0 0-1h-.48ZM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                  </svg>
                </button>
              </div>
            </div>
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
