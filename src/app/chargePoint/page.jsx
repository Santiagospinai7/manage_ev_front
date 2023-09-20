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
    <div className="container mx-auto mt-20">
      <div className="text-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 9a2 2 0 0 1 2 -2h11a2 2 0 0 1 2 2v.5a.5 .5 0 0 0 .5 .5a.5 .5 0 0 1 .5 .5v3a.5 .5 0 0 1 -.5 .5a.5 .5 0 0 0 -.5 .5v.5a2 2 0 0 1 -2 2h-4.5"></path>
          <path d="M3 15h6v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2v-2z"></path>
          <path d="M6 22v-3"></path>
          <path d="M4 15v-2.5"></path>
          <path d="M8 15v-2.5"></path>
        </svg>
        
        <h2 className="text-2xl font-medium mb-2">Estaciones de carga</h2>
        <div className="flex justify-between items-center bg-blue-500 mx-10 p-2 rounded-full">
          <div>
          </div>
          <a href="/chargePoint/new" className="text-white pr-4">+ Nueva estación</a>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-10">
        {chargePointsData.map((point, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 border border-blue-500">
            <div className="flex items-center mb-4">
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{point.name}</h3>
                <p className="text-gray-500">{point.latitude}, {point.longitude}</p>
                <p className="text-gray-500">{point.company}</p>
                <p className="text-gray-500">{point.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChargePointsGrid;