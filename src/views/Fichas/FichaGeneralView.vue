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

      <h2 class="form-title">
        {{ isEditing ? 'EDITAR FICHA GENERAL DEL PACIENTE' : 'FICHA GENERAL DEL PACIENTE' }}
      </h2>

      <div v-if="isLoadingData" class="loading-state">
        <div class="loader"></div>
        <p>Cargando datos de la ficha...</p>
      </div>

      <div v-else>
        <div v-if="!isEditing">
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
              :disabled="isEditing"
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
              :disabled="isEditing"
            />
          </div>
        </div>

        <section class="form-section">
          <h3 class="section-title">🧍 Estado y Observaciones</h3>
          <div class="form-grid">
            <div class="form-group">
              <label for="pacEstadogeneral">Estado General:</label>
              <select id="pacEstadogeneral" v-model="form.pacEstadogeneral" required :disabled="isEditing">
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
                :disabled="isEditing"
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
          {{ isSubmitting ? 'Guardando Ficha...' : (isEditing ? 'Actualizar Ficha General' : 'Guardar Ficha General') }}
        </button>
      </div>
      <p v-if="submitMessage" :class="['submit-info', submitStatus]">
        {{ submitMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import SearchBar from '@/components/SearchBar.vue'

const router = useRouter()
const route = useRoute()

const idPersonaSeleccionada = ref(localStorage.getItem('idpersona'))

const form = reactive({
  idFicha: '',
  idpersona: null,
  pacFechaprimercontacto: '',
  pacEstadogeneral: '',
  pacObservaciones: '',
  dgNombreencuestador: '',
  dgPasAcostado: null,
  dgPadAcostado: null,
  dgPasSentado: null,
  dgPadSentado: null,
  dgDiagnosticoha: '',
  dgPulsopormin: null,
  dgDiagnosticopulso: '',
  dgFrecrespiratoria: null,
  dgDiagnosticofr: '',
  dgSaturacion: null,
  dgDiagnosticosaturacion: '',
  dgTemperatura: null,
  dgDiagnosticotemperatura: '',
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
const currentDate = ref('')

const isEditing = ref(false)
const fichaId = ref(null)
const cedulaId = ref(null)
const iddatosgenerales = ref(null)
const isLoadingData = ref(false)

const fetchDataForEditing = async (id, cedula) => {
  isLoadingData.value = true
  submitMessage.value = ''
  try {
    const [fichaMedicaRes, datosGeneralesRes] = await Promise.all([
      axios.get(`${import.meta.env.VITE_URL_BACKEND}/api/pacientes/ficha/cedula/${cedula}`),
      axios.get(`${import.meta.env.VITE_URL_BACKEND}/api/datos-generales/${id}`)
    ]);

    const fichaMedica = fichaMedicaRes.data[0];
    const datosGenerales = datosGeneralesRes.data;

    // Set the reactive variables for a complete update
    form.idFicha = fichaMedica.idFicha;
    form.pacFechaprimercontacto = fichaMedica.PAC_FECHAPRIMERCONTACTO.split('T')[0];
    form.pacEstadogeneral = fichaMedica.PAC_ESTADOGENERAL;
    form.pacObservaciones = fichaMedica.PAC_OBSERVACIONES;

    // Populate form with datos generales from the ID-based API
    form.dgNombreencuestador = datosGenerales.dgNombreencuestador;
    form.dgPasAcostado = parseFloat(datosGenerales.dgPasAcostado);
    form.dgPadAcostado = parseFloat(datosGenerales.dgPadAcostado);
    form.dgPasSentado = parseFloat(datosGenerales.dgPasSentado);
    form.dgPadSentado = parseFloat(datosGenerales.dgPadSentado);
    form.dgDiagnosticoha = datosGenerales.dgDiagnosticoha;
    form.dgPulsopormin = datosGenerales.dgPulsopormin;
    form.dgDiagnosticopulso = datosGenerales.dgDiagnosticopulso;
    form.dgFrecrespiratoria = datosGenerales.dgFrecrespiratoria;
    form.dgDiagnosticofr = datosGenerales.dgDiagnosticofr;
    form.dgSaturacion = datosGenerales.dgSaturacion;
    form.dgDiagnosticosaturacion = datosGenerales.dgDiagnosticosaturacion;
    form.dgTemperatura = parseFloat(datosGenerales.dgTemperatura);
    form.dgDiagnosticotemperatura = datosGenerales.dgDiagnosticotemperatura;
    form.dgFirmaconcentimiento = !!datosGenerales.dgFirmaconcentimiento;
    form.dgFirmamedicina = !!datosGenerales.dgFirmamedicina;
    form.dgFirmaenfermeria = !!datosGenerales.dgFirmaenfermeria;
    form.dgFirmanutricion = !!datosGenerales.dgFirmanutricion;
    form.dgFirmafisioterapia = !!datosGenerales.dgFirmafisioterapia;

    // Set the cedula for the handleSubmit function
    cedulaId.value = cedula;
    iddatosgenerales.value = id;

    submitMessage.value = 'Ficha completa cargada exitosamente para su edición.';
    submitStatus.value = 'success';
  } catch (error) {
    console.error('Error al cargar la ficha:', error);
    submitMessage.value = 'Error al cargar la ficha. Verifique los datos o la conexión.';
    submitStatus.value = 'error';
  } finally {
    isLoadingData.value = false;
  }
};

const handleSearch = async (busqueda) => {
  if (isEditing.value) return;

  localStorage.removeItem('idpersona');
  idPersonaSeleccionada.value = null;

  busquedaRealizada.value = false;
  resultadosBusqueda.value = [];
  if (!busqueda) {
    submitMessage.value = 'Por favor, ingrese un valor para buscar.';
    submitStatus.value = 'error';
    return;
  }
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_URL_BACKEND}/api/personas/cedula/${busqueda}`,
    );
    if (Array.isArray(res.data) && res.data.length > 0) {
      resultadosBusqueda.value = res.data;
    } else if (res.data && res.data.idpersona) {
      resultadosBusqueda.value = [res.data];
    }
    busquedaRealizada.value = true;
  } catch (error) {
    resultadosBusqueda.value = [];
    busquedaRealizada.value = true;
    submitMessage.value =
      'No se encontraron resultados para la búsqueda o hubo un error en la conexión.';
    submitStatus.value = 'error';
    console.error('Error en la búsqueda:', error);
  }
};

const seleccionarPersona = (persona) => {
  form.pCedula = persona.perCedula;
  form.idpersona = persona.idpersona;
  localStorage.setItem('idpersona', persona.idpersona);
  localStorage.setItem('last_cedula', persona.perCedula);
  idPersonaSeleccionada.value = persona.idpersona;
  submitMessage.value = `Paciente ${persona.perPrimernombre} ${persona.perPrimerapellido} seleccionado.`;
  submitStatus.value = 'success';
};

const validateForm = () => {
  submitMessage.value = '';
  submitStatus.value = '';
  if (
    !form.idFicha ||
    !form.pacFechaprimercontacto ||
    !form.idpersona ||
    !form.pacEstadogeneral ||
    !form.dgNombreencuestador ||
    form.dgPasAcostado === null ||
    form.dgPadAcostado === null ||
    form.dgPasSentado === null ||
    form.dgPadSentado === null ||
    !form.dgDiagnosticoha ||
    form.dgPulsopormin === null ||
    !form.dgDiagnosticopulso ||
    form.dgFrecrespiratoria === null ||
    !form.dgDiagnosticofr ||
    form.dgSaturacion === null ||
    !form.dgDiagnosticosaturacion ||
    form.dgTemperatura === null ||
    !form.dgDiagnosticotemperatura
  ) {
    submitMessage.value = 'Por favor, complete todos los campos obligatorios.';
    submitStatus.value = 'error';
    return false;
  }
  const errors = [];
  if (!/^FCH\d{2,}$/.test(form.idFicha)) {
    errors.push('El campo "Ficha N°" debe tener el formato FCHXX (ej. FCH01).');
  }
  const today = new Date(currentDate.value);
  const contactDate = new Date(form.pacFechaprimercontacto);
  if (contactDate > today) {
    errors.push('La "Fecha de Contacto" no puede ser una fecha futura.');
  }
  if (!/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/.test(form.dgNombreencuestador.trim())) {
    errors.push('El "Nombre del Encuestador" solo puede contener letras y espacios.');
  }
  if (form.dgPasAcostado < 70 || form.dgPasAcostado > 200)
    errors.push('PAS Acostado fuera de rango (70-200).');
  if (form.dgPadAcostado < 40 || form.dgPadAcostado > 120)
    errors.push('PAD Acostado fuera de rango (40-120).');
  if (form.dgPasSentado < 70 || form.dgPasSentado > 200)
    errors.push('PAS Sentado fuera de rango (70-200).');
  if (form.dgPadSentado < 40 || form.dgPadSentado > 120)
    errors.push('PAD Sentado fuera de rango (40-120).');
  if (form.dgPulsopormin < 40 || form.dgPulsopormin > 180)
    errors.push('Pulso por Minuto fuera de rango (40-180).');
  if (form.dgFrecrespiratoria < 10 || form.dgFrecrespiratoria > 30)
    errors.push('Frecuencia Respiratoria fuera de rango (10-30).');
  if (form.dgSaturacion < 85 || form.dgSaturacion > 100)
    errors.push('Saturación fuera de rango (85-100%).');
  if (form.dgTemperatura < 34.0 || form.dgTemperatura > 42.0)
    errors.push('Temperatura fuera de rango (34.0-42.0°C).');
  if (errors.length > 0) {
    submitMessage.value = 'Errores de validación:<br>' + errors.join('<br>');
    submitStatus.value = 'error';
    return false;
  }
  return true;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  isSubmitting.value = true;

  if (!cedulaId.value && !form.idpersona) {
    submitMessage.value = 'Debe seleccionar un paciente antes de guardar la ficha.';
    submitStatus.value = 'error';
    isSubmitting.value = false;
    return;
  }

  if (isEditing.value) {
    const updatePayload = {
      dgNombreencuestador: form.dgNombreencuestador,
      dgPasAcostado: form.dgPasAcostado.toFixed(2),
      dgPadAcostado: form.dgPadAcostado.toFixed(2),
      dgPasSentado: form.dgPasSentado.toFixed(2),
      dgPadSentado: form.dgPadSentado.toFixed(2),
      dgDiagnosticoha: form.dgDiagnosticoha,
      dgPulsopormin: form.dgPulsopormin,
      dgDiagnosticopulso: form.dgDiagnosticopulso,
      dgFrecrespiratoria: form.dgFrecrespiratoria,
      dgDiagnosticofr: form.dgDiagnosticofr,
      dgSaturacion: form.dgSaturacion,
      dgDiagnosticosaturacion: form.dgDiagnosticosaturacion,
      dgTemperatura: form.dgTemperatura.toFixed(1),
      dgDiagnosticotemperatura: form.dgDiagnosticotemperatura,
      dgFirmaconcentimiento: form.dgFirmaconcentimiento,
      dgFirmamedicina: form.dgFirmamedicina,
      dgFirmaenfermeria: form.dgFirmaenfermeria,
      dgFirmanutricion: form.dgFirmanutricion,
      dgFirmafisioterapia: form.dgFirmafisioterapia,
    };
    try {
      await axios.put(`${import.meta.env.VITE_URL_BACKEND}/api/datos-generales/${iddatosgenerales.value}`, updatePayload);
      submitMessage.value = 'Ficha general actualizada exitosamente.';
      submitStatus.value = 'success';
    } catch (error) {
      console.error('Error actualizando ficha:', error);
      submitMessage.value = 'Error al actualizar la ficha. Verifica los datos o intenta nuevamente.';
      submitStatus.value = 'error';
    }
  } else {
    const createPayload = {
      idFicha: form.idFicha,
      dgNombreencuestador: form.dgNombreencuestador,
      dgPasAcostado: form.dgPasAcostado,
      dgPadAcostado: form.dgPadAcostado,
      dgPasSentado: form.dgPasSentado,
      dgPadSentado: form.dgPadSentado,
      dgDiagnosticoha: form.dgDiagnosticoha,
      dgPulsopormin: form.dgPulsopormin,
      dgDiagnosticopulso: form.dgDiagnosticopulso,
      dgFrecrespiratoria: form.dgFrecrespiratoria,
      dgDiagnosticofr: form.dgDiagnosticofr,
      dgSaturacion: form.dgSaturacion,
      dgDiagnosticosaturacion: form.dgDiagnosticosaturacion,
      dgTemperatura: form.dgTemperatura,
      dgDiagnosticotemperatura: form.dgDiagnosticotemperatura,
      dgFirmaconcentimiento: form.dgFirmaconcentimiento,
      dgFirmamedicina: form.dgFirmamedicina,
      dgFirmaenfermeria: form.dgFirmaenfermeria,
      dgFirmanutricion: form.dgFirmanutricion,
      dgFirmafisioterapia: form.dgFirmafisioterapia,
    };
    try {
      await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/datos-generales`, createPayload);
      submitMessage.value = 'Ficha general guardada exitosamente.';
      submitStatus.value = 'success';
    } catch (error) {
      console.error('Error guardando ficha:', error);
      submitMessage.value = 'Error al guardar la ficha. Verifica los datos o intenta nuevamente.';
      submitStatus.value = 'error';
    }
  }

  isSubmitting.value = false;
};

onMounted(() => {
  currentDate.value = new Date().toISOString().split('T')[0];

  const idFromUrl = route.params.id;
  const cedulaFromStorage = localStorage.getItem('last_cedula');
  const idPersonaFromStorage = localStorage.getItem('idpersona');

  if (idFromUrl && cedulaFromStorage) {
    isEditing.value = true;
    form.idpersona = idPersonaFromStorage;
    fetchDataForEditing(idFromUrl, cedulaFromStorage);
  } else {
    isEditing.value = false;
    if (idPersonaFromStorage) {
      idPersonaSeleccionada.value = idPersonaFromStorage;
      submitMessage.value = 'Paciente seleccionado. Por favor, complete la ficha.';
      submitStatus.value = 'info';
    } else {
      submitMessage.value = 'Por favor, busca y selecciona un paciente para crear una nueva ficha.';
      submitStatus.value = 'info';
    }
  }
});
</script>

<style scoped>
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
  max-width: 1200px;
  font-family: 'Montserrat', sans-serif;
}

.ficha-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  gap: 20px;
  flex-wrap: wrap;
}

.puce-logo {
  height: 80px;
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
  color: #a0a0a0;
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
  flex-wrap: wrap;
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

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  color: var(--color-primary-dark);
  font-size: 1.2rem;
  font-weight: 600;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--color-primary);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 1250px) {
  .ficha-card {
    max-width: 980px;
    padding: 35px 40px;
  }
  .form-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

@media (max-width: 980px) {
  .ficha-card {
    max-width: 760px;
    padding: 30px 30px;
  }
  .form-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
}

@media (max-width: 600px) {
  .ficha-card {
    padding: 20px 15px;
    max-width: 100%;
    box-shadow: none;
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
    grid-template-columns: 1fr;
  }
  .submit-button {
    font-size: 1rem;
    padding: 12px 20px;
  }
  .submit-info {
    font-size: 0.9rem;
    padding: 10px;
  }
}

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
