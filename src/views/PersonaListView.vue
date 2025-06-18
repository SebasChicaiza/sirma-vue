<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const personas = ref([])
const router = useRouter()
const isLoading = ref(false)
const errorMessage = ref('')

const cargarPersonas = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const res = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/api/personas`)
    personas.value = res.data
    console.log('Personas cargadas:', personas.value)
  } catch (error) {
    errorMessage.value = 'Error al cargar las personas. Por favor, intente de nuevo.'
    console.error('Error al cargar personas:', error)
  } finally {
    isLoading.value = false
  }
}

const eliminarPersona = async (id) => {
  if (confirm('¿Estás seguro de que deseas eliminar esta persona? Esta acción es irreversible.')) {
    try {
      await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/api/personas/${id}`)
      await cargarPersonas() // Recargar la lista después de eliminar
      alert('Persona eliminada exitosamente.')
    } catch (error) {
      alert('Error al eliminar la persona. Por favor, intente de nuevo.')
      console.error('Error al eliminar persona:', error)
    }
  }
}

// Función para navegar a la creación de una ficha específica para una persona
const goToCrearFicha = (idPersona) => {
  // Aquí podemos mostrar un modal o un menú contextual para elegir el tipo de ficha
  // Por ahora, redirigimos a una página genérica de selección de ficha.
  // Podrías tener rutas específicas como `/fichas/enfermeria/crear/${idPersona}`
  // o `/fichas/fisioterapia/crear/${idPersona}`
  router.push(`/fichas/${idPersona}`)
}

onMounted(() => {
  cargarPersonas()
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6 sm:p-8 md:p-10">
    <div class="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
      <h1 class="text-3xl font-extrabold text-blue-900 mb-6 text-center sm:text-left">
        Gestión de Personas
      </h1>

      <div class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <router-link
          to="/personas/crear"
          class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          Registrar nueva persona
        </router-link>
      </div>

      <div v-if="isLoading" class="text-center py-10">
        <div
          class="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
        ></div>
        <p class="text-blue-700 mt-3">Cargando personas...</p>
      </div>

      <div
        v-else-if="errorMessage"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong class="font-bold">¡Error!</strong>
        <span class="block sm:inline"> {{ errorMessage }}</span>
      </div>

      <div v-else-if="personas.length === 0" class="text-center py-10 text-gray-600">
        <p class="text-xl mb-4">No hay personas registradas aún.</p>
        <p>¡Comienza añadiendo una nueva persona para gestionar sus fichas!</p>
      </div>

      <div v-else class="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table class="min-w-full divide-y divide-gray-200 text-sm">
          <thead class="bg-blue-50 text-blue-800 text-left uppercase tracking-wider">
            <tr>
              <th class="p-4 whitespace-nowrap">Nombres</th>
              <th class="p-4 whitespace-nowrap">Apellidos</th>
              <th class="p-4 whitespace-nowrap">Edad</th>
              <th class="p-4 whitespace-nowrap">Cédula</th>
              <th class="p-4 whitespace-nowrap">Comunidad / Zona</th>
              <th class="p-4 whitespace-nowrap">Ocupación</th>
              <th class="p-4 whitespace-nowrap">Discapacidad</th>
              <th class="p-4 whitespace-nowrap text-center">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="persona in personas"
              :key="persona.idpersona"
              class="hover:bg-blue-50 transition duration-150 ease-in-out"
            >
              <td class="p-4 font-medium text-gray-900 whitespace-nowrap">
                {{ persona.perPrimernombre }} {{ persona.perSegundonombre }}
              </td>
              <td class="p-4 text-gray-700 whitespace-nowrap">
                {{ persona.perPrimerapellido }} {{ persona.perSegundoapellido }}
              </td>
              <td class="p-4 text-gray-700 whitespace-nowrap">{{ persona.perEdad }} años</td>
              <td class="p-4 text-gray-700 whitespace-nowrap">
                {{ persona.perCedula }}
              </td>
              <td class="p-4 text-gray-700 whitespace-nowrap">
                <span class="font-semibold text-blue-700">{{ persona.perComunidad }}</span>
                <br />
                <span class="text-xs text-gray-500">Zona {{ persona.perZona }}</span>
              </td>
              <td class="p-4 text-gray-700 whitespace-nowrap">
                {{ persona.perOcupacion }}
              </td>
              <td class="p-4 text-center whitespace-nowrap">
                <span
                  :class="
                    persona.perDiscapacidad
                      ? 'bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold'
                      : 'bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold'
                  "
                >
                  {{ persona.perDiscapacidad ? 'Sí' : 'No' }}
                </span>
              </td>
              <td
                class="p-4 space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row items-center justify-center"
              >
                <router-link
                  :to="`/personas/editar/${persona.idpersona}`"
                  class="text-blue-600 hover:text-blue-800 font-medium hover:underline transition duration-150 ease-in-out"
                >
                  Editar
                </router-link>
                <button
                  @click="goToCrearFicha(persona.idpersona)"
                  class="text-purple-600 hover:text-purple-800 font-medium hover:underline transition duration-150 ease-in-out"
                >
                  Crear Ficha
                </button>
                <button
                  @click="eliminarPersona(persona.idpersona)"
                  class="text-red-600 hover:text-red-800 font-medium hover:underline transition duration-150 ease-in-out"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* No se requiere mucho CSS personalizado ya que Tailwind CSS maneja la mayoría. */
/* Asegúrate de que Tailwind CSS esté configurado correctamente en tu proyecto. */
</style>
