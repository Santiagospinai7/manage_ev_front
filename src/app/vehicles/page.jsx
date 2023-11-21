"use client"

import React, { useState } from 'react';
import { useGetVehiclesQuery } from '@/redux/features/vehiclesSlice';
import VehicleCard from '@/components/VehicleCard';

const ListVehicles = () => {
  const { data: electricVehicles, error, isError, isLoading, isSuccess } = useGetVehiclesQuery('listVehicles', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    pollingInterval: 300000
  });

  const [expandedCardIndex, setExpandedCardIndex] = useState(null);

  const handleDetailsClick = (index) => {
    setExpandedCardIndex((prevIndex) => (prevIndex === index ? null : index));
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
          
          <h2 className="text-2xl font-medium mb-2">Vehiculos</h2>
          <div className="flex justify-between items-center bg-blue-500 mx-10 p-2 rounded-full">
            <div>
            </div>
            <a href="/chargePoints/new" className="text-white pr-4">+ Nuevo vehículo</a>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-10 mb-4">
          {electricVehicles.map((vehicle, index) => (
            <VehicleCard
              key={index}
              vehicle={vehicle}
              index={index}
              isExpanded={expandedCardIndex === index}
              handleDetailsClick={() => handleDetailsClick(index)}
            />
          ))}
        </div>
      </div>
    );
  }

  return content;
};

export default ListVehicles;
