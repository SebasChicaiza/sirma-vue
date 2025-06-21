<template>
  <div class="ficha-container">
    <div class="ficha-card">
      <div class="ficha-header">
        <img src="@/assets/images/puce-logo.png" alt="Logo PUCE" class="puce-logo" />
        <div class="header-text">
          <p class="university-name">PONTIFICIA UNIVERSIDAD CATÓLICA DEL ECUADOR</p>
          <p class="faculty-name">FICHA GENERAL DEL PACIENTE</p>
        </div>
      </div>

      <h2 class="form-title">FICHA GENERAL DEL PACIENTE</h2>
      <SearchBar
        placeholder="Buscar cliente por nombre o cédula..."
        @search="handleSearch"
        class="w-full sm:w-auto ml-auto"
      />
      <!-- Tabla de resultados de búsqueda -->
      <table v-if="resultadosBusqueda.length" class="tabla-busqueda">
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Edad</th>
            <th>Cédula</th>
            <th>Seleccionar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="persona in resultadosBusqueda" :key="persona.idpersona">
            <td>
              <strong>{{ persona.perPrimernombre }} {{ persona.perSegundonombre }}</strong>
            </td>
            <td>{{ persona.perPrimerapellido }} {{ persona.perSegundoapellido }}</td>
            <td>{{ persona.perEdad }} años</td>
            <td>{{ persona.perCedula }}</td>
            <td>
              <button
                @click="seleccionarPersona(persona)"
                :disabled="idPersonaSeleccionada == persona.idpersona"
                :style="
                  idPersonaSeleccionada == persona.idpersona
                    ? 'background-color: #22c55e; color: white;'
                    : ''
                "
              >
                {{ idPersonaSeleccionada == persona.idpersona ? 'Seleccionado' : 'Seleccionar' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Si no hay resultados y se hizo una búsqueda, muestra el botón para agregar paciente solo si no hay idpersona en localStorage -->
      <div v-else-if="busquedaRealizada && !idPersonaSeleccionada" class="mt-4 flex justify-center">
        <button
          @click="router.push('/personas/crear')"
          class="submit-button"
          style="background-color: coral"
        >
          Agregar paciente
        </button>
      </div>
      <div class="form-metadata">
        <div class="form-group inline-group">
          <label for="idFicha">Ficha N°:</label>
          <input
            id="idFicha"
            v-model.trim="form.idFicha"
            type="text"
            placeholder="Ej: FCH02"
            class="small-input"
          />
        </div>
        <div class="form-group inline-group">
          <label for="pacFechaprimercontacto">Fecha de Contacto:</label>
          <input
            id="pacFechaprimercontacto"
            v-model="form.pacFechaprimercontacto"
            type="date"
            class="small-input"
          />
        </div>
      </div>

      <section class="form-section">
        <h3 class="section-title">🧍 Estado y Observaciones</h3>
        <div class="form-grid">
          <div class="form-group">
            <label for="pacEstadogeneral">Estado General:</label>
            <input
              id="pacEstadogeneral"
              v-model.trim="form.pacEstadogeneral"
              type="text"
              placeholder="Ej: Estable"
            />
          </div>
          <div class="form-group">
            <label for="pacObservaciones">Observaciones:</label>
            <textarea
              id="pacObservaciones"
              v-model.trim="form.pacObservaciones"
              rows="3"
              placeholder="Observaciones del paciente"
            ></textarea>
          </div>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">👤 Datos del Encuestador</h3>
        <div class="form-group">
          <label for="dgNombreencuestador">Nombre del Encuestador:</label>
          <input
            id="dgNombreencuestador"
            v-model.trim="form.dgNombreencuestador"
            type="text"
            placeholder="Ej: David Pérez"
          />
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">🩺 Signos Vitales y Diagnósticos</h3>
        <div class="form-grid">
          <div class="form-group">
            <label for="dgPasAcostado">PAS Acostado:</label>
            <input
              id="dgPasAcostado"
              v-model.trim="form.dgPasAcostado"
              type="number"
              step="0.01"
              placeholder="Ej: 120.50"
            />
          </div>
          <div class="form-group">
            <label for="dgPadAcostado">PAD Acostado:</label>
            <input
              id="dgPadAcostado"
              v-model.trim="form.dgPadAcostado"
              type="number"
              step="0.01"
              placeholder="Ej: 80.25"
            />
          </div>
          <div class="form-group">
            <label for="dgPasSentado">PAS Sentado:</label>
            <input
              id="dgPasSentado"
              v-model.trim="form.dgPasSentado"
              type="number"
              step="0.01"
              placeholder="Ej: 122.00"
            />
          </div>
          <div class="form-group">
            <label for="dgPadSentado">PAD Sentado:</label>
            <input
              id="dgPadSentado"
              v-model.trim="form.dgPadSentado"
              type="number"
              step="0.01"
              placeholder="Ej: 82.00"
            />
          </div>
          <div class="form-group">
            <label for="dgDiagnosticoha">Diagnóstico HA:</label>
            <input
              id="dgDiagnosticoha"
              v-model.trim="form.dgDiagnosticoha"
              type="text"
              placeholder="Ej: Hipertensión controlada"
            />
          </div>
          <div class="form-group">
            <label for="dgPulsopormin">Pulso por Minuto:</label>
            <input
              id="dgPulsopormin"
              v-model.number="form.dgPulsopormin"
              type="number"
              placeholder="Ej: 72"
            />
          </div>
          <div class="form-group">
            <label for="dgDiagnosticopulso">Diagnóstico Pulso:</label>
            <input
              id="dgDiagnosticopulso"
              v-model.trim="form.dgDiagnosticopulso"
              type="text"
              placeholder="Ej: Normal"
            />
          </div>
          <div class="form-group">
            <label for="dgFrecrespiratoria">Frecuencia Respiratoria:</label>
            <input
              id="dgFrecrespiratoria"
              v-model.number="form.dgFrecrespiratoria"
              type="number"
              placeholder="Ej: 18"
            />
          </div>
          <div class="form-group">
            <label for="dgDiagnosticofr">Diagnóstico FR:</label>
            <input
              id="dgDiagnosticofr"
              v-model.trim="form.dgDiagnosticofr"
              type="text"
              placeholder="Ej: Normal"
            />
          </div>
          <div class="form-group">
            <label for="dgSaturacion">Saturación:</label>
            <input
              id="dgSaturacion"
              v-model.number="form.dgSaturacion"
              type="number"
              placeholder="Ej: 98"
            />
          </div>
          <div class="form-group">
            <label for="dgDiagnosticosaturacion">Diagnóstico Saturación:</label>
            <input
              id="dgDiagnosticosaturacion"
              v-model.trim="form.dgDiagnosticosaturacion"
              type="text"
              placeholder="Ej: Óptima"
            />
          </div>
          <div class="form-group">
            <label for="dgTemperatura">Temperatura:</label>
            <input
              id="dgTemperatura"
              v-model.trim="form.dgTemperatura"
              type="text"
              placeholder="Ej: 36.7"
            />
          </div>
          <div class="form-group">
            <label for="dgDiagnosticotemperatura">Diagnóstico Temperatura:</label>
            <input
              id="dgDiagnosticotemperatura"
              v-model.trim="form.dgDiagnosticotemperatura"
              type="text"
              placeholder="Ej: Normal"
            />
          </div>
        </div>
      </section>

      <button type="submit" class="submit-button" :disabled="isSubmitting" @click="handleSubmit">
        {{ isSubmitting ? 'Guardando Ficha...' : 'Guardar Ficha General' }}
      </button>

      <p v-if="submitMessage" :class="['submit-info', submitStatus]">
        {{ submitMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import SearchBar from '@/components/SearchBar.vue'

const idPersonaSeleccionada = ref(localStorage.getItem('idpersona'))

const router = useRouter()

const form = reactive({
  idFicha: '', // Ejemplo: FCH02
  idpersona: null, // Se llena al seleccionar persona
  pacFechaprimercontacto: '', // Fecha de contacto
  pacEstadogeneral: '', // Estado general
  pacObservaciones: '', // Observaciones
  dgNombreencuestador: '', // Nombre encuestador
  dgPasAcostado: '', // Presión sistólica acostado
  dgPadAcostado: '', // Presión diastólica acostado
  dgPasSentado: '', // Presión sistólica sentado
  dgPadSentado: '', // Presión diastólica sentado
  dgDiagnosticoha: '', // Diagnóstico hipertensión arterial
  dgPulsopormin: '', // Pulso por minuto
  dgDiagnosticopulso: '', // Diagnóstico pulso
  dgFrecrespiratoria: '', // Frecuencia respiratoria
  dgDiagnosticofr: '', // Diagnóstico frecuencia respiratoria
  dgSaturacion: '', // Saturación
  dgDiagnosticosaturacion: '', // Diagnóstico saturación
  dgTemperatura: '', // Temperatura
  dgDiagnosticotemperatura: '', // Diagnóstico temperatura
  dgFirmaconcentimiento: false,
  dgFirmamedicina: false,
  dgFirmaenfermeria: false,
  dgFirmanutricion: false,
  dgFirmafisioterapia: false,
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref('')
const resultadosBusqueda = ref([])
const busquedaRealizada = ref(false)

const handleSearch = async (busqueda) => {
  localStorage.removeItem('idpersona') // Limpia el idpersona en localStorage al iniciar una nueva búsqueda
  idPersonaSeleccionada.value = null // Limpia la variable reactiva

  busquedaRealizada.value = false
  resultadosBusqueda.value = []
  if (!busqueda) return
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_URL_BACKEND}/api/personas/cedula/${busqueda}`,
    )
    if (Array.isArray(res.data) && res.data.length > 0) {
      resultadosBusqueda.value = res.data
    } else if (res.data && res.data.idpersona) {
      resultadosBusqueda.value = [res.data]
    }
    // Marca que la búsqueda se realizó
    busquedaRealizada.value = true
  } catch {
    resultadosBusqueda.value = []
    busquedaRealizada.value = true
    alert('No se encontraron resultados para la búsqueda.')
  }
}

const seleccionarPersona = (persona) => {
  form.idpersona = persona.idpersona
  localStorage.setItem('idpersona', persona.idpersona)
  idPersonaSeleccionada.value = persona.idpersona // Actualiza la variable reactiva
  //resultadosBusqueda.value = []
}

const handleSubmit = async () => {
  submitMessage.value = ''
  submitStatus.value = ''
  isSubmitting.value = true

  // Mapea los campos del formulario a los nombres que espera la API
  const payload = {
    p_IDFICHA: form.idFicha,
    p_FECHAPRIMERCONTACTO: form.pacFechaprimercontacto,
    p_ESTADOGENERAL: form.pacEstadogeneral,
    p_OBSERVACIONES: form.pacObservaciones,
    p_IDPERSONA: Number(form.idpersona),
    p_NOMBREENCUESTADOR: form.dgNombreencuestador,
    p_PAS_ACOSTADO: Number(form.dgPasAcostado),
    p_PAD_ACOSTADO: Number(form.dgPadAcostado),
    p_PAS_SENTADO: Number(form.dgPasSentado),
    p_PAD_SENTADO: Number(form.dgPadSentado),
    p_DIAGNOSTICOHA: form.dgDiagnosticoha,
    p_PULSOPORMIN: Number(form.dgPulsopormin),
    p_DIAGNOSTICOPULSO: form.dgDiagnosticopulso,
    p_FRECRESPIRATORIA: Number(form.dgFrecrespiratoria),
    p_DIAGNOSTICOFR: form.dgDiagnosticofr,
    p_SATURACION: Number(form.dgSaturacion),
    p_DIAGNOSTICOSATURACION: form.dgDiagnosticosaturacion,
    p_TEMPERATURA: Number(form.dgTemperatura),
    p_DIAGNOSTICOTEMPERATURA: form.dgDiagnosticotemperatura,
  }

  try {
    await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/pacientes/insertar-ficha-general`, payload)
    submitMessage.value = 'Ficha general guardada exitosamente.'
    submitStatus.value = 'success'
  } catch (error) {
    submitMessage.value = 'Error al guardar la ficha. Inténtalo de nuevo.'
    submitStatus.value = 'error'
    console.error('Error guardando ficha general:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/*
  IMPORTANTE: Las variables CSS (ej. --color-primary-dark) DEBEN ser definidas globalmente
  en tu main.js o App.vue (sin scoped), como se explicó anteriormente, para que sean accesibles aquí.
  Asegúrate de que las variables para los inputs que definimos en RegistroForm.vue también estén disponibles:
  --color-input-border-default, --color-input-background-default, --color-input-placeholder
*/

.ficha-container {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  background-color: var(--color-background-light);
}

.ficha-card {
  background-color: var(--color-card-background, #ffffff);
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  padding: 40px 50px;
  width: 100%;
  max-width: 900px; /* Ancho máximo para la ficha */
  font-family: 'Montserrat', sans-serif;
}

.ficha-header {
  display: flex;
  align-items: center;
  justify-content: center; /* Centrar el encabezado */
  margin-bottom: 30px;
  gap: 20px;
  flex-wrap: wrap; /* Permitir que el logo y el texto se envuelvan */
}

.puce-logo {
  height: 80px; /* Ajusta el tamaño del logo */
  width: auto;
}

.header-text {
  text-align: center;
  line-height: 1.4;
}

.university-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 5px;
}
.faculty-name {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-weight: 500;
  margin-bottom: 0;
}

.form-title {
  color: var(--color-primary-dark);
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 40px;
  border-bottom: 3px solid var(--color-accent-green);
  padding-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-metadata {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
  padding: 15px;
  background-color: var(--color-primary-light);
  border-radius: 10px;
}

.inline-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0;
}

.inline-group label {
  font-weight: 600;
  color: var(--color-primary-dark);
  margin-bottom: 0; /* Anula el margin-bottom por defecto de .form-group label */
}

.inline-group .small-input {
  width: auto; /* Ajustar al contenido */
  min-width: 120px;
  padding: 8px 12px;
  font-size: 0.95rem;
}

.form-section {
  margin-bottom: 40px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 25px;
  background-color: var(--color-input-background-default);
}

.section-title {
  font-size: 1.8rem;
  color: var(--color-primary);
  font-weight: 700;
  margin-bottom: 25px;
  text-align: left;
  border-bottom: 2px solid rgba(var(--color-primary-rgb), 0.2);
  padding-bottom: 10px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.form-group {
  text-align: left;
  display: flex;
  flex-direction: column;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  color: var(--color-text-primary);
  margin-bottom: 6px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.form-group input[type='text'],
.form-group input[type='date'],
.form-group input[type='number'],
.form-group input[type='tel'],
.form-group select,
.form-group textarea {
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
  -webkit-appearance: none; /* Eliminar estilos predeterminados de select */
  -moz-appearance: none;
  appearance: none;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--color-input-placeholder);
  opacity: 1;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(var(--color-primary-rgb), 0.25);
  outline: none;
  background-color: #ffffff;
}

/* Estilo específico para el select para mantener la flecha */
.form-group select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666666'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 18px;
  padding-right: 30px; /* Espacio para la flecha */
}

/* Checkbox group */
.checkbox-group {
  display: flex;
  flex-direction: row; /* En línea */
  gap: 25px; /* Espacio entre checkboxes */
  align-items: center;
  margin-top: 10px; /* Espacio superior */
}

.checkbox-group label {
  display: flex;
  align-items: center;
  margin-bottom: 0;
  cursor: pointer;
  font-weight: 500;
  color: var(--color-text-primary);
}

.checkbox-group input[type='checkbox'] {
  margin-right: 8px;
  accent-color: var(--color-accent-green);
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.form-group.full-width {
  grid-column: 1 / -1; /* Ocupa todo el ancho de la cuadrícula */
}

/* Estilos para la sección de Sellos (Registro de Atención) */
.stamp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 25px;
  justify-items: center; /* Centrar los sellos horizontalmente */
  text-align: center;
}

.stamp-box {
  border: 2px dashed var(--color-border);
  border-radius: 10px;
  padding: 20px;
  min-height: 120px; /* Altura mínima para el sello */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8; /* Fondo suave para la caja de sello */
}

.stamp-box strong {
  font-size: 1.1rem;
  color: var(--color-primary-dark);
  margin-bottom: 10px;
}

.sello {
  font-style: italic;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

/* Estilos del botón de envío y mensajes de estado - reutilizados */
.submit-button {
  background-color: var(--color-primary);
  color: var(--color-text-light);
  padding: 15px 25px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease,
    box-shadow 0.3s ease;
  margin-top: 30px;
  box-shadow: 0 4px 10px rgba(var(--color-primary-rgb), 0.2);
  width: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.submit-button:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(var(--color-primary-rgb), 0.3);
}

.submit-button:disabled {
  background-color: var(--color-disabled);
  cursor: not-allowed;
  opacity: 0.8;
  transform: none;
  box-shadow: none;
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

/* Nuevos estilos para la tabla de búsqueda */
.tabla-busqueda {
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
  background: #fff;
  box-shadow: 0 2px 8px #0001;
}
.tabla-busqueda th,
.tabla-busqueda td {
  padding: 10px 8px;
  border: 1px solid #e0e0e0;
  text-align: left;
}
.tabla-busqueda th {
  background: #e6f0ff;
  color: #174ea6;
  font-weight: bold;
}
.tabla-busqueda tr:hover {
  background: #f0f8ff;
}
.tabla-busqueda button {
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 0.95rem;
}
.tabla-busqueda button:hover {
  background: #174ea6;
}

/* Responsividad */
@media (max-width: 768px) {
  .ficha-card {
    padding: 30px 20px;
  }

  .form-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .form-grid,
  .stamp-grid {
    grid-template-columns: 1fr;
  }

  .ficha-header {
    flex-direction: column;
    text-align: center;
  }

  .puce-logo {
    margin-bottom: 15px;
  }

  .form-metadata {
    flex-direction: column;
    align-items: flex-start; /* Alinear ítems al inicio */
  }

  .inline-group {
    width: 100%; /* Ocupar todo el ancho */
    justify-content: flex-start;
  }

  .inline-group .small-input {
    min-width: unset; /* Eliminar min-width */
    width: 100%; /* Ocupar todo el ancho disponible */
  }

  .checkbox-group {
    flex-direction: column; /* Apilar checkboxes en móvil */
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .ficha-card {
    padding: 20px 15px;
  }

  .form-title {
    font-size: 1.8rem;
    margin-bottom: 25px;
  }
  .university-name {
    font-size: 1.2rem;
  }
  .faculty-name {
    font-size: 0.8rem;
  }
  .section-title {
    font-size: 1.3rem;
    margin-bottom: 20px;
  }
  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 10px 12px;
    font-size: 0.9rem;
  }
  .form-group label {
    font-size: 0.85rem;
  }
}
</style>
