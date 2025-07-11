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
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const calificaciones = ref([])

const chartData = ref({
  labels: ['1', '2', '3', '4', '5'],
  datasets: [
    {
      label: 'Cantidad de Calificaciones',
      data: [],
      backgroundColor: [
        '#ef4444', // rojo
        '#f97316', // naranja
        '#eab308', // amarillo
        '#22c55e', // verde
        '#0ea5e9', // azul
      ],
    },
  ],
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1
      }
    }
  }
})

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://backend-sirma-nest.onrender.com/satisfaccion-inteligencia-artificial/grafica',
    )

    calificaciones.value = data

    // Convertimos los datos a un array ordenado por calificación (1 al 5)
    const cantidades = [1, 2, 3, 4, 5].map((num) => {
      const entry = data.find((d) => Number(d.calificacion) === num)
      return entry ? Number(entry.cantidad) : 0
    })

    chartData.value.datasets[0].data = cantidades
  } catch (error) {
    console.error('Error al cargar los datos de satisfacción:', error)
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Reporte de Satisfacción IA</h1>
      <div class="h-96">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>
