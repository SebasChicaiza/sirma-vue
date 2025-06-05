<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'


const fichas = ref([])
const personaFichas = ref([])

const cargarFichas = async () => {
  const res = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/api/pacientes`)
  console.log( 'Info de todas las fichas' + res.data)
  fichas.value = res.data
  console.log(fichas.value)
}

const cargarPersonaFichas = async () => {
  const res = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/api/persona-fichas`)
  personaFichas.value = res.data
  console.log('Fichas con personas:', personaFichas.value)
}


const eliminarFichas = async (id) => {
  if (confirm('¿Deseas eliminar esta ficha?')) {
    await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/api/pacientes/${id}`)
    await cargarFichas()
  }
}

onMounted(() => {
  cargarFichas()
  cargarPersonaFichas()
})


</script>

<template>
  <div class="min-h-screen bg-blue-50 p-6">
    <h1 class="text-2xl font-bold text-blue-800 mb-6">Fichas de Pacientess</h1>
    <router-link
      to="/fichas/crear"
      class="inline-block mb-4 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
    >
      Crear
    </router-link>

    <div class="overflow-auto bg-white rounded-lg shadow-lg">
      <table class="min-w-full divide-y divide-gray-200 text-sm">
        <thead class="bg-blue-100 text-blue-800 text-left">
          <tr>
            <th class="p-3">id de Ficha</th>
            <th class="p-3">Cedula del Paciente</th>
            <th class="p-3">Nombre</th>
            <th class="p-3">Apellido</th>
            <th class="p-3">Fecha de Primer Contacto</th>
            <th class="p-3">Estado</th>
            <th class="p-3">Observaciones</th>
            <th class="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="pf in personaFichas"
            :key="pf.idpersonaficha"
            class="hover:bg-gray-50 transition"
          >
            <td class="p-3">{{ pf.idficha }}</td>
            <td class="p-3">{{ pf.idpersona2.perCedula }}</td>
            <td class="p-3">{{ pf.idpersona2.perPrimernombre }} {{ pf.idpersona2.perSegundonombre }}</td>
            <td class="p-3">{{ pf.idpersona2.perPrimerapellido }} {{ pf.idpersona2.perSegundoapellido }}</td>
            <td class="p-3">{{ pf.idficha2.pacFechaprimercontacto }}</td>
            <td class="p-3">{{ pf.idficha2.pacEstadogeneral }}</td>
            <td class="p-3">{{ pf.idficha2.pacObservaciones }}</td>
            <td class="p-3 space-x-2">
              <router-link
                :to="`/fichas/editar/${pf.idficha}`"
                class="text-blue-600 hover:underline text-sm"
              >
                Editar
              </router-link>
              <button
                @click="eliminarFichas(pf.idficha)"
                class="text-red-600 hover:underline text-sm"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>
