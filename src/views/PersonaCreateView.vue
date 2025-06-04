<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  perComunidad: '',
  perZona: '',
  perGeorreferenciacion: '',
  perPrimernombre: '',
  perSegundonombre: '',
  perPrimerapellido: '',
  perSegundoapellido: '',
  perCedula: '',
  perFechanacimiento: '',
  perEdad: '',
  perSexo: '',
  perEstadocivil: '',
  perOcupacion: '',
  perInstruccion: '',
  perCuidador: '',
  perPeso: '',
  perTalla: '',
  perDiscapacidad: '',
})

const guardar = async () => {
  const payload = {
    perComunidad: form.value.perComunidad.trim(),
    perZona: Number(form.value.perZona),
    perGeorreferenciacion: form.value.perGeorreferenciacion.trim(),
    perPrimernombre: form.value.perPrimernombre.trim(),
    perSegundonombre: form.value.perSegundonombre.trim(),
    perPrimerapellido: form.value.perPrimerapellido.trim(),
    perSegundoapellido: form.value.perSegundoapellido.trim(),
    perCedula: form.value.perCedula.trim(),
    perFechanacimiento: form.value.perFechanacimiento,
    perEdad: Number(form.value.perEdad),
    perSexo: form.value.perSexo.trim(),
    perEstadocivil: form.value.perEstadocivil.trim(),
    perOcupacion: form.value.perOcupacion.trim(),
    perInstruccion: form.value.perInstruccion.trim(),
    perCuidador: form.value.perCuidador.trim(),
    perPeso: Number(form.value.perPeso).toFixed(2),
    perTalla: Number(form.value.perTalla).toFixed(2),
    perDiscapacidad: Number(form.value.perDiscapacidad ?? 0),
  }

  try {
    await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/personas`, payload)
    alert('Persona registrada correctamente')
    router.push('/personas')
  } catch (error) {
    console.error('Error al guardar', error)
    alert('Ocurrió un error al guardar la persona.')
  }

  console.log('Datos a enviar:', payload)
}
</script>
<template>
  <div class="min-h-screen bg-blue-50 p-8">
    <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-blue-800 mb-6">Registrar nuevo paciente</h2>

      <form @submit.prevent="guardar" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          v-model="form.perPrimernombre"
          type="text"
          placeholder="Primer Nombre"
          class="input-style"
        />
        <input
          v-model="form.perSegundonombre"
          type="text"
          placeholder="Segundo Nombre"
          class="input-style"
        />
        <input
          v-model="form.perPrimerapellido"
          type="text"
          placeholder="Primer Apellido"
          class="input-style"
        />
        <input
          v-model="form.perSegundoapellido"
          type="text"
          placeholder="Segundo Apellido"
          class="input-style"
        />

        <input v-model="form.perCedula" type="text" placeholder="Cédula" class="input-style" />
        <input
          v-model="form.perFechanacimiento"
          type="date"
          placeholder="Fecha de nacimiento"
          class="input-style"
        />
        <input v-model="form.perEdad" type="number" placeholder="Edad" class="input-style" />
        <select v-model="form.perSexo" class="input-style">
          <option disabled value="">Sexo</option>
          <option>Masculino</option>
          <option>Femenino</option>
        </select>

        <input
          v-model="form.perEstadocivil"
          type="text"
          placeholder="Estado Civil"
          class="input-style"
        />
        <input
          v-model="form.perOcupacion"
          type="text"
          placeholder="Ocupación"
          class="input-style"
        />
        <input
          v-model="form.perInstruccion"
          type="text"
          placeholder="Nivel de instrucción"
          class="input-style"
        />
        <input
          v-model="form.perCuidador"
          type="text"
          placeholder="Nombre del cuidador"
          class="input-style"
        />

        <input
          v-model="form.perPeso"
          type="number"
          step="0.01"
          placeholder="Peso (kg)"
          class="input-style"
        />
        <input
          v-model="form.perTalla"
          type="number"
          step="0.01"
          placeholder="Talla (m)"
          class="input-style"
        />
        <input v-model="form.perZona" type="number" placeholder="Zona" class="input-style" />
        <input
          v-model="form.perComunidad"
          type="text"
          placeholder="Comunidad"
          class="input-style"
        />

        <select v-model="form.perDiscapacidad" class="input-style">
          <option disabled value="">¿Discapacidad?</option>
          <option :value="0">No</option>
          <option :value="1">Sí</option>
        </select>
        <input
          v-model="form.perGeorreferenciacion"
          type="text"
          placeholder="Georreferenciación (lat,long)"
          class="input-style"
        />
      </form>

      <div class="mt-6 flex justify-end">
        <button @click="guardar" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
