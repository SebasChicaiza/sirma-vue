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
            required
          />
        </div>
        <div class="form-group inline-group">
          <label for="pacFechaprimercontacto">Fecha de Contacto:</label>
          <input
            id="pacFechaprimercontacto"
            v-model="form.pacFechaprimercontacto"
            type="date"
            class="small-input"
            :max="currentDate"
            required
          />
        </div>
      </div>

      <section class="form-section">
        <h3 class="section-title">🧍 Estado y Observaciones</h3>
        <div class="form-grid">
          <div class="form-group">
            <label for="pacEstadogeneral">Estado General:</label>
            <select id="pacEstadogeneral" v-model="form.pacEstadogeneral" required>
              <option value="" disabled>Seleccione un estado</option>
              <option value="Estable">Estable</option>
              <option value="Delicado">Delicado</option>
              <option value="Critico">Crítico</option>
              <option value="En Recuperacion">En Recuperación</option>
              <option value="Pendiente de Evaluacion">Pendiente de Evaluación</option>
            </select>
          </div>
          <div class="form-group">
            <label for="pacObservaciones">Observaciones:</label>
            <textarea
              id="pacObservaciones"
              v-model.trim="form.pacObservaciones"
              rows="3"
              placeholder="Observaciones generales del paciente"
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
            placeholder="Ej: Dr. Juan Pérez"
            required
            pattern="[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+"
            title="Solo letras y espacios permitidos."
          />
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">🩺 Signos Vitales y Diagnósticos</h3>
        <div class="form-grid">
          <div class="form-group">
            <label for="dgPasAcostado">PAS Acostado (mm Hg):</label>
            <input
              id="dgPasAcostado"
              v-model.number="form.dgPasAcostado"
              type="number"
              min="70"
              max="200"
              placeholder="Ej: 120"
              step="1"
              required
            />
          </div>
          <div class="form-group">
            <label for="dgPadAcostado">PAD Acostado (mm Hg):</label>
            <input
              id="dgPadAcostado"
              v-model.number="form.dgPadAcostado"
              type="number"
              min="40"
              max="120"
              placeholder="Ej: 80"
              step="1"
              required
            />
          </div>
          <div class="form-group">
            <label for="dgPasSentado">PAS Sentado (mm Hg):</label>
            <input
              id="dgPasSentado"
              v-model.number="form.dgPasSentado"
              type="number"
              min="70"
              max="200"
              placeholder="Ej: 122"
              step="1"
              required
            />
          </div>
          <div class="form-group">
            <label for="dgPadSentado">PAD Sentado (mm Hg):</label>
            <input
              id="dgPadSentado"
              v-model.number="form.dgPadSentado"
              type="number"
              min="40"
              max="120"
              placeholder="Ej: 82"
              step="1"
              required
            />
          </div>
          <div class="form-group">
            <label for="dgDiagnosticoha">Diagnóstico HA:</label>
            <select id="dgDiagnosticoha" v-model="form.dgDiagnosticoha">
              <option value="" disabled>Seleccione un diagnóstico</option>
              <option value="Normotenso">Normotenso</option>
              <option value="Hipertensión Etapa 1">Hipertensión Etapa 1</option>
              <option value="Hipertensión Etapa 2">Hipertensión Etapa 2</option>
              <option value="Crisis Hipertensiva">Crisis Hipertensiva</option>
              <option value="Hipotension">Hipotensión</option>
              <option value="Hipertension Controlada">Hipertensión Controlada</option>
            </select>
          </div>

          <div class="form-group">
            <label for="dgPulsopormin">Pulso por Minuto (ppm):</label>
            <input
              id="dgPulsopormin"
              v-model.number="form.dgPulsopormin"
              type="number"
              min="40"
              max="180"
              placeholder="Ej: 72"
              step="1"
              required
            />
          </div>
          <div class="form-group">
            <label for="dgDiagnosticopulso">Diagnóstico Pulso:</label>
            <select id="dgDiagnosticopulso" v-model="form.dgDiagnosticopulso">
              <option value="" disabled>Seleccione un diagnóstico</option>
              <option value="Normal">Normal</option>
              <option value="Taquicardia">Taquicardia</option>
              <option value="Bradicardia">Bradicardia</option>
              <option value="Arrítmico">Arrítmico</option>
            </select>
          </div>

          <div class="form-group">
            <label for="dgFrecrespiratoria">Frecuencia Respiratoria (rpm):</label>
            <input
              id="dgFrecrespiratoria"
              v-model.number="form.dgFrecrespiratoria"
              type="number"
              min="10"
              max="30"
              placeholder="Ej: 18"
              step="1"
              required
            />
          </div>
          <div class="form-group">
            <label for="dgDiagnosticofr">Diagnóstico FR:</label>
            <select id="dgDiagnosticofr" v-model="form.dgDiagnosticofr">
              <option value="" disabled>Seleccione un diagnóstico</option>
              <option value="Normal">Normal</option>
              <option value="Taquipnea">Taquipnea</option>
              <option value="Bradipnea">Bradipnea</option>
              <option value="Disnea">Disnea</option>
            </select>
          </div>

          <div class="form-group">
            <label for="dgSaturacion">Saturación (%):</label>
            <input
              id="dgSaturacion"
              v-model.number="form.dgSaturacion"
              type="number"
              min="85"
              max="100"
              placeholder="Ej: 98"
              step="1"
              required
            />
          </div>
          <div class="form-group">
            <label for="dgDiagnosticosaturacion">Diagnóstico Saturación:</label>
            <select id="dgDiagnosticosaturacion" v-model="form.dgDiagnosticosaturacion">
              <option value="" disabled>Seleccione un diagnóstico</option>
              <option value="Optima">Óptima</option>
              <option value="Leve Hipoxemia">Leve Hipoxemia</option>
              <option value="Moderada Hipoxemia">Moderada Hipoxemia</option>
              <option value="Severa Hipoxemia">Severa Hipoxemia</option>
            </select>
          </div>

          <div class="form-group">
            <label for="dgTemperatura">Temperatura (°C):</label>
            <input
              id="dgTemperatura"
              v-model.number="form.dgTemperatura"
              type="number"
              min="34.0"
              max="42.0"
              placeholder="Ej: 36.7"
              step="0.1"
              required
            />
          </div>
          <div class="form-group">
            <label for="dgDiagnosticotemperatura">Diagnóstico Temperatura:</label>
            <select id="dgDiagnosticotemperatura" v-model="form.dgDiagnosticotemperatura">
              <option value="" disabled>Seleccione un diagnóstico</option>
              <option value="Normal">Normal</option>
              <option value="Febril">Febril</option>
              <option value="Hipetermia">Hipertermia</option>
              <option value="Hipotermia">Hipotermia</option>
            </select>
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
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import SearchBar from '@/components/SearchBar.vue'

const idPersonaSeleccionada = ref(localStorage.getItem('idpersona'))

const router = useRouter()

const form = reactive({
  idFicha: '', // Ejemplo: FCH02
  idpersona: null, // Se llena al seleccionar persona
  pacFechaprimercontacto: '', // Fecha de contacto
  pacEstadogeneral: '', // Estado general: Select
  pacObservaciones: '', // Observaciones
  dgNombreencuestador: '', // Nombre encuestador
  dgPasAcostado: null, // Presión sistólica acostado (número entero)
  dgPadAcostado: null, // Presión diastólica acostado (número entero)
  dgPasSentado: null, // Presión sistólica sentado (número entero)
  dgPadSentado: null, // Presión diastólica sentado (número entero)
  dgDiagnosticoha: '', // Diagnóstico hipertensión arterial: Select
  dgPulsopormin: null, // Pulso por minuto (número entero)
  dgDiagnosticopulso: '', // Diagnóstico pulso: Select
  dgFrecrespiratoria: null, // Frecuencia respiratoria (número entero)
  dgDiagnosticofr: '', // Diagnóstico frecuencia respiratoria: Select
  dgSaturacion: null, // Saturación (número entero)
  dgDiagnosticosaturacion: '', // Diagnóstico saturación: Select
  dgTemperatura: null, // Temperatura (número con decimales)
  dgDiagnosticotemperatura: '', // Diagnóstico temperatura: Select
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
const currentDate = ref('') // Para limitar la fecha de contacto

onMounted(() => {
  // Inicializa la fecha máxima para el input de fecha
  currentDate.value = new Date().toISOString().split('T')[0]
})

const handleSearch = async (busqueda) => {
  localStorage.removeItem('idpersona') // Limpia el idpersona en localStorage al iniciar una nueva búsqueda
  idPersonaSeleccionada.value = null // Limpia la variable reactiva

  busquedaRealizada.value = false
  resultadosBusqueda.value = []
  if (!busqueda) {
    submitMessage.value = 'Por favor, ingrese un valor para buscar.'
    submitStatus.value = 'error'
    return
  }
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
  } catch (error) {
    resultadosBusqueda.value = []
    busquedaRealizada.value = true
    submitMessage.value = 'No se encontraron resultados para la búsqueda o hubo un error en la conexión.'
    submitStatus.value = 'error'
    console.error('Error en la búsqueda:', error);
  }
}

const seleccionarPersona = (persona) => {
  form.idpersona = persona.idpersona
  localStorage.setItem('idpersona', persona.idpersona)
  idPersonaSeleccionada.value = persona.idpersona // Actualiza la variable reactiva
  submitMessage.value = `Paciente ${persona.perPrimernombre} ${persona.perPrimerapellido} seleccionado.`
  submitStatus.value = 'success'
}

const validateForm = () => {
  // Limpiar mensajes anteriores
  submitMessage.value = '';
  submitStatus.value = '';

  // 1. Validación de campos obligatorios
  if (!form.idFicha || !form.pacFechaprimercontacto || !form.idpersona || !form.pacEstadogeneral ||
      !form.dgNombreencuestador || form.dgPasAcostado === null || form.dgPadAcostado === null ||
      form.dgPasSentado === null || form.dgPadSentado === null || !form.dgDiagnosticoha ||
      form.dgPulsopormin === null || !form.dgDiagnosticopulso || form.dgFrecrespiratoria === null ||
      !form.dgDiagnosticofr || form.dgSaturacion === null || !form.dgDiagnosticosaturacion ||
      form.dgTemperatura === null || !form.dgDiagnosticotemperatura
  ) {
    submitMessage.value = 'Por favor, complete todos los campos obligatorios.';
    submitStatus.value = 'error';
    return false;
  }

  // 2. Validación de rangos numéricos y formatos
  const errors = [];

  // ID Ficha - Formato específico (ej. FCH02)
  if (!/^FCH\d{2,}$/.test(form.idFicha)) {
    errors.push('El campo "Ficha N°" debe tener el formato FCHXX (ej. FCH01).');
  }

  // Fecha de contacto - No futura
  const today = new Date(currentDate.value);
  const contactDate = new Date(form.pacFechaprimercontacto);
  if (contactDate > today) {
    errors.push('La "Fecha de Contacto" no puede ser una fecha futura.');
  }

  // Nombre del Encuestador - Solo letras y espacios
  if (!/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/.test(form.dgNombreencuestador.trim())) {
    errors.push('El "Nombre del Encuestador" solo puede contener letras y espacios.');
  }

  // Presión Arterial (PAS/PAD) - Rangos
  if (form.dgPasAcostado < 70 || form.dgPasAcostado > 200) errors.push('PAS Acostado fuera de rango (70-200).');
  if (form.dgPadAcostado < 40 || form.dgPadAcostado > 120) errors.push('PAD Acostado fuera de rango (40-120).');
  if (form.dgPasSentado < 70 || form.dgPasSentado > 200) errors.push('PAS Sentado fuera de rango (70-200).');
  if (form.dgPadSentado < 40 || form.dgPadSentado > 120) errors.push('PAD Sentado fuera de rango (40-120).');

  // Pulso - Rango
  if (form.dgPulsopormin < 40 || form.dgPulsopormin > 180) errors.push('Pulso por Minuto fuera de rango (40-180).');

  // Frecuencia Respiratoria - Rango
  if (form.dgFrecrespiratoria < 10 || form.dgFrecrespiratoria > 30) errors.push('Frecuencia Respiratoria fuera de rango (10-30).');

  // Saturación - Rango
  if (form.dgSaturacion < 85 || form.dgSaturacion > 100) errors.push('Saturación fuera de rango (85-100%).');

  // Temperatura - Rango
  if (form.dgTemperatura < 34.0 || form.dgTemperatura > 42.0) errors.push('Temperatura fuera de rango (34.0-42.0°C).');


  if (errors.length > 0) {
    submitMessage.value = 'Errores de validación:<br>' + errors.join('<br>');
    submitStatus.value = 'error';
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    // Si la validación falla, los mensajes de error ya se han establecido.
    return;
  }

  isSubmitting.value = true

  // Asegurar que idpersona esté presente
  if (!form.idpersona) {
    submitMessage.value = 'Debe seleccionar un paciente antes de guardar la ficha.';
    submitStatus.value = 'error';
    isSubmitting.value = false;
    return;
  }

  // Mapea los campos del formulario a los nombres que espera la API
  const payload = {
    p_IDFICHA: form.idFicha,
    p_FECHAPRIMERCONTACTO: form.pacFechaprimercontacto,
    p_ESTADOGENERAL: form.pacEstadogeneral,
    p_OBSERVACIONES: form.pacObservaciones,
    p_IDPERSONA: Number(form.idpersona), // Asegúrate de enviar como número
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
    p_FIRMACONSENTIMIENTO: form.dgFirmaconcentimiento ? 1 : 0, // Convertir booleano a 1 o 0
    p_FIRMAMEDICINA: form.dgFirmamedicina ? 1 : 0,
    p_FIRMAENFERMERIA: form.dgFirmaenfermeria ? 1 : 0,
    p_FIRMANUTRICION: form.dgFirmanutricion ? 1 : 0,
    p_FIRMAFISIOTERAPIA: form.dgFirmafisioterapia ? 1 : 0,
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/pacientes/insertar-ficha-general`, payload)
    if (response.data.success) { // Asumiendo que la API devuelve un campo 'success'
      submitMessage.value = 'Ficha general guardada exitosamente.';
      submitStatus.value = 'success';
      // Considera resetear el formulario aquí
      // resetForm();
    } else {
      submitMessage.value = response.data.message || 'Error al guardar la ficha. Por favor, revise los datos.';
      submitStatus.value = 'error';
    }
  } catch (error) {
    submitMessage.value = 'Error al guardar la ficha. Inténtalo de nuevo. Asegúrate de que todos los datos son válidos.';
    submitStatus.value = 'error';
    console.error('Error guardando ficha general:', error);
    // Mostrar un mensaje de error más específico si la API lo proporciona
    if (error.response && error.response.data && error.response.data.message) {
      submitMessage.value = `Error: ${error.response.data.message}`;
    }
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
  /* Ancho máximo para el diseño de escritorio (4 columnas) */
  max-width: 1200px;
  font-family: 'Montserrat', sans-serif;
}

.ficha-header {
  display: flex;
  align-items: center;
  justify-content: center; /* Centrar el encabezado */
  margin-bottom: 10px;
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
  gap: 10px;
  margin-bottom: 20px;
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
  margin-bottom: 0;
}

.inline-group .small-input {
  width: auto;
  min-width: 120px;
  padding: 8px 12px;
  font-size: 0.95rem;
}

.form-section {
  margin-bottom: 10px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 10px;
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
  /* Por defecto, intentar 4 columnas en pantallas grandes */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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
  padding: 12px 10px;
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

.form-group select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666666'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 18px;
  padding-right: 30px;
}

.checkbox-group {
  display: flex;
  flex-direction: row;
  gap: 25px;
  align-items: center;
  margin-top: 10px;
  flex-wrap: wrap; /* Importante para que los checkboxes se envuelvan */
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
  grid-column: 1 / -1;
}

.stamp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 25px;
  justify-items: center;
  text-align: center;
}

.stamp-box {
  border: 2px dashed var(--color-border);
  border-radius: 10px;
  padding: 20px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
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

.submit-button {
  background-color: var(--color-primary-dark);
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

/* --- RESPONSIVIDAD PARA MÓVILES --- */

/* Pantallas grandes / monitores (4 columnas) - Base ya definida */
/* max-width: 1200px */
/* grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); */


/* Para pantallas de tabletas grandes o laptops pequeñas (hasta 1250px) - Transición a 3 columnas */
@media (max-width: 1250px) {
  .ficha-card {
    max-width: 980px; /* Reducir el ancho máximo para 3 columnas */
    padding: 35px 40px;
  }
  .form-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* Ajuste para 3 columnas */
  }
}

/* Para tabletas verticales y laptops pequeñas (hasta 980px) - Transición a 2 columnas */
@media (max-width: 980px) {
  .ficha-card {
    max-width: 760px; /* Reducir el ancho máximo para 2 columnas */
    padding: 30px 30px;
  }
  .form-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Ajuste para 2 columnas */
  }
  .form-title {
    font-size: 2.2rem;
  }
  .section-title {
    font-size: 1.6rem;
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
    align-items: flex-start;
  }
  .inline-group {
    width: 100%;
    justify-content: flex-start;
  }
  .inline-group .small-input {
    min-width: unset;
    width: 100%;
  }
  .checkbox-group {
    flex-direction: column; /* Apilar checkboxes en móviles */
    align-items: flex-start;
    gap: 15px; /* Reducir el espacio entre checkboxes apilados */
  }
}

/* Para teléfonos grandes y tabletas pequeñas (hasta 600px) - Transición a 1 columna */
@media (max-width: 600px) {
  .ficha-card {
    padding: 20px 15px; /* Reducir el padding para pantallas muy pequeñas */
    max-width: 100%; /* Ocupar todo el ancho disponible */
    box-shadow: none; /* Opcional: remover sombra para un look más "nativo" en móvil */
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
    font-size: 1.4rem;
    margin-bottom: 20px;
  }
  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 10px 12px;
    font-size: 0.95rem;
  }
  .form-group label {
    font-size: 0.9rem;
  }
  .form-grid,
  .stamp-grid {
    grid-template-columns: 1fr; /* Una sola columna para la mejor legibilidad */
  }
  /* Ajustar tamaño de texto y padding para una mejor lectura en pantallas pequeñas */
  .submit-button {
    font-size: 1rem;
    padding: 12px 20px;
  }
  .submit-info {
    font-size: 0.9rem;
    padding: 10px;
  }
}

/* Ajustes finos para pantallas realmente pequeñas (ej. iPhone SE) */
@media (max-width: 400px) {
  .ficha-card {
    padding: 15px 10px;
  }
  .form-title {
    font-size: 1.6rem;
  }
  .section-title {
    font-size: 1.2rem;
  }
  .form-group label {
    font-size: 0.8rem;
  }
  .form-group input,
  .form-group select,
  .form-group textarea {
    font-size: 0.85rem;
  }
}
</style>
