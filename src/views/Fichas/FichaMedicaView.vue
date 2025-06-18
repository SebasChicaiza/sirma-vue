<template>
  <div class="ficha-container">
    <div class="ficha-card">
      <div class="ficha-header">
        <img src="@/assets/images/puce-logo.png" alt="Logo PUCE" class="puce-logo" />
        <div class="header-text">
          <p class="university-name">PONTIFICIA UNIVERSIDAD CATÓLICA DEL ECUADOR</p>
          <p class="faculty-name">FICHA MÉDICA DEL PACIENTE</p>
        </div>
      </div>

      <h2 class="form-title">FICHA MÉDICA DEL PACIENTE</h2>

      <div class="form-metadata">
        <div class="form-group inline-group">
          <label for="fechaContacto">Fecha de Contacto:</label>
          <input id="fechaContacto" v-model="form.fechaContacto" type="date" class="small-input" />
        </div>
        <div class="form-group inline-group">
          <label for="nombreEvaluador">Evaluador:</label>
          <input
            id="nombreEvaluador"
            v-model.trim="form.nombreEvaluador"
            type="text"
            placeholder="Ej. Juan Pérez"
            class="small-input"
          />
        </div>
      </div>

      <section class="form-section">
        <h3 class="section-title">🧍 Datos Generales</h3>
        <div class="form-grid">
          <div class="form-group">
            <label for="comunidad">Comunidad:</label>
            <input
              id="comunidad"
              v-model.trim="form.comunidad"
              type="text"
              placeholder="Ej. Chugchilán"
            />
          </div>
          <div class="form-group">
            <label for="zona">Zona:</label>
            <input id="zona" v-model.trim="form.zona" type="text" placeholder="Rural / Urbana" />
          </div>
          <div class="form-group">
            <label for="nombres">Nombres:</label>
            <input id="nombres" v-model.trim="form.nombres" type="text" placeholder="Juan Carlos" />
          </div>
          <div class="form-group">
            <label for="apellidos">Apellidos:</label>
            <input
              id="apellidos"
              v-model.trim="form.apellidos"
              type="text"
              placeholder="Pérez Torres"
            />
          </div>
          <div class="form-group">
            <label for="cedula">Cédula:</label>
            <input
              id="cedula"
              v-model.trim="form.cedula"
              type="text"
              inputmode="numeric"
              maxlength="10"
              placeholder="Ej: 17XXXXXXX"
            />
          </div>
          <div class="form-group">
            <label for="fechaNacimiento">Fecha de Nacimiento:</label>
            <input id="fechaNacimiento" v-model="form.fechaNacimiento" type="date" />
          </div>
          <div class="form-group">
            <label for="edad">Edad:</label>
            <input
              id="edad"
              v-model.number="form.edad"
              type="number"
              min="0"
              placeholder="Ej: 65"
            />
          </div>
          <div class="form-group">
            <label for="sexo">Sexo:</label>
            <select id="sexo" v-model="form.sexo">
              <option disabled value="">Seleccionar</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">📋 Estado General y Revisión Actual de Sistemas</h3>
        <div class="form-group full-width">
          <label for="estadoGeneral">Estado General:</label>
          <input
            id="estadoGeneral"
            v-model.trim="form.estadoGeneral"
            type="text"
            placeholder="Ej. Bueno, Regular, etc."
          />
        </div>

        <div class="form-group full-width">
          <label class="section-subtitle">Alertas (selección múltiple):</label>
          <div class="checkbox-group">
            <label><input type="checkbox" value="Visual" v-model="form.alertas" /> Visual</label>
            <label
              ><input type="checkbox" value="Auditiva" v-model="form.alertas" /> Auditiva</label
            >
            <label><input type="checkbox" value="Caídas" v-model="form.alertas" /> Caídas</label>
            <label
              ><input type="checkbox" value="Cognitiva" v-model="form.alertas" /> Cognitiva</label
            >
          </div>
        </div>

        <div class="form-group full-width">
          <label class="section-subtitle">Revisión de sistemas:</label>
          <div class="checkbox-group">
            <label
              ><input type="checkbox" value="Respiratorio" v-model="form.revisionSistemas" />
              Respiratorio</label
            >
            <label
              ><input type="checkbox" value="Cardiovascular" v-model="form.revisionSistemas" />
              Cardiovascular</label
            >
            <label
              ><input type="checkbox" value="Genitourinario" v-model="form.revisionSistemas" />
              Genitourinario</label
            >
            <label
              ><input type="checkbox" value="Digestivo" v-model="form.revisionSistemas" />
              Digestivo</label
            >
            <label
              ><input type="checkbox" value="Neurológico" v-model="form.revisionSistemas" />
              Neurológico</label
            >
            <label
              ><input type="checkbox" value="Músculo-esquelético" v-model="form.revisionSistemas" />
              Músculo-esquelético</label
            >
          </div>
        </div>

        <div class="form-group full-width">
          <label for="sintomasActuales">Síntomas Actuales:</label>
          <textarea
            id="sintomasActuales"
            v-model.trim="form.sintomasActuales"
            rows="3"
            placeholder="Escribe los síntomas relevantes aquí..."
          ></textarea>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">📚 Antecedentes y Hábitos</h3>
        <div class="form-group full-width">
          <label for="antecedentesPersonales">Antecedentes Personales:</label>
          <textarea
            id="antecedentesPersonales"
            v-model.trim="form.antecedentesPersonales"
            rows="2"
            placeholder="Historial médico, quirúrgico, alérgico, etc."
          ></textarea>
        </div>
        <div class="form-group full-width">
          <label for="habitos">Hábitos Nocivos:</label>
          <textarea
            id="habitos"
            v-model.trim="form.habitos"
            rows="2"
            placeholder="Consumo de tabaco, alcohol, drogas, etc."
          ></textarea>
        </div>
        <div class="form-group full-width">
          <label for="farmaco">Antecedentes Farmacológicos:</label>
          <textarea
            id="farmaco"
            v-model.trim="form.farmaco"
            rows="2"
            placeholder="Medicamentos actuales, alergias a fármacos."
          ></textarea>
        </div>
        <div class="form-group full-width">
          <label for="patologicos">Antecedentes Patológicos:</label>
          <textarea
            id="patologicos"
            v-model.trim="form.patologicos"
            rows="2"
            placeholder="Enfermedades crónicas, infecciones previas."
          ></textarea>
        </div>
        <div class="form-group full-width">
          <label for="ginecoObstetricos">Antecedentes Gineco-Obstétricos (si aplica):</label>
          <textarea
            id="ginecoObstetricos"
            v-model.trim="form.ginecoObstetricos"
            rows="2"
            placeholder="Menarquia, ciclos menstruales, gestas, partos, cesáreas, abortos, FUM, etc."
          ></textarea>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">👪 Antecedentes Familiares y Sociales</h3>
        <div class="form-group full-width">
          <label for="antecedentesFamiliares">Descripción de Antecedentes Familiares:</label>
          <textarea
            id="antecedentesFamiliares"
            v-model.trim="form.antecedentesFamiliares"
            rows="3"
            placeholder="Ej. Diabetes, hipertensión, cáncer en familiares cercanos, condiciones sociales."
          ></textarea>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">🧍‍♂️ Examen Físico</h3>
        <div class="form-group full-width">
          <label class="section-subtitle">Regiones Evaluadas:</label>
          <div class="checkbox-group form-grid">
            <label
              ><input type="checkbox" value="Cabeza" v-model="form.examenFisico" /> Cabeza</label
            >
            <label
              ><input type="checkbox" value="Cuello" v-model="form.examenFisico" /> Cuello</label
            >
            <label><input type="checkbox" value="Tórax" v-model="form.examenFisico" /> Tórax</label>
            <label
              ><input type="checkbox" value="Abdomen" v-model="form.examenFisico" /> Abdomen</label
            >
            <label
              ><input type="checkbox" value="Extremidades" v-model="form.examenFisico" />
              Extremidades</label
            >
            <label
              ><input type="checkbox" value="Columna" v-model="form.examenFisico" /> Columna</label
            >
          </div>
        </div>
        <div class="form-group full-width">
          <label for="examenDescripcion">Descripción del Examen Físico:</label>
          <textarea
            id="examenDescripcion"
            v-model.trim="form.examenDescripcion"
            rows="4"
            placeholder="Detalle hallazgos relevantes por sistemas/regiones."
          ></textarea>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">🔍 Diagnóstico</h3>
        <div class="form-group full-width">
          <label for="diagnosticosMedicos">Diagnósticos Médicos (CIE-10 si aplica):</label>
          <textarea
            id="diagnosticosMedicos"
            v-model.trim="form.diagnosticosMedicos"
            rows="2"
            placeholder="Listar diagnósticos médicos con su código si es posible."
          ></textarea>
        </div>
        <div class="form-group full-width">
          <label class="section-subtitle">Diagnósticos de Enfermería (NANDA si aplica):</label>
          <div class="form-grid">
            <div
              class="form-group"
              v-for="(item, index) in form.diagnosticosEnfermeria"
              :key="index"
            >
              <label :for="`diagnosticoEnfermeria-${index}`">Diagnóstico {{ index + 1 }}:</label>
              <input
                :id="`diagnosticoEnfermeria-${index}`"
                v-model.trim="form.diagnosticosEnfermeria[index]"
                type="text"
                :placeholder="`Diagnóstico de Enfermería #${index + 1}`"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">📌 Plan de Manejo Integral</h3>
        <div class="form-group full-width">
          <label for="planManejo">Descripción del Plan de Manejo:</label>
          <textarea
            id="planManejo"
            v-model.trim="form.planManejo"
            rows="4"
            placeholder="Describe el plan de seguimiento, medicación, intervenciones de enfermería, educación al paciente, etc."
          ></textarea>
        </div>
      </section>

      <button type="submit" class="submit-button" :disabled="isSubmitting" @click="handleSubmit">
        {{ isSubmitting ? 'Guardando Ficha...' : 'Guardar Ficha Médica' }}
      </button>

      <p v-if="submitMessage" :class="['submit-info', submitStatus]">
        {{ submitMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  fechaContacto: '',
  comunidad: '',
  zona: '',
  nombreEvaluador: '',
  nombres: '',
  apellidos: '',
  cedula: '',
  fechaNacimiento: '',
  edad: '',
  sexo: '',
  estadoGeneral: '',
  alertas: [], // Array para checkboxes
  revisionSistemas: [], // Array para checkboxes
  sintomasActuales: '',
  antecedentesPersonales: '',
  habitos: '',
  farmaco: '',
  patologicos: '',
  ginecoObstetricos: '',
  antecedentesFamiliares: '',
  examenFisico: [], // Array para checkboxes
  examenDescripcion: '',
  diagnosticosMedicos: '', // Cambiado a string para un solo textarea
  diagnosticosEnfermeria: ['', '', '', '', ''], // Array de strings para múltiples inputs
  planManejo: '',
})

// Simulación de envío
const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref('') // 'success' o 'error'

const handleSubmit = async () => {
  submitMessage.value = ''
  submitStatus.value = ''
  isSubmitting.value = true

  // Aquí puedes añadir validaciones adicionales si es necesario antes de enviar
  // Por ejemplo, verificar que los campos requeridos estén llenos.

  try {
    // Simular una llamada a API
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Espera 2 segundos

    console.log('Datos de la Ficha Médica del Paciente:', JSON.parse(JSON.stringify(form)))

    submitMessage.value = 'Ficha médica del paciente guardada exitosamente.'
    submitStatus.value = 'success'
    // Opcional: limpiar el formulario después de un envío exitoso
    // Object.keys(form).forEach(key => {
    //   if (Array.isArray(form[key])) {
    //     form[key] = []; // Limpiar arrays
    //   } else if (typeof form[key] === 'boolean') {
    //     form[key] = false; // Limpiar booleanos
    //   } else if (typeof form[key] === 'string' || typeof form[key] === 'number') {
    //     form[key] = ''; // Limpiar strings y números
    //   }
    // });
    // form.diagnosticosEnfermeria = ['', '', '', '', '']; // Específico para este array
  } catch (error) {
    submitMessage.value = 'Error al guardar la ficha. Inténtalo de nuevo.'
    submitStatus.value = 'error'
    console.error('Error guardando ficha médica del paciente:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/*
  Las variables CSS (ej. --color-primary-dark) DEBEN ser definidas globalmente
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
  justify-content: center;
  margin-bottom: 30px;
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
  margin-bottom: 0;
}

.inline-group .small-input {
  width: auto;
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

.section-subtitle {
  font-size: 1rem;
  color: var(--color-text-primary);
  margin-top: 15px;
  margin-bottom: 10px;
  font-weight: 600;
  display: block; /* Para que ocupe su propia línea */
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

/* Checkbox group */
.checkbox-group {
  display: flex;
  flex-wrap: wrap; /* Permite que los elementos se envuelvan */
  gap: 15px; /* Espacio entre checkboxes */
  padding-top: 5px;
  margin-bottom: 15px; /* Espacio después del grupo */
}

.checkbox-group label {
  display: flex;
  align-items: center;
  margin-bottom: 0;
  cursor: pointer;
  font-weight: 500;
  color: var(--color-text-primary);
  flex: 0 0 auto; /* Asegura que no crezcan ni se encojan demasiado */
}

.checkbox-group input[type='checkbox'] {
  margin-right: 8px;
  accent-color: var(--color-accent-green);
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.form-group.full-width {
  grid-column: 1 / -1; /* Ocupa todo el ancho de la cuadrícula padre */
  margin-bottom: 20px; /* Espacio entre textareas grandes */
}
/* Para que los inputs dentro de un form-grid se expandan correctamente */
.form-group.full-width .form-grid {
  grid-template-columns: repeat(
    auto-fit,
    minmax(250px, 1fr)
  ); /* Ejemplo: 2 columnas mínimas para inputs de diagnóstico */
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

  .form-grid {
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
    flex-direction: column; /* Apilar checkboxes en móvil */
    align-items: flex-start;
  }
  .checkbox-group.form-grid {
    /* Ajustar si un checkbox-group está dentro de un form-grid */
    grid-template-columns: 1fr;
    gap: 10px;
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
