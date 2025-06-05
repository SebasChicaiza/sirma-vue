<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const PersonaForm = ref({
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
  idpersona: '',
})

const FichaForm = ref({
  fichaid: '',
  fichaPrimerContacto: '',
  fichaEstado: '',
  fichaObservacion: '',
})

const cargarPersona = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_URL_BACKEND}/api/personas/${route.params.id}`,
    )
    PersonaForm.value = data
  } catch (error) {
    console.error('Error al cargar persona:', error)
  }
}

const guardarficha = async() => {
  const payload = {
    idficha: FichaForm.value.fichaid.trim(),
    pacFechaprimercontacto: FichaForm.value.fichaPrimerContacto,
    pacEstadogeneral: FichaForm.value.fichaEstado.trim(),
    pacObservaciones: FichaForm.value.fichaObservacion.trim()
  }

  const payload2 = {
    idficha: FichaForm.value.fichaid.trim(),
    idpersona: PersonaForm.value.idpersona
  }

  console.log('Datos a enviar:', payload)

  try{
    await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/pacientes`, payload)
    alert('Ficha creada correctamente')


    await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/persona-fichas`, payload2)
    alert('Ficha asignada a persona correctamente')
    router.push('/fichas')

  }catch (error){
    console.error('Error al guardar la ficha', error)
    alert('Ocurrió un error al guardar la ficha.')
  }
}

const generarFichaId = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/api/pacientes`);

    const fichas = data
      .map(p => p.idficha)
      .filter(id => /^FCH\d{3}$/.test(id))
      .map(id => parseInt(id.slice(3)))
      .sort((a, b) => b - a);

    const ultimoNumero = fichas.length > 0 ? fichas[0] : 0;
    const siguienteNumero = (ultimoNumero + 1).toString().padStart(3, '0');
    FichaForm.value.fichaid = `FCH${siguienteNumero}`;

  } catch (error) {
    console.error('Error al generar ID de ficha:', error);
    FichaForm.value.fichaid = 'FCH001';
  }
};

onMounted(async () => {
  await cargarPersona()
  await generarFichaId()
})

</script>

<template>
  <div class="min-h-screen bg-blue-50 p-8">
    <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-blue-800 mb-6">
        Crear ficha medica del paciente {{ PersonaForm.perPrimernombre }} {{ PersonaForm.perSegundonombre }} {{ PersonaForm.perPrimerapellido }} {{ PersonaForm.perSegundoapellido }}
      </h2>

      <form @submit.prevent="guardarficha" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 items-center gap-1">
            <span>Primer Nombre</span>
            <i class="fas fa-lock text-gray-400 text-xs pl-1" title="Campo no editable"></i>
          </label>
          <input v-model="PersonaForm.perPrimernombre" type="text" class="input-style bg-gray-100 cursor-not-allowed" readonly />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 items-center gap-1">
            <span>Segundo Nombre</span>
            <i class="fas fa-lock text-gray-400 text-xs pl-1" title="Campo no editable"></i>
          </label>
          <input v-model="PersonaForm.perSegundonombre" type="text" class="input-style bg-gray-100 cursor-not-allowed" readonly />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 items-center gap-1">
            <span>Primer Apellido</span>
            <i class="fas fa-lock text-gray-400 text-xs pl-1" title="Campo no editable"></i>
          </label>
          <input v-model="PersonaForm.perPrimerapellido" type="text" class="input-style bg-gray-100 cursor-not-allowed" readonly />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 items-center gap-1">
            <span>Segundo Apellido</span>
            <i class="fas fa-lock text-gray-400 text-xs pl-1" title="Campo no editable"></i>
          </label>
          <input v-model="PersonaForm.perSegundoapellido" type="text" class="input-style bg-gray-100 cursor-not-allowed" readonly />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 items-center gap-1">
            <span>Cédula</span>
            <i class="fas fa-lock text-gray-400 text-xs pl-1" title="Campo no editable"></i>
          </label>
          <input v-model="PersonaForm.perCedula" type="text" class="input-style bg-gray-100 cursor-not-allowed" readonly />
        </div>


        <div>

          <label class="block text-sm font-medium text-gray-700 mb-1">
            <span>Id de la ficha médica</span>
            <i class="fas fa-lock text-gray-400 text-xs pl-1" title="Campo no editable"></i>
          </label>

          <input v-model="FichaForm.fichaid" type="text" class="input-style bg-gray-100 cursor-not-allowed" readonly />
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
        <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Guardar
        </button>
      </div>

      </form>


    </div>
  </div>
</template>
