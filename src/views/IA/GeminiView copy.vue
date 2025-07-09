<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">
          <FontAwesomeIcon :icon="faRobot" class="mr-2" />
          SIRMA IA
        </h1>
      </div>

      <!-- Ficha Form -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <form
          @submit.prevent="fetchFicha"
          class="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0"
        >
          <input
            v-model="cedula"
            type="text"
            placeholder="Cédula"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            v-model="fichaId"
            type="text"
            placeholder="ID de Ficha (p.ej. FCH01 o 6)"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            :disabled="isLoading"
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            {{ isLoading ? 'Cargando...' : 'Cargar ficha' }}
          </button>
        </form>
        <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
      </div>

      <!-- Aggregated Data Preview -->
      <div v-if="serviceData" class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Datos de Servicios Agregados</h2>
        <pre class="bg-gray-100 p-4 rounded overflow-x-auto text-sm">{{ serviceData }}</pre>
        <button
          @click="sendToBackend"
          :disabled="isLoading"
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {{ isLoading ? 'Enviando...' : 'Enviar a análisis' }}
        </button>
      </div>

      <!-- Analysis Result -->
      <div v-if="analysisResult" class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Resultado de Análisis</h2>
        <pre class="bg-gray-100 p-4 rounded overflow-x-auto text-sm whitespace-pre-wrap">{{
          analysisResult
        }}</pre>
      </div>

      <!-- (Opcional) Puedes integrar aquí tu chat UI si deseas interacción adicional -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'GeminiSirmaView',
  components: { FontAwesomeIcon },
  data() {
    return {
      cedula: '',
      fichaId: '',
      isLoading: false,
      error: null,
      serviceData: null,
      analysisResult: null,
      faRobot,
      promptTemplate:
        'Por favor, proporciona un diagnóstico médico detallado basado en los siguientes datos del paciente:',
    }
  },
  methods: {
    async fetchFicha() {
      this.isLoading = true
      this.error = null
      this.serviceData = null
      this.analysisResult = null

      try {
        const base = 'https://backend-sirma-nest.onrender.com/api'
        // 1) Obtener fichas generales del paciente
        const { data: fichas } = await axios.get(
          `${base}/pacientes/fichas-generales/cedula/${this.cedula}`,
        )

        // 2) Filtrar la ficha específica por ID
        const ficha = fichas.find(
          (item) => item.IDFICHAPACIENTE === this.fichaId || item.IDDATOSGENERALES === this.fichaId,
        )
        if (!ficha) throw new Error('Ficha no encontrada')

        // 3) Extraer IDs de servicios
        const { IDMEDICINA, IDENFERMERIA, IDNUTRICION, IDFISIOTERAPIA } = ficha

        // 4) Consumir APIs de cada servicio en paralelo
        const [medicina, enfermeria, nutricion, fisioterapia] = await Promise.all([
          axios.get(`${base}/medicina/${IDMEDICINA}`),
          //axios.get(`${base}/enfermeria/${IDENFERMERIA}`),
          //axios.get(`${base}/nutricion/${IDNUTRICION}`),
          //axios.get(`${base}/fisioterapia/${IDFISIOTERAPIA}`),
        ])

        // 5) Agregar todos los datos en un objeto
        this.serviceData = {
          datosGenerales: ficha,
          medicina: medicina.data,
          //enfermeria: enfermeria.data,
          //nutricion: nutricion.data,
          //fisioterapia: fisioterapia.data,
        }
      } catch (err) {
        this.error = err.response?.data?.message || err.message
      } finally {
        this.isLoading = false
      }
    },
    async sendToBackend() {
      if (!this.serviceData) return

      this.isLoading = true
      this.error = null

      try {
        const base = 'https://backend-sirma-nest.onrender.com/api'
        // Construir payload con prompt y datos
        const payload = {
          prompt: this.promptTemplate,
          data: this.serviceData,
        }
        const { data } = await axios.post(`${base}/analyze-with-gemini`, payload)
        this.analysisResult = data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<style scoped>
/* Estilos adicionales si es necesario */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
