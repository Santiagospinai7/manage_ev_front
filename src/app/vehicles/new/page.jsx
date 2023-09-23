"use client";

import React, { useState } from 'react';

const VehicleRegistrationForm = () => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/registerVehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        setMessage('Error al registrar el vehículo.');
      }
    } catch (error) {
      setMessage('Error de red al conectar con la API.');
    }
  };

  return (
    <div className="p-4 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg flex">
        <div className="w-2/3 pr-4">
          <h2 className="text-2xl font-semibold mb-4">Registro de Vehículo</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium mb-2">
                Marca del vehículo:
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Ejemplo: Toyota"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium mb-2">
                Modelo del vehículo:
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Ejemplo: Corolla"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium mb-2">
                Año del vehículo:
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Ejemplo: 2023"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Registrar Vehículo
            </button>

          </form>
          {message && <p className="text-red-500 mt-2">{message}</p>}
        </div>
        <div className="h-32 md:h-auto md:w-1/2">
          <img
            className="object-cover w-full h-full"
            src="https://storage.googleapis.com/site.esss.co/77ec3784-thumb-blog-eletrificacao-tendencias-de-veiculos-eletricos-no-brasil-1.png"
            alt="img"
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleRegistrationForm;
