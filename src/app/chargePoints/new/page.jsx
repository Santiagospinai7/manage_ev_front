"use client";
import React, { useEffect, useState } from 'react'
import { useCreateChargePointMutation } from '@/redux/features/chargePointsSlice'
import { getLatLongFromAddress } from '@/utils/getLatLongFromAddress';

const ChargingPointForm = () => {
  const [createChargingPoint, { isSuccess }] = useCreateChargePointMutation()

  useEffect(() => {
    if (isSuccess) {
      console.log('isSuccess')
      window.location.href = "/chargePoints"; // Note: This performs a full page reload
    }
  }, [isSuccess])

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    address: '',
    status: true, 
    private: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const newChargingPoint = {
  //     name_point: formData.name,
  //     company: formData.company,
  //     address: formData.address,
  //     activate: formData.status,
  //     private: formData.private,
  //   }

  //   const latLong = await getLatLongFromAddress(formData.address);
  //   if (latLong) {
  //     newChargingPoint.latitude = latLong.latitude;
  //     newChargingPoint.longitude = latLong.longitude;
  //   }

  //   console.log(newChargingPoint)

  //   await createChargingPoint(newChargingPoint).unwrap()
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newChargingPoint = {
      name_point: formData.name,
      company: formData.company,
      address: formData.address,
      activate: formData.status,
      private: formData.private,
    }
  
    try {
      const latLong = await getLatLongFromAddress(formData.address);
  
      if (latLong) {
        newChargingPoint.latitude = latLong.latitude;
        newChargingPoint.longitude = latLong.longitude;
      } else {
        throw new Error('Could not retrieve latitude and longitude.');
      }
  
      console.log(newChargingPoint);
  
      await createChargingPoint(newChargingPoint).unwrap();
    } catch (error) {
      console.error('Error:', error);
      // Handle error (display an error message, etc.)
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
          <label htmlFor="address" className="block text-gray-600 text-sm font-medium mb-2">
            Ubicación (Dirección):
          </label>
          <input
            type="text"
            name="address"
            id="address"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Ejemplo: Calle Principal, Ciudad"
            required
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-4 flex flex-wrap">
          <div className="w-1/2 pl-2 flex-1">
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
              <option value="true">Habilitada</option>
              <option value="false">Desconectada</option>
            </select>
          </div>

          <div className="w-1/2 pl-2 flex-1">
            <label htmlFor="status" className="block text-gray-600 text-sm font-medium mb-2">
              Estación pública:
            </label>
            <select
              name="private"
              id="private"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
              onChange={handleChange}
            >
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>
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
