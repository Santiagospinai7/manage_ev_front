'use client'

const DirectionsForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., fetch directions or perform other actions)
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="departure" className="block text-gray-700 font-bold mb-2">Punto origen:</label>
          <input type="text" id="departure" name="departure" required className="border border-gray-300 rounded w-full py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="destination" className="block text-gray-700 font-bold mb-2">Punto destino:</label>
          <input type="text" id="destination" name="destination" required className="border border-gray-300 rounded w-full py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="departure" className="block text-gray-700 font-bold mb-2">Bateria:</label>
          <input type="text" id="departure" name="departure" required className="border border-gray-300 rounded w-full py-2 px-3" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Buscar ruta
        </button>
      </form>
    </div>
  );
};

export default DirectionsForm;