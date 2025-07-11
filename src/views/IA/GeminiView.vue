<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faRobot,
  faCircleInfo,
  faIdCard,
  faFileMedical,
  faBrain,
  faCheckCircle,
  faExclamationTriangle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faRobot,
  faCircleInfo,
  faIdCard,
  faFileMedical,
  faBrain,
  faCheckCircle,
  faExclamationTriangle,
  faSpinner,
)

const cedula = ref('')
const fichaId = ref('')
const isLoading = ref(false)
const error = ref(null)
const serviceData = ref(null)
const analysisResult = ref(null)
const satisfactionSent = ref(false)

let genAI = null
let model = null
const base = 'https://backend-sirma-nest.onrender.com'

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
  satisfactionSent.value = false

  try {
    const { data: fichas } = await axios.get(
      `${base}/api/pacientes/fichas-generales/cedula/${cedula.value}`,
    )
    const ficha = fichas.find(
      (item) => item.IDFICHAPACIENTE === fichaId.value || item.IDDATOSGENERALES === fichaId.value,
    )
    if (!ficha) throw new Error('Ficha no encontrada')

    const { IDMEDICINA, IDENFERMERIA, IDNUTRICION, IDFISIOTERAPIA } = ficha

    let medicinaData = null
    try {
      const resp = await axios.get(`${base}/api/medicina/${IDMEDICINA}`)
      medicinaData = resp.data
    } catch (_) {}

    let enfermeriaData = null
    try {
      const resp = await axios.get(`${base}/api/enfermeria/completa/${IDENFERMERIA}`)
      enfermeriaData = resp.data
    } catch (_) {}

    let nutricionData = null
    try {
      const resp = await axios.get(`${base}/nutricion/completa/${IDNUTRICION}`)
      nutricionData = resp.data
    } catch (_) {}

    let fisioterapiaData = null
    try {
      const resp = await axios.get(`${base}/api/fisioterapia/completo/${IDFISIOTERAPIA}`)
      fisioterapiaData = resp.data
    } catch (_) {}

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
    error.value = 'Error en el análisis de la IA. Inténtalo de nuevo más tarde.'
  } finally {
    isLoading.value = false
  }
}

const sendSatisfaction = async (score) => {
  try {
    await axios.post(`${base}/satisfaccion-inteligencia-artificial`, {
      calificacion: score,
    })
    satisfactionSent.value = true
  } catch (err) {
    console.error('Error al enviar calificación:', err.message)
    satisfactionSent.value = true
    error.value = 'No se pudo enviar la calificación.'
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
    <div class="max-w-4xl mx-auto space-y-8">
      <div class="text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold text-indigo-700 tracking-tight">
          <font-awesome-icon :icon="['fas', 'robot']" class="mr-3 text-indigo-500" />
          Asistente Clínico IA
        </h1>
        <p class="text-lg text-gray-500 mt-2 font-light">Análisis inteligente de fichas médicas.</p>
      </div>

      <div
        class="bg-white border-l-4 border-indigo-400 text-indigo-800 p-4 rounded-lg shadow-sm flex items-start space-x-3"
      >
        <font-awesome-icon :icon="['fas', 'circle-info']" class="text-xl mt-1 flex-shrink-0" />
        <div>
          <p class="font-bold text-lg mb-1">Instrucciones</p>
          <ul class="list-disc ml-5 text-sm space-y-1 text-gray-700">
            <li>
              <font-awesome-icon :icon="['fas', 'id-card']" class="mr-2" />
              Ingresa la <strong>cédula</strong> y el <strong>ID de ficha</strong> del paciente.
            </li>
            <li>
              <font-awesome-icon :icon="['fas', 'file-medical']" class="mr-2" />
              Haz clic en <strong>"Cargar Ficha"</strong> para obtener los datos clínicos.
            </li>
            <li>
              <font-awesome-icon :icon="['fas', 'brain']" class="mr-2" />
              Luego, presiona <strong>"Analizar con IA"</strong> para recibir un diagnóstico y recomendaciones.
            </li>
            <li>
              <font-awesome-icon :icon="['fas', 'check-circle']" class="mr-2" />
              Por favor, califica la respuesta. Tu retroalimentación nos ayuda a mejorar.
            </li>
          </ul>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Búsqueda de Ficha</h2>
        <form
          @submit.prevent="fetchFicha"
          class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
        >
          <div class="col-span-1">
            <label for="cedula" class="block text-sm font-medium text-gray-700">Cédula</label>
            <input
              id="cedula"
              v-model="cedula"
              type="text"
              placeholder="Ej: 1712345678"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div class="col-span-1">
            <label for="fichaId" class="block text-sm font-medium text-gray-700">ID de Ficha</label>
            <input
              id="fichaId"
              v-model="fichaId"
              type="text"
              placeholder="Ej: FCH01 o 6"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div class="col-span-1">
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full h-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <font-awesome-icon
                v-if="isLoading"
                :icon="['fas', 'spinner']"
                spin
                class="mr-2"
              />
              {{ isLoading ? 'Cargando...' : 'Cargar Ficha' }}
            </button>
          </div>
        </form>
        <p
          v-if="error"
          class="mt-4 text-red-600 font-semibold flex items-center"
        >
          <font-awesome-icon :icon="['fas', 'exclamation-triangle']" class="mr-2" />
          {{ error }}
        </p>
      </div>

      <div v-if="serviceData" class="bg-white rounded-xl shadow-lg p-6 text-center">
        <p class="text-lg font-medium text-gray-800 mb-4">
          <font-awesome-icon :icon="['fas', 'check-circle']" class="text-green-500 mr-2" />
          Ficha del paciente cargada correctamente.
        </p>
        <button
          @click="analyzeWithGemini"
          :disabled="isLoading || !geminiReady"
          class="inline-flex items-center px-8 py-3 border border-transparent text-lg font-bold rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <font-awesome-icon
            v-if="isLoading"
            :icon="['fas', 'spinner']"
            spin
            class="mr-2"
          />
          <font-awesome-icon v-else :icon="['fas', 'brain']" class="mr-2" />
          {{ isLoading ? 'Analizando...' : 'Analizar con I.A.' }}
        </button>
        <p v-if="!geminiReady" class="text-sm text-red-600 mt-4">
          Error: La clave de la API de Gemini no está configurada.
        </p>
      </div>

      <div v-if="analysisResult" class="bg-white rounded-xl shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">
          <font-awesome-icon :icon="['fas', 'robot']" class="mr-2 text-indigo-500" />
          Resultado del Análisis
        </h2>
        <div
          class="bg-gray-50 border-l-4 border-indigo-200 p-4 rounded-md overflow-x-auto text-sm leading-relaxed"
        >
          <pre class="whitespace-pre-wrap font-sans">{{ analysisResult }}</pre>
        </div>

        <div v-if="!satisfactionSent" class="mt-8 text-center">
          <h3 class="text-xl font-bold text-gray-800 mb-4">
            ¿Qué tan útil fue esta respuesta?
          </h3>
          <div class="flex justify-center gap-6 text-4xl">
            <button
              @click="sendSatisfaction(1)"
              class="hover:scale-125 transition-transform duration-200"
            >
              😡
            </button>
            <button
              @click="sendSatisfaction(2)"
              class="hover:scale-125 transition-transform duration-200"
            >
              😕
            </button>
            <button
              @click="sendSatisfaction(3)"
              class="hover:scale-125 transition-transform duration-200"
            >
              😐
            </button>
            <button
              @click="sendSatisfaction(4)"
              class="hover:scale-125 transition-transform duration-200"
            >
              🙂
            </button>
            <button
              @click="sendSatisfaction(5)"
              class="hover:scale-125 transition-transform duration-200"
            >
              🤩
            </button>
          </div>
        </div>
        <p
          v-else
          class="mt-6 text-green-600 text-center font-bold text-lg flex items-center justify-center"
        >
          <font-awesome-icon :icon="['fas', 'check-circle']" class="mr-2" />
          ¡Gracias por tu calificación!
        </p>
      </div>
    </div>
  </div>
</template>
