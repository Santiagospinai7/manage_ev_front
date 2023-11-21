import React, { useState } from 'react';

const RecommendedRoutes = ({ routes, setSelectedRoute }) => {
  const [selectedRouteItem, setSelectedRouteItem] = useState(null);

  const handleRouteClick = (route) => {
    // Log the selected route
    // console.log('Selected Route:', route);
    // Update the state with the selected route
    setSelectedRouteItem(route);
    setSelectedRoute(route);
  };

  return (
    <div className="w-full mt-5 h-48 overflow-y-auto">
      <ul className="list-none p-0">
        {routes.map((route, index) => (
          <li
            key={route.numero_ruta}
            onClick={() => handleRouteClick(route)}
            style={{ cursor: 'pointer' }}
            className={`border rounded p-4 mb-4 relative transition duration-300 ${selectedRouteItem === route ? 'shadow-md bg-blue-100' : 'hover:shadow-sm hover:bg-gray-50'}`}
          >
            {route.ruta_optima && (
              <div className="absolute top-2 right-2 flex items-center">
                <div className="text-xs text-yellow-500 font-bold ml-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                  </svg>
                </div>
              </div>
            )}
            <p className="text-lg font-bold mb-1">Ruta {route.numero_ruta}, {route.distancia}</p>
            <p className="text-gray-600">{route.duracion}</p>
            <p className="text-gray-600">Consumo: {route.consumo_ajustado.toFixed(2)} %</p>
          </li>
        ))}
      </ul>
      {/* {selectedRoute && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-1">Selected Route</h3>
          <p>Ruta {selectedRoute.numero_ruta}</p>
          <p>Distance: {selectedRoute.duracion}</p>
          <p>Duration: {selectedRoute.distancia}</p>
        </div>
      )} */}
    </div>
  );
};

export default RecommendedRoutes;
