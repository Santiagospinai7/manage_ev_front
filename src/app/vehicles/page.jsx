import React from 'react';

const VehicleRegistrationForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-lg flex">
        <div className="w-2/3 pr-4">
          <h2 className="text-2xl font-semibold mb-4">Registro de Vehículo</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium mb-2">
                Marca del vehículo:
              </label>
              <input
                type="text"
                name="brand"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Ejemplo: Toyota"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium mb-2">
                Modelo del vehículo:
              </label>
              <input
                type="text"
                name="model"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Ejemplo: Corolla"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium mb-2">
                Año del vehículo:
              </label>
              <input
                type="number"
                name="year"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Ejemplo: 2023"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Registrar Vehículo
            </button>
          </form>
        </div>
        <div className="h-32 md:h-auto md:w-1/2">
          <picture>
                  <img className="object-cover w-full h-full" src="https://storage.googleapis.com/site.esss.co/77ec3784-thumb-blog-eletrificacao-tendencias-de-veiculos-eletricos-no-brasil-1.png"
                      alt="img" />
                      </picture>
              </div>
        </div>
    </div>
  );
};

export default VehicleRegistrationForm;

