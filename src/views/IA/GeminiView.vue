<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons'

const cedula = ref('')
const fichaId = ref('')
const isLoading = ref(false)
const error = ref(null)
const serviceData = ref(null)
const analysisResult = ref(null)

let genAI = null
let model = null

const promptTemplate =
  ref(`Actúa como un **médico especialista con amplia experiencia en diagnóstico clínico y manejo de pacientes**. Tu objetivo es proporcionar un **diagnóstico principal claro, conciso y altamente probable**, proponer los **exámenes complementarios más relevantes** y ofrecer **recomendaciones iniciales al paciente**, todo basado **exclusivamente** en los datos clínicos que te presentaré.

**Instrucciones clave para el análisis:**
1.  **Prioriza la concisión y la claridad:** Sé directo y evita la jerga innecesaria.
2.  **Diagnóstico principal y justificación:** Presenta la condición más probable que mejor se ajuste a la evidencia. Para respaldar este diagnóstico, menciona los **3 a 5 hallazgos o síntomas clave** más relevantes de los datos del paciente.
3.  **Análisis diferencial (opcional/implícito):** Si la información lo permite y es crucial, puedes mencionar brevemente (en una sola frase) una o dos condiciones menos probables que se hayan considerado y descartado rápidamente por falta de evidencia clave, pero solo si esto refuerza la precisión del diagnóstico principal.
4.  **Exámenes complementarios:** Sugiere los **2 a 4 exámenes de laboratorio o imágenes más pertinentes** para confirmar el diagnóstico, evaluar la extensión de la condición o descartar otras posibilidades importantes. Justifica brevemente por qué son necesarios.
5.  **Recomendaciones iniciales al paciente:** Ofrece **2 a 3 recomendaciones prácticas y específicas** para el paciente, que pueden incluir medidas de cuidado general, seguimiento o cuándo buscar atención médica adicional. Estas deben ser claras y fáciles de entender.
6.  **Restricción de información:** No inventes síntomas, hallazgos, diagnósticos, exámenes o recomendaciones. Si la información es insuficiente para un diagnóstico concluyente o para hacer recomendaciones detalladas, indícalo claramente en lugar de especular.

**Formato de la respuesta:**
* **Diagnóstico Principal:** [Nombre de la condición más probable]
* **Hallazgos Clave de Soporte:**
    * - [Síntoma/Hallazgo 1]
    * - [Síntoma/Hallazgo 2]
    * - [Síntoma/Hallazgo 3]
    * - [Síntoma/Hallazgo 4 (si aplica)]
    * - [Síntoma/Hallazgo 5 (si aplica)]
* **Exámenes Complementarios Sugeridos:**
    * - [Examen 1]: [Breve justificación]
    * - [Examen 2]: [Breve justificación]
    * - [Examen 3 (si aplica)]: [Breve justificación]
    * - [Examen 4 (si aplica)]: [Breve justificación]
* **Recomendaciones para el Paciente:**
    * - [Recomendación 1]
    * - [Recomendación 2]
    * - [Recomendación 3 (si aplica)]

Por favor, comienza el análisis con los siguientes datos del paciente:
`)

const geminiReady = computed(() => !!import.meta.env.VITE_GEMINI_API_KEY)

onMounted(() => {
  if (geminiReady.value) {
    const key = import.meta.env.VITE_GEMINI_API_KEY.trim()
    genAI = new GoogleGenerativeAI(key)
    model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  }
})

const fetchFicha = async () => {
  isLoading.value = true
  error.value = null
  serviceData.value = null
  analysisResult.value = null

  try {
    const base = 'https://backend-sirma-nest.onrender.com'
    const { data: fichas } = await axios.get(
      `${base}/api/pacientes/fichas-generales/cedula/${cedula.value}`,
    )
    const ficha = fichas.find(
      (item) => item.IDFICHAPACIENTE === fichaId.value || item.IDDATOSGENERALES === fichaId.value,
    )
    if (!ficha) throw new Error('Ficha no encontrada')

    const { IDMEDICINA, IDENFERMERIA, IDNUTRICION, IDFISIOTERAPIA } = ficha

    // Llamadas individuales con try/catch
    let medicinaData = null
    try {
      const resp = await axios.get(`${base}/api/medicina/${IDMEDICINA}`)
      medicinaData = resp.data
    } catch (_e) {
      console.warn('Medicina API falló o devolvió nada')
    }

    let enfermeriaData = null
    try {
      const resp = await axios.get(`${base}/api/enfermeria/completa/${IDENFERMERIA}`)
      enfermeriaData = resp.data
    } catch (_e) {
      console.warn('Enfermería API falló o devolvió nada')
    }

    let nutricionData = null
    try {
      const resp = await axios.get(`${base}/nutricion/completa/${IDNUTRICION}`)
      nutricionData = resp.data
    } catch (_e) {
      console.warn('Nutrición API falló o devolvió nada')
    }

    let fisioterapiaData = null
    try {
      const resp = await axios.get(`${base}/api/fisioterapia/completo/${IDFISIOTERAPIA}`)
      fisioterapiaData = resp.data
    } catch (_e) {
      console.warn('Fisioterapia API falló o devolvió nada')
    }

    serviceData.value = {
      datosGenerales: ficha,
      medicina: medicinaData,
      enfermeria: enfermeriaData,
      nutricion: nutricionData,
      fisioterapia: fisioterapiaData,
    }
  } catch (err) {
    error.value = err.response?.data?.message || err.message
  } finally {
    isLoading.value = false
  }
}

const analyzeWithGemini = async () => {
  if (!geminiReady.value || !serviceData.value) return
  isLoading.value = true
  error.value = null

  try {
    const context = `${promptTemplate.value}\n\n${JSON.stringify(serviceData.value, null, 2)}`
    if (!model) throw new Error('El modelo de Gemini no se ha inicializado.')
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
