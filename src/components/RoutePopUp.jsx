import React from 'react';

const RouteCard = ({ selectedRoute, onCancel }) => {
  console.log('Selected Route:', selectedRoute);

  const batteryIconColor = selectedRoute.necesita_recargar ? 'text-red-500' : 'text-green-500';

  return (
    <div className="w-full bg-white p-4 shadow-md flex justify-between items-center rounded">
      <p className={`text-gray-700 ${batteryIconColor}`}>
        {
          selectedRoute.necesita_recargar ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-battery" viewBox="0 0 16 16">
              <path d="M0 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zm14 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-battery-full" viewBox="0 0 16 16">
              <path d="M2 6h10v4H2z"/>
              <path d="M2 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm10 1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm4 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8"/>
            </svg>
          )
        }
      </p>
      <p className={`text-gray-700 `}>
        <span className="font-semibold">Distance:</span> {selectedRoute ? selectedRoute.distancia : ''}
      </p>
      <p className={`text-gray-700 `}>
        <span className="font-semibold">Duration:</span> {selectedRoute ? selectedRoute.duracion : ''}
      </p>
      <div className="flex space-x-4">
        <button
          className="text-gray-100 bg-red-500 hover:bg-red-600 rounded px-4 py-2"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RouteCard;
