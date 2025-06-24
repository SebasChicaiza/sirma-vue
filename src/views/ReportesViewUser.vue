<template>
  <div class="reportes-container">
    <h2>Estadísticas de Pacientes por Comunidad</h2>
    <div class="estadisticas-resumen">
      <div class="estadistica">
        <span class="valor">124</span>
        <span class="label">Fichas registradas</span>
      </div>
      <div class="estadistica">
        <span class="valor">5</span>
        <span class="label">Centros de Salud</span>
      </div>
    </div>
    <div class="graficos-grid">
      <!-- Usamos v-if para renderizar los gráficos solo una vez -->
      <div v-if="isMounted">
        <Bar :data="chartDataPacientes" :options="chartOptionsPacientes" />
      </div>
      <div v-if="isMounted">
        <Bar :data="chartDataEdades" :options="chartOptionsEdades" />
      </div>
      <div v-if="isMounted">
        <Bar :data="chartDataSexo" :options="chartOptionsSexo" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Datos de los gráficos, asignados una vez
const chartDataPacientes = ref({
  labels: ['La Merced', 'El Rosario', 'Santa Ana', 'San Pedro', 'La Esperanza'],
  datasets: [
    {
      label: 'Pacientes',
      backgroundColor: '#2563eb',
      data: [25, 40, 18, 33, 22]
    }
  ]
})

const chartDataEdades = ref({
  labels: ['0-18', '19-40', '41-65', '65+'],
  datasets: [
    {
      label: 'Pacientes',
      backgroundColor: '#10b981',
      data: [12, 37, 29, 15]
    }
  ]
})

const chartDataSexo = ref({
  labels: ['Femenino', 'Masculino', 'Otro'],
  datasets: [
    {
      label: 'Pacientes',
      backgroundColor: '#f59e42',
      data: [55, 42, 6]
    }
  ]
})

// Opciones de los gráficos
const chartOptions = {
  responsive: false, // Desactivamos responsive
  plugins: {
    legend: { display: false },
    title: { display: false, text: '' }
  },
  animation: { duration: 0 },
  animations: true // Desactivamos animaciones para evitar renderizados innecesarios
}

// Configuración de los títulos para cada gráfico
const chartOptionsPacientes = { ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: 'Pacientes por Comunidad' } } }
const chartOptionsEdades = { ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: 'Pacientes por Grupo de Edad' } } }
const chartOptionsSexo = { ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: 'Pacientes por Sexo' } } }

// Variable para controlar el montaje de los gráficos
const isMounted = ref(true)

onMounted(() => {
  // Cuando el componente se monta, mostramos los gráficos
  isMounted.value = true
})
</script>

<style scoped>
.reportes-container {
  max-width: 1100px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px #0001;
  padding: 32px;
}
.estadisticas-resumen {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
  justify-content: center;
}
.estadistica {
  background: #f3f6fa;
  border-radius: 10px;
  padding: 18px 32px;
  text-align: center;
  box-shadow: 0 2px 8px #0001;
  min-width: 220px;
}
.valor {
  font-size: 2.2rem;
  font-weight: bold;
  color: #2563eb;
  display: block;
}
.label {
  font-size: 1.1rem;
  color: #333;
}
.graficos-grid {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
