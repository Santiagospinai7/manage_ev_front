'use client'

import React, { useEffect } from 'react';
import Chart from 'chart.js/auto'; // Importa Chart.js

const Statistics = () => {
  useEffect(() => {
    // Datos simulados para el gráfico de línea
    const data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [
        {
          label: 'Consumo de batería por mes (kWh)',
          data: [50, 60, 55, 70, 48, 40],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1
          // borderWidth: 1,
        },
      ],
    };

    // Configuración del gráfico de linea
    const options = {
      scales: {
        y: {
          beginAtZero: false,
          suggestedMax: 80,
          suggestedMin: 20
        },
      },
    };

    // Obtén el contexto del canvas para grafico de lineas
    const ctx = document.getElementById('batteryChart').getContext('2d');

    // Crea el gráfico de línea
    new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });

    // Datos simulados para la gráfica de rosquilla (carga de batería)
    const dataCircular = {
      labels: ['Carga de Batería', 'Carga Restante'],
      datasets: [
        {
          data: [75, 25], // Porcentaje de carga y carga restante
          backgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(0, 0, 0, 0.2)'],
        },
      ],
    };

    // Configuración de la gráfica circular (doughnut)
    const optionsCircular = {
      cutout: '50%', // Tamaño del agujero en el centro
    };

    // Obtén el contexto del canvas
    const ctxCircular = document.getElementById('circularChart').getContext('2d');

    // Crea la gráfica circular (doughnut)
    new Chart(ctxCircular, {
      type: 'doughnut',
      data: dataCircular,
      options: optionsCircular,
    });
  }, []);

  return (
    <div className="container mx-auto mt-20 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M3 12m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
        <path d="M9 8m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
        <path d="M15 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
        <path d="M4 20l14 0"></path>
      </svg>

      <h2 className="text-2xl font-medium mb-4">Estadisticas</h2>

      <div className="flex justify-center items-center bg-blue-500 mx-10 p-4 rounded">
        <form className="flex items-center space-x-4">
          <div className="flex items-center">
            <label htmlFor="startDate" className="block text-white text-sm mr-2">Fecha Inicial:</label>
            <input
              type="date"
              id="startDate"
              className="px-3 py-1 border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="endDate" className="block text-white text-sm mr-2">Fecha Final:</label>
            <input
              type="date"
              id="endDate"
              className="px-3 py-1 border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <button type="submit" className="text-white bg-blue-700 px-4 py-2 rounded-full hover:bg-blue-800 transition duration-300">Obtener Estadísticas</button>
        </form>
      </div>

      <div className="flex justify-between mt-10 mx-10 items-center">
        <div className="flex">
          <div>
            <canvas id="batteryChart" width="800" height="400"></canvas>
          </div>
          <div>
            <canvas id="circularChart" width="400" height="400"></canvas>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Statistics;
