'use client';

// Importa las bibliotecas necesarias
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useGetTripsQuery } from '@/redux/features/tripsSlice';
// Componente funcional Statistics
const Statistics = () => {
  // Estados y referencias
  const [jsonData, setJsonData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(0);
  const batteryChartRef = useRef(null);
  const circularChartRef = useRef(null);
  const barChartRef = useRef(null);

  const { data: trips, isSuccess } = useGetTripsQuery();

  const trips_list = []
 
  
  // Opciones del gráfico de barras
  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Opciones del gráfico de línea
  const lineChartOptions = {
    scales: {
      y: {
        beginAtZero: false,
        suggestedMax: 80,
        suggestedMin: 20,
      },
    },
  };

  // Opciones del gráfico circular
  const doughnutChartOptions = {
    cutout: '50%',
  };

  // Función para destruir un gráfico
  const destroyChart = (chartRef) => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  };

  
    isSuccess && trips.forEach((trip, index) => {
      const data = {};
      const monthly = {};
      const additionalData = {};
      data.vehicle_id = parseInt(trip.vehiculo_id);
      monthly.october = trip.Octubre;
      monthly.november = trip.Noviembre;
      monthly.december = trip.Diciembre;
      additionalData.consumed = trip.porcentaje_consumido;
      additionalData.remaining = trip.carga_restante;
      data.monthlyData = monthly;
      data.additionalData = additionalData;
      trips_list[index] = data;
    });
  
  // Efecto de carga inicial
  useEffect(() => {
    if (isSuccess) {
      setJsonData(trips_list);
      setSelectedVehicle(trips_list[0]); // Asigna el primer vehículo por defecto
    }
  }, [isSuccess,trips]);

  
  // Efecto para actualizar gráficos cuando cambia el vehículo seleccionado
  useEffect(() => {
    if (selectedVehicle  !== null && selectedVehicle !== undefined) {
      const monthlyData = selectedVehicle.monthlyData;
      if (monthlyData) {
      const cumulativeData = Object.values(monthlyData).reduce((acc, value) => {
        acc.push((acc.length > 0 ? acc[acc.length - 1] : 0) + value);
        return acc;
      }, []);
    
      const barChartData = {
        labels: Object.keys(monthlyData),
        datasets: [
          {
            label: 'Suma del uso de energía (kWh)',
            data: cumulativeData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
  
      const lineChartData = {
        labels: Object.keys(selectedVehicle.monthlyData),
        datasets: [
          {
            label: 'Consumo de batería por mes (kWh)',
            data: Object.values(monthlyData),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1,
          },
        ],
      };
  
  
      const doughnutChartData = {
        labels: Object.keys(selectedVehicle.additionalData),
        datasets: [
          {
            data: Object.values(selectedVehicle.additionalData),
            backgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(0, 0, 0, 0.2)'],
          },
        ],
      };
  
      destroyChart(batteryChartRef);
      destroyChart(circularChartRef);
      destroyChart(barChartRef);

      barChartRef.current = createBarChart(
        document.getElementById('barChart'),
        barChartData,
        barChartOptions
      );

      batteryChartRef.current = createLineChart(
        document.getElementById('batteryChart'),
        lineChartData,
        lineChartOptions
      );

      circularChartRef.current = createDoughnutChart(
        document.getElementById('circularChart'),
        doughnutChartData,
        doughnutChartOptions
      );
      }
    }
  }, [selectedVehicle]);
  
  
  // Función para crear el gráfico de barras
  const createBarChart = (chartCanvas, chartData, chartOptions) => {
    const ctx = chartCanvas.getContext('2d');
    return new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: chartOptions,
    });
  };

  // Función para crear el gráfico de línea
  const createLineChart = (chartCanvas, chartData, chartOptions) => {
    const ctx = chartCanvas.getContext('2d');
    return new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });
  };

  // Función para crear el gráfico circular
  const createDoughnutChart = (chartCanvas, chartData, chartOptions) => {
    const ctx = chartCanvas.getContext('2d');
    return new Chart(ctx, {
      type: 'doughnut',
      data: chartData,
      options: chartOptions,
    });
  };

  // Función para manejar el cambio de vehículo
  const handleVehicleChange = (e) => {
    // Encuentra el vehículo seleccionado por su ID
    const vehicleId = parseInt(e.target.value);
    const selected = trips_list.find((vehicle) => vehicle.vehicle_id === vehicleId);
    if (selected) {
      setSelectedVehicle(selected);
    }
    
  };

  return (
    <div className="container mx-auto mt-20 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 mx-auto text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M3 12m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
        <path d="M9 8m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
        <path d="M15 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
        <path d="M4 20l14 0"></path>
      </svg>

      <h2 className="text-2xl font-medium mb-4">Estadísticas</h2>

      {/* Menú desplegable para seleccionar vehículo */}
      <div className="mb-4">
        <label htmlFor="vehicleSelect" className="mr-2">
          Seleccionar Vehículo:
        </label>
        <select
          id="vehicleSelect"
          onChange={handleVehicleChange} // Pasar la función handleVehicleChange directamente
          value={trips_list[selectedVehicle]?.vehicle_id}
        >
          {isSuccess && trips_list.map((vehicle) => (
            <option key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
              Vehículo {vehicle.vehicle_id}
            </option>
          ))}
        </select>
      </div>

      {/* Contenedor de gráficos */}
      <div className="flex flex-col md:flex-row justify-center mt-10 mx-4 md:mx-10 items-center">
        {/* Gráfico de barras */}
        <div className="mb-4 md:mb-0 md:mr-4" style={{ width: '300px' }}>
          <div className="card border border-blue-500 rounded">
            <div className="card-body p-4">
              <canvas id="barChart" className="w-full" height="400"></canvas>
            </div>
          </div>
        </div>

        {/* Gráfico de línea */}
        <div className="mb-4 md:mb-0 md:mr-4" style={{ width: '300px' }}>
          <div className="card border border-blue-500 rounded">
            <div className="card-body p-4">
              <canvas id="batteryChart" className="w-full" height="400"></canvas>
            </div>
          </div>
        </div>

        {/* Gráfico circular */}
        <div style={{ width: '300px' }}>
          <div className="card border border-blue-500 rounded">
            <div className="card-body p-4">
              <canvas id="circularChart" className="w-full" height="400"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
