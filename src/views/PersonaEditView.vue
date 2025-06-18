<script setup>
import { ref, onMounted, watch } from 'vue' // Importa watch
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Estados para manejo de carga y envío
const isLoading = ref(true)
const errorMessage = ref('')
const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref('') // 'success' o 'error'

const form = ref({
  perComunidad: '',
  perZona: null,
  perGeorreferenciacion: '',
  perPrimernombre: '',
  perSegundonombre: '',
  perPrimerapellido: '',
  perSegundoapellido: '',
  perCedula: '',
  perFechanacimiento: '', // Formato YYYY-MM-DD
  perEdad: null,
  perSexo: '',
  perEstadocivil: '',
  perOcupacion: '',
  perInstruccion: '',
  perCuidador: '',
  perPeso: null,
  perTalla: null,
  perDiscapacidad: null, // 0 para No, 1 para Sí, null inicialmente
  perTipoDiscapacidad: '', // Nuevo campo para el tipo de discapacidad
})

// Computed property para habilitar/deshabilitar el campo de tipo de discapacidad
const disableTipoDiscapacidad = ref(true)
watch(
  () => form.value.perDiscapacidad,
  (newValue) => {
    if (newValue === 1) {
      // Si "Sí" (1) está seleccionado
      disableTipoDiscapacidad.value = false
    } else {
      disableTipoDiscapacidad.value = true
      form.value.perTipoDiscapacidad = '' // Limpiar si la discapacidad es "No"
    }
  },
  { immediate: true },
) // Ejecutar inmediatamente al montar para establecer el estado inicial

const cargarPersona = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_URL_BACKEND}/api/personas/${route.params.id}`,
    )
    // Asegurarse de que los valores numéricos sean null si están vacíos
    // y que la fecha esté en el formato correcto para el input type="date"
    form.value = {
      ...data,
      perZona: data.perZona !== null ? Number(data.perZona) : null,
      perEdad: data.perEdad !== null ? Number(data.perEdad) : null,
      perPeso: data.perPeso !== null ? Number(data.perPeso) : null,
      perTalla: data.perTalla !== null ? Number(data.perTalla) : null,
      perDiscapacidad: data.perDiscapacidad !== null ? Number(data.perDiscapacidad) : 0, // Asegura 0 o 1
      perFechanacimiento: data.perFechanacimiento
        ? new Date(data.perFechanacimiento).toISOString().split('T')[0]
        : '',
    }
    console.log('Persona cargada:', form.value)
  } catch (error) {
    console.error('Error al cargar persona:', error)
    errorMessage.value =
      'No se pudo cargar la información del paciente. Por favor, intente de nuevo.'
  } finally {
    isLoading.value = false
  }
}

const guardar = async () => {
  submitMessage.value = ''
  submitStatus.value = ''
  isSubmitting.value = true

  // Validaciones básicas antes de enviar
  if (
    !form.value.perPrimernombre ||
    !form.value.perPrimerapellido ||
    !form.value.perCedula ||
    !form.value.perFechanacimiento
  ) {
    submitMessage.value =
      'Por favor, complete al menos los campos obligatorios: Primer Nombre, Primer Apellido, Cédula y Fecha de Nacimiento.'
    submitStatus.value = 'error'
    isSubmitting.value = false
    return
  }

  const payload = {
    perComunidad: form.value.perComunidad.trim() || null,
    perZona: form.value.perZona !== null ? Number(form.value.perZona) : null,
    perGeorreferenciacion: form.value.perGeorreferenciacion.trim() || null,
    perPrimernombre: form.value.perPrimernombre.trim(),
    perSegundonombre: form.value.perSegundonombre.trim() || null,
    perPrimerapellido: form.value.perPrimerapellido.trim(),
    perSegundoapellido: form.value.perSegundoapellido.trim() || null,
    perCedula: form.value.perCedula.trim(),
    perFechanacimiento: form.value.perFechanacimiento,
    perEdad: form.value.perEdad !== null ? Number(form.value.perEdad) : null,
    perSexo: form.value.perSexo || null,
    perEstadocivil: form.value.perEstadocivil.trim() || null,
    perOcupacion: form.value.perOcupacion.trim() || null,
    perInstruccion: form.value.perInstruccion.trim() || null,
    perCuidador: form.value.perCuidador.trim() || null,
    perPeso: form.value.perPeso !== null ? Number(form.value.perPeso).toFixed(2) : null,
    perTalla: form.value.perTalla !== null ? Number(form.value.perTalla).toFixed(2) : null,
    perDiscapacidad: form.value.perDiscapacidad !== null ? Number(form.value.perDiscapacidad) : 0,
    perTipoDiscapacidad:
      form.value.perDiscapacidad === 1 ? form.value.perTipoDiscapacidad.trim() : null, // Solo si hay discapacidad
  }

  try {
    console.log('Datos a enviar para actualizar:', payload)

    const response = await axios.patch(
      `${import.meta.env.VITE_URL_BACKEND}/api/personas/${route.params.id}`,
      payload,
    )
    console.log('Respuesta del servidor:', response.data)
    submitMessage.value = '¡Datos del paciente actualizados correctamente!'
    submitStatus.value = 'success'
    setTimeout(() => {
      router.push('/personas') // Redirigir después de mostrar el mensaje
    }, 1500) // Esperar 1.5 segundos
  } catch (error) {
    console.error('Error al guardar persona:', error)
    submitMessage.value =
      'Ocurrió un error al actualizar los datos del paciente. Por favor, intente de nuevo.'
    submitStatus.value = 'error'
    if (error.response && error.response.data && error.response.data.message) {
      submitMessage.value += ` Detalles: ${error.response.data.message}`
    }
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  cargarPersona()
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6 sm:p-8 md:p-10">
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
      <h2 class="text-3xl font-extrabold text-blue-900 mb-8 text-center">
        ✏️ Editar Datos del Paciente
        <br />
        <span class="text-xl font-semibold text-gray-700 block mt-2">
          {{ form.perPrimernombre }} {{ form.perSegundonombre }} {{ form.perPrimerapellido }}
          {{ form.perSegundoapellido }}
        </span>
      </h2>

      <div v-if="isLoading" class="text-center py-10">
        <div
          class="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
        ></div>
        <p class="text-blue-700 mt-3">Cargando datos del paciente...</p>
      </div>

      <div
        v-else-if="errorMessage"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong class="font-bold">¡Error!</strong>
        <span class="block sm:inline"> {{ errorMessage }}</span>
      </div>

      <form
        v-else
        @submit.prevent="guardar"
        class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
      >
        <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
          <div>
            <label for="perPrimernombre" class="input-label"
              >Primer Nombre <span class="text-red-500">*</span></label
            >
            <input
              id="perPrimernombre"
              v-model.trim="form.perPrimernombre"
              type="text"
              placeholder="Ej: Juan"
              class="input-style"
              required
            />
          </div>
          <div>
            <label for="perSegundonombre" class="input-label">Segundo Nombre</label>
            <input
              id="perSegundonombre"
              v-model.trim="form.perSegundonombre"
              type="text"
              placeholder="Ej: Carlos"
              class="input-style"
            />
          </div>
          <div>
            <label for="perPrimerapellido" class="input-label"
              >Primer Apellido <span class="text-red-500">*</span></label
            >
            <input
              id="perPrimerapellido"
              v-model.trim="form.perPrimerapellido"
              type="text"
              placeholder="Ej: Pérez"
              class="input-style"
              required
            />
          </div>
          <div>
            <label for="perSegundoapellido" class="input-label">Segundo Apellido</label>
            <input
              id="perSegundoapellido"
              v-model.trim="form.perSegundoapellido"
              type="text"
              placeholder="Ej: García"
              class="input-style"
            />
          </div>
        </div>

        <div>
          <label for="perCedula" class="input-label"
            >Cédula <span class="text-red-500">*</span></label
          >
          <input
            id="perCedula"
            v-model.trim="form.perCedula"
            type="text"
            inputmode="numeric"
            maxlength="10"
            placeholder="Ej: 1712345678"
            class="input-style"
            required
          />
        </div>
        <div>
          <label for="perFechanacimiento" class="input-label"
            >Fecha de Nacimiento <span class="text-red-500">*</span></label
          >
          <input
            id="perFechanacimiento"
            v-model="form.perFechanacimiento"
            type="date"
            class="input-style"
            required
          />
        </div>

        <div>
          <label for="perEdad" class="input-label">Edad</label>
          <input
            id="perEdad"
            v-model.number="form.perEdad"
            type="number"
            min="0"
            placeholder="Ej: 70"
            class="input-style"
          />
        </div>
        <div>
          <label for="perSexo" class="input-label">Sexo</label>
          <select id="perSexo" v-model="form.perSexo" class="input-style">
            <option disabled value="">Seleccionar</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div>
          <label for="perEstadocivil" class="input-label">Estado Civil</label>
          <input
            id="perEstadocivil"
            v-model.trim="form.perEstadocivil"
            type="text"
            placeholder="Ej: Casado/a"
            class="input-style"
          />
        </div>
        <div>
          <label for="perOcupacion" class="input-label">Ocupación</label>
          <input
            id="perOcupacion"
            v-model.trim="form.perOcupacion"
            type="text"
            placeholder="Ej: Jubilado/a"
            class="input-style"
          />
        </div>

        <div>
          <label for="perInstruccion" class="input-label">Nivel de Instrucción</label>
          <input
            id="perInstruccion"
            v-model.trim="form.perInstruccion"
            type="text"
            placeholder="Ej: Primaria completa"
            class="input-style"
          />
        </div>
        <div>
          <label for="perCuidador" class="input-label">Nombre del Cuidador</label>
          <input
            id="perCuidador"
            v-model.trim="form.perCuidador"
            type="text"
            placeholder="Ej: María Rodríguez"
            class="input-style"
          />
        </div>

        <div>
          <label for="perPeso" class="input-label">Peso (kg)</label>
          <input
            id="perPeso"
            v-model.number="form.perPeso"
            type="number"
            step="0.01"
            min="0"
            placeholder="Ej: 65.50"
            class="input-style"
          />
        </div>
        <div>
          <label for="perTalla" class="input-label">Talla (m)</label>
          <input
            id="perTalla"
            v-model.number="form.perTalla"
            type="number"
            step="0.01"
            min="0"
            placeholder="Ej: 1.65"
            class="input-style"
          />
        </div>
        <div>
          <label for="perZona" class="input-label">Zona</label>
          <input
            id="perZona"
            v-model.number="form.perZona"
            type="number"
            min="1"
            placeholder="Ej: 1, 2, 3..."
            class="input-style"
          />
        </div>
        <div>
          <label for="perComunidad" class="input-label">Comunidad</label>
          <input
            id="perComunidad"
            v-model.trim="form.perComunidad"
            type="text"
            placeholder="Ej: La Esperanza"
            class="input-style"
          />
        </div>

        <div>
          <label for="perDiscapacidad" class="input-label">¿Presenta Discapacidad?</label>
          <select id="perDiscapacidad" v-model="form.perDiscapacidad" class="input-style">
            <option :value="null" disabled>Seleccionar</option>
            <option :value="0">No</option>
            <option :value="1">Sí</option>
          </select>
        </div>
        <div>
          <label for="perTipoDiscapacidad" class="input-label">Tipo de Discapacidad</label>
          <input
            id="perTipoDiscapacidad"
            v-model.trim="form.perTipoDiscapacidad"
            type="text"
            placeholder="Ej: Motora, Visual"
            class="input-style"
            :disabled="disableTipoDiscapacidad"
            :class="{ 'bg-gray-100 cursor-not-allowed': disableTipoDiscapacidad }"
          />
        </div>
        <div class="md:col-span-2">
          <label for="perGeorreferenciacion" class="input-label"
            >Georreferenciación (Latitud, Longitud)</label
          >
          <input
            id="perGeorreferenciacion"
            v-model.trim="form.perGeorreferenciacion"
            type="text"
            placeholder="Ej: -0.2100, -78.5000"
            class="input-style"
          />
        </div>
      </form>

      <div class="mt-8 flex justify-end gap-4">
        <button type="button" @click="router.push('/personas')" class="btn-secondary">
          Cancelar
        </button>
        <button type="submit" @click="guardar" class="btn-primary" :disabled="isSubmitting">
          {{ isSubmitting ? 'Guardando...' : 'Actualizar Paciente' }}
        </button>
      </div>

      <p v-if="submitMessage" :class="['submit-info', submitStatus]">
        {{ submitMessage }}
      </p>
    </div>
  </div>
</template>

<style scoped>
/*
  Variables CSS (ej. --color-primary-dark) DEBEN ser definidas globalmente
  en tu main.js o App.vue (sin scoped), como se explicó anteriormente, para que sean accesibles aquí.
*/

.input-label {
  display: block;
  font-size: 0.9rem;
  color: var(--color-text-primary);
  margin-bottom: 6px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.input-style {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid var(--color-input-border-default);
  border-radius: 8px;
  font-size: 1rem;
  color: var(--color-text-primary);
  background-color: var(--color-input-background-default);
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.input-style::placeholder {
  color: var(--color-input-placeholder);
  opacity: 1; /* Para que el placeholder sea visible en Firefox */
}

.input-style:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(var(--color-primary-rgb), 0.25);
  outline: none;
  background-color: #ffffff;
}

/* Estilo para los select que tienen una flecha */
.input-style[type='date'] {
  /* Asegura que el icono del calendario sea visible y no se solape con el estilo de la flecha */
  padding-right: 15px; /* Espacio extra para el icono nativo */
}

select.input-style {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666666'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 18px;
  padding-right: 30px; /* Asegura espacio para la flecha */
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-text-light);
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(var(--color-primary-rgb), 0.2);
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(var(--color-primary-rgb), 0.3);
}

.btn-primary:disabled {
  background-color: var(--color-disabled);
  cursor: not-allowed;
  opacity: 0.8;
  transform: none;
  box-shadow: none;
}

.btn-secondary {
  background-color: var(--color-background-light);
  color: var(--color-text-primary);
  padding: 12px 25px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    transform 0.2s ease,
    box-shadow 0.3s ease;
}

.btn-secondary:hover {
  background-color: var(--color-hover-light);
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.submit-info {
  margin-top: 20px;
  padding: 12px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  text-align: center;
}

.submit-info.success {
  background-color: var(--color-success-light);
  color: var(--color-success);
  border: 1px solid var(--color-success);
}

.submit-info.error {
  background-color: var(--color-error-light);
  color: var(--color-error);
  border: 1px solid var(--color-error);
}

/* Responsividad */
@media (max-width: 768px) {
  .max-w-4xl {
    padding: 30px 20px;
  }

  .text-3xl {
    font-size: 2rem;
  }

  .grid-cols-2 {
    grid-template-columns: 1fr;
  }

  .md\:col-span-2 {
    grid-column: auto;
  }
}

@media (max-width: 480px) {
  .max-w-4xl {
    padding: 20px 15px;
  }

  .text-3xl {
    font-size: 1.8rem;
  }

  .input-style {
    padding: 10px 12px;
    font-size: 0.9rem;
  }

  .input-label {
    font-size: 0.85rem;
  }

  .btn-primary,
  .btn-secondary {
    padding: 10px 20px;
    font-size: 0.95rem;
  }
}
</style>
