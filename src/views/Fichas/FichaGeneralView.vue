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

      <div class="form-metadata">
        <div class="form-group inline-group">
          <label for="numeroFicha">Ficha N°:</label>
          <input
            id="numeroFicha"
            v-model.trim="form.numeroFicha"
            type="text"
            placeholder="0001"
            class="small-input"
          />
        </div>
        <div class="form-group inline-group">
          <label for="fechaContacto">Fecha de Contacto:</label>
          <input id="fechaContacto" v-model="form.fechaContacto" type="date" class="small-input" />
        </div>
      </div>

      <section class="form-section">
        <h3 class="section-title">🧍 Datos del Paciente</h3>
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
          <div class="form-group">
            <label for="estadoCivil">Estado Civil:</label>
            <input
              id="estadoCivil"
              v-model.trim="form.estadoCivil"
              type="text"
              placeholder="Ej: Casado/a"
            />
          </div>
          <div class="form-group">
            <label for="ocupacion">Ocupación:</label>
            <input
              id="ocupacion"
              v-model.trim="form.ocupacion"
              type="text"
              placeholder="Ej: Ama de casa"
            />
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono:</label>
            <input
              id="telefono"
              v-model.trim="form.telefono"
              type="tel"
              placeholder="Ej: 09XXXXXXXX"
            />
          </div>
          <div class="form-group">
            <label for="instruccion">Instrucción:</label>
            <input
              id="instruccion"
              v-model.trim="form.instruccion"
              type="text"
              placeholder="Ej: Primaria completa"
            />
          </div>
          <div class="form-group">
            <label for="responsable">Responsable/Contacto de Emergencia:</label>
            <input
              id="responsable"
              v-model.trim="form.responsable"
              type="text"
              placeholder="Nombre del responsable"
            />
          </div>
          <div class="form-group checkbox-group">
            <label>
              <input type="checkbox" v-model="form.dependiente" />
              Dependiente
            </label>
            <label>
              <input type="checkbox" v-model="form.fragil" />
              Frágil
            </label>
          </div>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">🩺 Signos Vitales</h3>
        <div class="form-grid">
          <div class="form-group">
            <label for="presionArterial">Presión Arterial:</label>
            <input
              id="presionArterial"
              v-model.trim="form.presionArterial"
              type="text"
              placeholder="Ej. 120/80 mmHg"
            />
          </div>
          <div class="form-group">
            <label for="frecuenciaCardiaca">Frecuencia Cardiaca:</label>
            <input
              id="frecuenciaCardiaca"
              v-model.trim="form.frecuenciaCardiaca"
              type="text"
              placeholder="Ej. 72 lpm"
            />
          </div>
          <div class="form-group">
            <label for="frecuenciaRespiratoria">Frecuencia Respiratoria:</label>
            <input
              id="frecuenciaRespiratoria"
              v-model.trim="form.frecuenciaRespiratoria"
              type="text"
              placeholder="Ej. 18 rpm"
            />
          </div>
          <div class="form-group">
            <label for="temperatura">Temperatura:</label>
            <input
              id="temperatura"
              v-model.trim="form.temperatura"
              type="text"
              placeholder="Ej. 36.5°C"
            />
          </div>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">📝 Consentimiento Informado</h3>
        <div class="form-group full-width">
          <label for="consentimiento">Texto del Consentimiento:</label>
          <textarea
            id="consentimiento"
            v-model.trim="form.consentimiento"
            rows="5"
            placeholder="Escriba aquí el consentimiento informado completo, o haga referencia al documento adjunto..."
          ></textarea>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label for="lugarFecha">Lugar y Fecha:</label>
            <input
              id="lugarFecha"
              v-model.trim="form.lugarFecha"
              type="text"
              placeholder="Ej: Quito, 17/06/2025"
            />
          </div>
          <div class="form-group">
            <label for="firmaParticipante">Firma del Participante:</label>
            <input
              id="firmaParticipante"
              v-model.trim="form.firmaParticipante"
              type="text"
              placeholder="Nombre y apellido del participante"
            />
          </div>
          <div class="form-group">
            <label for="firmaInvestigador">Firma del Investigador:</label>
            <input
              id="firmaInvestigador"
              v-model.trim="form.firmaInvestigador"
              type="text"
              placeholder="Nombre y apellido del investigador"
            />
          </div>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">📋 Registro de Atención</h3>
        <div class="stamp-grid">
          <div class="stamp-box">
            <strong>MEDICINA</strong>
            <div class="sello">[Sello]</div>
          </div>
          <div class="stamp-box">
            <strong>ENFERMERÍA</strong>
            <div class="sello">[Sello]</div>
          </div>
          <div class="stamp-box">
            <strong>NUTRICIÓN</strong>
            <div class="sello">[Sello]</div>
          </div>
          <div class="stamp-box">
            <strong>FISIOTERAPIA</strong>
            <div class="sello">[Sello]</div>
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

const form = reactive({
  numeroFicha: '',
  fechaContacto: '',
  comunidad: '',
  zona: '',
  nombres: '',
  apellidos: '',
  cedula: '',
  fechaNacimiento: '',
  edad: '',
  sexo: '',
  estadoCivil: '',
  ocupacion: '',
  telefono: '',
  instruccion: '',
  responsable: '',
  dependiente: false,
  fragil: false,
  presionArterial: '',
  frecuenciaCardiaca: '',
  frecuenciaRespiratoria: '',
  temperatura: '',
  consentimiento: '',
  lugarFecha: '',
  firmaParticipante: '',
  firmaInvestigador: '',
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref('') // 'success' o 'error'

const handleSubmit = async () => {
  submitMessage.value = ''
  submitStatus.value = ''
  isSubmitting.value = true

  // Aquí podrías añadir validación similar a la de los formularios anteriores
  // if (!validateForm()) {
  //   submitMessage.value = 'Por favor, corrige los errores en el formulario.';
  //   submitStatus.value = 'error';
  //   isSubmitting.value = false;
  //   return;
  // }

  try {
    // Simular una llamada a API para guardar la ficha
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log('Datos de la Ficha General:', JSON.parse(JSON.stringify(form)))

    submitMessage.value = 'Ficha general guardada exitosamente.'
    submitStatus.value = 'success'
    // Opcional: resetear el formulario
    // Object.keys(form).forEach(key => {
    //   if (typeof form[key] === 'boolean') {
    //     form[key] = false;
    //   } else {
    //     form[key] = '';
    //   }
    // });
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
