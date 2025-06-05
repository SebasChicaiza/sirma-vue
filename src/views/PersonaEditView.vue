<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

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

const cargarPersona = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_URL_BACKEND}/api/personas/${route.params.id}`,
    )
    form.value = data
  } catch (error) {
    console.error('Error al cargar persona:', error)
    alert('No se pudo cargar la información del paciente.')
  }
}

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
    console.log('Datos a enviar:', payload)

    await axios.patch(
      `${import.meta.env.VITE_URL_BACKEND}/api/personas/${route.params.id}`,
      payload,
    )
    alert('Datos actualizados correctamente.')
    router.push('/personas')
  } catch (error) {
    console.error('Error al guardar persona:', error)
    alert('Ocurrió un error al actualizar los datos del paciente.')
  }
}

onMounted(() => {
  cargarPersona()
})
</script>



<template>
  <div class="min-h-screen bg-blue-50 p-8">
    <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-blue-800 mb-6">
        Editar datos del paciente {{ form.perPrimernombre }} {{ form.perSegundonombre }} {{ form.perPrimerapellido }} {{ form.perSegundoapellido }}
      </h2>

      <form @submit.prevent="guardar" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Primer Nombre</label>
          <input v-model="form.perPrimernombre" type="text" class="input-style" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Segundo Nombre</label>
          <input v-model="form.perSegundonombre" type="text" class="input-style" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Primer Apellido</label>
          <input v-model="form.perPrimerapellido" type="text" class="input-style" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Segundo Apellido</label>
          <input v-model="form.perSegundoapellido" type="text" class="input-style" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Cédula</label>
          <input v-model="form.perCedula" type="text" class="input-style" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</label>
          <input v-model="form.perFechanacimiento" type="date" class="input-style" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Edad</label>
          <input v-model="form.perEdad" type="number" class="input-style" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Sexo</label>
          <select v-model="form.perSexo" class="input-style">
            <option disabled value="">Seleccione</option>
            <option>Masculino</option>
            <option>Femenino</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Estado Civil</label>
          <input v-model="form.perEstadocivil" type="text" class="input-style" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Ocupación</label>
          <input v-model="form.perOcupacion" type="text" class="input-style" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nivel de instrucción</label>
          <input v-model="form.perInstruccion" type="text" class="input-style" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del cuidador</label>
          <input v-model="form.perCuidador" type="text" class="input-style" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
          <input v-model="form.perPeso" type="number" step="0.01" class="input-style" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Talla (m)</label>
          <input v-model="form.perTalla" type="number" step="0.01" class="input-style" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Zona</label>
          <input v-model="form.perZona" type="number" class="input-style" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Comunidad</label>
          <input v-model="form.perComunidad" type="text" class="input-style" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">¿Discapacidad?</label>
          <select v-model="form.perDiscapacidad" class="input-style">
            <option disabled value="">Seleccione</option>
            <option :value="0">No</option>
            <option :value="1">Sí</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Georreferenciación (lat,long)</label
          >
          <input v-model="form.perGeorreferenciacion" type="text" class="input-style" />
        </div>
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
