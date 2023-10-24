"use client"

import React, { useState, useEffect } from 'react'
import { useGetVehicleQuery } from '@/redux/features/vehiclesSlice';

// Imagen de carro por defecto (puedes cambiar la URL)
const DEFAULT_VEHICLE_IMAGE = 'https://static.vecteezy.com/system/resources/thumbnails/013/923/543/small_2x/blue-car-logo-png.png'
const VEHICLES = [
  {
    brand: 'Ferrari',
    model: 'Enzo',
    year: '2020',
    image: DEFAULT_VEHICLE_IMAGE,
  },
  {
    brand: 'Lamborghini',
    model: 'Urus',
    year: '2022',
    image: DEFAULT_VEHICLE_IMAGE,
  },
  {
    brand: 'Tesla',
    model: 'X',
    year: '2023',
    image: DEFAULT_VEHICLE_IMAGE,
  },
]

const ListVehicles = () => {
  const { data: electricVehicles, isSuccess } = useGetVehicleQuery('listVehicles', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    pollingInterval: 300000
  });
  
  

  useEffect(() => {
    if (isSuccess) {
      console.log('electric vehicles', electricVehicles)
    }
  }, [isSuccess, electricVehicles])

  // const [electricVehicles, setElectricVehicles] = useState([])

  // useEffect(() => {
  //   const getVehicles = async () => {
  //     const response = await fetch('http://127.0.0.1:8000/api_ElectricVehicle/routes/')
  //     const data = await response.json()
  //     setElectricVehicles(data)
  //   }
  //   getVehicles()
  // }, [])

  return (
    <h1>Vehicles</h1>
    // <div className="container mx-auto mt-20">
    //   <div className="text-center mb-4">
    //     <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //       <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    //       <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
    //       <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
    //       <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5"></path>
    //     </svg>
        
    //     <h2 className="text-2xl font-medium mb-2">Mis autos</h2>
    //     <div className="flex justify-between items-center bg-blue-500 mx-10 p-2 rounded-full">
    //       <div>
    //       </div>
    //       <a href="/vehicles/new" className="text-white pr-4">+ Nuevo vehículo</a>
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-10">
    //     {electricVehicles.map((vehicle, index) => (
    //       <div key={index} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 border border-blue-500">
    //         <div className="flex items-center mb-4">
    //           <img src={vehicle.image || DEFAULT_VEHICLE_IMAGE} alt={`Imagen de ${vehicle.brand} ${vehicle.model}`} className="w-16 h-16 rounded-full" />
    //           <div className="ml-4">
    //             <h3 className="text-lg font-semibold">{vehicle.brand}</h3>
    //             <p className="text-gray-500">{vehicle.model}</p>
    //             <p className="text-gray-500">{vehicle.year}</p>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  )
}

export default ListVehicles;
