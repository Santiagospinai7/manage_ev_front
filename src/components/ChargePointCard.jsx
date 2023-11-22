'use client'

import React, { useState } from 'react';

const DEFAULT_CHARGEPOINT_IMAGE = 'https://i.pinimg.com/564x/ee/26/8c/ee268c084602fb5cba2ea028b000f9de.jpg';

const ChargePointCard = ({ chargePoint, index, isExpanded, handleDetailsClick, handleDeleteChargePoint }) => {
  console.log('chargePoint', chargePoint);
  return (
    <div
    key={index}
    className={`bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 border border-blue-500 h-32 ${isExpanded ? 'h-auto' : 'h-32'}`}
  >
      <div className="flex items-center mb-4">
        <img src={chargePoint.image || DEFAULT_CHARGEPOINT_IMAGE} alt={`Imagen de ${chargePoint.brand} ${chargePoint.company}`} className="w-16 h-16 rounded-full" />
        <div className="ml-4">
          <h3 className="text-lg ">{chargePoint.address}</h3>
        </div>
      </div>
      <div className="flex justify-left space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xs py-1 px-2 rounded"
          onClick={handleDetailsClick}
        >
          {isExpanded ? 'x' : 'Detalle'}
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold text-xs py-1 px-2 rounded"
          onClick={() => handleDeleteChargePoint(chargePoint)}
        >
          Borrar
        </button>
      </div>

      {isExpanded && (
        <div className={`mt-4`}>
          <p className="mb-2"><span className='font-semibold'>Compañia:</span> {chargePoint.company} </p>
          <p><span className='font-semibold'>Disponible:</span> {(chargePoint.activate === true) ? 'Si' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default ChargePointCard;
