<template>
  <div class="ficha-container">
    <div class="ficha-card">
      <div class="ficha-header">
        <img src="@/assets/images/puce-logo.png" alt="Logo PUCE" class="puce-logo" />
        <div class="header-text">
          <p class="university-name">PONTIFICIA UNIVERSIDAD CATÓLICA DEL ECUADOR</p>
          <p class="faculty-name">FICHA DE ESCALAS GERIÁTRICAS</p>
          <p class="program-name">PROYECTO DE VINCULACIÓN: ADULTO MAYOR</p>
          <p class="department-name">DEPARTAMENTO DE ENFERMERÍA</p>
        </div>
      </div>

      <h2 class="form-title">FICHA MÉDICA DE ENFERMERÍA</h2>

      <FichaSelector v-model:idficha="selectedFichaId" />

      <div class="form-group full-width mt-4 form-group-highlight">
        <label for="enfNombreencuestador">Nombre del Encuestador:<span class="required">*</span></label>
        <input
          id="enfNombreencuestador"
          v-model.trim="fichaData.enfNombreencuestador"
          type="text"
          placeholder="Ej. Lic. María Pérez"
          required
        />
      </div>
      <div class="form-group full-width form-group-highlight">
        <label for="enfObservaciones">Observaciones Generales:</label>
        <textarea
          id="enfObservaciones"
          v-model.trim="fichaData.enfObservaciones"
          rows="3"
          placeholder="Observaciones adicionales sobre el paciente o el proceso."
        ></textarea>
      </div>

      <section class="form-section">
        <h3 class="section-title">2. ESCALAS GERIÁTRICAS</h3>

        <div class="subsection">
          <h4 class="subsection-title">ACTIVIDADES BÁSICAS (ÍNDICE DE BARTHEL)</h4>
          <p class="subsection-description">
            Puntuación:
            <span class="score-legend">0 = Totalmente dependiente</span>,
            <span class="score-legend">5 = Necesita ayuda</span>,
            <span class="score-legend">10 = Independiente</span>
            (Nota: Algunas actividades tienen puntuaciones específicas intermedias).
          </p>
          <div class="scale-grid">
            <div class="scale-item" v-for="(item, key) in scales.actividades_basicas" :key="key">
              <label>{{ item.label }}:</label>
              <div class="radio-options">
                <label v-for="(optionLabel, val) in item.options" :key="val">
                  <input type="radio" :name="`barthel_${key}`" :value="val" v-model="item.value" />
                  {{ optionLabel }}
                </label>
              </div>
            </div>
            <div class="scale-total form-group">
              <label>TOTAL ACTIVIDADES BÁSICAS (Barthel):</label>
              <input type="number" v-model="scales.total_actividades_basicas" readonly />
            </div>
          </div>
        </div>

        <div class="subsection">
          <h4 class="subsection-title">ACTIVIDAD INSTRUMENTAL (ESCALA DE LAWTON Y BRODY)</h4>
          <p class="subsection-description">
            Puntuación: <span class="score-legend">0 = No puede/Dependiente</span>,
            <span class="score-legend">1 = Independiente/Realiza</span>
            (Puntuación máxima para mujeres: 8, para hombres: 5, debido a diferencias en ítems).
          </p>
          <div class="scale-grid">
            <div class="scale-item" v-for="(item, key) in scales.actividad_instrumental" :key="key">
              <label>{{ item.label }}:</label>
              <div class="radio-options">
                <label v-for="(optionLabel, val) in item.options" :key="val">
                  <input type="radio" :name="`lawton_${key}`" :value="val" v-model="item.value" />
                  {{ optionLabel }}
                </label>
              </div>
            </div>
            <!-- New item for aiCuidaCasa -->
            <div class="scale-item">
              <label>CUIDADO DE LA CASA:</label>
              <div class="radio-options">
                <label><input type="radio" name="lawton_aiCuidaCasa" :value="0" v-model="scales.actividad_instrumental.aiCuidaCasa.value" /> No hace/Dependiente</label>
                <label><input type="radio" name="lawton_aiCuidaCasa" :value="1" v-model="scales.actividad_instrumental.aiCuidaCasa.value" /> Independiente</label>
              </div>
            </div>
            <div class="scale-total form-group">
              <label>TOTAL ACTIVIDAD INSTRUMENTAL:</label>
              <input type="number" v-model="scales.total_actividad_instrumental" readonly />
            </div>
          </div>
        </div>

        <div class="subsection">
          <h4 class="subsection-title">ESTADO COGNITIVO (MINI-MENTAL STATE EXAMINATION - MMSE)</h4>
          <p class="subsection-description">
            Puntuación: Se asigna 1 punto por cada respuesta correcta, a menos que se indique lo
            contrario.
          </p>
          <div class="scale-grid">
            <div class="scale-item" v-for="(item, key) in scales.estado_cognitivo" :key="key">
              <label>{{ item.label }}:</label>
              <div class="radio-options">
                <label v-for="(optionLabel, val) in item.options" :key="val">
                  <input
                    type="radio"
                    :name="`cognitivo_${key}`"
                    :value="val"
                    v-model="item.value"
                  />
                  {{ optionLabel }}
                </label>
              </div>
            </div>
            <div class="scale-total form-group">
              <label>TOTAL ESTADO COGNITIVO (MMSE):</label>
              <input type="number" v-model="scales.total_estado_cognitivo" readonly />
            </div>
          </div>
        </div>

        <div class="subsection">
          <h4 class="subsection-title">DEPRESIÓN (ESCALA DE DEPRESIÓN GERIÁTRICA DE YESAVAGE)</h4>
          <p class="subsection-description">
            Puntuación: <span class="score-legend">1 punto por cada respuesta indicativa de
            depresión</span>.
            <span class="score-legend">Normal: 0-5 puntos</span>;
            <span class="score-legend">Depresión leve: 6-10 puntos</span>;
            <span class="score-legend">Depresión establecida: 11-15 puntos</span>.
          </p>
          <div class="scale-grid">
            <div class="scale-item" v-for="(item, key) in scales.depresion" :key="key">
              <label>{{ item.label }}:</label>
              <div class="radio-options">
                <label v-for="(optionLabel, val) in item.options" :key="val">
                  <input
                    type="radio"
                    :name="`depresion_${key}`"
                    :value="val"
                    v-model="item.value"
                  />
                  {{ optionLabel }}
                </label>
              </div>
            </div>
            <div class="scale-total form-group">
              <label>TOTAL DEPRESIÓN (Yesavage):</label>
              <input type="number" v-model="scales.total_depresion" readonly />
            </div>
          </div>
        </div>

        <div class="subsection">
          <h4 class="subsection-title">RIESGO SOCIAL (ESCALA DE GÉNOVA)</h4>
          <p class="subsection-description">
            Puntuación:
            <span class="score-legend">0 = No presente</span>,
            <span class="score-legend">1 = Sí presente</span>.
            Una puntuación total más alta indica mayor riesgo social.
          </p>
          <div class="scale-grid">
            <div class="scale-item" v-for="(item, key) in scales.riesgo_social" :key="key">
              <label>{{ item.label }}:</label>
              <div class="radio-options">
                <label v-for="(optionLabel, val) in item.options" :key="val">
                  <input
                    type="radio"
                    :name="`riesgo_social_${key}`"
                    :value="val"
                    v-model="item.value"
                  />
                  {{ optionLabel }}
                </label>
              </div>
            </div>
            <div class="scale-total form-group">
              <label>TOTAL RIESGO SOCIAL (Génova):</label>
              <input type="number" v-model="scales.total_riesgo_social" readonly />
            </div>
          </div>
        </div>

        <div class="subsection">
          <h4 class="subsection-title">RECURSO SOCIAL</h4>
          <p class="subsection-description">
            Valoración de los recursos sociales disponibles para el adulto mayor.
          </p>
          <div class="scale-grid">
            <div class="scale-item" v-for="(item, key) in scales.recurso_social" :key="key">
              <label>{{ item.label }}:</label>
              <div class="radio-options">
                <label v-for="(optionLabel, val) in item.options" :key="val">
                  <input
                    type="radio"
                    :name="`recurso_social_${key}`"
                    :value="val"
                    v-model="item.value"
                  />
                  {{ optionLabel }}
                </label>
              </div>
            </div>
            <div class="scale-total form-group">
              <label>TOTAL RECURSO SOCIAL:</label>
              <input type="number" v-model="scales.total_recurso_social" readonly />
            </div>
          </div>
        </div>

        <div class="subsection">
          <h4 class="subsection-title">OTROS RIESGOS</h4>
          <p class="subsection-description">Identificación de riesgos adicionales relevantes.</p>
          <div class="scale-grid">
            <div class="scale-item" v-for="(item, key) in scales.otros_riesgos" :key="key">
              <label>{{ item.label }}:</label>
              <div class="radio-options">
                <label v-for="(optionLabel, val) in item.options" :key="val">
                  <input
                    type="radio"
                    :name="`otros_riesgos_${key}`"
                    :value="val"
                    v-model="item.value"
                  />
                  {{ optionLabel }}
                </label>
              </div>
            </div>
            <div class="scale-total form-group">
              <label>TOTAL OTROS RIESGOS:</label>
              <input type="number" v-model="scales.total_otros_riesgos" readonly />
            </div>
          </div>
        </div>

        <div class="subsection">
          <h4 class="subsection-title">ESCALAS RÁPIDAS - TINNETTI (EQUILIBRIO Y MARCHA)</h4>
          <p class="subsection-description">
            Puntuación: <span class="score-legend">0 = Riesgo de caída / Anormal</span>,
            <span class="score-legend">1 = Sin riesgo de caída / Normal</span>.
            Puntuación total máxima: 28 (Equilibrio: 16, Marcha: 12).
            <span class="score-legend">Puntuación de 19 o menos: Riesgo alto de caídas</span>.
          </p>
          <div class="scale-grid">
            <div class="scale-item" v-for="(item, key) in scales.escalas_rapidas_tinnet" :key="key">
              <label>{{ item.label }}:</label>
              <div class="radio-options">
                <label v-for="(optionLabel, val) in item.options" :key="val">
                  <input type="radio" :name="`tinnet_${key}`" :value="val" v-model="item.value" />
                  {{ optionLabel }}
                </label>
              </div>
            </div>
            <div class="scale-total form-group">
              <label>TOTAL TINNETTI:</label>
              <input type="number" v-model="scales.total_escalas_rapidas_tinnet" readonly />
            </div>
          </div>
        </div>

        <div class="subsection">
          <h4 class="subsection-title">TAMIZAJE</h4>
          <p class="subsection-description">
            Evaluación rápida de diversas áreas para identificar posibles problemas.
          </p>
          <div class="scale-grid">
            <div class="scale-item" v-for="(item, key) in scales.tamizaje" :key="key">
              <label>{{ item.label }}:</label>
              <div class="radio-options">
                <label v-for="(optionLabel, val) in item.options" :key="val">
                  <input type="radio" :name="`tamizaje_${key}`" :value="val" v-model="item.value" />
                  {{ optionLabel }}
                </label>
              </div>
            </div>
            <div class="scale-total form-group">
              <label>TOTAL TAMIZAJE:</label>
              <input type="number" v-model="scales.total_tamizaje" readonly />
            </div>
          </div>
        </div>
      </section>

      <section class="form-section scoring-info-section">
        <h3 class="section-title">3. REFERENCIAS DE PUNTAJES DE LAS ESCALAS GERIÁTRICAS</h3>
        <p class="subsection-description">
          Complemento de la ficha anterior. Estas son solo referencias informativas, no se capturan
          directamente.
        </p>

        <div class="info-grid">
          <div class="info-block">
            <h4>MMSE - ORIENTACIÓN (TIEMPO)</h4>
            <ul>
              <li>5 puntos: Día, fecha, mes, año, estación.</li>
              <li>Menos de 5 puntos: Fallo en alguna categoría.</li>
            </ul>
          </div>
          <div class="info-block">
            <h4>MMSE - ORIENTACIÓN (ESPACIO)</h4>
            <ul>
              <li>5 puntos: País, provincia, ciudad, centro, piso.</li>
              <li>Menos de 5 puntos: Fallo en alguna categoría.</li>
            </ul>
          </div>
          <div class="info-block">
            <h4>MMSE - FIJACIÓN (REGISTRO)</h4>
            <ul>
              <li>3 puntos: Repite correctamente los 3 objetos.</li>
              <li>Menos de 3 puntos: No repite todos.</li>
            </ul>
          </div>
          <div class="info-block">
            <h4>MMSE - ATENCIÓN Y CÁLCULO</h4>
            <ul>
              <li>5 puntos: Resta de 7 en 7 cinco veces, o deletrea mundo al revés.</li>
              <li>Menos de 5 puntos: Fallo en las restas/deletreo.</li>
            </ul>
          </div>
          <div class="info-block">
            <h4>MMSE - MEMORIA (RECUERDO)</h4>
            <ul>
              <li>3 puntos: Recuerda los 3 objetos previamente nombrados.</li>
              <li>Menos de 3 puntos: No recuerda todos.</li>
            </ul>
          </div>
          <div class="info-block">
            <h4>MMSE - LENGUAJE Y PRAXIS</h4>
            <ul>
              <li>2 puntos: Denomina dos objetos.</li>
              <li>1 punto: Repite una frase.</li>
              <li>3 puntos: Cumple orden de 3 pasos.</li>
              <li>1 punto: Escribe una frase.</li>
              <li>1 punto: Copia un dibujo (pentágonos).</li>
            </ul>
          </div>
        </div>

        <div class="info-grid mt-4">
          <div class="info-block">
            <h4>ÍNDICE DE BARTHEL</h4>
            <ul>
              <li>20: Dependencia Total</li>
              <li>20 - 35: Dependencia Severa</li>
              <li>40 - 55: Dependencia Moderada</li>
              <li>60 - 95: Dependencia Leve</li>
              <li>100: Independencia Total</li>
            </ul>
          </div>
          <div class="info-block">
            <h4>ESCALA DE LAWTON Y BRODY (IADL)</h4>
            <ul>
              <li>Mujeres: Max 8 puntos (Independencia)</li>
              <li>Hombres: Max 5 puntos (Independencia, excluye ítems femeninos)</li>
              <li>Puntuación baja: Mayor dependencia en actividades instrumentales.</li>
            </ul>
          </div>
        </div>

        <div class="info-grid mt-4">
          <div class="info-block">
            <h4>ESCALA DE DEPRESIÓN GERIÁTRICA DE YESAVAGE</h4>
            <ul>
              <li>0 - 5 puntos: Normal</li>
              <li>6 - 10 puntos: Depresión leve</li>
              <li>11 - 15 puntos: Depresión establecida</li>
            </ul>
          </div>
          <div class="info-block">
            <h4>ESCALA DE RIESGO SOCIAL DE GÉNOVA</h4>
            <ul>
              <li>Puntuación más alta: Mayor riesgo social y necesidad de ayuda.</li>
              <li>Interpretación específica requiere tabla de referencia.</li>
            </ul>
          </div>
        </div>

        <div class="info-grid mt-4">
          <div class="info-block">
            <h4>ESCALA DE TINNETTI (EQUILIBRIO Y MARCHA)</h4>
            <ul>
              <li>26 - 28 puntos: No hay riesgo de caídas.</li>
              <li>19 - 25 puntos: Riesgo leve de caídas.</li>
              <li>Menos de 19 puntos: Riesgo alto de caídas.</li>
            </ul>
          </div>
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
import { reactive, ref, computed } from 'vue'
import axios from 'axios' // Import axios
import FichaSelector from '@/components/FichaSelector.vue'

const selectedFichaId = ref(null)

const fichaData = reactive({
  enfNombreencuestador: '',
  enfObservaciones: '',
})

// Estructura de datos para las escalas con opciones médicas sensatas
const scales = reactive({
  // ACT. BÁSICAS (Barthel) - Puntuaciones estándar de Barthel
  actividades_basicas: {
    comer: {
      label: 'COMER',
      value: null,
      options: { 0: 'Dependiente', 5: 'Necesita ayuda', 10: 'Independiente' },
    },
    lavarse: {
      label: 'LAVARSE',
      value: null,
      options: { 0: 'Dependiente', 5: 'Necesita ayuda', 10: 'Independiente' },
    },
    vestirse: {
      label: 'VESTIRSE',
      value: null,
      options: { 0: 'Dependiente', 5: 'Necesita ayuda', 10: 'Independiente' },
    },
    arreglarse: {
      label: 'ARREGLARSE (Aseo personal)',
      value: null,
      options: { 0: 'Dependiente', 5: 'Necesita ayuda', 10: 'Independiente' },
    },
    deposiciones: {
      label: 'CONTROL DE DEPOSICIONES',
      value: null,
      options: { 0: 'Incontinente', 5: 'Accidente ocasional', 10: 'Continente' },
    },
    micciones: {
      label: 'CONTROL DE MICCIONES',
      value: null,
      options: { 0: 'Incontinente', 5: 'Accidente ocasional', 10: 'Continente' },
    },
    usar_inodoro: {
      label: 'USAR INODORO',
      value: null,
      options: { 0: 'Dependiente', 5: 'Necesita ayuda', 10: 'Independiente' },
    },
    trasladarse: {
      label: 'TRASLADARSE (Sillón-cama)',
      value: null,
      options: { 0: 'Dependiente', 5: 'Gran ayuda', 10: 'Poca ayuda', 15: 'Independiente' },
    },
    deambular: {
      label: 'DEAMBULAR (Marcha)',
      value: null,
      options: { 0: 'Dependiente', 5: 'En silla de ruedas', 10: 'Ayuda de 1 persona', 15: 'Independiente' },
    },
    escaleras: {
      label: 'SUBIR/BAJAR ESCALERAS',
      value: null,
      options: { 0: 'Dependiente', 5: 'Necesita ayuda', 10: 'Independiente' },
    },
  },
  total_actividades_basicas: computed(() => {
    return Object.values(scales.actividades_basicas).reduce(
      (sum, item) => sum + (Number(item.value) || 0),
      0,
    )
  }),

  // ACT. INSTRUMENTAL (Lawton y Brody) - Puntuación 0 o 1
  actividad_instrumental: {
    uso_telefono: {
      label: 'USO DEL TELÉFONO',
      value: null,
      options: { 0: 'No usa/Dependiente', 1: 'Independiente' },
    },
    ir_lugares: {
      label: 'IR A LUGARES (Transporte)',
      value: null,
      options: { 0: 'No se desplaza/Dependiente', 1: 'Independiente' },
    },
    hacer_compras: {
      label: 'HACER COMPRAS',
      value: null,
      options: { 0: 'No hace/Dependiente', 1: 'Independiente' },
    },
    preparar_comida: {
      label: 'PREPARAR COMIDA',
      value: null,
      options: { 0: 'No prepara/Dependiente', 1: 'Independiente' },
    },
    manejo_medicamentos: {
      label: 'MANEJO DE MEDICAMENTOS',
      value: null,
      options: { 0: 'No maneja/Dependiente', 1: 'Independiente' },
    },
    manejo_dinero: {
      label: 'MANEJO DEL DINERO',
      value: null,
      options: { 0: 'No maneja/Dependiente', 1: 'Independiente' },
    },
    manejo_ropa: {
      label: 'MANEJO DE LAVADO DE ROPA',
      value: null,
      options: { 0: 'No lava/Dependiente', 1: 'Independiente' },
    },
    manejo_transporte: {
      label: 'USO DE MEDIOS DE TRANSPORTE',
      value: null,
      options: { 0: 'No usa/Dependiente', 1: 'Independiente' },
    },
    aiCuidaCasa: { // New field for API mapping
      label: 'CUIDADO DE LA CASA',
      value: null,
      options: { 0: 'No hace/Dependiente', 1: 'Independiente' },
    },
  },
  total_actividad_instrumental: computed(() => {
    return Object.values(scales.actividad_instrumental).reduce(
      (sum, item) => sum + (Number(item.value) || 0),
      0,
    )
  }),

  // ESTADO COGNITIVO (Mini-Mental) - Puntuación de cada ítem
  estado_cognitivo: {
    orientacion_tiempo: {
      label: 'ORIENTACIÓN TIEMPO (Día, Mes, Año, Estación, Día Semana) - Max 5 pts',
      value: null,
      options: { 0: '0-4 puntos', 1: '5 puntos' }, // Simplificado para capturar si lo sabe todo o no
    },
    orientacion_espacio: {
      label: 'ORIENTACIÓN ESPACIO (País, Provincia, Ciudad, Lugar, Planta) - Max 5 pts',
      value: null,
      options: { 0: '0-4 puntos', 1: '5 puntos' }, // Simplificado
    },
    fijacion: {
      label: 'FIJACIÓN (Repetir 3 palabras) - Max 3 pts',
      value: null,
      options: { 0: '0-2 palabras', 1: '3 palabras' },
    },
    atencion_calculo: {
      label: 'ATENCIÓN Y CÁLCULO (Restar 7 de 100 cinco veces o deletrear mundo al revés) - Max 5 pts',
      value: null,
      options: { 0: '0-4 aciertos', 1: '5 aciertos' },
    },
    memoria: {
      label: 'MEMORIA (Recordar 3 palabras) - Max 3 pts',
      value: null,
      options: { 0: '0-2 palabras', 1: '3 palabras' },
    },
    lenguaje_denominacion: {
      label: 'LENGUAJE DENOMINACIÓN (Nombrar 2 objetos) - Max 2 pts',
      value: null,
      options: { 0: '0-1 objeto', 1: '2 objetos' },
    },
    lenguaje_repeticion: {
      label: 'LENGUAJE REPETICIÓN (Repetir frase) - Max 1 pt',
      value: null,
      options: { 0: 'Incorrecto', 1: 'Correcto' },
    },
    lenguaje_orden: {
      label: 'LENGUAJE ORDEN (Orden de 3 pasos) - Max 3 pts',
      value: null,
      options: { 0: '0-2 pasos', 1: '3 pasos' },
    },
    lenguaje_escritura: {
      label: 'LENGUAJE ESCRITURA (Escribir frase) - Max 1 pt',
      value: null,
      options: { 0: 'Incorrecto', 1: 'Correcto' },
    },
    lenguaje_lectura: {
      label: 'LENGUAJE LECTURA (Leer y ejecutar orden) - Max 1 pt',
      value: null,
      options: { 0: 'Incorrecto', 1: 'Correcto' },
    },
    dibujo: {
      label: 'DIBUJO (Copiar pentágonos) - Max 1 pt',
      value: null,
      options: { 0: 'Incorrecto', 1: 'Correcto' },
    },
  },
  total_estado_cognitivo: computed(() => {
    // This sum assumes '1' means the task was completed satisfactorily for that item.
    return Object.values(scales.estado_cognitivo).reduce(
      (sum, item) => sum + (Number(item.value) || 0),
      0,
    )
  }),

  // DEPRESIÓN (Yesavage) - Invertir 0 y 1 según la pregunta para el conteo de depresión
  depresion: {
    satisfecho_vida: {
      label: '¿Está satisfecho con su vida?',
      value: null,
      options: { 0: 'Sí', 1: 'No' }, // 'No' suma a depresión
    },
    actividades_interes: {
      label: '¿Ha disminuido su interés por actividades o aficiones?',
      value: null,
      options: { 0: 'No', 1: 'Sí' }, // 'Sí' suma a depresión
    },
    vida_vacia: {
      label: '¿Siente que su vida está vacía?',
      value: null,
      options: { 0: 'No', 1: 'Sí' }, // 'Sí' suma a depresión
    },
    aburrido: {
      label: '¿Se siente aburrido con frecuencia?',
      value: null,
      options: { 0: 'No', 1: 'Sí' }, // 'Sí' suma a depresión
    },
    animado: {
      label: '¿Está de buen ánimo la mayor parte del tiempo?',
      value: null,
      options: { 0: 'Sí', 1: 'No' }, // 'No' suma a depresión
    },
    preocupado: {
      label: '¿Está preocupado o tiene miedo de que le pase algo?',
      value: null,
      options: { 0: 'No', 1: 'Sí' }, // 'Sí' suma a depresión
    },
    feliz_mayor_parte: {
      label: '¿Se siente feliz la mayor parte del tiempo?',
      value: null,
      options: { 0: 'Sí', 1: 'No' }, // 'No' suma a depresión
    },
    abandonado: {
      label: '¿Se siente a menudo abandonado o desamparado?',
      value: null,
      options: { 0: 'No', 1: 'Sí' }, // 'Sí' suma a depresión
    },
    prefiere_casa: {
      label: '¿Prefiere quedarse en casa a salir y hacer cosas nuevas?',
      value: null,
      options: { 0: 'No', 1: 'Sí' }, // 'Sí' suma a depresión
    },
    problemas_memoria: {
      label: '¿Cree que tiene más problemas de memoria que la mayoría de la gente?',
      value: null,
      options: { 0: 'No', 1: 'Sí' }, // 'Sí' suma a depresión
    },
    estar_vivo: {
      label: '¿Cree que es maravilloso estar vivo?',
      value: null,
      options: { 0: 'Sí', 1: 'No' }, // 'No' suma a depresión
    },
    util_valioso: {
      label: '¿Le cuesta iniciar nuevos proyectos?', // Mapped to API's depSienteinutil
      value: null,
      options: { 0: 'No', 1: 'Sí' }, // 'Sí' suma a depresión
    },
    lleno_energia: {
      label: '¿Se siente lleno de energía?',
      value: null,
      options: { 0: 'Sí', 1: 'No' }, // 'No' suma a depresión
    },
    sin_esperanza: {
      label: '¿Siente que su situación es desesperada?',
      value: null,
      options: { 0: 'No', 1: 'Sí' }, // 'Sí' suma a depresión
    },
    mejor_gente: {
      label: '¿Cree que la mayoría de la gente está mejor que usted?',
      value: null,
      options: { 0: 'No', 1: 'Sí' }, // 'Sí' suma a depresión
    },
  },
  total_depresion: computed(() => {
    return Object.values(scales.depresion).reduce((sum, item) => sum + (Number(item.value) || 0), 0)
  }),

  // RIESGO SOCIAL (Génova) - 0 o 1
  riesgo_social: {
    problemas_psicologico_emocional: {
      label: 'Problemas psicológicos/emocionales (GHQ-12 > 6 / GDS > 6 / MMSE < 24)',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    act_diarias_limitadas: {
      label: 'Actividades diarias limitadas (Barthel < 90 / Lawton < 8)',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    enfermedad_cronica: {
      label: 'Enfermedad crónica grave o multimorbilidad (Charlson > 3)',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    hospitalizacion_reciente: {
      label: 'Hospitalización en el último trimestre',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    dism_autonomia: {
      label: 'Disminución reciente de autonomía funcional',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
  },
  total_riesgo_social: computed(() => {
    return Object.values(scales.riesgo_social).reduce(
      (sum, item) => sum + (Number(item.value) || 0),
      0,
    )
  }),

  // RECURSO SOCIAL - Opciones categóricas, mapped to numerical values for API total
  recurso_social: {
    situacion_familiar: { // This will map to rsViveCon in API
      label: 'SITUACIÓN FAMILIAR',
      value: null,
      options: {
        1: 'Vive solo, sin apoyo familiar cercano',
        2: 'Vive solo, pero con apoyo familiar/vecinal a distancia',
        3: 'Vive con familia, relación conflictiva',
        4: 'Vive con familia, relación sin conflictos, apoyo adecuado',
        5: 'Vive en institución/residencia',
      },
    },
    relaciones_contactos_sociales: { // This will map to rsContactoSocial in API
      label: 'RELACIONES Y CONTACTOS SOCIALES',
      value: null,
      options: {
        1: 'Aislado, sin contactos frecuentes',
        2: 'Solo contacto familiar cercano',
        3: 'Contactos limitados (vecinos, conocidos)',
        4: 'Participa en actividades sociales/grupos',
        5: 'Red social amplia y activa',
      },
    },
    apoyo_red_social: { // This will map to rsApoyoRedes in API
      label: 'APOYO DE LA RED SOCIAL',
      value: null,
      options: {
        1: 'No recibe apoyo y lo necesita',
        2: 'Recibe apoyo informal insuficiente',
        3: 'Recibe apoyo informal suficiente (familia, amigos)',
        4: 'Recibe apoyo formal (servicios sociales, sanitarios)',
        5: 'No necesita apoyo o lo tiene cubierto totalmente',
      },
    },
  },
  total_recurso_social: computed(() => {
    // Assuming numerical values for total
    return Object.values(scales.recurso_social).reduce(
      (sum, item) => sum + (Number(item.value) || 0),
      0,
    )
  }),

  // OTROS RIESGOS - Mapped to API's "otrosriesgos"
  otros_riesgos: {
    grupo_edad: { // Mapped to orGrupoEdad
      label: 'GRUPO DE EDAD',
      value: null,
      options: {
        1: '65-74 años',
        2: '75-84 años',
        3: '85-94 años',
        4: '95 o más años',
      },
    },
    vive_con: { // Mapped to orViveCon
      label: 'VIVE CON',
      value: null,
      options: {
        1: 'Solo',
        2: 'Cónyuge/Pareja',
        3: 'Hijos/Familiares directos',
        4: 'Otros familiares/No familiares',
        5: 'Institución/Residencia',
      },
    },
    movilidad: { // Mapped to orMovilidad (New field)
      label: 'MOVILIDAD (Limitación significativa)',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    enfermedad_aguda: { // Mapped to orEnfermedadAguda (New field)
      label: 'ENFERMEDAD AGUDA RECIENTE',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    neuropsico: { // Mapped to orNeuropsico (New field)
      label: 'PROBLEMAS NEUROPSICOLÓGICOS (Demencia/Delirium)',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
  },
  total_otros_riesgos: computed(() => {
    return Object.values(scales.otros_riesgos).reduce(
      (sum, item) => sum + (Number(item.value) || 0),
      0,
    )
  }),

  // ESCALAS RÁPIDAS - TINNETTI (Equilibrio y Marcha) - 0 o 1
  escalas_rapidas_tinnet: {
    equilibrio_sentado: {
      label: '1. EQUILIBRIO SENTADO',
      value: null,
      options: { 0: 'Inestable/Necesita apoyo', 1: 'Estable' },
    },
    levantarse: {
      label: '2. LEVANTARSE (De la silla)',
      value: null,
      options: { 0: 'Imposible/Necesita ayuda', 1: 'Posible sin ayuda' },
    },
    equilibrio_bipedestacion_inmediata: {
      label: '3. EQUILIBRIO BIPEDESTACIÓN INMEDIATA (Primeros 5 segundos)',
      value: null,
      options: { 0: 'Inestable', 1: 'Estable' },
    },
    equilibrio_bipedestacion_pie: {
      label: '4. EQUILIBRIO BIPEDESTACIÓN PIE (Pies juntos)',
      value: null,
      options: { 0: 'Inestable', 1: 'Estable' },
    },
    empuje_estrenal: {
      label: '5. EMPUJE ESTERNAL (Con los pies juntos, resiste leve empuje)',
      value: null,
      options: { 0: 'Cae/Da pasos', 1: 'Estable' },
    },
    giro_360: {
      label: '6. GIRO 360° (En redondo)',
      value: null,
      options: { 0: 'Inestable/Discontinuo', 1: 'Continuo y estable' },
    },
    equilibrio_tandem: {
      label: '7. EQUILIBRIO TÁNDEM (Un pie delante del otro)',
      value: null,
      options: { 0: 'Incapaz/Inestable', 1: 'Capaz' },
    },
    caminar: {
      label: '8. INICIO DE LA MARCHA (Sin vacilación)',
      value: null,
      options: { 0: 'Vacilante/Múltiples intentos', 1: 'No vacilante' },
    },
    longitud_paso: {
      label: '9. LONGITUD Y ALTURA DEL PASO (Pie derecho/izquierdo)',
      value: null,
      options: { 0: 'Pasos cortos/Arrastra', 1: 'Normal' },
    },
    simetria_paso: {
      label: '10. SIMETRÍA DEL PASO',
      value: null,
      options: { 0: 'Asimétrico', 1: 'Simétrico' },
    },
    continuidad_paso: {
      label: '11. CONTINUIDAD DEL PASO',
      value: null,
      options: { 0: 'Discontinuo', 1: 'Continuo' },
    },
    trayectoria: {
      label: '12. TRAYECTORIA (Desviación en línea recta)',
      value: null,
      options: { 0: 'Desviación/Ayuda', 1: 'Recta sin ayuda' },
    },
    tronco: {
      label: '13. TRONCO (Oscilación al caminar)',
      value: null,
      options: { 0: 'Balanceo excesivo/Ausente', 1: 'No balanceo' },
    },
    separacion_talones: {
      label: '14. SEPARACIÓN DE TALONES AL CAMINAR',
      value: null,
      options: { 0: 'Separación excesiva', 1: 'Normal' },
    },
  },
  total_escalas_rapidas_tinnet: computed(() => {
    return Object.values(scales.escalas_rapidas_tinnet).reduce(
      (sum, item) => sum + (Number(item.value) || 0),
      0,
    )
  }),

  // TAMIZAJE - New section
  tamizaje: {
    dif_visual: {
      label: 'Dificultad Visual',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    dif_auditiva: {
      label: 'Dificultad Auditiva',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    levanta_anda: {
      label: 'Se levanta y anda sin dificultad',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    perdida_orina: {
      label: 'Pérdida de orina',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    perdida_peso: {
      label: 'Pérdida de peso significativa (últimos 6 meses)',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    perdida_memoria: {
      label: 'Pérdida de memoria',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    triste_deprimido: {
      label: 'Se siente triste o deprimido',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    banarse_solo: {
      label: 'Puede bañarse solo',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    compras_solo: {
      label: 'Puede ir de compras solo',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    vive_solo_tamizaje: { // Distinct from other 'vive_con' fields for API mapping
      label: 'Vive solo',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
  },
  total_tamizaje: computed(() => {
    return Object.values(scales.tamizaje).reduce(
      (sum, item) => sum + (Number(item.value) || 0),
      0,
    )
  }),
})

// Simulación de envío
const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref('') // 'success' o 'error'

const handleSubmit = async () => {
  submitMessage.value = ''
  submitStatus.value = ''
  isSubmitting.value = true

  // Basic validation for required fields
  if (!selectedFichaId.value) {
    submitMessage.value = 'Debe seleccionar una ficha médica existente.';
    submitStatus.value = 'error';
    isSubmitting.value = false;
    return;
  }
  if (!fichaData.enfNombreencuestador.trim()) {
    submitMessage.value = 'El nombre del encuestador es requerido.';
    submitStatus.value = 'error';
    isSubmitting.value = false;
    return;
  }

  // Map Barthel scores to "Sí"/"No" for specific API fields
  const mapBarthelToYesNo = (value, independentScore) => {
    return value === independentScore ? "Sí" : "No";
  };

  const payload = {
    idficha: selectedFichaId.value,
    enfNombreencuestador: fichaData.enfNombreencuestador.trim(),
    enfObservaciones: fichaData.enfObservaciones.trim() || null,
    actbasica: {
      abBanasolo: mapBarthelToYesNo(scales.actividades_basicas.lavarse.value, 10),
      abVistedesvistesolo: mapBarthelToYesNo(scales.actividades_basicas.vestirse.value, 10),
      abCuidaapariencia: mapBarthelToYesNo(scales.actividades_basicas.arreglarse.value, 10),
      abUsainodoro: mapBarthelToYesNo(scales.actividades_basicas.usar_inodoro.value, 10),
      abControlesfinteres: (scales.actividades_basicas.deposiciones.value === 10 && scales.actividades_basicas.micciones.value === 10) ? "Sí" : "No",
      abTrasacuestalevanta: mapBarthelToYesNo(scales.actividades_basicas.trasladarse.value, 15),
      abCamina: mapBarthelToYesNo(scales.actividades_basicas.deambular.value, 15),
      abAlimenta: mapBarthelToYesNo(scales.actividades_basicas.comer.value, 10),
      abTotal: scales.total_actividades_basicas.value
    },
    actinstrumental: {
      aiCuidaCasa: Number(scales.actividad_instrumental.aiCuidaCasa.value),
      aiUsaTelefono: Number(scales.actividad_instrumental.uso_telefono.value),
      aiMediosTransporte: Number(scales.actividad_instrumental.manejo_transporte.value),
      aiPreparaComida: Number(scales.actividad_instrumental.preparar_comida.value),
      aiLavaRopa: Number(scales.actividad_instrumental.manejo_ropa.value),
      aiVaCompras: Number(scales.actividad_instrumental.hacer_compras.value),
      aiManejaDinero: Number(scales.actividad_instrumental.manejo_dinero.value),
      aiManejaMedicina: Number(scales.actividad_instrumental.manejo_medicamentos.value),
      aiTotales: scales.total_actividad_instrumental.value
    },
    cognitivo: {
      cogSabeFecha: Number(scales.estado_cognitivo.orientacion_tiempo.value),
      cogAprendeDeTres: Number(scales.estado_cognitivo.fijacion.value),
      cogRepiteAlreves: Number(scales.estado_cognitivo.atencion_calculo.value),
      cogTomaDoblaColoca: Number(scales.estado_cognitivo.lenguaje_orden.value),
      cogRepitePalabras: Number(scales.estado_cognitivo.memoria.value),
      cogCopiaCirculos: Number(scales.estado_cognitivo.dibujo.value),
      cogTotal: scales.total_estado_cognitivo.value
    },
    depresion: {
      depSatisfechovida: Number(scales.depresion.satisfecho_vida.value),
      depDejaactinteres: Number(scales.depresion.actividades_interes.value),
      depVidavacia: Number(scales.depresion.vida_vacia.value),
      depAburrefrecuencia: Number(scales.depresion.aburrido.value),
      depBuenanimo: Number(scales.depresion.animado.value),
      depAlgomalosuceder: Number(scales.depresion.preocupado.value),
      depFelizmayortiempo: Number(scales.depresion.feliz_mayor_parte.value),
      depDesamparado: Number(scales.depresion.abandonado.value),
      depActividadnueva: Number(scales.depresion.prefiere_casa.value),
      depProblemamemoria: Number(scales.depresion.problemas_memoria.value),
      depMaravillosovivir: Number(scales.depresion.estar_vivo.value),
      depSienteinutil: Number(scales.depresion.util_valioso.value),
      depLlenoenergia: Number(scales.depresion.lleno_energia.value),
      depSinesperanza: Number(scales.depresion.sin_esperanza.value),
      depOtrosmejorqueuno: Number(scales.depresion.mejor_gente.value),
      depTotal: scales.total_depresion.value
    },
    otrosriesgos: {
      orGrupoEdad: Number(scales.otros_riesgos.grupo_edad.value),
      orViveCon: Number(scales.otros_riesgos.vive_con.value),
      orMovilidad: Number(scales.otros_riesgos.movilidad.value),
      orEnfermedadAguda: Number(scales.otros_riesgos.enfermedad_aguda.value),
      orNeuropsico: Number(scales.otros_riesgos.neuropsico.value),
      orTotal: scales.total_otros_riesgos.value
    },
    recursosocial: {
      rsViveCon: Number(scales.recurso_social.situacion_familiar.value), // Mapping situacion_familiar to rsViveCon
      rsContactoSocial: Number(scales.recurso_social.relaciones_contactos_sociales.value),
      rsApoyoRedes: Number(scales.recurso_social.apoyo_red_social.value),
      rsTotal: scales.total_recurso_social.value // This computed total should work
    },
    tamizaje: {
      tamDifvisual: Number(scales.tamizaje.dif_visual.value),
      tamDifauditiva: Number(scales.tamizaje.dif_auditiva.value),
      tamLevanteanda: Number(scales.tamizaje.levanta_anda.value),
      tamPerdidaorina: Number(scales.tamizaje.perdida_orina.value),
      tamPerdidapeso: Number(scales.tamizaje.perdida_peso.value),
      tamPerdidamemoria: Number(scales.tamizaje.perdida_memoria.value),
      tamTristedeprimido: Number(scales.tamizaje.triste_deprimido.value),
      tamBanarsolo: Number(scales.tamizaje.banarse_solo.value),
      tamComprasolo: Number(scales.tamizaje.compras_solo.value),
      tamVivesolo: Number(scales.tamizaje.vive_solo_tamizaje.value),
      tamTotal: scales.total_tamizaje.value
    }
  };

  try {
    const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/enfermeria`, payload);

    console.log('Ficha Médica guardada exitosamente:', response.data);
    submitMessage.value = 'Ficha médica guardada exitosamente.';
    submitStatus.value = 'success';
    // Optionally reset form here
  } catch (error) {
    submitMessage.value = 'Error al guardar la ficha. Inténtalo de nuevo.';
    submitStatus.value = 'error';
    console.error('Error guardando ficha:', error);
    if (error.response && error.response.data && error.response.data.message) {
      submitMessage.value += ` Detalles: ${error.response.data.message}`;
    } else if (error.message) {
      submitMessage.value += ` Detalles: ${error.message}`;
    }
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
/* Las variables CSS (ej. --color-primary-dark) DEBEN ser definidas globalmente
  en tu main.js o App.vue (sin scoped), como se explicó anteriormente, para que sean accesibles aquí.
  Asegúrate de que las variables para los inputs que definimos en RegistroForm.vue también estén disponibles:
  --color-input-border-default, --color-input-background-default, --color-input-placeholder
*/

.ficha-container {
  display: flex;
  justify-content: center;
  padding: 30px 15px; /* Reducir padding vertical */
  background-color: var(--color-background-light);
}

.ficha-card {
  background-color: var(--color-card-background, #ffffff);
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  padding: 30px 40px; /* Reducir padding interno */
  width: 100%;
  max-width: 1100px; /* **Aumentado para ser más ancho** */
  font-family: 'Montserrat', sans-serif;
}

.ficha-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px; /* Reducir margen inferior */
  gap: 15px; /* Reducir espacio entre elementos */
  flex-wrap: wrap;
}

.puce-logo {
  height: 70px; /* Ligeramente más pequeño */
  width: auto;
}

.header-text {
  text-align: center;
  line-height: 1.3; /* Espaciado de línea más compacto */
}

.university-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 3px; /* Reducir margen */
}
.faculty-name,
.program-name,
.department-name {
  font-size: 0.85rem; /* Ligeramente más pequeño */
  color: var(--color-text-secondary);
  font-weight: 500;
}
.department-name {
  font-weight: 600;
  margin-top: 8px; /* Reducir margen */
  text-transform: uppercase;
}

.form-title {
  color: var(--color-primary-dark);
  font-size: 2.2rem; /* Ligeramente más pequeño */
  font-weight: 800;
  text-align: center;
  margin-bottom: 35px; /* Reducir margen */
  border-bottom: 3px solid var(--color-accent-green);
  padding-bottom: 12px; /* Reducir padding */
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.form-section {
  margin-bottom: 30px; /* Reducir margen */
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 20px; /* Reducir padding */
  background-color: var(--color-input-background-default);
}

.section-title {
  font-size: 1.6rem; /* Ligeramente más pequeño */
  color: var(--color-primary);
  font-weight: 700;
  margin-bottom: 20px; /* Reducir margen */
  text-align: left;
  border-bottom: 2px solid rgba(var(--color-primary-rgb), 0.2);
  padding-bottom: 8px; /* Reducir padding */
}

.subsection {
  margin-bottom: 25px; /* Reducir margen */
  padding: 18px; /* Reducir padding */
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: #ffffff;
}

.subsection-title {
  font-size: 1.2rem; /* Ligeramente más pequeño */
  color: var(--color-text-primary);
  font-weight: 600;
  margin-bottom: 8px; /* Reducir margen */
  text-align: left;
}

.subsection-description {
  font-size: 0.85rem; /* Ligeramente más pequeño */
  color: var(--color-text-secondary);
  margin-bottom: 15px; /* Reducir margen */
  text-align: left;
  font-style: italic;
  line-height: 1.4;
}

.score-legend {
  font-weight: 600;
  color: var(--color-primary-dark);
}

/* New: Flexbox for scale-grid for better horizontal use */
.scale-grid {
  display: flex;
  flex-wrap: wrap; /* Allows items to wrap to the next line */
  gap: 15px 25px; /* Vertical and horizontal gap */
  justify-content: flex-start; /* Align items to the start */
}

.scale-item {
  display: flex;
  flex-direction: column;
  flex: 1 1 300px; /* Allow items to grow/shrink, with a base width for 2-3 columns */
  min-width: 280px; /* Minimum width for each item */
  padding-bottom: 5px; /* Reduce internal padding */
  border-bottom: 1px dashed var(--color-border);
}

.scale-item:last-of-type {
  border-bottom: none; /* No border for the last item in grid */
}

.scale-item label {
  font-size: 0.9rem; /* Ligeramente más pequeño */
  color: var(--color-text-primary);
  margin-bottom: 8px; /* Reducir margen */
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1.2;
}

.radio-options {
  display: flex;
  flex-wrap: wrap; /* Allow radio options to wrap */
  gap: 8px 15px; /* Smaller gap between options */
  font-size: 0.85rem; /* Smaller font for options */
}

.radio-options label {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0; /* Remove default label margin */
  font-weight: 400; /* Regular font weight */
}

.radio-options input[type='radio'] {
  margin-right: 6px; /* Smaller margin */
  transform: scale(0.9); /* Ligeramente más pequeño */
}

.scale-total {
  margin-top: 20px; /* Espacio para el total */
  flex-basis: 100%; /* Make total span full width */
  text-align: right;
  padding-top: 15px;
  border-top: 1px solid var(--color-border);
}

.scale-total label {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-primary-dark);
}

.scale-total input[type='number'] {
  width: 100px; /* Ancho fijo para el input total */
  text-align: center;
  font-weight: 700;
  color: var(--color-primary);
  background-color: var(--color-background-light);
  border: 1px solid var(--color-primary);
  cursor: default; /* No editable */
}

/* Scoring Info Section */
.scoring-info-section {
  padding-top: 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Más columnas para info */
  gap: 20px; /* Reducir gap */
  margin-top: 20px;
}

.info-block {
  background-color: var(--color-background-light);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 15px; /* Reducir padding */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.info-block h4 {
  font-size: 1rem;
  color: var(--color-primary);
  margin-bottom: 10px;
  font-weight: 700;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(var(--color-primary-rgb), 0.1);
  padding-bottom: 5px;
}

.info-block ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-block ul li {
  font-size: 0.85rem;
  color: var(--color-text-primary);
  margin-bottom: 5px;
  line-height: 1.3;
}

.info-block ul li:last-child {
  margin-bottom: 0;
}

.submit-button {
  display: block;
  width: auto; /* Ajusta el ancho al contenido */
  min-width: 250px;
  padding: 15px 30px;
  margin: 40px auto 20px auto; /* Centrar y añadir margen */
  background-color: var(--color-accent-green);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  box-shadow: 0 6px 15px rgba(var(--color-accent-green-rgb), 0.3);
}

.submit-button:hover {
  background-color: var(--color-accent-green-dark);
  transform: translateY(-2px);
}

.submit-button:disabled {
  background-color: var(--color-gray-light);
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.submit-info {
  text-align: center;
  margin-top: 20px;
  font-size: 1rem;
  font-weight: 600;
  padding: 10px;
  border-radius: 8px;
}

.submit-info.success {
  background-color: var(--color-success-light);
  color: var(--color-success-dark);
  border: 1px solid var(--color-success);
}

.submit-info.error {
  background-color: var(--color-error-light);
  color: var(--color-error-dark);
  border: 1px solid var(--color-error);
}

/* Media Queries para responsividad */
@media (max-width: 992px) {
  .ficha-card {
    padding: 25px 30px;
    max-width: 800px;
  }
  .scale-grid {
    gap: 15px; /* Reducir gap en pantallas medianas */
  }
  .scale-item {
    flex: 1 1 45%; /* Dos columnas más consistentes */
  }
  .info-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .ficha-header {
    flex-direction: column;
  }
  .puce-logo {
    height: 60px;
  }
  .university-name {
    font-size: 1.2rem;
  }
  .form-title {
    font-size: 2rem;
  }
  .section-title {
    font-size: 1.4rem;
  }
  .subsection-title {
    font-size: 1.1rem;
  }
  .scale-item {
    flex: 1 1 100%; /* Una columna en pantallas pequeñas */
    min-width: unset; /* Remove min-width for full flexibility */
  }
  .radio-options {
    flex-direction: column; /* Apilar opciones de radio */
    gap: 5px;
  }
  .info-grid {
    grid-template-columns: 1fr; /* Una columna en pantallas muy pequeñas */
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

  .progress-indicator {
    flex-direction: column;
    gap: 8px;
  }
  .step-label {
    margin-left: 0;
    margin-top: 5px;
  }
}

/* Specific styling for the highlighted form group */
.form-group-highlight {
  margin-top: 25px; /* Increased margin for better separation */
  padding: 15px; /* Added padding */
  border: 1px solid var(--color-primary-light); /* Subtle border */
  border-radius: 8px;
  background-color: var(--color-background-light); /* Slightly different background */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); /* Soft shadow */
}

.form-group-highlight label {
  color: var(--color-primary-dark); /* Stronger color for label */
  font-size: 1rem; /* Slightly larger font for label */
  font-weight: 700; /* Bolder label */
}

.form-group-highlight input[type='text'],
.form-group-highlight textarea { /* Apply to textarea as well */
  width: 100%;
  padding: 12px 15px;
  border: 1px solid var(--color-input-border-default);
  border-radius: 8px;
  font-size: 1rem;
  color: var(--color-text-primary);
  background-color: var(--color-input-background-default);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.form-group-highlight input[type='text']:focus,
.form-group-highlight textarea:focus { /* Apply to textarea as well */
  box-shadow: 0 0 0 5px rgba(var(--color-primary-rgb), 0.3); /* More prominent focus shadow */
}
</style>
