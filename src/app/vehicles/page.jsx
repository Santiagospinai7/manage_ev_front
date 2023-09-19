"use client";
import React, { useState, useEffect } from 'react';

const VEHICLES = [
  {
    "brand": "Ferrari",
    "model": "Enzo",
    "year": "2020"
  },
  {
    "brand": "lamborghini",
    "model": "Urus",
    "year": "2022"
  },
  {
    "brand": "Tesla",
    "model": "X",
    "year": "2023"
  }
]


const ListVehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Lista de Vehículos</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Marca</th>
            <th className="px-4 py-2">Modelo</th>
            <th className="px-4 py-2">Año</th>
            
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{vehicle.brand}</td>
              <td className="border px-4 py-2">{vehicle.model}</td>
              <td className="border px-4 py-2">{vehicle.year}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListVehicles;
