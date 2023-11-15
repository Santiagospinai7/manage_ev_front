'use client'
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto'; // Importa Chart.js

const Statistics = () => {
  const [chartData, setChartData] = useState({
    "lineChartData": {
      "labels": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
      "datasets": [
        {
          "label": "Consumo de batería por mes (kWh)",
          "data": [50, 60, 55, 70, 48, 40],
          "backgroundColor": "rgba(75, 192, 192, 0.2)",
          "borderColor": "rgba(75, 192, 192, 1)",
          "tension": 0.1
        }
      ]
    },
    "lineChartOptions": {
      "scales": {
        "y": {
          "beginAtZero": false,
          "suggestedMax": 80,
          "suggestedMin": 20
        }
      }
    },
    "doughnutChartData": {
      "labels": ["Carga de Batería", "Carga Restante"],
      "datasets": [
        {
          "data": [75, 25],
          "backgroundColor": ["rgba(75, 192, 192, 0.7)", "rgba(0, 0, 0, 0.2)"]
        }
      ]
    },
    "doughnutChartOptions": {
      "cutout": "50%"
    }
  });

  // Refs para los gráficos
  const batteryChartRef = useRef(null);
  const circularChartRef = useRef(null);

  useEffect(() => {
    if (!chartData) return;

    const { lineChartData, lineChartOptions, doughnutChartData, doughnutChartOptions } = chartData;

    // Destruye el gráfico de la batería si existe
    if (batteryChartRef.current) {
      batteryChartRef.current.destroy();
    }

    // Crea un nuevo gráfico de la batería
    const batteryChartCanvas = document.getElementById('batteryChart');
    const ctx = batteryChartCanvas.getContext('2d');
    batteryChartRef.current = new Chart(ctx, {
      type: 'line',
      data: lineChartData,
      options: lineChartOptions,
    });

    // Destruye el gráfico circular si existe
    if (circularChartRef.current) {
      circularChartRef.current.destroy();
    }

    // Crea un nuevo gráfico circular
    const circularChartCanvas = document.getElementById('circularChart');
    const circularCtx = circularChartCanvas.getContext('2d');
    circularChartRef.current = new Chart(circularCtx, {
      type: 'doughnut',
      data: doughnutChartData,
      options: doughnutChartOptions,
    });
  }, [chartData]);

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
  
      <div className="flex flex-col md:flex-row items-center bg-blue-500 mx-4 md:mx-10 p-4 rounded">
        <form className="flex flex-col md:flex-row items-center md:space-x-4 w-full">
          <div className="flex items-center mb-2 md:mb-0">
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
          <button type="submit" className="text-white bg-blue-700 px-4 py-2 rounded-full mt-2 md:mt-0 md:ml-2 hover:bg-blue-800 transition duration-300">Obtener Estadísticas</button>
        </form>
      </div>
  
      <div className="flex flex-col md:flex-row justify-center mt-10 mx-4 md:mx-10 items-center">
        <div className="mb-4 md:mb-0 md:mr-4">
          <canvas id="batteryChart" className="w-full md:w-80" height="400"></canvas>
        </div>
        <div>
          <canvas id="circularChart" className="w-full md:w-80" height="400"></canvas>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
