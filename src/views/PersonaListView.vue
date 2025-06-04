<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const personas = ref([])

const cargarPersonas = async () => {
  const res = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/api/personas`)
  personas.value = res.data
  console.log(personas.value)
}

const eliminarPersona = async (id) => {
  if (confirm('¿Deseas eliminar esta persona?')) {
    await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/api/personas/${id}`)
    await cargarPersonas()
  }
}

onMounted(() => {
  cargarPersonas()
})
</script>
<template>
  <div class="min-h-screen bg-blue-50 p-6">
    <h1 class="text-2xl font-bold text-blue-800 mb-6">Personas Registradas</h1>
    <router-link
      to="/personas/crear"
      class="inline-block mb-4 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
    >
      Registrar nueva persona
    </router-link>

    <div class="overflow-auto bg-white rounded-lg shadow-lg">
      <table class="min-w-full divide-y divide-gray-200 text-sm">
        <thead class="bg-blue-100 text-blue-800 text-left">
          <tr>
            <th class="p-3">Nombres</th>
            <th class="p-3">Apellidos</th>
            <th class="p-3">Edad</th>
            <th class="p-3">Cédula</th>
            <th class="p-3">Comunidad / Zona</th>
            <th class="p-3">Ocupación</th>
            <th class="p-3">Discapacidad</th>
            <th class="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="persona in personas"
            :key="persona.idpersona"
            class="hover:bg-gray-50 transition"
          >
            <td class="p-3">{{ persona.perPrimernombre }} {{ persona.perSegundonombre }}</td>
            <td class="p-3">{{ persona.perPrimerapellido }} {{ persona.perSegundoapellido }}</td>
            <td class="p-3">{{ persona.perEdad }} años</td>
            <td class="p-3">{{ persona.perCedula }}</td>
            <td class="p-3">
              <span class="font-medium text-blue-700">{{ persona.perComunidad }}</span
              ><br />
              <span class="text-xs text-gray-500">Zona {{ persona.perZona }}</span>
            </td>
            <td class="p-3">{{ persona.perOcupacion }}</td>
            <td class="p-3">
              <span
                :class="
                  persona.perDiscapacidad
                    ? 'text-red-600 font-semibold'
                    : 'text-green-600 font-semibold'
                "
              >
                {{ persona.perDiscapacidad ? 'Sí' : 'No' }}
              </span>
            </td>
            <td class="p-3 space-x-2">
              <router-link
                :to="`/personas/editar/${persona.idpersona}`"
                class="text-blue-600 hover:underline text-sm"
              >
                Editar
              </router-link>
              <button
                @click="eliminarPersona(persona.idpersona)"
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
<style></style>
