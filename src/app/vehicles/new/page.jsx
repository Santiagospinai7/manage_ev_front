"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useCreateVehicleMutation } from '@/redux/features/vehiclesSlice'

const VehicleRegistrationForm = () => {
  const [createVehicle, { isSuccess }] = useCreateVehicleMutation()
  // const router = useRouter() // Initialize the useRouter hook

  useEffect(() => {
    if (isSuccess) {
      console.log('isSuccess')
      setMessage('Vehículo registrado exitosamente')
      window.location.href = "/vehicles"; // Note: This performs a full page reload
    }
  }, [isSuccess])

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    batteryCapacity: 100,
    kiloMeters: 0,
    timeHoursCharging: '0.0',
  })

  const [message, setMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newVehicle = {
      make: formData.brand,
      model: formData.model,
      year: formData.year,
      battery_capacity_kwh: formData.batteryCapacity,
      range_kilometers: formData.kiloMeters,
      charging_time_hours: formData.timeHoursCharging,
    }

    console.log(newVehicle)

    await createVehicle(newVehicle).unwrap()
  }


  const content = (
    <div className="p-4 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-3xl mx-auto p-4 border rounded-lg shadow-lg flex"> {/* Adjust max-w-3xl */}
        <div className="w-full md:w-1/2 pr-4">
          <h2 className="text-2xl font-semibold mb-4">Registro de Vehículo</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="brand" className="block text-gray-600 text-sm font-medium mb-2">
                  Marca:
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Ejemplo: Toyota"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="model" className="block text-gray-600 text-sm font-medium mb-2">
                  Modelo:
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Ejemplo: Corolla"
                />
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="year" className="block text-gray-600 text-sm font-medium mb-2">
                  Año:
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Ejemplo: 2023"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="batteryCapacity" className="block text-gray-600 text-sm font-medium mb-2">
                  Capacidad batería:
                </label>
                <input
                  type="text"
                  id="batteryCapacity"
                  name="batteryCapacity"
                  value={formData.batteryCapacity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="100"
                />
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label className="block text-gray-600 text-sm font-medium mb-2">
                  Kilometros:
                </label>
                <input
                  type="text"
                  name="kiloMeters"
                  value={formData.kiloMeters}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="0.0"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-gray-600 text-sm font-medium mb-2">
                  Horas de carga:
                </label>
                <input
                  type="text"
                  name="timeHoursCharging"
                  value={formData.timeHoursCharging}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="0"
                />
              </div>
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
        <div className="hidden md:block w-1/2">
          <img
            src="https://storage.googleapis.com/site.esss.co/77ec3784-thumb-blog-eletrificacao-tendencias-de-veiculos-eletricos-no-brasil-1.png"
            alt="vehicle img"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {content}
    </>
  )
}

export default VehicleRegistrationForm;
