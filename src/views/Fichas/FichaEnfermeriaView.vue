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

      <section class="form-section">
        <h3 class="section-title">1. DATOS DE IDENTIFICACIÓN DEL PACIENTE</h3>
        <div class="form-grid">
          <div class="form-group">
            <label for="nombres">Nombres:</label>
            <input
              type="text"
              id="nombres"
              v-model.trim="fichaData.nombres"
              placeholder="Ej: Ana María"
              required
            />
          </div>
          <div class="form-group">
            <label for="apellidos">Apellidos:</label>
            <input
              type="text"
              id="apellidos"
              v-model.trim="fichaData.apellidos"
              placeholder="Ej: Rodríguez López"
              required
            />
          </div>
          <div class="form-group">
            <label for="lugar_aplicacion">Lugar de aplicación:</label>
            <input
              type="text"
              id="lugar_aplicacion"
              v-model.trim="fichaData.lugar_aplicacion"
              placeholder="Lugar"
            />
          </div>
          <div class="form-group">
            <label for="comunidad_zona">Comunidad / Zona:</label>
            <input
              type="text"
              id="comunidad_zona"
              v-model.trim="fichaData.comunidad_zona"
              placeholder="Comunidad"
            />
          </div>
          <div class="form-group">
            <label for="fecha_nacimiento">Fecha de Nacimiento:</label>
            <input type="date" id="fecha_nacimiento" v-model="fichaData.fecha_nacimiento" />
          </div>
          <div class="form-group">
            <label for="cedula">Cédula No.:</label>
            <input
              type="text"
              id="cedula"
              v-model.trim="fichaData.cedula"
              placeholder="Ej: 17XXXXXXXX"
              maxlength="10"
            />
          </div>
          <div class="form-group">
            <label>Sexo:</label>
            <div class="radio-group">
              <input type="radio" id="sexo_m" value="Masculino" v-model="fichaData.sexo" />
              <label for="sexo_m">Masculino</label>
              <input type="radio" id="sexo_f" value="Femenino" v-model="fichaData.sexo" />
              <label for="sexo_f">Femenino</label>
            </div>
          </div>
          <div class="form-group">
            <label for="cod_pno">COD. PNo.:</label>
            <input type="text" id="cod_pno" v-model.trim="fichaData.cod_pno" />
          </div>
          <div class="form-group">
            <label for="fecha_aplicacion">Fecha de Aplicación:</label>
            <input type="date" id="fecha_aplicacion" v-model="fichaData.fecha_aplicacion" />
          </div>
          <div class="form-group">
            <label for="firma_verificacion">Firma de Verificación:</label>
            <input
              type="text"
              id="firma_verificacion"
              v-model.trim="fichaData.firma_verificacion"
              placeholder="Firma/Nombre del verificador"
            />
          </div>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">2. ESCALAS GERIÁTRICAS</h3>

        <div class="subsection">
          <h4 class="subsection-title">ACTIVIDADES BÁSICAS (BARTHEL)</h4>
          <p class="subsection-description">
            Puntuación: 0 = Independiente, 5 = Ayuda mínima, 10 = Dependiente
          </p>
          <div class="scale-grid">
            <div class="scale-item" v-for="(item, key) in scales.actividades_basicas" :key="key">
              <label>{{ item.label }}:</label>
              <div class="radio-options">
                <label v-for="(option, val) in item.options" :key="val">
                  <input type="radio" :name="`barthel_${key}`" :value="val" v-model="item.value" />
                  {{ option }}
                </label>
              </div>
            </div>
            <div class="scale-total form-group">
              <label>TOTAL ACTIVIDADES BÁSICAS:</label>
              <input type="number" v-model="scales.total_actividades_basicas" readonly />
            </div>
          </div>
        </div>

        <div class="subsection">
          <h4 class="subsection-title">ACTIVIDAD INSTRUMENTAL (LAWTON Y BRODY)</h4>
          <p class="subsection-description">Puntuación: 0 = No, 1 = Sí</p>
          <div class="scale-grid">
            <div class="scale-item" v-for="(item, key) in scales.actividad_instrumental" :key="key">
              <label>{{ item.label }}:</label>
              <div class="radio-options">
                <label v-for="(option, val) in item.options" :key="val">
                  <input type="radio" :name="`lawton_${key}`" :value="val" v-model="item.value" />
                  {{ option }}
                </label>
              </div>
            </div>
            <div class="scale-total form-group">
              <label>TOTAL ACTIVIDAD INSTRUMENTAL:</label>
              <input type="number" v-model="scales.total_actividad_instrumental" readonly />
            </div>
          </div>
        </div>

        <div class="subsection">
          <h4 class="subsection-title">ESTADO COGNITIVO (MINI-MENTAL)</h4>
          <p class="subsection-description">Puntuación: 0 = No, 1 = Sí</p>
          <div class="scale-grid">
            <div class="scale-item" v-for="(item, key) in scales.estado_cognitivo" :key="key">
              <label>{{ item.label }}:</label>
              <div class="radio-options">
                <label v-for="(option, val) in item.options" :key="val">
                  <input
                    type="radio"
                    :name="`cognitivo_${key}`"
                    :value="val"
                    v-model="item.value"
                  />
                  {{ option }}
                </label>
              </div>
            </div>
            <div class="scale-total form-group">
              <label>TOTAL ESTADO COGNITIVO:</label>
              <input type="number" v-model="scales.total_estado_cognitivo" readonly />
            </div>
          </div>
        </div>

        <div class="subsection">
          <h4 class="subsection-title">DEPRESIÓN (ESCALA DE YESAVAGE)</h4>
          <p class="subsection-description">
            Puntuación: 0 = No, 1 = Sí. Más de 6 puntos = Depresión
          </p>
          <div class="scale-grid">
            <div class="scale-item" v-for="(item, key) in scales.depresion" :key="key">
              <label>{{ item.label }}:</label>
              <div class="radio-options">
                <label v-for="(option, val) in item.options" :key="val">
                  <input
                    type="radio"
                    :name="`depresion_${key}`"
                    :value="val"
                    v-model="item.value"
                  />
                  {{ option }}
                </label>
              </div>
            </div>
            <div class="scale-total form-group">
              <label>TOTAL DEPRESIÓN:</label>
              <input type="number" v-model="scales.total_depresion" readonly />
            </div>
          </div>
        </div>

        <div class="subsection">
          <h4 class="subsection-title">RIESGO SOCIAL (ESCALA DE GÉNOVA)</h4>
          <p class="subsection-description">
            Puntuación: 0 = No, 1 = Sí. Más de 20 puntos = Necesita mucha ayuda
          </p>
          <div class="scale-grid">
            <div class="scale-item" v-for="(item, key) in scales.riesgo_social" :key="key">
              <label>{{ item.label }}:</label>
              <div class="radio-options">
                <label v-for="(option, val) in item.options" :key="val">
                  <input
                    type="radio"
                    :name="`riesgo_social_${key}`"
                    :value="val"
                    v-model="item.value"
                  />
                  {{ option }}
                </label>
              </div>
            </div>
            <div class="scale-total form-group">
              <label>TOTAL RIESGO SOCIAL:</label>
              <input type="number" v-model="scales.total_riesgo_social" readonly />
            </div>
          </div>
        </div>

        <div class="subsection">
          <h4 class="subsection-title">RECURSO SOCIAL</h4>
          <div class="scale-grid">
            <div class="scale-item" v-for="(item, key) in scales.recurso_social" :key="key">
              <label>{{ item.label }}:</label>
              <div class="radio-options">
                <label v-for="(option, val) in item.options" :key="val">
                  <input
                    type="radio"
                    :name="`recurso_social_${key}`"
                    :value="val"
                    v-model="item.value"
                  />
                  {{ option }}
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
          <div class="scale-grid">
            <div class="scale-item" v-for="(item, key) in scales.otros_riesgos" :key="key">
              <label>{{ item.label }}:</label>
              <div class="radio-options">
                <label v-for="(option, val) in item.options" :key="val">
                  <input
                    type="radio"
                    :name="`otros_riesgos_${key}`"
                    :value="val"
                    v-model="item.value"
                  />
                  {{ option }}
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
          <h4 class="subsection-title">ESCALAS RÁPIDAS - TINNET (EQUILIBRIO Y MARCHA)</h4>
          <p class="subsection-description">Puntuación: 0 = Anormal / 1 = Normal</p>
          <div class="scale-grid">
            <div class="scale-item" v-for="(item, key) in scales.escalas_rapidas_tinnet" :key="key">
              <label>{{ item.label }}:</label>
              <div class="radio-options">
                <label v-for="(option, val) in item.options" :key="val">
                  <input type="radio" :name="`tinnet_${key}`" :value="val" v-model="item.value" />
                  {{ option }}
                </label>
              </div>
            </div>
            <div class="scale-total form-group">
              <label>TOTAL TINNET:</label>
              <input type="number" v-model="scales.total_escalas_rapidas_tinnet" readonly />
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
            <h4>SABES FECHA: AÑO, MES, DÍA, SEMANA</h4>
            <ul>
              <li>4 AÑO, MES, DÍA, SEMANA</li>
              <li>3 AÑO, MES, DÍA</li>
              <li>2 AÑO, MES</li>
              <li>1 AÑO</li>
              <li>0 NO PUEDE</li>
            </ul>
          </div>
          <div class="info-block">
            <h4>REPITE NOMBRE DE 3 OBJETOS</h4>
            <ul>
              <li>3 OBJETOS</li>
              <li>2 OBJETOS</li>
              <li>1 OBJETO</li>
              <li>0 NO PUEDE</li>
            </ul>
          </div>
          <div class="info-block">
            <h4>COGNITIVO - NIMEROS, DIBUJO DE 2</h4>
            <ul>
              <li>2 DIBUJO DE 2</li>
              <li>1 SI PUEDE</li>
              <li>0 NO PUEDE</li>
            </ul>
          </div>
          <div class="info-block">
            <h4>SERIE - REPITE PALABRAS</h4>
            <ul>
              <li>3, 2, 1 PALABRAS</li>
              <li>2 PALABRAS</li>
              <li>1 PALABRA</li>
              <li>0 NO PUEDE</li>
            </ul>
          </div>
          <div class="info-block">
            <h4>TOMA, DOBLA Y COLOCA PAPEL</h4>
            <ul>
              <li>3 TOMA, DOBLA, COLOCA</li>
              <li>2 TOMA, DOBLA</li>
              <li>1 TOMA</li>
              <li>0 NO PUEDE</li>
            </ul>
          </div>
          <div class="info-block">
            <h4>DETERIORO COGNITIVO</h4>
            <ul>
              <li>14-19 = Ausente</li>
              <li>Menos de 14 = Presente</li>
            </ul>
          </div>
        </div>

        <div class="info-grid mt-4">
          <div class="info-block">
            <h4>NUTRICIONAL</h4>
            <ul>
              <li>0 &lt; 19 kg (MODERADA)</li>
              <li>1 19-20</li>
              <li>2 21 a 24</li>
              <li>3 > 25 kg (OBESIDAD)</li>
            </ul>
          </div>
          <div class="info-block">
            <h4>PÉRDIDA DE PESO LOS ÚLTIMOS 3 MESES</h4>
            <ul>
              <li>0 MODERADA</li>
              <li>1 SÍ PIERDE</li>
              <li>2 NO PIERDE</li>
              <li>3 > 2 kg</li>
            </ul>
          </div>
          <div class="info-block">
            <h4>DISMINUCIÓN DE INGESTA LOS ÚLTIMOS 3 MESES</h4>
            <ul>
              <li>0 SEVERA</li>
              <li>1 MODERADA</li>
              <li>2 AUSENTE</li>
            </ul>
          </div>
        </div>

        <div class="info-grid mt-4">
          <div class="info-block">
            <h4>GRUPO DE EDAD</h4>
            <ul>
              <li>1 65-74</li>
              <li>2 75-84</li>
              <li>3 85-94</li>
              <li>4 > 95</li>
            </ul>
          </div>
          <div class="info-block">
            <h4>VIVE CON</h4>
            <ul>
              <li>1 FAMILIAR</li>
              <li>2 NO FAMILIAR</li>
              <li>3 SOLO</li>
              <li>4 INSTITUCIÓN</li>
            </ul>
          </div>
        </div>

        <div class="info-grid mt-4">
          <div class="info-block">
            <h4>APOYO DE LA RED SOCIAL</h4>
            <ul>
              <li>1 NO NECESITA</li>
              <li>2 DE FAMILIA O VECINOS</li>
              <li>3 FORMAL SUFICIENTE</li>
              <li>4 INFORMAL SUFICIENTE</li>
              <li>5 INFORMAL</li>
              <li>6 NO RECIBE NI NECESITA</li>
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

const fichaData = reactive({
  nombres: '',
  apellidos: '',
  lugar_aplicacion: '',
  comunidad_zona: '',
  fecha_nacimiento: '',
  cedula: '',
  sexo: '', // Masculino, Femenino
  cod_pno: '',
  fecha_aplicacion: '',
  firma_verificacion: '',
})

// Estructura de datos para las escalas, basada en tus imágenes
const scales = reactive({
  // ACT. BÁSICAS (Barthel)
  actividades_basicas: {
    comer: {
      label: 'COMER',
      value: null,
      options: { 0: 'Independiente', 5: 'Ayuda mínima', 10: 'Dependiente' },
    },
    lavarse: {
      label: 'LAVARSE',
      value: null,
      options: { 0: 'Independiente', 5: 'Ayuda mínima', 10: 'Dependiente' },
    },
    vestirse: {
      label: 'VESTIRSE',
      value: null,
      options: { 0: 'Independiente', 5: 'Ayuda mínima', 10: 'Dependiente' },
    },
    arreglarse: {
      label: 'ARREGLARSE',
      value: null,
      options: { 0: 'Independiente', 5: 'Ayuda mínima', 10: 'Dependiente' },
    },
    deposiciones: {
      label: 'DEPOSICIONES',
      value: null,
      options: { 0: 'Independiente', 5: 'Ayuda mínima', 10: 'Dependiente' },
    },
    micciones: {
      label: 'MICCIONES',
      value: null,
      options: { 0: 'Independiente', 5: 'Ayuda mínima', 10: 'Dependiente' },
    },
    usar_inodoro: {
      label: 'USAR INODORO',
      value: null,
      options: { 0: 'Independiente', 5: 'Ayuda mínima', 10: 'Dependiente' },
    },
    trasladarse: {
      label: 'TRASLADARSE',
      value: null,
      options: { 0: 'Independiente', 5: 'Ayuda mínima', 10: 'Dependiente' },
    },
    deambular: {
      label: 'DEAMBULAR',
      value: null,
      options: { 0: 'Independiente', 5: 'Ayuda mínima', 10: 'Dependiente' },
    },
    escaleras: {
      label: 'ESCALERAS',
      value: null,
      options: { 0: 'Independiente', 5: 'Ayuda mínima', 10: 'Dependiente' },
    },
  },
  // Computed property para sumar los valores de Actividades Básicas
  total_actividades_basicas: computed(() => {
    return Object.values(scales.actividades_basicas).reduce(
      (sum, item) => sum + (Number(item.value) || 0),
      0,
    )
  }),

  // ACT. INSTRUMENTAL (Lawton y Brody)
  actividad_instrumental: {
    uso_telefono: { label: 'USO DEL TELÉFONO', value: null, options: { 0: 'No', 1: 'Sí' } },
    ir_lugares: { label: 'IR A LUGARES', value: null, options: { 0: 'No', 1: 'Sí' } },
    hacer_compras: { label: 'HACER COMPRAS', value: null, options: { 0: 'No', 1: 'Sí' } },
    preparar_comida: { label: 'PREPARAR COMIDA', value: null, options: { 0: 'No', 1: 'Sí' } },
    manejo_medicamentos: {
      label: 'MANEJO MEDICAMENTOS',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    manejo_dinero: { label: 'MANEJO DINERO', value: null, options: { 0: 'No', 1: 'Sí' } },
    manejo_ropa: { label: 'MANEJO ROPA', value: null, options: { 0: 'No', 1: 'Sí' } },
    manejo_transporte: { label: 'MANEJO TRANSPORTE', value: null, options: { 0: 'No', 1: 'Sí' } },
  },
  // Computed property para sumar los valores de Actividad Instrumental
  total_actividad_instrumental: computed(() => {
    return Object.values(scales.actividad_instrumental).reduce(
      (sum, item) => sum + (Number(item.value) || 0),
      0,
    )
  }),

  // ESTADO COGNITIVO (Mini-Mental) - Basado en la primera imagen
  estado_cognitivo: {
    orientacion_tiempo: {
      label: 'ORIENTACIÓN TIEMPO (5)',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    orientacion_espacio: {
      label: 'ORIENTACIÓN ESPACIO (5)',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    fijacion: { label: 'FIJACIÓN (3)', value: null, options: { 0: 'No', 1: 'Sí' } },
    atencion_calculo: {
      label: 'ATENCIÓN Y CÁLCULO (5)',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    memoria: { label: 'MEMORIA (3)', value: null, options: { 0: 'No', 1: 'Sí' } },
    lenguaje_denominacion: {
      label: 'LENGUAJE DENOMINACIÓN (2)',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    lenguaje_repeticion: {
      label: 'LENGUAJE REPETICIÓN (1)',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    lenguaje_orden: { label: 'LENGUAJE ORDEN (3)', value: null, options: { 0: 'No', 1: 'Sí' } },
    lenguaje_escritura: {
      label: 'LENGUAJE ESCRITURA (1)',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    lenguaje_lectura: { label: 'LENGUAJE LECTURA (1)', value: null, options: { 0: 'No', 1: 'Sí' } },
    dibujo: { label: 'DIBUJO (1)', value: null, options: { 0: 'No', 1: 'Sí' } },
  },
  total_estado_cognitivo: computed(() => {
    return Object.values(scales.estado_cognitivo).reduce(
      (sum, item) => sum + (Number(item.value) || 0),
      0,
    )
  }),

  // DEPRESIÓN (Yesavage)
  depresion: {
    satisfecho_vida: {
      label: '¿Está satisfecho con su vida?',
      value: null,
      options: { 0: 'Sí', 1: 'No' },
    },
    actividades_interes: {
      label: '¿Ha disminuido su interés por actividades o aficiones?',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    vida_vacia: {
      label: '¿Siente que su vida está vacía?',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    aburrido: {
      label: '¿Se siente aburrido con frecuencia?',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    animado: {
      label: '¿Está de buen ánimo la mayor parte del tiempo?',
      value: null,
      options: { 0: 'Sí', 1: 'No' },
    },
    preocupado: {
      label: '¿Está preocupado o tiene miedo de que le pase algo?',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    feliz_mayor_parte: {
      label: '¿Se siente feliz la mayor parte del tiempo?',
      value: null,
      options: { 0: 'Sí', 1: 'No' },
    },
    abandonado: {
      label: '¿Se siente a menudo abandonado o desamparado?',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    prefiere_casa: {
      label: '¿Prefiere quedarse en casa a salir y hacer cosas nuevas?',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    problemas_memoria: {
      label: '¿Cree que tiene más problemas de memoria que la mayoría de la gente?',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    estar_vivo: {
      label: '¿Cree que es maravilloso estar vivo?',
      value: null,
      options: { 0: 'Sí', 1: 'No' },
    },
    util_valioso: {
      label: '¿Le cuesta iniciar nuevos proyectos?',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    lleno_energia: {
      label: '¿Se siente lleno de energía?',
      value: null,
      options: { 0: 'Sí', 1: 'No' },
    },
    sin_esperanza: {
      label: '¿Siente que su situación es desesperada?',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    mejor_gente: {
      label: '¿Cree que la mayoría de la gente está mejor que usted?',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
  },
  total_depresion: computed(() => {
    return Object.values(scales.depresion).reduce((sum, item) => sum + (Number(item.value) || 0), 0)
  }),

  // RIESGO SOCIAL (Génova) - Ajustado a lo que se ve en la imagen
  riesgo_social: {
    problemas_psicologico_emocional: {
      label: 'Prob. psicológico o emocional (GHQ-12 > 6 / GDS > 6 / MMSE < 24)',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    act_diarias_limitadas: {
      label: 'Act. Diarias limitadas (Barthel < 90 / Lawton < 8)',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    enfermedad_cronica: {
      label: 'Enfermedad crónica (Charlson > 3)',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    hospitalizacion_reciente: {
      label: 'Hospitalización en el último trimestre (Sí)',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    },
    dism_autonomia: {
      label: 'Disminución de autonomía (Sí)',
      value: null,
      options: { 0: 'No', 1: 'Sí' },
    }, // Esto no está claro en la imagen, asumo una opción
  },
  total_riesgo_social: computed(() => {
    return Object.values(scales.riesgo_social).reduce(
      (sum, item) => sum + (Number(item.value) || 0),
      0,
    )
  }),

  // RECURSO SOCIAL - Adaptado de la segunda imagen
  recurso_social: {
    situacion_familiar: {
      label: 'SITUACIÓN FAMILIAR',
      value: null,
      options: {
        1: 'FAMILIA O PAREJA SON CONFLICTOS',
        2: 'FAMILIA O PAREJA SIN CONFLICTOS',
        3: 'FAMILIA NO CUBRE NECESIDADES',
        4: 'SOLO, FAMILIA O SIN PAREJA',
        5: 'SOLO, DESATENDIDO, SIN FAMILIA',
      },
    },
    relaciones_contactos_sociales: {
      label: 'RELACIONES Y CONTACTOS SOCIALES',
      value: null,
      options: {
        1: 'CON TODOS, SALE',
        2: 'CON FAMILIA Y VECINOS SALE',
        3: 'CON FAMILIA Y VECINOS NO SALE',
        4: 'CON NADIE, NO SALE',
        5: 'CON AMIGOS DE TRANSPORTE',
        6: 'A PASEAR',
        7: 'NO CAMINA MUCHO, COGE ROPA',
        8: 'ASOCIACIÓN',
      },
    },
    apoyo_red_social: {
      label: 'APOYO DE LA RED SOCIAL',
      value: null,
      options: {
        1: 'NO NECESITA',
        2: 'DE FAMILIA O VECINOS',
        3: 'FORMAL SUFICIENTE',
        4: 'INFORMAL SUFICIENTE',
        5: 'INFORMAL',
        6: 'NO RECIBE NI NECESITA',
      },
    },
    vive_con: {
      label: 'VIVE CON',
      value: null,
      options: {
        1: 'FAMILIAR',
        2: 'NO FAMILIAR',
        3: 'SOLO',
        4: 'INSTITUCIÓN',
      },
    },
    grupo_edad: {
      label: 'GRUPO EDAD',
      value: null,
      options: {
        1: '65-74',
        2: '75-84',
        3: '85-94',
        4: '> 95',
      },
    },
  },
  total_recurso_social: computed(() => {
    // Para Recurso Social, no hay un "total" numérico como en otras escalas,
    // es más bien una selección de categorías. Dejamos el computed para evitar errores
    // pero su valor real dependerá de cómo se quiera "sumar" esta sección.
    // Podríamos devolver un objeto con los valores seleccionados.
    return 'N/A'
  }),

  // OTROS RIESGOS - Adaptado de la segunda imagen, parece que es un checkmark list, pero la primera imagen tiene radios.
  // Me baso en la primera imagen que tiene 4 checkboxes que suman a un total. Asumo que son radio buttons.
  otros_riesgos: {
    grupo_de_edad: {
      label: 'GRUPO DE EDAD',
      value: null,
      options: { 1: '1-64', 2: '65-74', 3: '75-84', 4: '85-94', 5: '>95' },
    },
    vive_con_quien: {
      label: 'VIVE CON',
      value: null,
      options: { 1: 'Solo', 2: 'Hijos', 3: 'Otros familiares', 4: 'Solo', 5: 'Institución' },
    },
    antecedentes_caidas: {
      label: 'ANTECEDENTES CAIDAS',
      value: null,
      options: { 1: 'No', 2: 'Sí' },
    },
    polifarmacia: {
      label: 'POLIFARMACIA', // Asumo este nombre por contexto
      value: null,
      options: { 1: 'No', 2: 'Sí' },
    },
  },
  total_otros_riesgos: computed(() => {
    // Similar al recurso social, este parece más cualitativo. Sumamos los valores si son numéricos.
    return Object.values(scales.otros_riesgos).reduce(
      (sum, item) => sum + (Number(item.value) || 0),
      0,
    )
  }),

  // ESCALAS RÁPIDAS - TINNET
  escalas_rapidas_tinnet: {
    equilibrio_sentado: {
      label: 'EQUILIBRIO SENTADO',
      value: null,
      options: { 0: 'Anormal', 1: 'Normal' },
    },
    levantarse: { label: 'LEVANTARSE', value: null, options: { 0: 'Anormal', 1: 'Normal' } },
    equilibrio_bipedestacion_inmediata: {
      label: 'EQUILIBRIO BIPEDESTACIÓN INMEDIATA (Primeros 5 segundos)',
      value: null,
      options: { 0: 'Anormal', 1: 'Normal' },
    },
    equilibrio_bipedestacion_pie: {
      label: 'EQUILIBRIO BIPEDESTACIÓN PIE (Con los pies juntos)',
      value: null,
      options: { 0: 'Anormal', 1: 'Normal' },
    },
    empuje_estrenal: {
      label: 'EMPUJE ESTRENAL (Sentarse)',
      value: null,
      options: { 0: 'Anormal', 1: 'Normal' },
    },
    giro_360: { label: 'GIRO 360°', value: null, options: { 0: 'Anormal', 1: 'Normal' } },
    equilibrio_tandem: {
      label: 'EQUILIBRIO TÁNDEM',
      value: null,
      options: { 0: 'Anormal', 1: 'Normal' },
    },
    caminar: {
      label: 'CAMINAR (Normal y seguro)',
      value: null,
      options: { 0: 'Anormal', 1: 'Normal' },
    },
    paso: {
      label: 'PASO (Longitud, elevación)',
      value: null,
      options: { 0: 'Anormal', 1: 'Normal' },
    },
    simetria_paso: { label: 'SIMETRÍA PASO', value: null, options: { 0: 'Anormal', 1: 'Normal' } },
    continuidad_paso: {
      label: 'CONTINUIDAD PASO',
      value: null,
      options: { 0: 'Anormal', 1: 'Normal' },
    },
    trayectoria: {
      label: 'TRAYECTORIA (Recta)',
      value: null,
      options: { 0: 'Anormal', 1: 'Normal' },
    },
    tronco: { label: 'TRONCO (Balanceo)', value: null, options: { 0: 'Anormal', 1: 'Normal' } },
    tiempo_marcha: {
      label: 'TIEMPO MARCHA (Segundos)',
      value: null,
      options: { 0: 'Anormal', 1: 'Normal' },
    },
  },
  total_escalas_rapidas_tinnet: computed(() => {
    return Object.values(scales.escalas_rapidas_tinnet).reduce(
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

  // Aquí puedes añadir validaciones adicionales si es necesario antes de enviar
  // Por ejemplo, verificar que todos los campos requeridos estén llenos.

  try {
    // Simular una llamada a API
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Espera 2 segundos

    console.log('Datos de la Ficha Médica:', JSON.parse(JSON.stringify(fichaData)))
    console.log('Resultados de Escalas:', JSON.parse(JSON.stringify(scales)))

    submitMessage.value = 'Ficha médica guardada exitosamente.'
    submitStatus.value = 'success'
    // Opcional: limpiar el formulario después de un envío exitoso
    // Object.keys(fichaData).forEach(key => fichaData[key] = '');
    // Object.keys(scales).forEach(scaleKey => {
    //   if (typeof scales[scaleKey] === 'object') {
    //     Object.keys(scales[scaleKey]).forEach(itemKey => {
    //       if (scales[scaleKey][itemKey].value !== undefined) {
    //         scales[scaleKey][itemKey].value = null;
    //       }
    //     });
    //   }
    // });
  } catch (error) {
    submitMessage.value = 'Error al guardar la ficha. Inténtalo de nuevo.'
    submitStatus.value = 'error'
    console.error('Error guardando ficha:', error)
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
  max-width: 900px; /* Ancho máximo más amplio para la ficha */
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
.faculty-name,
.program-name,
.department-name {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}
.department-name {
  font-weight: 600;
  margin-top: 10px; /* Espacio antes del título de la ficha */
  text-transform: uppercase;
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

.form-section {
  margin-bottom: 40px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 25px;
  background-color: var(--color-input-background-default); /* Fondo suave para la sección */
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

.subsection {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: #ffffff;
}

.subsection-title {
  font-size: 1.3rem;
  color: var(--color-text-primary);
  font-weight: 600;
  margin-bottom: 10px;
  text-align: left;
}

.subsection-description {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-bottom: 20px;
  text-align: left;
  font-style: italic;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* 2 columnas en pantallas grandes */
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

.form-group input[type="text"],
.form-group input[type="date"],
.form-group input[type="number"],
.form-group input[type="email"], /* aunque no hay email en la ficha, mantener consistencia */
.form-group input[type="password"], /* aunque no hay password en la ficha, mantener consistencia */
.form-group textarea {
  width: 100%;
  padding: 12px 15px; /* Menor padding para inputs simples de la ficha */
  border: 1px solid var(--color-input-border-default);
  border-radius: 8px; /* Ligeramente menos redondeado para más contenido */
  font-size: 1rem;
  color: var(--color-text-primary);
  background-color: var(--color-input-background-default);
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.form-group input[type='text']::placeholder,
.form-group input[type='date']::placeholder,
.form-group input[type='number']::placeholder,
.form-group textarea::placeholder {
  color: var(--color-input-placeholder);
  opacity: 1;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(var(--color-primary-rgb), 0.25);
  outline: none;
  background-color: #ffffff;
}

/* Estilos específicos para radio groups */
.radio-group {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  padding-top: 5px; /* Pequeño padding para alinear con labels */
}

.radio-group label {
  display: flex;
  align-items: center;
  font-weight: 500; /* Menor peso para las opciones de radio */
  margin-bottom: 0;
  cursor: pointer;
}

.radio-group input[type='radio'] {
  margin-right: 8px;
  accent-color: var(--color-accent-green); /* Color del radio button */
  width: 18px; /* Tamaño del radio button */
  height: 18px;
  cursor: pointer;
}

/* Estilos para las escalas (grids de opciones) */
.scale-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* Dos o más columnas */
  gap: 20px;
}

.scale-item {
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-light); /* Fondo para cada item de la escala */
  border-radius: 6px;
  padding: 15px;
  border: 1px solid var(--color-border);
}

.scale-item label {
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--color-primary-dark);
  font-size: 0.95rem;
}

.scale-item .radio-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.scale-item .radio-options label {
  display: flex;
  align-items: center;
  font-weight: 400; /* Más ligero para las opciones */
  color: var(--color-text-primary);
  cursor: pointer;
  margin-bottom: 0;
}

.scale-total {
  grid-column: 1 / -1; /* Ocupa todo el ancho en la última fila */
  background-color: var(--color-primary-light); /* Fondo diferente para el total */
  padding: 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.scale-total label {
  margin-bottom: 0;
  font-size: 1.1rem;
  color: var(--color-primary-dark);
  font-weight: 700;
}

.scale-total input {
  max-width: 100px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 700;
  background-color: #ffffff;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  pointer-events: none; /* No permitir edición manual */
}

/* Sección de Referencias de Puntajes */
.scoring-info-section {
  background-color: var(
    --color-primary-lightest
  ); /* Fondo muy claro para la sección de información */
  border-left: 5px solid var(--color-accent-green); /* Borde de acento */
  padding-right: 30px;
}

.scoring-info-section .section-title {
  color: var(--color-accent-green);
  border-bottom-color: rgba(var(--color-accent-green-rgb), 0.2);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 20px;
}

.info-block {
  background-color: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
  text-align: left;
}

.info-block h4 {
  font-size: 1.1rem;
  color: var(--color-primary-dark);
  font-weight: 600;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding-bottom: 8px;
}

.info-block ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-block ul li {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 5px;
}

.mt-4 {
  margin-top: 25px;
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
  margin-top: 30px; /* Más espacio antes del botón */
  box-shadow: 0 4px 10px rgba(var(--color-primary-rgb), 0.2);
  width: auto; /* Ajustar al contenido */
  display: block; /* Ocupar su propia línea */
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

  .subsection-title {
    font-size: 1.2rem;
  }

  .form-grid,
  .scale-grid,
  .info-grid {
    grid-template-columns: 1fr; /* Una columna en pantallas pequeñas */
  }

  .ficha-header {
    flex-direction: column;
    text-align: center;
  }

  .puce-logo {
    margin-bottom: 15px;
  }

  .scale-total {
    flex-direction: column;
    align-items: flex-start;
  }

  .scale-total input {
    width: 100%;
    max-width: unset;
    margin-top: 10px;
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
  .faculty-name,
  .program-name,
  .department-name {
    font-size: 0.8rem;
  }
  .section-title {
    font-size: 1.3rem;
    margin-bottom: 20px;
  }
  .subsection-title {
    font-size: 1.1rem;
  }
  .form-group input[type='text'],
  .form-group input[type='date'],
  .form-group input[type='number'],
  .form-group textarea {
    padding: 10px 12px;
    font-size: 0.9rem;
  }
  .form-group label {
    font-size: 0.85rem;
  }
}
</style>
