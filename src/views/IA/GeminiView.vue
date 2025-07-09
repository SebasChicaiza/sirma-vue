<script setup>
import { ref, computed, onMounted } from 'vue' // Importa las funciones necesarias para Composition API
import axios from 'axios'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons'

// --- Estado reactivo (como data() en Options API) ---
const cedula = ref('')
const fichaId = ref('')
const isLoading = ref(false)
const error = ref(null)
const serviceData = ref(null)
const analysisResult = ref(null)

// Variables para Gemini AI
let genAI = null
let model = null

// --- Tu promptTemplate actualizado usando template literals (¡la clave!) ---
const promptTemplate =
  ref(`Actúa como un **analista médico con experiencia en diagnóstico diferencial**. Tu objetivo es proporcionar un **diagnóstico principal claro, conciso y altamente probable** basado **exclusivamente** en los datos clínicos del paciente que te presentaré.

**Instrucciones clave para el análisis:**
1. **Prioriza la concisión:** Ve directo al punto. Evita descripciones redundantes o jerga innecesaria.
2. **Enfoque en el diagnóstico más probable:** Después de analizar todos los síntomas y hallazgos, presenta la condición que mejor se ajuste a la evidencia.
3. **Justificación basada en datos:** Para el diagnóstico propuesto, menciona brevemente los **3 a 5 hallazgos o síntomas clave** más relevantes de los datos del paciente que respaldan tu conclusión.
4. **Análisis diferencial (opcional/implícito):** Si la información lo permite y es crucial, puedes mencionar brevemente (en una sola frase) una o dos condiciones menos probables que se hayan considerado y descartado rápidamente por falta de evidencia clave, pero solo si esto refuerza la precisión del diagnóstico principal.
5. **Restricción de información:** No inventes síntomas o hallazgos. Si la información es insuficiente para un diagnóstico concluyente, indícalo claramente en lugar de especular.

**Formato de la respuesta:**
* **Diagnóstico Principal:** [Nombre de la condición más probable]
* **Hallazgos Clave de Soporte:**
  * - [Síntoma/Hallazgo 1]
  * - [Síntoma/Hallazgo 2]
  * - [Síntoma/Hallazgo 3]
  * - [Síntoma/Hallazgo 4 (si aplica)]
  * - [Síntoma/Hallazgo 5 (si aplica)]

Por favor, comienza el análisis con los siguientes datos del paciente:
`)

// --- Propiedades computadas (como computed en Options API) ---
const geminiReady = computed(() => {
  return !!import.meta.env.VITE_GEMINI_API_KEY
})

// --- Ciclo de vida (como mounted() en Options API) ---
onMounted(() => {
  if (geminiReady.value) {
    // Accede al valor del ref o computed con .value
    const key = import.meta.env.VITE_GEMINI_API_KEY.trim()
    genAI = new GoogleGenerativeAI(key)
    model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  }
})

// --- Métodos (como methods en Options API) ---
const fetchFicha = async () => {
  isLoading.value = true
  error.value = null
  serviceData.value = null
  analysisResult.value = null

  try {
    const base = 'https://backend-sirma-nest.onrender.com/api'
    const { data: fichas } = await axios.get(
      `${base}/pacientes/fichas-generales/cedula/${cedula.value}`,
    )
    const ficha = fichas.find(
      (item) => item.IDFICHAPACIENTE === fichaId.value || item.IDDATOSGENERALES === fichaId.value,
    )
    if (!ficha) throw new Error('Ficha no encontrada')
    const { IDMEDICINA, IDENFERMERIA, IDNUTRICION, IDFISIOTERAPIA } = ficha

    // Aquí mantuve los comentarios de las llamadas no usadas, si las necesitas, descoméntalas.
    const [med /*, enf, nut, fis*/] = await Promise.all([
      axios.get(`${base}/medicina/${IDMEDICINA}`),
      //axios.get(`${base}/enfermeria/${IDENFERMERIA}`),
      //axios.get(`${base}/nutricion/${IDNUTRICION}`),
      //axios.get(`${base}/fisioterapia/${IDFISIOTERAPIA}`),
    ])

    serviceData.value = {
      datosGenerales: ficha,
      medicina: med.data,
      //enfermeria: enf.data,
      //nutricion: nut.data,
      //fisioterapia: fis.data,
    }
  } catch (err) {
    error.value = err.response?.data?.message || err.message
  } finally {
    isLoading.value = false
  }
}

const analyzeWithGemini = async () => {
  if (!geminiReady.value || !serviceData.value) return // Accede a los valores con .value
  isLoading.value = true
  error.value = null

  try {
    // Armar el prompt + datos como contexto único
    // Accede al valor del promptTemplate con .value
    const context = `${promptTemplate.value}\n\n${JSON.stringify(serviceData.value, null, 2)}`

    // Asegúrate de que 'model' se haya inicializado correctamente en onMounted
    if (!model) {
      throw new Error('El modelo de Gemini no se ha inicializado. Verifica tu API Key.')
    }

    const result = await model.generateContent([context])
    const response = await result.response
    analysisResult.value = response.text()
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">
          <FontAwesomeIcon :icon="faRobot" class="mr-2" />
          SIRMA IA
        </h1>
      </div>

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

      <div v-if="analysisResult" class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Resultado de Análisis</h2>
        <pre class="bg-gray-100 p-4 rounded overflow-x-auto text-sm whitespace-pre-wrap">{{
          analysisResult
        }}</pre>
      </div>
    </div>
  </div>
</template>

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
