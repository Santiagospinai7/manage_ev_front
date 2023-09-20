"use client";
import React, { useState } from 'react';

const ChargingPointForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    location: '',
    status: 'habilitada', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
  
    const apiKey = '44677172c537e9cc0d66756dbee48d17';
  
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(formData.location)}&limit=1&appid=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error('Error al consultar la API de OpenWeatherMap.');
      }
      
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        console.log(`Latitud: ${lat}, Longitud: ${lon}`);
  
        setFormData({ ...formData, latitude: lat, longitude: lon });

      } else {
        console.error('No se encontraron resultados para la dirección proporcionada.');
      }
    } catch (error) {
      console.error('Error al consultar la API de OpenWeatherMap:', error);
    }
  };

  return (
    <div className="container mx-auto mt-20">
      <br></br>
      <br></br>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
            Nombre del Punto de Carga:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Ejemplo: Punto de Carga A"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="company" className="block text-gray-600 text-sm font-medium mb-2">
            Compañía:
          </label>
          <input
            type="text"
            name="company"
            id="company"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Ejemplo: Electric Company Inc."
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-600 text-sm font-medium mb-2">
            Ubicación (Dirección):
          </label>
          <input
            type="text"
            name="location"
            id="location"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Ejemplo: Calle Principal, Ciudad"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-600 text-sm font-medium mb-2">
            Estado:
          </label>
          <select
            name="status"
            id="status"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
            onChange={handleChange}
          >
            <option value="habilitada">Habilitada</option>
            <option value="desconectada">Desconectada</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Registrar Punto de Carga
        </button>
      </form>
    </div>
  );
};

export default ChargingPointForm;
