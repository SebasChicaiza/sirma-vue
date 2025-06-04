<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const form = ref({})

const cargarPersona = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_URL_BACKEND}/api/personas/${route.params.id}`,
  )
  form.value = data
}

const guardar = async () => {
  await axios.patch(
    `${import.meta.env.VITE_URL_BACKEND}/api/personas/${route.params.id}`,
    form.value,
  )
  router.push('/personas')
}

onMounted(() => {
  cargarPersona()
})
</script>
<template>
  <div class="p-8 max-w-3xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">Editar Persona</h2>

    <form @submit.prevent="guardar">
      <input
        v-model="form.perPrimernombre"
        type="text"
        placeholder="Primer Nombre"
        class="w-full p-2 border rounded mb-4"
      />
      <input
        v-model="form.perPrimerapellido"
        type="text"
        placeholder="Primer Apellido"
        class="w-full p-2 border rounded mb-4"
      />
      <input
        v-model="form.perCedula"
        type="text"
        placeholder="Cédula"
        class="w-full p-2 border rounded mb-4"
      />
      <button class="bg-blue-600 text-white px-4 py-2 rounded">Actualizar</button>
    </form>
  </div>
</template>
<style></style>
