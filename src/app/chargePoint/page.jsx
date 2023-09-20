import React from 'react';
const chargePointsData = [
    {
        "id": 1,
        "name": "Punto de Carga A",
        "company": "ElectroCharge Inc.",
        "latitude": "40.7128",
        "longitude": "-74.0060",
        "status": "habilitada"
      },
      {
        "id": 2,
        "name": "Punto de Carga B",
        "company": "EcoPower Solutions",
        "latitude": "34.0522",
        "longitude": "-118.2437",
        "status": "desconectada"
      },
      {
        "id": 3,
        "name": "Punto de Carga C",
        "company": "GreenEnergy Corp.",
        "latitude": "51.5074",
        "longitude": "-0.1278",
        "status": "habilitada"
      }
]

const ChargePointsGrid = () => {
  return (
    <div className="container mx-auto mt-10">
      <br></br>
      <br></br>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {chargePointsData.map((chargePoint) => (
          <div
            key={chargePoint.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 grid grid-cols-2 gap-4 border border-blue-500"
          >
            <div className="col-span-1">
              <h3 className="text-lg font-semibold">{chargePoint.name}</h3>
              <p className="text-gray-500">{chargePoint.company}</p>
              <p className="text-gray-500">Latitud: {chargePoint.latitude}</p>
              <p className="text-gray-500">Longitud: {chargePoint.longitude}</p>
              <p className="text-gray-500">Estado: {chargePoint.status}</p>
            </div>
            <div className="col-span-1">
              {/* Aquí puedes agregar una imagen del punto de carga si es necesario */}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <a
          href="/chargePoint/new"
          className="block w-32 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mx-auto"
        >
          Nuevo Punto De Carga
        </a>
      </div>
    </div>
  );
};

export default ChargePointsGrid;