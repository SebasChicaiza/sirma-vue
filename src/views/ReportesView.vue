<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { Bar } from 'vue-chartjs'
import { faStar, faChartBar, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)
library.add(faStar, faChartBar, faSpinner)

const chartData = ref(null)
const isLoading = ref(true)
const totalCalificaciones = ref(0)
const promedioCalificaciones = ref(0)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
        color: '#4b5563',
      },
      grid: {
        color: '#e5e7eb',
      },
    },
    x: {
      ticks: {
        color: '#4b5563',
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.7)',
      titleColor: '#fff',
      bodyColor: '#fff',
    },
  },
}

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://backend-sirma-nest.onrender.com/satisfaccion-inteligencia-artificial/grafica',
    )

    const cantidades = [1, 2, 3, 4, 5].map((num) => {
      const item = data.find((d) => Number(d.calificacion) === num)
      return item ? Number(item.cantidad) : 0
    })

    const total = cantidades.reduce((sum, val) => sum + val, 0)
    const sumaPonderada = cantidades.reduce((sum, val, index) => sum + val * (index + 1), 0)

    totalCalificaciones.value = total
    promedioCalificaciones.value = total > 0 ? (sumaPonderada / total).toFixed(2) : 0

    chartData.value = {
      labels: [
        'Muy insatisfecho 😠',
        'Insatisfecho 😕',
        'Neutral 😐',
        'Satisfecho 🙂',
        'Muy satisfecho 😄',
      ],
      datasets: [
        {
          label: 'Cantidad de Calificaciones',
          data: cantidades,
          backgroundColor: [
            '#ef4444', // 1 - red
            '#f97316', // 2 - orange
            '#eab308', // 3 - yellow
            '#22c55e', // 4 - green
            '#3b82f6', // 5 - blue
          ],
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#ffffff',
          hoverBackgroundColor: ['#f87171', '#fb923c', '#facc15', '#4ade80', '#60a5fa'],
        },
      ],
    }
  } catch (error) {
    console.error('Error al obtener los datos de satisfacción:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8 sm:p-12">
    <div class="max-w-6xl mx-auto">
      <div class="mb-8 text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-2">
          Reporte de Satisfacción de la IA
        </h1>
        <p class="text-xl text-gray-500 font-light">
          Análisis visual de las calificaciones de los usuarios.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 uppercase font-semibold">Total de Calificaciones</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ totalCalificaciones }}</p>
          </div>
          <div class="text-indigo-500 text-3xl">
            <font-awesome-icon :icon="['fas', 'chart-bar']" />
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 uppercase font-semibold">Promedio de Calificaciones</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ promedioCalificaciones }}</p>
          </div>
          <div class="text-yellow-500 text-3xl">
            <font-awesome-icon :icon="['fas', 'star']" />
          </div>
        </div>

      </div>

      <div class="bg-white p-6 md:p-8 rounded-xl shadow-lg">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Distribución de Calificaciones</h2>
        <div v-if="isLoading" class="flex flex-col items-center justify-center h-96 text-gray-400">
          <font-awesome-icon :icon="['fas', 'spinner']" spin class="text-4xl mb-4" />
          <p>Cargando datos del reporte...</p>
        </div>
        <div v-else-if="chartData" class="h-96">
          <Bar :data="chartData" :options="chartOptions" />
        </div>
        <div v-else class="flex flex-col items-center justify-center h-96 text-gray-500">
          <p>No hay datos disponibles para mostrar.</p>
        </div>
      </div>
    </div>
  </div>
</template>
