import React from 'react';

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
  // Agregar más vehículos aquí...
];

const ListVehicles = () => {
  return (
    <div className="container mx-auto mt-10">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Lista de Vehículos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {VEHICLES.map((vehicle, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 grid grid-cols-2 gap-4 border border-blue-500"
            >
              <div className="col-span-1">
                <img
                  src={vehicle.image || DEFAULT_VEHICLE_IMAGE}
                  alt={`Imagen de ${vehicle.brand} ${vehicle.model}`}
                  className="w-26 h-26 rounded-full mx-auto"
                />
              </div>
              <div className="col-span-1">
                <h3 className="text-lg font-semibold">{vehicle.brand}</h3>
                <p className="text-gray-500">{vehicle.model}</p>
                <p className="text-gray-500">{vehicle.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <a
          href="/vehicles/new"
          className="block w-32 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mx-auto"
        >
          Registrar Vehículo
        </a>
      </div>
    </div>
  );
};

export default ListVehicles;
