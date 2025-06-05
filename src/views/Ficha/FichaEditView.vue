<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const PersonaForm = ref({})
const FichaForm = ref({
  fichaid: '',
  fichaPrimerContacto: '',
  fichaEstado: '',
  fichaObservacion: '',
})

const cargarDatos = async () => {
  try {
    const personaId = route.params.id
    const fichaId = route.params.ficha

    const { data: persona } = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/api/personas/${personaId}`)
    PersonaForm.value = persona

    const { data: ficha } = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/api/pacientes/${fichaId}`)
    FichaForm.value.fichaid = ficha.idficha
    FichaForm.value.fichaPrimerContacto = ficha.pacFechaprimercontacto
    FichaForm.value.fichaEstado = ficha.pacEstadogeneral
    FichaForm.value.fichaObservacion = ficha.pacObservaciones
  } catch (error) {
    console.error('Error al cargar los datos:', error)
  }
}

const editarFicha = async () => {
  try {
    const payload = {
      pacFechaprimercontacto: FichaForm.value.fichaPrimerContacto,
      pacEstadogeneral: FichaForm.value.fichaEstado.trim(),
      pacObservaciones: FichaForm.value.fichaObservacion.trim(),
    }

    await axios.patch(`${import.meta.env.VITE_URL_BACKEND}/api/pacientes/${FichaForm.value.fichaid}`, payload)
    alert('Ficha actualizada correctamente')
    router.push('/fichas')
  } catch (error) {
    console.error('Error al editar la ficha:', error)
    alert('Ocurrió un error al editar la ficha.')
  }
}

onMounted(cargarDatos)
</script>

<template>
  <div class="min-h-screen bg-blue-50 p-8">
    <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-blue-800 mb-6">
        Editar ficha médica de {{ PersonaForm.perPrimernombre }} {{ PersonaForm.perPrimerapellido }}
      </h2>

      <form @submit.prevent="editarFicha" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Id de ficha médica</label>
          <input v-model="FichaForm.fichaid" type="text" class="input-style bg-gray-100" readonly />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Fecha de primer contacto</label>
          <input v-model="FichaForm.fichaPrimerContacto" type="date" class="input-style" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Estado actual del paciente</label>
          <input v-model="FichaForm.fichaEstado" type="text" class="input-style" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Observaciones sobre el paciente</label>
          <input v-model="FichaForm.fichaObservacion" type="text" class="input-style" />
        </div>

        <div class="mt-6 flex justify-end">
          <button type="submit" class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Actualizar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
