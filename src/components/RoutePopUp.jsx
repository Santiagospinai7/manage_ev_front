import React from 'react';

const RouteCard = ({ selectedRoute, onCancel }) => {
  return (
    <div className="w-full bg-white p-4 shadow-md flex justify-between items-center">
      <div>
        <p className="text-gray-700">
          <span className="font-semibold">Distance:</span> {selectedRoute ? selectedRoute.distancia : ''}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Duration:</span> {selectedRoute ? selectedRoute.duracion : ''}
        </p>
        {/* Add more information here based on your selectedRoute object */}
      </div>
      <div className="flex space-x-4">
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RouteCard;
