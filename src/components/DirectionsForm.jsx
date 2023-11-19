"use client"

import React, { useState } from 'react';

const DirectionsForm = ({ onSubmit }) => {
  const [formVisible, setFormVisible] = useState(true);
  const [formData, setFormData] = useState({
    departure: '',
    destination: '',
    batteryLevel: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const routeData = {
      departure: e.target.departure.value,
      destination: e.target.destination.value,
      batteryLevel: e.target.battery.value
    };

    onSubmit(routeData);
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg p-6" style={{ transition: 'height 0.2s ease-out', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xs py-1 px-2 rounded mb-2"
        onClick={() => setFormVisible(!formVisible)}
      >
        {formVisible ? 'Ocultar formulario' : 'Mostrar formulario'}
      </button>
      <form onSubmit={handleSubmit} className={`w-full ${formVisible ? '' : 'hidden'}`}>
        <div className="mb-4">
          <label htmlFor="departure" className="block text-gray-700 font-bold mb-2">Punto origen:</label>
          <input type="text" id="departure" name="departure" required className="border border-gray-300 rounded w-full py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="destination" className="block text-gray-700 font-bold mb-2">Punto destino:</label>
          <input type="text" id="destination" name="destination" required className="border border-gray-300 rounded w-full py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="battery" className="block text-gray-700 font-bold mb-2">Batería:</label>
          <input type="text" id="battery" name="battery" required className="border border-gray-300 rounded w-full py-2 px-3" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Buscar ruta
        </button>
      </form>
    </div>
  );
};

export default DirectionsForm;