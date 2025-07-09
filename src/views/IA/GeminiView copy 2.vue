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
          @click="analyzeWithGemini"
          :disabled="isLoading || !geminiReady"
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {{ isLoading ? 'Analizando...' : 'Enviar a I.A.' }}
        </button>
        <p v-if="!geminiReady" class="text-sm text-red-600 mt-2">
          API Key no configurada en variables de entorno.
        </p>
      </div>

      <!-- Analysis Result -->
      <div v-if="analysisResult" class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Resultado de Análisis</h2>
        <pre class="bg-gray-100 p-4 rounded overflow-x-auto text-sm whitespace-pre-wrap">{{
          analysisResult
        }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { GoogleGenerativeAI } from '@google/generative-ai'
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
      genAI: null,
      model: null,

      // Prompt base para enviar a Gemini
      promptTemplate:
        'Por favor, proporciona un diagnóstico médico detallado basado en los siguientes datos del paciente:',
    }
  },
  computed: {
    geminiReady() {
      return !!import.meta.env.VITE_GEMINI_API_KEY
    },
  },
  mounted() {
    if (this.geminiReady) {
      const key = import.meta.env.VITE_GEMINI_API_KEY.trim()
      this.genAI = new GoogleGenerativeAI(key)
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
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
        const { data: fichas } = await axios.get(
          `${base}/pacientes/fichas-generales/cedula/${this.cedula}`,
        )
        const ficha = fichas.find(
          (item) => item.IDFICHAPACIENTE === this.fichaId || item.IDDATOSGENERALES === this.fichaId,
        )
        if (!ficha) throw new Error('Ficha no encontrada')
        const { IDMEDICINA, IDENFERMERIA, IDNUTRICION, IDFISIOTERAPIA } = ficha

        const [med, enf, nut, fis] = await Promise.all([
          axios.get(`${base}/medicina/${IDMEDICINA}`),
          //axios.get(`${base}/enfermeria/${IDENFERMERIA}`),
          //axios.get(`${base}/nutricion/${IDNUTRICION}`),
          //axios.get(`${base}/fisioterapia/${IDFISIOTERAPIA}`),
        ])

        this.serviceData = {
          datosGenerales: ficha,
          medicina: med.data,
          //enfermeria: enf.data,
          //nutricion: nut.data,
          //fisioterapia: fis.data,
        }
      } catch (err) {
        this.error = err.response?.data?.message || err.message
      } finally {
        this.isLoading = false
      }
    },
    async analyzeWithGemini() {
      if (!this.geminiReady || !this.serviceData) return
      this.isLoading = true
      this.error = null

      try {
        // Armar el prompt + datos como contexto único
        const context = `${this.promptTemplate}\n\n${JSON.stringify(this.serviceData, null, 2)}`
        const result = await this.model.generateContent([context])
        const response = await result.response
        this.analysisResult = response.text()
      } catch (err) {
        this.error = err.message
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
