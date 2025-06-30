<template>
  <div class="ficha-container">
    <div class="ficha-card">
      <div class="ficha-header">
        <img src="@/assets/images/puce-logo.png" alt="Logo PUCE" class="puce-logo" />
        <div class="header-text">
          <p class="university-name">PONTIFICIA UNIVERSIDAD CATÓLICA DEL ECUADOR</p>
          <p class="faculty-name">FICHA DE FISIOTERAPIA</p>
        </div>
      </div>

      <h2 class="form-title">FICHA DE FISIOTERAPIA</h2>

      <div class="form-metadata">
        <div class="form-group inline-group">
          <label for="fechaContacto">Fecha de Contacto:</label>
          <input id="fechaContacto" v-model="form.fechaContacto" type="date" class="small-input" />
        </div>
        <div class="form-group inline-group">
          <label for="nombreFisioterapeuta">Fisioterapeuta:</label>
          <input
            id="nombreFisioterapeuta"
            v-model.trim="form.nombreFisioterapeuta"
            type="text"
            placeholder="Ej. Ana García"
            class="small-input"
          />
        </div>
      </div>

      <FichaSelector v-model:idficha="selectedFichaId" />


      <section class="form-section">
        <h3 class="section-title">🤸 Problemas Actuales Fisioterapia (Funcional)</h3>
        <div class="form-group full-width">
          <label for="problemasActuales">Descripción de Problemas:</label>
          <textarea
            id="problemasActuales"
            v-model.trim="form.problemasActuales"
            rows="4"
            placeholder="Ej. Paciente presenta dolor en la columna lumbar a la palpación. No puede hacer movimientos de flexoextensión."
          ></textarea>
        </div>
        <h4 class="section-subtitle">Marcha:</h4>
        <div class="form-grid-2-col">
          <div class="form-group radio-group-horizontal">
            <label><input type="radio" value="Libre" v-model="form.marcha.tipo" /> Libre</label>
            <label
              ><input type="radio" value="Claudicante" v-model="form.marcha.tipo" />
              Claudicante</label
            >
            <label
              ><input type="radio" value="Con Ayudas" v-model="form.marcha.tipo" /> Con
              Ayudas</label
            >
            <label
              ><input type="radio" value="Espastica" v-model="form.marcha.tipo" /> Espástica</label
            >
            <label><input type="radio" value="Ataxica" v-model="form.marcha.tipo" /> Atáxica</label>
          </div>
          <div class="form-group inline-group">
            <label for="marchaValInicial">Val. Inicial:</label>
            <input
              id="marchaValInicial"
              v-model.trim="form.marcha.valInicial"
              type="text"
              placeholder="Puntaje/Observación"
            />
          </div>
        </div>
        <h4 class="section-subtitle">Traslados:</h4>
        <div class="form-grid-2-col">
          <div class="form-group radio-group-horizontal">
            <label
              ><input type="radio" value="Independiente" v-model="form.traslados.tipo" />
              Independiente</label
            >
            <label
              ><input type="radio" value="Silla de Ruedas" v-model="form.traslados.tipo" /> Silla de
              Ruedas</label
            >
            <label
              ><input type="radio" value="Con Ayudas" v-model="form.traslados.tipo" /> Con
              Ayudas</label
            >
            <label
              ><input type="radio" value="Camilla" v-model="form.traslados.tipo" /> Camilla</label
            >
            <label><input type="radio" value="Otro" v-model="form.traslados.tipo" /> Otro</label>
          </div>
          <div class="form-group inline-group">
            <label for="trasladosObservacion">Otros:</label>
            <input
              id="trasladosObservacion"
              v-model.trim="form.traslados.observacion"
              type="text"
              placeholder="Detalle si aplica"
            />
          </div>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">🤕 Evaluación del Dolor</h3>
        <h4 class="section-subtitle">Escala Visual Analógica EVA (Marque una X)</h4>
        <div class="eva-scale">
          <span v-for="n in 10" :key="n" class="eva-number">{{ n }}</span>
          <div class="eva-selector-row">
            <label class="eva-label">No Valorada</label>
            <input type="checkbox" v-model="form.dolor.evaNoValorado" />
            <span class="eva-separator">|</span>
            <span v-for="n in 10" :key="n" class="eva-input-wrapper">
              <input
                type="radio"
                :value="n"
                v-model.number="form.dolor.evaScore"
                :disabled="form.dolor.evaNoValorado"
              />
            </span>
          </div>
          <div class="eva-labels-bottom">
            <span>Sin Dolor</span>
            <span class="pull-right">Peor Dolor Posible</span>
          </div>
        </div>

        <h4 class="section-subtitle mt-4">Wong-Baker FACES® Pain Rating Scale (Marque una X)</h4>
        <div class="wong-baker-scale">
          <div v-for="n in 6" :key="n" class="face-option">
            <img :src="getWongBakerFace(n - 1)" :alt="`Face ${n - 1}`" class="wong-baker-face" />
            <input type="radio" :value="n - 1" v-model.number="form.dolor.wongBakerScore" />
          </div>
        </div>
        <div class="form-group full-width mt-4">
          <label for="dolorZonaEspecifica">Zona Específica del Dolor (Body Chart):</label>
          <textarea
            id="dolorZonaEspecifica"
            v-model.trim="form.dolor.zonaEspecifica"
            rows="3"
            placeholder="Describa la zona o marque en un diagrama de Body Chart si disponible."
          ></textarea>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">💪 Evaluación de la Fuerza (Escala de Daniels)</h3>
        <p class="section-description">La fuerza del paciente está graduada en una escala de 0-5</p>
        <div class="form-table-container">
          <table class="form-table">
            <thead>
              <tr>
                <th>Grado</th>
                <th>Descripción</th>
                <th>IZQ. (Marque X)</th>
                <th>DER. (Marque X)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Grado 5</td>
                <td>Fuerza muscular normal contra resistencia completa</td>
                <td class="checkbox-cell">
                  <input type="radio" value="5" v-model.number="form.fuerza.izq" />
                </td>
                <td class="checkbox-cell">
                  <input type="radio" value="5" v-model.number="form.fuerza.der" />
                </td>
              </tr>
              <tr>
                <td>Grado 4</td>
                <td>
                  Fuerza muscular reducida pero la contracción muscular puede realizar un movimiento
                  articular contra resistencia
                </td>
                <td class="checkbox-cell">
                  <input type="radio" value="4" v-model.number="form.fuerza.izq" />
                </td>
                <td class="checkbox-cell">
                  <input type="radio" value="4" v-model.number="form.fuerza.der" />
                </td>
              </tr>
              <tr>
                <td>Grado 3</td>
                <td>Movimiento articular completo contra la gravedad, sin resistencia</td>
                <td class="checkbox-cell">
                  <input type="radio" value="3" v-model.number="form.fuerza.izq" />
                </td>
                <td class="checkbox-cell">
                  <input type="radio" value="3" v-model.number="form.fuerza.der" />
                </td>
              </tr>
              <tr>
                <td>Grado 2</td>
                <td>Movimiento activo que no puede vencer la fuerza de gravedad</td>
                <td class="checkbox-cell">
                  <input type="radio" value="2" v-model.number="form.fuerza.izq" />
                </td>
                <td class="checkbox-cell">
                  <input type="radio" value="2" v-model.number="form.fuerza.der" />
                </td>
              </tr>
              <tr>
                <td>Grado 1</td>
                <td>Indicios de masa corporal (IMC) o contracción muscular</td>
                <td class="checkbox-cell">
                  <input type="radio" value="1" v-model.number="form.fuerza.izq" />
                </td>
                <td class="checkbox-cell">
                  <input type="radio" value="1" v-model.number="form.fuerza.der" />
                </td>
              </tr>
              <tr>
                <td>Grado 0</td>
                <td>Ausencia de contracción muscular</td>
                <td class="checkbox-cell">
                  <input type="radio" value="0" v-model.number="form.fuerza.izq" />
                </td>
                <td class="checkbox-cell">
                  <input type="radio" value="0" v-model.number="form.fuerza.der" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="form-group full-width">
          <label for="fuerzaObservaciones">Observaciones Fuerza:</label>
          <textarea
            id="fuerzaObservaciones"
            v-model.trim="form.fuerza.observaciones"
            rows="2"
            placeholder="Detalle hallazgos adicionales."
          ></textarea>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">✨ Tono Muscular</h3>
        <div class="form-grid-2-col">
          <div class="form-group">
            <h4 class="section-subtitle">Escala de Ashworth (Marque con una X)</h4>
            <div class="radio-group ashworth-scale">
              <label
                ><input type="radio" value="0" v-model.number="form.tonoMuscular.ashworth" /> 0:
                Tono normal. No incremento del tono muscular.</label
              >
              <label
                ><input type="radio" value="1" v-model.number="form.tonoMuscular.ashworth" /> 1:
                Ligero incremento de tono, detectable al final del recorrido articular.</label
              >
              <label
                ><input type="radio" value="2" v-model.number="form.tonoMuscular.ashworth" /> 2:
                Ligero incremento de tono, detectable en menos de la mitad del recorrido
                articular.</label
              >
              <label
                ><input type="radio" value="3" v-model.number="form.tonoMuscular.ashworth" /> 3:
                Notable aumento del tono, detención en más de la mitad del recorrido.</label
              >
              <label
                ><input type="radio" value="4" v-model.number="form.tonoMuscular.ashworth" /> 4:
                Considerable aumento del tono, la movilización pasiva es difícil.</label
              >
              <label
                ><input type="radio" value="5" v-model.number="form.tonoMuscular.ashworth" /> 5:
                Extremidades rígidas, en flexión o extensión.</label
              >
            </div>
            <div class="form-group mt-3">
              <label for="ashworthObservaciones">Observaciones Ashworth:</label>
              <textarea
                id="ashworthObservaciones"
                v-model.trim="form.tonoMuscular.ashworthObservaciones"
                rows="2"
              ></textarea>
            </div>
          </div>

          <div class="form-group">
            <h4 class="section-subtitle">Escala de Campbell (Marque con una X)</h4>
            <div class="radio-group campbell-scale">
              <label
                ><input type="radio" value="Normal" v-model="form.tonoMuscular.campbell" /> Normal
                (0)</label
              >
              <label
                ><input type="radio" value="Hipotonía leve" v-model="form.tonoMuscular.campbell" />
                Hipotonía leve (1)</label
              >
              <label
                ><input
                  type="radio"
                  value="Hipotonía moderada"
                  v-model="form.tonoMuscular.campbell"
                />
                Hipotonía moderada (2)</label
              >
              <label
                ><input type="radio" value="Hipotonía grave" v-model="form.tonoMuscular.campbell" />
                Hipotonía grave (3)</label
              >
            </div>
          </div>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">🚶 Escala de Tinetti</h3>
        <h4 class="section-subtitle">Equilibrio Estático (Parte 1: Máx. 16 puntos)</h4>
        <div class="tinetti-question-group">
          <label class="tinetti-question-label">Sentado sin apoyos:</label>
          <div class="radio-group horizontal-group">
            <label
              ><input
                type="radio"
                value="1"
                v-model.number="form.tinetti.equilibrioEstatico.sentadoSinApoyos"
              />
              1 punto si es capaz, 0 si no lo es.</label
            >
            <label
              ><input
                type="radio"
                value="0"
                v-model.number="form.tinetti.equilibrioEstatico.sentadoSinApoyos"
              />
              0 si no lo es.</label
            >
          </div>
        </div>
        <div class="tinetti-question-group">
          <label class="tinetti-question-label">Parado sin apoyos:</label>
          <div class="radio-group horizontal-group">
            <label
              ><input
                type="radio"
                value="1"
                v-model.number="form.tinetti.equilibrioEstatico.paradoSinApoyos"
              />
              1 punto si es capaz, 0 si no lo es.</label
            >
            <label
              ><input
                type="radio"
                value="0"
                v-model.number="form.tinetti.equilibrioEstatico.paradoSinApoyos"
              />
              0 si no lo es.</label
            >
          </div>
        </div>
        <div class="form-group inline-group mt-3">
          <label for="totalEquilibrioEstatico">Total Equilibrio Estático:</label>
          <input
            id="totalEquilibrioEstatico"
            v-model.number="totalEquilibrioEstatico"
            type="number"
            disabled
            class="small-input"
          />
        </div>

        <h4 class="section-subtitle mt-4">
          Equilibrio Dinámico (Marcha) (Parte 2: Máx. 12 puntos)
        </h4>
        <div class="tinetti-question-group">
          <label class="tinetti-question-label">Inicio de la marcha:</label>
          <div class="radio-group horizontal-group">
            <label
              ><input
                type="radio"
                value="1"
                v-model.number="form.tinetti.equilibrioDinamico.inicioMarcha"
              />
              1 punto si se levanta sin oscilaciones, 0 si no.</label
            >
            <label
              ><input
                type="radio"
                value="0"
                v-model.number="form.tinetti.equilibrioDinamico.inicioMarcha"
              />
              0 si no.</label
            >
          </div>
        </div>
        <div class="tinetti-question-group">
          <label class="tinetti-question-label">Paso continuo:</label>
          <div class="radio-group horizontal-group">
            <label
              ><input
                type="radio"
                value="1"
                v-model.number="form.tinetti.equilibrioDinamico.pasoContinuo"
              />
              1 punto si el paso es continuo y no detenido, 0 si no.</label
            >
            <label
              ><input
                type="radio"
                value="0"
                v-model.number="form.tinetti.equilibrioDinamico.pasoContinuo"
              />
              0 si no.</label
            >
          </div>
        </div>
        <div class="tinetti-question-group">
          <label class="tinetti-question-label">Longitud del paso:</label>
          <div class="radio-group horizontal-group">
            <label
              ><input
                type="radio"
                value="1"
                v-model.number="form.tinetti.equilibrioDinamico.longitudPaso"
              />
              1 punto si la longitud es adecuada, 0 si no.</label
            >
            <label
              ><input
                type="radio"
                value="0"
                v-model.number="form.tinetti.equilibrioDinamico.longitudPaso"
              />
              0 si no.</label
            >
          </div>
        </div>
        <div class="tinetti-question-group">
          <label class="tinetti-question-label">Paso elevado:</label>
          <div class="radio-group horizontal-group">
            <label
              ><input
                type="radio"
                value="1"
                v-model.number="form.tinetti.equilibrioDinamico.pasoElevado"
              />
              1 punto si el paso es elevado, 0 si no.</label
            >
            <label
              ><input
                type="radio"
                value="0"
                v-model.number="form.tinetti.equilibrioDinamico.pasoElevado"
              />
              0 si no.</label
            >
          </div>
        </div>
        <div class="tinetti-question-group">
          <label class="tinetti-question-label">Rotación del tronco:</label>
          <div class="radio-group horizontal-group">
            <label
              ><input
                type="radio"
                value="1"
                v-model.number="form.tinetti.equilibrioDinamico.rotacionTronco"
              />
              1 punto si no hay rotación, 0 si hay.</label
            >
            <label
              ><input
                type="radio"
                value="0"
                v-model.number="form.tinetti.equilibrioDinamico.rotacionTronco"
              />
              0 si hay.</label
            >
          </div>
        </div>
        <div class="tinetti-question-group">
          <label class="tinetti-question-label">Paso final:</label>
          <div class="radio-group horizontal-group">
            <label
              ><input
                type="radio"
                value="1"
                v-model.number="form.tinetti.equilibrioDinamico.pasoFinal"
              />
              1 punto si es estable, 0 si no.</label
            >
            <label
              ><input
                type="radio"
                value="0"
                v-model.number="form.tinetti.equilibrioDinamico.pasoFinal"
              />
              0 si no.</label
            >
          </div>
        </div>
        <div class="form-group inline-group mt-3">
          <label for="totalEquilibrioDinamico">Total Equilibrio Dinámico:</label>
          <input
            id="totalEquilibrioDinamico"
            v-model.number="totalEquilibrioDinamico"
            type="number"
            disabled
            class="small-input"
          />
        </div>

        <div class="form-group inline-group mt-3">
          <label for="totalTinetti">Total Escala de Tinetti:</label>
          <input
            id="totalTinetti"
            v-model.number="totalTinetti"
            type="number"
            disabled
            class="small-input"
          />
        </div>
        <p class="score-interpretation">
          Interpretación de Tinetti:
          <br />
          ≥24 puntos: Bajo riesgo de caídas <br />
          19-23 puntos: Riesgo moderado de caídas <br />
          &lt;19 puntos: Alto riesgo de caídas
        </p>
      </section>

      <button type="submit" class="submit-button" :disabled="isSubmitting" @click="handleSubmit">
        {{ isSubmitting ? 'Guardando Ficha...' : 'Guardar Ficha de Fisioterapia' }}
      </button>

      <p v-if="submitMessage" :class="['submit-info', submitStatus]">
        {{ submitMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'

import FichaSelector from '@/components/FichaSelector.vue'

const selectedFichaId = ref(null)

const form = reactive({
  fechaContacto: '',
  nombreFisioterapeuta: '',

  problemasActuales: '',
  marcha: {
    tipo: '',
    valInicial: '',
  },
  traslados: {
    tipo: '',
    observacion: '',
  },

  dolor: {
    evaNoValorado: false,
    evaScore: null, // 1-10
    wongBakerScore: null, // 0-5
    zonaEspecifica: '',
  },

  fuerza: {
    izq: null, // Grado 0-5
    der: null, // Grado 0-5
    observaciones: '',
  },

  tonoMuscular: {
    ashworth: null, // Grado 0-5
    ashworthObservaciones: '',
    campbell: '', // 'Normal', 'Hipotonía leve', 'Hipotonía moderada', 'Hipotonía grave'
  },

  tinetti: {
    equilibrioEstatico: {
      sentadoSinApoyos: null,
      paradoSinApoyos: null,
      // ... más campos de equilibrio estático
      // asumiendo los siguientes de la imagen:
      sentadoSilla: null, // Capaz de levantarse de la silla
      equilibrioBipedestacion: null, // Equilibrio en bipedestación
      ligeroEmpujon: null, // Respuesta a empujón ligero
      ojosCerrados: null, // Equilibrio con ojos cerrados
      giro360: null, // Giro 360 grados
      sentarse: null, // Sentarse en la silla
    },
    equilibrioDinamico: {
      inicioMarcha: null,
      pasoContinuo: null,
      longitudPaso: null,
      pasoElevado: null,
      rotacionTronco: null,
      pasoFinal: null,
      // ... más campos de equilibrio dinámico
      // asumiendo los siguientes de la imagen:
      simetriaPaso: null, // Simetría del paso
      continuidadPaso: null, // Continuidad del paso
      trayectoriaPaso: null, // Trayectoria del paso
      troncoMarcha: null, // Tronco en marcha
      balanceoBrazos: null, // Balanceo de los brazos
      distanciaTalones: null, // Distancia entre los talones
    },
  },
})

// COMPUTED PROPERTIES PARA LOS TOTALES DE LAS ESCALAS

const totalEquilibrioEstatico = computed(() => {
  return (
    (form.tinetti.equilibrioEstatico.sentadoSinApoyos || 0) +
    (form.tinetti.equilibrioEstatico.paradoSinApoyos || 0) +
    // ... sumar el resto de propiedades de equilibrio estático aquí
    (form.tinetti.equilibrioEstatico.sentadoSilla || 0) +
    (form.tinetti.equilibrioEstatico.equilibrioBipedestacion || 0) +
    (form.tinetti.equilibrioEstatico.ligeroEmpujon || 0) +
    (form.tinetti.equilibrioEstatico.ojosCerrados || 0) +
    (form.tinetti.equilibrioEstatico.giro360 || 0) +
    (form.tinetti.equilibrioEstatico.sentarse || 0)
    // Asegúrate de que todos los campos del objeto form.tinetti.equilibrioEstatico sean sumados
  )
})

const totalEquilibrioDinamico = computed(() => {
  return (
    (form.tinetti.equilibrioDinamico.inicioMarcha || 0) +
    (form.tinetti.equilibrioDinamico.pasoContinuo || 0) +
    (form.tinetti.equilibrioDinamico.longitudPaso || 0) +
    (form.tinetti.equilibrioDinamico.pasoElevado || 0) +
    (form.tinetti.equilibrioDinamico.rotacionTronco || 0) +
    (form.tinetti.equilibrioDinamico.pasoFinal || 0) +
    // ... sumar el resto de propiedades de equilibrio dinámico aquí
    (form.tinetti.equilibrioDinamico.simetriaPaso || 0) +
    (form.tinetti.equilibrioDinamico.continuidadPaso || 0) +
    (form.tinetti.equilibrioDinamico.trayectoriaPaso || 0) +
    (form.tinetti.equilibrioDinamico.troncoMarcha || 0) +
    (form.tinetti.equilibrioDinamico.balanceoBrazos || 0) +
    (form.tinetti.equilibrioDinamico.distanciaTalones || 0)
    // Asegúrate de que todos los campos del objeto form.tinetti.equilibrioDinamico sean sumados
  )
})

const totalTinetti = computed(() => {
  return totalEquilibrioEstatico.value + totalEquilibrioDinamico.value
})

// Lógica de envío del formulario
const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref('') // 'success' o 'error'

const handleSubmit = async () => {
  submitMessage.value = ''
  submitStatus.value = ''
  isSubmitting.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log('Datos de la Ficha de Fisioterapia:', JSON.parse(JSON.stringify(form)))

    submitMessage.value = 'Ficha de fisioterapia guardada exitosamente.'
    submitStatus.value = 'success'
  } catch (error) {
    submitMessage.value = 'Error al guardar la ficha. Inténtalo de nuevo.'
    submitStatus.value = 'error'
    console.error('Error guardando ficha de fisioterapia:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Función para obtener las caras de Wong-Baker (deberías tener estas imágenes en assets)
// Asumo que tienes imágenes como 'face0.png', 'face1.png', etc. en '@/assets/images/wong-baker/'
const getWongBakerFace = (score) => {
  return new URL(`../assets/images/wong-baker/face${score}.png`, import.meta.url).href
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
  max-width: 950px; /* Ancho similar a la ficha de enfermería */
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
  font-size: 1.2rem;
  color: var(--color-text-primary);
  margin-top: 15px;
  margin-bottom: 15px;
  font-weight: 600;
  display: block;
}

.section-description {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  margin-bottom: 20px;
  line-height: 1.5;
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

/* Checkbox and Radio Groups */
.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding-top: 5px;
}

.radio-group label {
  display: flex;
  align-items: center;
  margin-bottom: 0;
  cursor: pointer;
  font-weight: 500;
  color: var(--color-text-primary);
  flex-basis: auto;
}

.radio-group input[type='radio'] {
  margin-right: 8px;
  accent-color: var(--color-accent-green);
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.horizontal-group {
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
}

.form-group.full-width {
  grid-column: 1 / -1;
  margin-bottom: 15px;
}

.form-grid-2-col {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 25px;
}

.form-grid-2-col .radio-group-horizontal {
  grid-column: span 1;
  gap: 10px 20px;
}
.form-grid-2-col .inline-group {
  justify-content: flex-start;
}

/* EVA Scale */
.eva-scale {
  margin-top: 20px;
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: #fcfcfc;
  position: relative;
  text-align: center;
}

.eva-number {
  display: inline-block;
  width: calc(100% / 10 - 5px); /* Ajusta según el espaciado deseado */
  text-align: center;
  font-weight: 600;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.eva-selector-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.eva-selector-row .eva-label {
  flex-basis: 100px; /* Ancho fijo para "No Valorada" */
  text-align: left;
  font-weight: 600;
  color: var(--color-primary-dark);
  white-space: nowrap;
}

.eva-selector-row input[type='checkbox'] {
  margin-right: 15px;
  accent-color: var(--color-accent-green);
}

.eva-separator {
  color: var(--color-border);
  font-size: 1.5rem;
  margin: 0 5px;
}

.eva-input-wrapper {
  flex-grow: 1;
  text-align: center;
}

.eva-input-wrapper input[type='radio'] {
  width: 20px;
  height: 20px;
  margin: 0;
  vertical-align: middle;
  accent-color: var(--color-primary);
}

.eva-labels-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  padding: 0 10px;
}

.pull-right {
  margin-left: auto;
}

/* Wong-Baker Scale */
.wong-baker-scale {
  display: flex;
  justify-content: space-around;
  align-items: flex-end; /* Alinea los inputs en la parte inferior */
  margin-top: 20px;
  padding: 15px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: #fcfcfc;
}

.face-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  transition: background-color 0.2s ease;
}
.face-option:hover {
  background-color: var(--color-hover-light);
}

.wong-baker-face {
  width: 80px; /* Ajusta el tamaño de la imagen de la cara */
  height: auto;
  display: block;
}

.wong-baker-scale input[type='radio'] {
  width: 24px;
  height: 24px;
  accent-color: var(--color-primary);
  cursor: pointer;
}

/* Tablas para escalas (Fuerza) */
.form-table-container {
  width: 100%;
  overflow-x: auto;
  margin-bottom: 25px;
}

.form-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  background-color: #fcfcfc;
}

.form-table th,
.form-table td {
  border: 1px solid var(--color-border);
  padding: 12px 15px;
  text-align: left;
  font-size: 0.9rem;
  color: var(--color-text-primary);
}

.form-table th {
  background-color: var(--color-primary-light);
  color: var(--color-primary-dark);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.form-table tbody tr:nth-child(even) {
  background-color: #f0f8f8;
}

.form-table tbody tr:hover {
  background-color: var(--color-hover-light);
}

.checkbox-cell {
  text-align: center;
  width: 60px;
}

.checkbox-cell input[type='radio'] {
  margin: 0;
  accent-color: var(--color-primary);
}

/* Tono Muscular Scales */
.ashworth-scale,
.campbell-scale {
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
.ashworth-scale label,
.campbell-scale label {
  margin-bottom: 0;
  line-height: 1.3;
}
.mt-3 {
  margin-top: 15px;
}

/* Tinetti Scale */
.tinetti-question-group {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid rgba(var(--color-primary-rgb), 0.1);
  border-radius: 8px;
  background-color: #fdfdfd;
}
.tinetti-question-label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary-dark);
  margin-bottom: 10px;
  display: block;
}
.tinetti-question-group .radio-group {
  gap: 10px 25px; /* Espaciado entre las opciones de radio */
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
@media (max-width: 900px) {
  .ficha-card {
    max-width: 100%;
    padding: 30px 20px;
  }
}

@media (max-width: 768px) {
  .form-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .form-grid,
  .form-grid-2-col {
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

  .radio-group {
    flex-direction: column;
    align-items: flex-start;
  }
  .horizontal-group {
    flex-direction: column;
  }
  .radio-group-horizontal {
    flex-direction: column;
    gap: 8px;
  }

  .form-table th,
  .form-table td {
    padding: 8px 10px;
    font-size: 0.85rem;
  }
  .checkbox-cell {
    width: auto;
  }

  .eva-selector-row {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .eva-number {
    width: auto;
    margin-right: 10px;
  }
  .eva-input-wrapper {
    flex-basis: auto;
    margin-right: 10px;
  }
  .eva-labels-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  .pull-right {
    margin-left: 0;
  }

  .wong-baker-scale {
    flex-wrap: wrap;
    gap: 15px;
  }
  .face-option {
    width: 45%; /* Dos caras por fila */
  }
  .wong-baker-face {
    width: 60px;
  }
  .tinetti-question-group .radio-group {
    flex-direction: column;
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
  .wong-baker-face {
    width: 50px;
  }
  .face-option {
    width: 100%; /* Una cara por fila */
  }
}
</style>
