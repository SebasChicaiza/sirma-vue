<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Bar, Pie } from 'vue-chartjs'
import { faStar, faChartBar, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement)
library.add(faStar, faChartBar, faSpinner)

const baseURL = 'https://backend-sirma-nest.onrender.com'
const isLoading = ref(true)

const chartDataIA = ref(null)
const totalCalificaciones = ref(0)
const promedioCalificaciones = ref(0)
const charts = ref({})
const resumenNutricional = ref(null)
const promediosNutricionales = ref({})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 1, color: '#4b5563' },
      grid: { color: '#e5e7eb' },
    },
    x: {
      ticks: { color: '#4b5563' },
      grid: { display: false },
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.7)',
      titleColor: '#fff',
      bodyColor: '#fff',
    },
  },
}

const fetchChart = async (url, transform, key, options = chartOptions) => {
  try {
    const { data } = await axios.get(`${baseURL}${url}`)
    charts.value[key] = transform(data)
  } catch (e) {
    console.error(`Error en gráfico ${key}:`, e)
  }
}

onMounted(async () => {
  try {
    const { data } = await axios.get(`${baseURL}/satisfaccion-inteligencia-artificial/grafica`)
    const cantidades = [1, 2, 3, 4, 5].map((num) => {
      const item = data.find((d) => Number(d.calificacion) === num)
      return item ? Number(item.cantidad) : 0
    })
    const total = cantidades.reduce((sum, val) => sum + val, 0)
    const sumaPonderada = cantidades.reduce((sum, val, index) => sum + val * (index + 1), 0)

    totalCalificaciones.value = total
    promedioCalificaciones.value = total > 0 ? (sumaPonderada / total).toFixed(2) : 0

    chartDataIA.value = {
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
          backgroundColor: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'],
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#ffffff',
          hoverBackgroundColor: ['#f87171', '#fb923c', '#facc15', '#4ade80', '#60a5fa'],
        },
      ],
    }

    await Promise.all([
      fetchChart('/api/personas/reporte/grupos-edad', (data) => ({ labels: data.map((i) => i.grupo_edad), datasets: [{ label: 'Cantidad por grupo de edad', data: data.map((i) => +i.cantidad_personas), backgroundColor: '#3b82f6' }]}), 'edad'),
      fetchChart('/api/personas/reporte/sexo', (data) => ({ labels: data.map((i) => i.PER_SEXO || 'No especificado'), datasets: [{ label: 'Sexo', data: data.map((i) => +i.total), backgroundColor: ['#60a5fa', '#f472b6', '#d1d5db'] }]}), 'sexo'),
      fetchChart('/api/personas/reporte/estado-civil', (data) => ({ labels: data.map((i) => i.PER_ESTADOCIVIL), datasets: [{ label: 'Estado Civil', data: data.map((i) => +i.total), backgroundColor: '#10b981' }]}), 'estado'),
      fetchChart('/api/personas/reporte/zona', (data) => ({ labels: data.map((i) => `Zona ${i.PER_ZONA}`), datasets: [{ label: 'Zona', data: data.map((i) => +i.total), backgroundColor: '#8b5cf6' }]}), 'zona'),
      fetchChart('/api/personas/reporte/ocupacion', (data) => ({ labels: data.map((i) => i.PER_OCUPACION), datasets: [{ label: 'Ocupación', data: data.map((i) => +i.total), backgroundColor: '#f59e0b' }]}), 'ocupacion'),
      fetchChart('/api/personas/reporte/instruccion', (data) => ({ labels: data.map((i) => i.PER_INSTRUCCION), datasets: [{ label: 'Instrucción', data: data.map((i) => +i.total), backgroundColor: '#ec4899' }]}), 'instruccion'),
      fetchChart('/api/personas/reporte/cuidador', (data) => ({ labels: data.map((i) => i.TieneCuidador), datasets: [{ label: '¿Tiene Cuidador?', data: data.map((i) => +i.total), backgroundColor: ['#22d3ee', '#6366f1'] }]}), 'cuidador'),
    ])

    // Fetch resumen nutricional
    const nutricion = await axios.get(`${baseURL}/resumen-nutricional`)
    const n = nutricion.data
    resumenNutricional.value = {
      labels: ['Bajo', 'Medio', 'Bueno'],
      datasets: [
        {
          label: 'Estado Nutricional',
          data: [Number(n.estado_bajo || 0), Number(n.estado_medio || 0), Number(n.estado_bueno || 0)],
          backgroundColor: ['#ef4444', '#facc15', '#22c55e'],
        },
      ],
    }
    promediosNutricionales.value = {
      'IMC Cribaje': n.promedio_imc_cribaje,
      'IMC Antropométrico': n.promedio_imc_antropometrico,
      'Vasos de Agua': n.promedio_vasos_agua,
      'Fruta/Verdura': n.promedio_fruta_verdura,
      'Evaluación Global': n.promedio_eval_global,
    }
  } catch (error) {
    console.error('Error general:', error)
  } finally {
    isLoading.value = false
  }
})
</script>


<template>
  <div class="min-h-screen bg-gray-50 p-6 sm:p-12">
    <div class="max-w-6xl mx-auto space-y-8">
      <div class="text-center">
        <h1 class="text-4xl font-extrabold text-gray-800">Análisis y Reportes</h1>
        <p class="text-gray-500">Estadísticas de usuarios y desempeño del sistema</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-lg font-bold mb-4">Total Calificaciones</h2>
          <p class="text-3xl font-bold">{{ totalCalificaciones }}</p>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-lg font-bold mb-4">Promedio Calificaciones</h2>
          <p class="text-3xl font-bold">{{ promedioCalificaciones }}</p>
        </div>
      </div>

      <div v-if="isLoading" class="text-center py-32 text-gray-400">
        <font-awesome-icon :icon="['fas', 'spinner']" spin class="text-4xl" />
        <p class="mt-4">Cargando gráficos...</p>
      </div>
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-1 gap-8">
          <div v-if="chartDataIA" class="bg-white p-4 rounded-xl shadow">
            <h3 class="font-semibold text-lg mb-2">Satisfacción IA</h3>
            <div class="h-64 w-full">
              <Bar :data="chartDataIA" :options="chartOptions" />
            </div>
          </div>
          <br />
        </div>
        <div class="bg-white p-6 md:p-8 rounded-xl shadow-lg m-10">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Dashboard de Fichas Médicas
          </h2>
          <p class="text-gray-500 text-sm md:text-base">
            Análisis detallado de los datos de los pacientes registrados en el sistema.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="(data, key) in charts" :key="key" class="bg-white p-4 rounded-xl shadow">
            <h3 class="font-semibold capitalize text-lg mb-2">{{ key }}</h3>
            <div class="h-64">
              <Bar :data="data" :options="chartOptions" />
            </div>
          </div>
        </div>
        <!-- Estado Nutricional -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div class="bg-white p-4 rounded-xl shadow">
            <h3 class="font-semibold text-lg mb-2">Estado Nutricional</h3>
            <div class="h-64">
              <Bar v-if="resumenNutricional" :data="resumenNutricional" :options="chartOptions" />
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4">
            <div
              v-for="(valor, key) in promediosNutricionales"
              :key="key"
              class="bg-gray-100 p-4 rounded-lg shadow"
            >
              <p class="text-sm text-gray-500 uppercase font-semibold">{{ key }}</p>
              <p class="text-2xl font-bold text-gray-800 mt-1">{{ valor }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
