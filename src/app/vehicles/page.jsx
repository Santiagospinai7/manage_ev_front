"use client"

import React, { useState } from 'react';
import { useGetVehiclesQuery } from '@/redux/features/vehiclesSlice';

const DEFAULT_VEHICLE_IMAGE = 'https://static.vecteezy.com/system/resources/thumbnails/013/923/543/small_2x/blue-car-logo-png.png';

const ListVehicles = () => {
  const { data: electricVehicles, error, isError, isLoading, isSuccess } = useGetVehiclesQuery('listVehicles', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    pollingInterval: 300000
  });

  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleDetailsClick = (vehicle) => {
    setSelectedVehicle(selectedVehicle === vehicle ? null : vehicle);
  };

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (isError) {
    content = <div>Error: {error.message}</div>;
  }

  if (isSuccess) {
    content = (
      <div className="container mx-auto mt-20">
        <div className="text-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
            <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
            <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5"></path>
          </svg>
          
          <h2 className="text-2xl font-medium mb-2">Mis autos</h2>
          <div className="flex justify-between items-center bg-blue-500 mx-10 p-2 rounded-full">
            <div>
              {/* Coloca aquí cualquier contenido adicional que desees mostrar */}
            </div>
            <a href="/vehicles/new" className="text-white pr-4">+ Nuevo vehículo</a>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-10 mb-4">
          {electricVehicles.map((vehicle, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 border border-blue-500">
              <div className="flex items-center mb-4">
                <img src={vehicle.image || DEFAULT_VEHICLE_IMAGE} alt={`Imagen de ${vehicle.brand} ${vehicle.model}`} className="w-16 h-16 rounded-full" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{vehicle.make}</h3>
                  <p className="text-gray-500">{vehicle.model}</p>
                </div>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={() => handleDetailsClick(vehicle)}
              >
                Ver detalles
              </button>

              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => handleDeleteVehicle(vehicle)}
                >
                Delete
              </button>

              {selectedVehicle === vehicle && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
                  <div className="bg-white p-8 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">{vehicle.brand} {vehicle.model}</h2>
                    <p>ID: {vehicle.vehicle_id}</p>
                    <p>Año: {vehicle.year}</p>
                    <p>Battery : {vehicle.battery_capacity_kwh}</p>
                    <p>Rango: {vehicle.range_kilometers}</p>

                    
                      {/* Agrega más detalles según tus necesidades */}
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={() => handleDetailsClick(null)}
                      >
                        Cerrar detalles
                      </button>

                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return content;
};

export default ListVehicles;
