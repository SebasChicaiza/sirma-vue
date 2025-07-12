<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import SearchBar from '@/components/SearchBar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const fichas = ref([])
const allFichas = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const hasSearched = ref(false)
const openCardId = ref(null)

const startDate = ref('')
const endDate = ref('')

const lastSearchedCedula = ref('')

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const filterByDateRange = () => {
  if (!startDate.value && !endDate.value) {
    fichas.value = allFichas.value
    return
  }

  const start = startDate.value ? new Date(startDate.value) : null
  const end = endDate.value ? new Date(endDate.value) : null

  fichas.value = allFichas.value.filter(ficha => {
    const fichaDate = new Date(ficha.PAC_FECHAPRIMERCONTACTO)

    const isAfterStart = start ? fichaDate >= start : true;
    const isBeforeEnd = end ? fichaDate <= end : true;

    return isAfterStart && isBeforeEnd;
  });
};

const handleSearch = async (cedula) => {
  if (cedula) {
    localStorage.setItem('last_cedula', cedula);
    lastSearchedCedula.value = cedula;
  } else {
    localStorage.removeItem('last_cedula');
    lastSearchedCedula.value = '';
  }

  hasSearched.value = true
  if (!cedula) {
    fichas.value = []
    errorMessage.value = 'Por favor, ingrese un número de cédula para buscar.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  fichas.value = []
  openCardId.value = null

  try {
    const res = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/api/pacientes/fichas-generales/cedula/${cedula}`)

    if (res.data && res.data.length > 0) {
      allFichas.value = res.data
      filterByDateRange()
    } else {
      errorMessage.value = 'No se encontraron fichas para la cédula proporcionada.'
      allFichas.value = []
    }
  } catch (error) {
    console.error('Error en búsqueda de fichas:', error)
    errorMessage.value = 'Error al buscar las fichas. Verifique la cédula e intente de nuevo.'
    allFichas.value = []
  } finally {
    isLoading.value = false
  }
}

const toggleCard = (fichaId) => {
  if (openCardId.value === fichaId) {
    openCardId.value = null
  } else {
    openCardId.value = fichaId
  }
}

const goToFicha = (tipo, id) => {
  const baseRoute = `/fichas/${tipo}`
  if (tipo === 'generales') {
    const cedula = localStorage.getItem('last_cedula')
    router.push(`${baseRoute}/${cedula}`)
  } else {
    router.push(`${baseRoute}/${id}`)
  }
}

onMounted(() => {
  const storedCedula = localStorage.getItem('last_cedula')
  if (storedCedula) {
    lastSearchedCedula.value = storedCedula;
    handleSearch(storedCedula);
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6 sm:p-8 md:p-10">
    <div class="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
      <h1 class="text-3xl font-extrabold text-blue-900 mb-6 text-center sm:text-left">
        Fichas de Pacientes
      </h1>

      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <SearchBar placeholder="Buscar fichas por cédula..." :initialValue="lastSearchedCedula" @search="handleSearch"
          class="w-full sm:w-auto" />

        <div class="flex flex-col gap-2 w-full sm:w-auto">
          <h4 class="text-gray-700 font-semibold whitespace-nowrap">
            Filtrar por fecha de contacto
          </h4>
          <div class="flex flex-col sm:flex-row items-center gap-2">
            <label for="startDate" class="text-gray-700 font-medium whitespace-nowrap sm:block">Desde:</label>
            <input type="date" id="startDate" v-model="startDate" @change="filterByDateRange"
              class="w-full sm:w-auto p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" />
            <label for="endDate" class="text-gray-700 font-medium whitespace-nowrap sm:block">Hasta:</label>
            <input type="date" id="endDate" v-model="endDate" @change="filterByDateRange"
              class="w-full sm:w-auto p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" />
          </div>
        </div>
      </div>

      <div v-if="!hasSearched" class="text-center py-10 text-gray-600">
        <p class="text-xl mb-4">
          Ingrese la cédula de un paciente para ver sus fichas.
        </p>
        <p>Utilice la barra de búsqueda para comenzar.</p>
      </div>

      <div v-else-if="isLoading" class="text-center py-10">
        <div class="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p class="text-blue-700 mt-3">Buscando fichas...</p>
      </div>

      <div v-else-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert">
        <strong class="font-bold">¡Error!</strong>
        <span class="block sm:inline"> {{ errorMessage }}</span>
      </div>

      <div v-else-if="fichas.length === 0" class="text-center py-10 text-gray-600">
        <p class="text-xl mb-4">
          No se encontraron fichas que coincidan con la búsqueda.
        </p>
        <p>Intente ajustar los filtros de fecha o la cédula.</p>
      </div>

      <div v-else>
        <div class="hidden md:block overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table class="min-w-full divide-y divide-gray-200 text-sm">
            <thead class="bg-blue-50 text-blue-800 text-left uppercase tracking-wider">
              <tr>
                <th class="p-4 whitespace-nowrap">Nombre del Paciente</th>
                <th class="p-4 whitespace-nowrap">Cédula</th>
                <th class="p-4 whitespace-nowrap">Fecha de Contacto</th>
                <th class="p-4 whitespace-nowrap">Estado General</th>
                <th class="p-4 whitespace-nowrap text-center">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="ficha in fichas" :key="`${ficha.IDFICHAPACIENTE}-${ficha.IDFISIOTERAPIA}`"
                class="hover:bg-blue-50 transition duration-150 ease-in-out">
                <td class="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {{ ficha.PER_PRIMERNOMBRE }} {{ ficha.PER_SEGUNDONOMBRE }}
                  {{ ficha.PER_PRIMERAPELLIDO }} {{ ficha.PER_SEGUNDOAPELLIDO }}
                </td>
                <td class="p-4 text-gray-700 whitespace-nowrap">
                  {{ ficha.PER_CEDULA }}
                </td>
                <td class="p-4 text-gray-700 whitespace-nowrap">
                  {{ formatDate(ficha.PAC_FECHAPRIMERCONTACTO) }}
                </td>
                <td class="p-4 text-gray-700 whitespace-nowrap">
                  <span class="font-semibold text-blue-700">{{ ficha.PAC_ESTADOGENERAL }}</span>
                </td>
                <td class="p-4 space-x-2 flex items-center justify-center">
                  <span v-if="ficha.IDDATOSGENERALES">
                    <button @click="goToFicha('generales', ficha.IDDATOSGENERALES)"
                      class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition text-xs">
                      Generales
                    </button>
                  </span>
                  <span v-else class="text-gray-500 text-xs text-center leading-tight">
                    Ficha generales no ingresada
                  </span>

                  <span v-if="ficha.IDMEDICINA">
                    <button @click="goToFicha('medicina', ficha.IDMEDICINA)"
                      class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition text-xs">
                      Medicina
                    </button>
                  </span>
                  <span v-else class="text-gray-500 text-xs text-center leading-tight">
                    Ficha de medicina no ingresada
                  </span>

                  <span v-if="ficha.IDENFERMERIA">
                    <button @click="goToFicha('enfermeria', ficha.IDENFERMERIA)"
                      class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition text-xs">
                      Enfermería
                    </button>
                  </span>
                  <span v-else class="text-gray-500 text-xs text-center leading-tight">
                    Ficha de enfermería no ingresada
                  </span>

                  <span v-if="ficha.IDNUTRICION">
                    <button @click="goToFicha('nutricion', ficha.IDNUTRICION)"
                      class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition text-xs">
                      Nutrición
                    </button>
                  </span>
                  <span v-else class="text-gray-500 text-xs text-center leading-tight">
                    Ficha de nutrición no ingresada
                  </span>

                  <span v-if="ficha.IDFISIOTERAPIA">
                    <button @click="goToFicha('fisioterapia', ficha.IDFISIOTERAPIA)"
                      class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition text-xs">
                      Fisioterapia
                    </button>
                  </span>
                  <span v-else class="text-gray-500 text-xs text-center leading-tight">
                    Ficha de fisioterapia no ingresada
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="md:hidden">
          <div v-for="ficha in fichas" :key="`${ficha.IDFICHAPACIENTE}-${ficha.IDFISIOTERAPIA}`"
            class="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
            <div class="flex flex-col gap-2 mb-4">
              <div class="text-lg font-bold text-blue-900">
                {{ ficha.PER_PRIMERNOMBRE }} {{ ficha.PER_SEGUNDONOMBRE }}
                {{ ficha.PER_PRIMERAPELLIDO }} {{ ficha.PER_SEGUNDOAPELLIDO }}
              </div>
              <div class="text-sm text-gray-600">
                <span class="font-semibold">Cédula:</span> {{ ficha.PER_CEDULA }}
              </div>
              <div class="text-sm text-gray-600">
                <span class="font-semibold">Fecha de Contacto:</span> {{ formatDate(ficha.PAC_FECHAPRIMERCONTACTO) }}
              </div>
              <div class="text-sm text-gray-600">
                <span class="font-semibold">Estado General:</span>
                <span class="font-bold text-blue-700">{{ ficha.PAC_ESTADOGENERAL }}</span>
              </div>
            </div>

            <div class="relative">
              <button @click="toggleCard(`${ficha.IDFICHAPACIENTE}-${ficha.IDFISIOTERAPIA}`)"
                class="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-between">
                <span>Acciones de Fichas</span>
                <svg class="w-4 h-4 transform transition-transform"
                  :class="{ 'rotate-180': openCardId === `${ficha.IDFICHAPACIENTE}-${ficha.IDFISIOTERAPIA}` }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div class="mt-2 flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out" :class="{
                'max-h-screen p-2 bg-gray-100 rounded-lg shadow-inner': openCardId === `${ficha.IDFICHAPACIENTE}-${ficha.IDFISIOTERAPIA}`,
                'max-h-0': openCardId !== `${ficha.IDFICHAPACIENTE}-${ficha.IDFISIOTERAPIA}`
              }">
                <div class="font-semibold text-sm text-gray-800 mb-1">
                  Fichas disponibles:
                </div>
                <ul class="flex flex-wrap gap-2">
                  <li v-if="ficha.IDDATOSGENERALES">
                    <button @click="goToFicha('generales', ficha.IDDATOSGENERALES)"
                      class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition text-xs">
                      Generales
                    </button>
                  </li>
                  <li v-if="ficha.IDMEDICINA">
                    <button @click="goToFicha('medicina', ficha.IDMEDICINA)"
                      class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition text-xs">
                      Medicina
                    </button>
                  </li>
                  <li v-if="ficha.IDENFERMERIA">
                    <button @click="goToFicha('enfermeria', ficha.IDENFERMERIA)"
                      class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition text-xs">
                      Enfermería
                    </button>
                  </li>
                  <li v-if="ficha.IDNUTRICION">
                    <button @click="goToFicha('nutricion', ficha.IDNUTRICION)"
                      class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition text-xs">
                      Nutrición
                    </button>
                  </li>
                  <li v-if="ficha.IDFISIOTERAPIA">
                    <button @click="goToFicha('fisioterapia', ficha.IDFISIOTERAPIA)"
                      class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition text-xs">
                      Fisioterapia
                    </button>
                  </li>
                </ul>
                <div class="font-semibold text-sm text-gray-800 mt-2 mb-1">
                  Fichas no ingresadas:
                </div>
                <ul class="flex flex-wrap gap-2">
                  <li v-if="!ficha.IDDATOSGENERALES">
                    <span class="bg-gray-200 text-gray-600 px-3 py-1 rounded-lg text-xs">
                      Generales
                    </span>
                  </li>
                  <li v-if="!ficha.IDMEDICINA">
                    <span class="bg-gray-200 text-gray-600 px-3 py-1 rounded-lg text-xs">
                      Medicina
                    </span>
                  </li>
                  <li v-if="!ficha.IDENFERMERIA">
                    <span class="bg-gray-200 text-gray-600 px-3 py-1 rounded-lg text-xs">
                      Enfermería
                    </span>
                  </li>
                  <li v-if="!ficha.IDNUTRICION">
                    <span class="bg-gray-200 text-gray-600 px-3 py-1 rounded-lg text-xs">
                      Nutrición
                    </span>
                  </li>
                  <li v-if="!ficha.IDFISIOTERAPIA">
                    <span class="bg-gray-200 text-gray-600 px-3 py-1 rounded-lg text-xs">
                      Fisioterapia
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* No se requiere CSS personalizado ya que Tailwind CSS maneja la mayoría. */
</style>
