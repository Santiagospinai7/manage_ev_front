'use client'

import React, { useState } from 'react';

const DEFAULT_VEHICLE_IMAGE = 'https://i.pinimg.com/564x/f1/9e/4f/f19e4f665f2c7528e72df51b28e660f7.jpg';

const VehicleCard = ({ vehicle, index, isExpanded, handleDetailsClick, handleDeleteVehicle }) => {
  return (
    <div
    key={index}
    className={`bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 border border-blue-500 h-32 ${isExpanded ? 'h-auto' : 'h-32'}`}
  >
      <div className="flex items-center mb-4">
        <img src={vehicle.image || DEFAULT_VEHICLE_IMAGE} alt={`Imagen de ${vehicle.brand} ${vehicle.model}`} className="w-16 h-16 rounded-full" />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{vehicle.make}</h3>
          <p className="text-gray-500">{vehicle.model}</p>
        </div>
      </div>
      <div className="flex justify-left space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xs py-1 px-2 rounded"
          onClick={handleDetailsClick}
        >
          {isExpanded ? 'x' : 'Detalle'}
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold text-xs py-1 px-2 rounded"
          onClick={() => handleDeleteVehicle(vehicle)}
        >
          Borrar
        </button>
      </div>

      {isExpanded && (
        <div className={`mt-4`}>
          <h2 className="text-2xl font-semibold mb-2">{vehicle.make} {vehicle.model}</h2>
          <p>Batería: {vehicle.battery_capacity_kwh}</p>
          <p>Rango: {vehicle.range_kilometers}</p>
        </div>
      )}
    </div>
  );
};

export default VehicleCard;
