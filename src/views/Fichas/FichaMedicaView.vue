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

      <FichaSelector v-if="!isEditMode" v-model:idficha="form.idficha" />

      <div class="form-metadata">
        <div class="form-group inline-group">
          <label for="medNombreencuestador">Nombre del Encuestador:<span class="required">*</span></label>
          <input
            id="medNombreencuestador"
            v-model.trim="form.medNombreencuestador"
            type="text"
            placeholder="Ej. Dr. Juan Pérez"
            class="small-input"
            required
          />
        </div>
      </div>

      <section class="form-section">
        <h3 class="section-title">📋 Anamnesis y Revisión Actual</h3>
        <div class="form-group full-width">
          <label for="medAnamnesis">Anamnesis (Síntomas Actuales):<span class="required">*</span></label>
          <textarea
            id="medAnamnesis"
            v-model.trim="form.medAnamnesis"
            rows="4"
            placeholder="Escribe los síntomas relevantes que presenta el paciente actualmente, historia de la enfermedad actual."
            required
          ></textarea>
        </div>

        <div class="form-group full-width">
          <label for="medObservacionesrevact">Observaciones de Revisión Actual:</label>
          <textarea
            id="medObservacionesrevact"
            v-model.trim="form.medObservacionesrevact"
            rows="2"
            placeholder="Observaciones adicionales sobre la revisión de sistemas actual."
          ></textarea>
        </div>

        <div class="form-group full-width">
          <label for="medObservacionexamenes">Observaciones de Exámenes:</label>
          <textarea
            id="medObservacionexamenes"
            v-model.trim="form.medObservacionexamenes"
            rows="2"
            placeholder="Observaciones sobre exámenes de laboratorio o imágenes recientes."
          ></textarea>
        </div>

        <div class="form-group full-width">
          <label class="section-subtitle">Alertas:</label>
          <div class="checkbox-group form-grid">
            <label><input type="checkbox" v-model="form.alerta.alertCaida" /> Caída</label>
            <label><input type="checkbox" v-model="form.alerta.alertDismovilidad" /> Dismovilidad</label>
            <label><input type="checkbox" v-model="form.alerta.alertAstenia" /> Astenia</label>
            <label><input type="checkbox" v-model="form.alerta.alertDesorientacion" /> Desorientación</label>
            <label><input type="checkbox" v-model="form.alerta.alertComportamiento" /> Comportamiento</label>
          </div>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">🩺 Examen Sistémico</h3>
        <div class="form-group full-width">
          <label class="section-subtitle">Estado de Sistemas:</label>
          <div class="form-grid">
            <div class="form-group">
              <label for="exsOrgsentidos">Órganos de los Sentidos:</label>
              <select id="exsOrgsentidos" v-model="form.examensistemico.exsOrgsentidos">
                <option value="Normal">Normal</option>
                <option value="Alterado">Alterado</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exsRespiratorio">Respiratorio:</label>
              <select id="exsRespiratorio" v-model="form.examensistemico.exsRespiratorio">
                <option value="Normal">Normal</option>
                <option value="Alterado">Alterado</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exsCardiovascular">Cardiovascular:</label>
              <select id="exsCardiovascular" v-model="form.examensistemico.exsCardiovascular">
                <option value="Normal">Normal</option>
                <option value="Alterado">Alterado</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exsDigestivo">Digestivo:</label>
              <select id="exsDigestivo" v-model="form.examensistemico.exsDigestivo">
                <option value="Normal">Normal</option>
                <option value="Alterado">Alterado</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exsGenitourinario">Genitourinario:</label>
              <select id="exsGenitourinario" v-model="form.examensistemico.exsGenitourinario">
                <option value="Normal">Normal</option>
                <option value="Alterado">Alterado</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exsMusculoesqueletico">Músculo-esquelético:</label>
              <select id="exsMusculoesqueletico" v-model="form.examensistemico.exsMusculoesqueletico">
                <option value="Normal">Normal</option>
                <option value="Alterado">Alterado</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exsEndocrino">Endocrino:</label>
              <select id="exsEndocrino" v-model="form.examensistemico.exsEndocrino">
                <option value="Normal">Normal</option>
                <option value="Alterado">Alterado</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exsHemolinfatico">Hemolinfático:</label>
              <select id="exsHemolinfatico" v-model="form.examensistemico.exsHemolinfatico">
                <option value="Normal">Normal</option>
                <option value="Alterado">Alterado</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exsNeurologico">Neurológico:</label>
              <select id="exsNeurologico" v-model="form.examensistemico.exsNeurologico">
                <option value="Normal">Normal</option>
                <option value="Alterado">Alterado</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">🧍‍♂️ Examen Regional</h3>
        <div class="form-group full-width">
          <label class="section-subtitle">Regiones Evaluadas:</label>
          <div class="checkbox-group form-grid">
            <label><input type="checkbox" v-model="form.examenregional.exrPiel" /> Piel</label>
            <label><input type="checkbox" v-model="form.examenregional.exrCabeza" /> Cabeza</label>
            <label><input type="checkbox" v-model="form.examenregional.exrOjos" /> Ojos</label>
            <label><input type="checkbox" v-model="form.examenregional.exrOidos" /> Oídos</label>
            <label><input type="checkbox" v-model="form.examenregional.exrBoca" /> Boca</label>
            <label><input type="checkbox" v-model="form.examenregional.exrNariz" /> Nariz</label>
            <label><input type="checkbox" v-model="form.examenregional.exrCuello" /> Cuello</label>
            <label><input type="checkbox" v-model="form.examenregional.exrAxilamama" /> Axila y Mama</label>
            <label><input type="checkbox" v-model="form.examenregional.exrTorax" /> Tórax</label>
            <label><input type="checkbox" v-model="form.examenregional.exrAbdomen" /> Abdomen</label>
            <label><input type="checkbox" v-model="form.examenregional.exrColumna" /> Columna</label>
            <label><input type="checkbox" v-model="form.examenregional.exrPerine" /> Periné</label>
            <label><input type="checkbox" v-model="form.examenregional.exrMiembrossuper" /> Miembros Superiores</label>
            <label><input type="checkbox" v-model="form.examenregional.exrMiembrosinfer" /> Miembros Inferiores</label>
          </div>
        </div>
        <div class="form-group full-width">
          <label for="examenDescripcionGeneral"
            >Descripción Detallada del Examen Físico (General):</label
          >
          <textarea
            id="examenDescripcionGeneral"
            v-model.trim="form.medObservacionesrevact"
            rows="4"
            placeholder="Detalle hallazgos relevantes por sistemas/regiones, incluyendo signos vitales (presión arterial, pulso, respiración, temperatura), peso, talla, IMC si son pertinentes. Ej: Piel pálida, mucosas secas, abdomen blando, depresible, no doloroso a la palpación."
          ></textarea>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">📚 Antecedentes</h3>

        <div class="form-group full-width">
          <label class="section-subtitle">Antecedentes Patológicos:</label>
          <div class="checkbox-group form-grid">
            <label><input type="checkbox" v-model="form.patologico.patoDermatologico" /> Dermatológico</label>
            <label><input type="checkbox" v-model="form.patologico.patoVisuales" /> Visuales</label>
            <label><input type="checkbox" v-model="form.patologico.patoOtorrino" /> Otorrino</label>
            <label><input type="checkbox" v-model="form.patologico.patoEstomatologicos" /> Estomatológicos</label>
            <label><input type="checkbox" v-model="form.patologico.patoEndocrinos" /> Endocrinos</label>
            <label><input type="checkbox" v-model="form.patologico.patoCardiovasculares" /> Cardiovasculares</label>
            <label><input type="checkbox" v-model="form.patologico.patoRespiratorio" /> Respiratorio</label>
            <label><input type="checkbox" v-model="form.patologico.patoDigestivo" /> Digestivo</label>
            <label><input type="checkbox" v-model="form.patologico.patoNeurologico" /> Neurológico</label>
            <label><input type="checkbox" v-model="form.patologico.patoUrologico" /> Urológico</label>
            <label><input type="checkbox" v-model="form.patologico.patoHemolinfatico" /> Hemolinfático</label>
            <label><input type="checkbox" v-model="form.patologico.patoInfeccioso" /> Infeccioso</label>
            <label><input type="checkbox" v-model="form.patologico.patoOncologico" /> Oncológico</label>
            <label><input type="checkbox" v-model="form.patologico.patoMusculoesqueletico" /> Músculo-esquelético</label>
            <label><input type="checkbox" v-model="form.patologico.patoPsiquiatrico" /> Psiquiátrico</label>
            <label><input type="checkbox" v-model="form.patologico.patoQuirurgico" /> Quirúrgico</label>
          </div>
          <div class="form-group full-width">
            <label for="patoObservaciones">Observaciones Patológicas:</label>
            <textarea
              id="patoObservaciones"
              v-model.trim="form.patologico.patoObservaciones"
              rows="2"
              placeholder="Especifique enfermedades o condiciones no listadas."
            ></textarea>
          </div>
        </div>

        <div class="form-group full-width">
          <label class="section-subtitle">Antecedentes Familiares:</label>
          <div class="checkbox-group form-grid">
            <label><input type="checkbox" v-model="form.antecedentesfamiliares.afCardiopatias" /> Cardiopatías</label>
            <label><input type="checkbox" v-model="form.antecedentesfamiliares.afDiabetes" /> Diabetes</label>
            <label><input type="checkbox" v-model="form.antecedentesfamiliares.afHipertension" /> Hipertensión</label>
            <label><input type="checkbox" v-model="form.antecedentesfamiliares.afNeoplasia" /> Neoplasia</label>
            <label><input type="checkbox" v-model="form.antecedentesfamiliares.afAlzheimer" /> Alzheimer</label>
            <label><input type="checkbox" v-model="form.antecedentesfamiliares.afParkinson" /> Parkinson</label>
            <label><input type="checkbox" v-model="form.antecedentesfamiliares.afTuberculosis" /> Tuberculosis</label>
            <label><input type="checkbox" v-model="form.antecedentesfamiliares.afViolenciaintra" /> Violencia Intrafamiliar</label>
            <label><input type="checkbox" v-model="form.antecedentesfamiliares.afSindromecuidador" /> Síndrome del Cuidador</label>
          </div>
          <div class="form-group full-width">
            <label for="afObservaciones">Observaciones Familiares:</label>
            <textarea
              id="afObservaciones"
              v-model.trim="form.antecedentesfamiliares.afObservaciones"
              rows="2"
              placeholder="Especifique otros antecedentes familiares relevantes o detalles."
            ></textarea>
          </div>
        </div>

        <div class="form-group full-width">
          <label class="section-subtitle">Antecedentes Farmacológicos:</label>
          <div class="checkbox-group form-grid">
            <label><input type="checkbox" v-model="form.farmacologico.farAines" /> AINEs</label>
            <label><input type="checkbox" v-model="form.farmacologico.farAnalgesicos" /> Analgésicos</label>
            <div class="form-group">
              <label for="farAntidiabeticos">Antidiabéticos (nombre):</label>
              <input type="text" id="farAntidiabeticos" v-model.trim="form.farmacologico.farAntidiabeticos" placeholder="Ej. Metformin" />
            </div>
            <label><input type="checkbox" v-model="form.farmacologico.farAntihipertensivos" /> Antihipertensivos</label>
            <label><input type="checkbox" v-model="form.farmacologico.farAnticoagulantes" /> Anticoagulantes</label>
            <label><input type="checkbox" v-model="form.farmacologico.farPsicofarmacos" /> Psicofármacos</label>
            <label><input type="checkbox" v-model="form.farmacologico.farAntibioticos" /> Antibióticos</label>
            <label><input type="checkbox" v-model="form.farmacologico.farAlergias" /> Alergias</label>
            <label><input type="checkbox" v-model="form.farmacologico.farEfectosadversos" /> Efectos Adversos</label>
            <label><input type="checkbox" v-model="form.farmacologico.farPoliprescriptor" /> Poliprescriptor</label>
            <label><input type="checkbox" v-model="form.farmacologico.farPolifarmacia" /> Polifarmacia</label>
            <label><input type="checkbox" v-model="form.farmacologico.farOtros" /> Otros</label>
          </div>
          <div class="form-group full-width">
            <label for="farObservaciones">Observaciones Farmacológicas:</label>
            <textarea
              id="farObservaciones"
              v-model.trim="form.farmacologico.farObservaciones"
              rows="2"
              placeholder="Especifique medicamentos actuales, alergias no listadas o interacciones relevantes."
            ></textarea>
          </div>
        </div>

        <div class="form-group full-width">
          <label class="section-subtitle">Hábitos Nocivos:</label>
          <div class="checkbox-group form-grid">
            <label><input type="checkbox" v-model="form.habitosnocivos.nocTabaquismo" /> Tabaquismo</label>
            <label><input type="checkbox" v-model="form.habitosnocivos.nocAlcoholismo" /> Alcoholismo</label>
            <label><input type="checkbox" v-model="form.habitosnocivos.nocAdicciones" /> Adicciones</label>
            <label><input type="checkbox" v-model="form.habitosnocivos.nocOtros" /> Otros</label>
          </div>
          <div class="form-group full-width">
            <label for="nocObservaciones">Observaciones Hábitos Nocivos:</label>
            <textarea
              id="nocObservaciones"
              v-model.trim="form.habitosnocivos.nocObservaciones"
              rows="2"
              placeholder="Especifique otros hábitos o detalles relevantes."
            ></textarea>
          </div>
        </div>

        <div class="form-group full-width">
          <label class="section-subtitle">Antecedentes Ginecológicos (si aplica):</label>
          <div class="form-grid">
            <div class="form-group">
              <label for="ginEdadmenopausia">Edad Menopausia:</label>
              <input type="number" id="ginEdadmenopausia" v-model.number="form.ginecologico.ginEdadmenopausia" min="0" />
            </div>
            <div class="form-group">
              <label for="ginEdadultmamografia">Edad Última Mamografía:</label>
              <input type="number" id="ginEdadultmamografia" v-model.number="form.ginecologico.ginEdadultmamografia" min="0" />
            </div>
            <div class="form-group">
              <label for="ginEdadultcitologia">Edad Última Citología:</label>
              <input type="number" id="ginEdadultcitologia" v-model.number="form.ginecologico.ginEdadultcitologia" min="0" />
            </div>
            <div class="form-group">
              <label for="ginCantembarazos">Cantidad Embarazos:</label>
              <input type="number" id="ginCantembarazos" v-model.number="form.ginecologico.ginCantembarazos" min="0" />
            </div>
            <div class="form-group">
              <label for="ginCantpartos">Cantidad Partos:</label>
              <input type="number" id="ginCantpartos" v-model.number="form.ginecologico.ginCantpartos" min="0" />
            </div>
            <div class="form-group">
              <label for="ginCantcesareas">Cantidad Cesáreas:</label>
              <input type="number" id="ginCantcesareas" v-model.number="form.ginecologico.ginCantcesareas" min="0" />
            </div>
            <label><input type="checkbox" v-model="form.ginecologico.ginTerapiahormonal" /> Terapia Hormonal</label>
          </div>
          <div class="form-group full-width">
            <label for="ginObservaciones">Observaciones Ginecológicas:</label>
            <textarea
              id="ginObservaciones"
              v-model.trim="form.ginecologico.ginObservaciones"
              rows="2"
              placeholder="Historial de embarazos, partos, cesáreas, menopausia, etc."
            ></textarea>
          </div>
        </div>

        <div class="form-group full-width">
          <label class="section-subtitle">Antecedentes Andrológicos (si aplica):</label>
          <div class="form-grid">
            <div class="form-group">
              <label for="andEdadultantigeno">Edad Último Antígeno Prostático:</label>
              <input type="number" id="andEdadultantigeno" v-model.number="form.andrologico.andEdadultantigeno" min="0" />
            </div>
            <label><input type="checkbox" v-model="form.andrologico.andTerapiahormonal" /> Terapia Hormonal</label>
          </div>
          <div class="form-group full-width">
            <label for="andObservaciones">Observaciones Andrológicas:</label>
            <textarea
              id="andObservaciones"
              v-model.trim="form.andrologico.andObservaciones"
              rows="2"
              placeholder="PSA control, observaciones relevantes."
            ></textarea>
          </div>
        </div>

        <div class="form-group full-width">
          <label class="section-subtitle">Estado General y Hábitos Saludables:</label>
          <div class="checkbox-group form-grid">
            <label><input type="checkbox" v-model="form.general.genVacunascompletas" /> Vacunas Completas</label>
            <label><input type="checkbox" v-model="form.general.genHigienecuerpo" /> Higiene Corporal</label>
            <label><input type="checkbox" v-model="form.general.genControlsalud" /> Control de Salud Regular</label>
            <label><input type="checkbox" v-model="form.general.genHigieneoral" /> Higiene Oral</label>
            <label><input type="checkbox" v-model="form.general.genActrecreativa" /> Actividad Recreativa</label>
            <label><input type="checkbox" v-model="form.general.genOtrossaludables" /> Otros Hábitos Saludables</label>
          </div>
          <div class="form-group full-width">
            <label for="genObservaciones">Observaciones Generales:</label>
            <textarea
              id="genObservaciones"
              v-model.trim="form.general.genObservaciones"
              rows="2"
              placeholder="Observaciones sobre el estado general y hábitos de salud."
            ></textarea>
          </div>
        </div>

        <div class="form-group full-width">
          <label class="section-subtitle">Síndromes Geriátricos:</label>
          <div class="checkbox-group form-grid">
            <label><input type="checkbox" v-model="form.sindromesgeriatricos.sgFragilidad" /> Fragilidad</label>
            <label><input type="checkbox" v-model="form.sindromesgeriatricos.sgDismovilidad" /> Dismovilidad</label>
            <label><input type="checkbox" v-model="form.sindromesgeriatricos.sgDepresion" /> Depresión</label>
            <label><input type="checkbox" v-model="form.sindromesgeriatricos.sgCaida" /> Caída</label>
            <label><input type="checkbox" v-model="form.sindromesgeriatricos.sgDelirio" /> Delirio</label>
            <label><input type="checkbox" v-model="form.sindromesgeriatricos.sgMalnutricion" /> Malnutrición</label>
            <label><input type="checkbox" v-model="form.sindromesgeriatricos.sgUlceraspresion" /> Úlceras por Presión</label>
            <label><input type="checkbox" v-model="form.sindromesgeriatricos.sgDemencia" /> Demencia</label>
            <label><input type="checkbox" v-model="form.sindromesgeriatricos.sgIncontinencia" /> Incontinencia</label>
            <label><input type="checkbox" v-model="form.sindromesgeriatricos.sgIatrogenia" /> Iatrogenia</label>
          </div>
        </div>

      </section>

      <section class="form-section">
        <h3 class="section-title">🔍 Diagnóstico</h3>
        <div class="form-group full-width">
          <label for="diagDiagnostico">Diagnóstico Médico:<span class="required">*</span></label>
          <textarea
            id="diagDiagnostico"
            v-model.trim="form.diagnostico.diagDiagnostico"
            rows="2"
            placeholder="Diagnóstico principal. Ej: Diabetes Mellitus Tipo 2, Hipertensión Arterial Esencial."
            required
          ></textarea>
        </div>
        <div class="form-group full-width">
          <label for="diagPresundefini">Presentación Definición:</label>
          <select id="diagPresundefini" v-model="form.diagnostico.diagPresundefini">
            <option value="">Seleccionar</option>
            <option value="Definitivo">Definitivo</option>
            <option value="Presuntivo">Presuntivo</option>
          </select>
        </div>
        <div class="form-group full-width">
          <label for="diagCie">Código CIE-10:</label>
          <input
            id="diagCie"
            v-model.trim="form.diagnostico.diagCie"
            type="text"
            placeholder="Ej: E11.9, I10"
          />
        </div>
        <div class="form-group full-width">
          <label for="diagClinicocindromico">Clínico Sindrómico:</label>
          <input
            id="diagClinicocindromico"
            v-model.trim="form.diagnostico.diagClinicocindromico"
            type="text"
            placeholder="Ej: Metabólico, Cardiovascular"
          />
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">📌 Plan de Manejo Integral</h3>
        <div class="form-group full-width">
          <label for="medPlanintegral"
            >Descripción del Plan de Manejo:<span class="required">*</span></label
          >
          <textarea
            id="medPlanintegral"
            v-model.trim="form.medPlanintegral"
            rows="4"
            placeholder="Describe el plan de seguimiento, medicación prescrita, intervenciones de enfermería, educación al paciente y familia, referencias a otros especialistas, etc. Ej: Control de glicemia capilar diario, dieta baja en sal, caminata 30 min/día."
            required
          ></textarea>
        </div>
      </section>

      <button type="submit" class="submit-button" :disabled="isSubmitting" @click="handleSubmit">
        {{ isSubmitting ? 'Guardando...' : (isEditMode ? 'Actualizar Ficha Médica' : 'Guardar Ficha Médica') }}
      </button>

      <p v-if="submitMessage" :class="['submit-info', submitStatus]">
        {{ submitMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import FichaSelector from '@/components/FichaSelector.vue'

const form = reactive({
  idmedicina: null, // Add ID field for editing
  idficha: null,
  medNombreencuestador: '',
  medAnamnesis: '',
  medObservacionesrevact: '',
  medObservacionexamenes: '',
  medPlanintegral: '',
  alerta: {
    alertCaida: false,
    alertDismovilidad: false,
    alertAstenia: false,
    alertDesorientacion: false,
    alertComportamiento: false,
  },
  andrologico: {
    andEdadultantigeno: null,
    andTerapiahormonal: false,
    andObservaciones: '',
  },
  antecedentesfamiliares: {
    afCardiopatias: false,
    afDiabetes: false,
    afHipertension: false,
    afNeoplasia: false,
    afAlzheimer: false,
    afParkinson: false,
    afTuberculosis: false,
    afViolenciaintra: false,
    afSindromecuidador: false,
    afObservaciones: '',
  },
  diagnostico: {
    diagDiagnostico: '',
    diagPresundefini: '',
    diagCie: '',
    diagClinicocindromico: '',
  },
  examenregional: {
    exrPiel: false,
    exrCabeza: false,
    exrOjos: false,
    exrOidos: false,
    exrBoca: false,
    exrNariz: false,
    exrCuello: false,
    exrAxilamama: false,
    exrTorax: false,
    exrAbdomen: false,
    exrColumna: false,
    exrPerine: false,
    exrMiembrossuper: false,
    exrMiembrosinfer: false,
  },
  examensistemico: {
    exsOrgsentidos: 'Normal',
    exsRespiratorio: 'Normal',
    exsCardiovascular: 'Normal',
    exsDigestivo: 'Normal',
    exsGenitourinario: 'Normal',
    exsMusculoesqueletico: 'Normal',
    exsEndocrino: 'Normal',
    exsHemolinfatico: 'Normal',
    exsNeurologico: 'Normal',
  },
  farmacologico: {
    farAines: false,
    farAnalgesicos: false,
    farAntidiabeticos: '',
    farAntihipertensivos: false,
    farAnticoagulantes: false,
    farPsicofarmacos: false,
    farAntibioticos: false,
    farAlergias: false,
    farEfectosadversos: false,
    farPoliprescriptor: false,
    farPolifarmacia: false,
    farOtros: false,
    farObservaciones: '',
  },
  general: {
    genVacunascompletas: false,
    genHigienecuerpo: false,
    genControlsalud: false,
    genHigieneoral: false,
    genActrecreativa: false,
    genOtrossaludables: false,
    genObservaciones: '',
  },
  ginecologico: {
    ginEdadmenopausia: null,
    ginEdadultmamografia: null,
    ginEdadultcitologia: null,
    ginCantembarazos: null,
    ginCantpartos: null,
    ginCantcesareas: null,
    ginTerapiahormonal: false,
    ginObservaciones: '',
  },
  habitosnocivos: {
    nocTabaquismo: false,
    nocAlcoholismo: false,
    nocAdicciones: false,
    nocOtros: false,
    nocObservaciones: '',
  },
  patologico: {
    patoDermatologico: false,
    patoVisuales: false,
    patoOtorrino: false,
    patoEstomatologicos: false,
    patoEndocrinos: false,
    patoCardiovasculares: false,
    patoRespiratorio: false,
    patoDigestivo: false,
    patoNeurologico: false,
    patoUrologico: false,
    patoHemolinfatico: false,
    patoInfeccioso: false,
    patoOncologico: false,
    patoMusculoesqueletico: false,
    patoPsiquiatrico: false,
    patoQuirurgico: false,
    patoObservaciones: null,
  },
  revisionactual: {
    revactVision: false,
    revactAudicion: false,
    revactOlfatogusto: false,
    revactRespiratorio: false,
    revactCardiovascular: false,
    revactDigestivo: false,
    revactGenital: false,
    revactUrinario: false,
    revactMusculoesqueletico: false,
    revactEndocrino: false,
    revactHemolinf: false,
    revactNervioso: false,
    revactMetabolico: false,
    revactObservaciones: null,
  },
  sindromesgeriatricos: {
    sgFragilidad: false,
    sgDismovilidad: false,
    sgDepresion: false,
    sgCaida: false,
    sgDelirio: false,
    sgMalnutricion: false,
    sgUlceraspresion: false,
    sgDemencia: false,
    sgIncontinencia: false,
    sgIatrogenia: false,
  },
})

const route = useRoute()
const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref('')
const isEditMode = ref(false)

const mapApiDataToForm = (data) => {
  // Simple fields
  form.idmedicina = data.idmedicina
  form.idficha = data.idficha
  form.medNombreencuestador = data.medNombreencuestador
  form.medAnamnesis = data.medAnamnesis
  form.medObservacionesrevact = data.medObservacionesrevact
  form.medObservacionexamenes = data.medObservacionexamenes
  form.medPlanintegral = data.medPlanintegral

  // Map boolean fields (1/0 to true/false) and other nested data
  const mapBooleans = (source, target) => {
    for (const key in source) {
      if (typeof source[key] === 'number') {
        target[key] = source[key] === 1
      }
    }
  }

  mapBooleans(data.alerta, form.alerta)
  form.andrologico.andEdadultantigeno = data.andrologico.andEdadultantigeno
  form.andrologico.andTerapiahormonal = data.andrologico.andTerapiahormonal === 1
  form.andrologico.andObservaciones = data.andrologico.andObservaciones || 'N/A';
  mapBooleans(data.antecedentesfamiliares, form.antecedentesfamiliares)
  form.antecedentesfamiliares.afObservaciones = data.antecedentesfamiliares.afObservaciones
  form.diagnostico.diagDiagnostico = data.diagnostico.diagDiagnostico
  form.diagnostico.diagPresundefini = data.diagnostico.diagPresundefini
  form.diagnostico.diagCie = data.diagnostico.diagCie
  form.diagnostico.diagClinicocindromico = data.diagnostico.diagClinicocindromico
  mapBooleans(data.examenregional, form.examenregional)
  Object.assign(form.examensistemico, data.examensistemico)
  mapBooleans(data.farmacologico, form.farmacologico)
  form.farmacologico.farAntidiabeticos = data.farmacologico.farAntidiabeticos
  form.farmacologico.farObservaciones = data.farmacologico.farObservaciones
  mapBooleans(data.general, form.general)
  form.general.genObservaciones = data.general.genObservaciones
  Object.assign(form.ginecologico, {
    ginEdadmenopausia: data.ginecologico.ginEdadmenopausia,
    ginEdadultmamografia: data.ginecologico.ginEdadultmamografia,
    ginEdadultcitologia: data.ginecologico.ginEdadultcitologia,
    ginCantembarazos: data.ginecologico.ginCantembarazos,
    ginCantpartos: data.ginecologico.ginCantpartos,
    ginCantcesareas: data.ginecologico.ginCantcesareas,
    ginTerapiahormonal: data.ginecologico.ginTerapiahormonal === 1,
    ginObservaciones: data.ginecologico.ginObservaciones,
  })
  mapBooleans(data.habitosnocivos, form.habitosnocivos)
  form.habitosnocivos.nocObservaciones = data.habitosnocivos.nocObservaciones
  mapBooleans(data.patologico, form.patologico)
  form.patologico.patoObservaciones = data.patologico.patoObservaciones
  mapBooleans(data.revisionactual, form.revisionactual)
  form.revisionactual.revactObservaciones = data.revisionactual.revactObservaciones
  mapBooleans(data.sindromesgeriatricos, form.sindromesgeriatricos)
}

// CORRECTED mapFormToApiPayload
const mapFormToApiPayload = (source) => {
  const payload = {}
  for (const key in source) {
    if (key === 'idmedicina') {
      // Do not include top-level ID in payload for PATCH, it's in the URL
      continue
    }
    if (typeof source[key] === 'object' && source[key] !== null) {
      payload[key] = {}
      for (const subKey in source[key]) {
        // Exclude idmedicina from nested objects
        if (subKey === 'idmedicina') {
          continue
        }
        if (typeof source[key][subKey] === 'boolean') {
          // Send as true/false as per error message
          payload[key][subKey] = source[key][subKey]
        } else {
          payload[key][subKey] = source[key][subKey]
        }
      }
    } else {
      payload[key] = source[key]
    }
  }
  return payload
}

onMounted(async () => {
  const idmedicina = route.params.id
  if (idmedicina) {
    isEditMode.value = true
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/api/medicina/${idmedicina}`)
      mapApiDataToForm(response.data)
    } catch (error) {
      console.error('Error al cargar la ficha médica:', error)
      submitMessage.value = 'Error al cargar la ficha médica para editar.'
      submitStatus.value = 'error'
    }
  }
})

const validateForm = () => {
  submitMessage.value = ''
  submitStatus.value = ''
  // idficha is not required in edit mode
  if (!isEditMode.value && !form.idficha) {
    submitMessage.value = 'Debe seleccionar una ficha médica.'
    submitStatus.value = 'error'
    return false
  }
  if (!form.medNombreencuestador.trim()) {
    submitMessage.value = 'El nombre del encuestador es requerido.'
    submitStatus.value = 'error'
    return false
  }
  if (!form.medAnamnesis.trim()) {
    submitMessage.value = 'La anamnesis (síntomas actuales) es requerida.'
    submitStatus.value = 'error'
    return false
  }
  if (!form.medPlanintegral.trim()) {
    submitMessage.value = 'El plan de manejo integral es requerido.'
    submitStatus.value = 'error'
    return false
  }
  if (!form.diagnostico.diagDiagnostico.trim()) {
    submitMessage.value = 'El diagnóstico médico es requerido.'
    submitStatus.value = 'error'
    return false
  }

  return true
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }
  if (!form.andrologico.andObservaciones?.trim()) {
    form.andrologico.andObservaciones = 'N/A';
  }

  isSubmitting.value = true

  // For PATCH, we need to handle the payload carefully
  let payload
  let url = `${import.meta.env.VITE_URL_BACKEND}/api/medicina`

  if (isEditMode.value) {
    payload = mapFormToApiPayload(form)
    url = `${url}/${form.idmedicina}`
  } else {
    payload = mapFormToApiPayload(form) // Use the same mapping for new records
  }

  try {
    let response
    if (isEditMode.value) {
      response = await axios.patch(url, payload)
      console.log('Respuesta de actualización:', response.data)
      submitMessage.value = '¡Ficha médica actualizada correctamente!'
      submitStatus.value = 'success'
    } else {
      response = await axios.post(url, payload)
      console.log('Respuesta de creación:', response.data)
      submitMessage.value = '¡Ficha médica guardada correctamente!'
      submitStatus.value = 'success'
    }
  } catch (error) {
    console.error('Error al guardar/actualizar la ficha médica:', error)
    submitMessage.value = 'Ocurrió un error. Por favor, intente de nuevo.'
    submitStatus.value = 'error'
    if (error.response && error.response.data && error.response.data.message) {
      submitMessage.value += ` Detalles: ${error.response.data.message}`
    } else if (error.message) {
      submitMessage.value += ` Detalles: ${error.message}`
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
<style scoped>
/* Estilos CSS (sin cambios) */
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
  display: block;
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

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding-top: 5px;
  margin-bottom: 15px;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  margin-bottom: 0;
  cursor: pointer;
  font-weight: 500;
  color: var(--color-text-primary);
  flex: 0 0 auto;
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
  margin-bottom: 20px;
}
.form-group.full-width .form-grid {
  grid-template-columns: repeat(
    auto-fit,
    minmax(250px, 1fr)
  );
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

.required {
  color: var(--color-error);
  margin-left: 4px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 15px;
  flex-wrap: wrap;
}

.add-remove-button {
  background-color: var(--color-accent-green);
  color: var(--color-text-light);
  padding: 8px 15px;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-remove-button:hover {
  background-color: var(--color-accent-green-dark);
}

.add-remove-button.remove {
  background-color: var(--color-error);
}

.add-remove-button.remove:hover {
  background-color: var(--color-error-dark);
}

.titulo-search {
  width: 100%;
  padding: 2rem;
}

.search-section {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 30px;
  background: var(--color-primary-light, #f5f8fa);
  padding: 18px 24px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(var(--color-primary-rgb, 52, 120, 99), 0.07);
}

.search-section input.small-input {
  border: 1.5px solid var(--color-primary);
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 1.05rem;
  background: var(--color-input-background-default, #fff);
  color: var(--color-text-primary);
  transition: border-color 0.2s;
  min-width: 200px;
}

.search-section input.small-input:focus {
  border-color: var(--color-accent-green);
  outline: none;
  background: #fff;
}

.results-section {
  margin-bottom: 35px;
  overflow-x: auto;
  background: var(--color-input-background-default, #fff);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(var(--color-primary-rgb, 52, 120, 99), 0.07);
  padding: 18px 0 0 0;
}

.results-section table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  background: transparent;
}

.results-section th,
.results-section td {
  padding: 12px 14px;
  text-align: left;
}

.results-section th {
  background: var(--color-primary-light, #f5f8fa);
  color: var(--color-primary-dark, #2d5c4d);
  font-weight: 700;
  border-bottom: 2px solid var(--color-accent-green, #7ed957);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.results-section tr {
  transition: background 0.15s;
}

.results-section tbody tr:hover {
  background: var(--color-primary-light, #f5f8fa);
}

.results-section td {
  border-bottom: 1px solid var(--color-border, #e0e0e0);
  color: var(--color-text-primary);
}

.results-section td:last-child {
  text-align: center;
}

.add-remove-button {
  background-color: var(--color-accent-green, #7ed957);
  color: var(--color-text-light, #fff);
  padding: 7px 16px;
  border: none;
  border-radius: 6px;
  font-size: 0.97rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin: 0;
}

.add-remove-button:hover {
  background-color: var(--color-accent-green-dark, #5bbf3a);
}

.ficha-card > .results-section + div {
  margin-bottom: 25px;
  margin-top: 8px;
  font-size: 1.08rem;
  color: var(--color-primary-dark, #2d5c4d);
  background: #eafaf1;
  border-radius: 7px;
  padding: 8px 16px;
  display: inline-block;
}

@media (max-width: 700px) {
  .results-section table,
  .results-section thead,
  .results-section tbody,
  .results-section th,
  .results-section td,
  .results-section tr {
    display: block;
  }
  .results-section thead {
    display: none;
  }
  .results-section tr {
    margin-bottom: 18px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(var(--color-primary-rgb, 52, 120, 99), 0.08);
    background: #fff;
    padding: 10px 0;
  }
  .results-section td {
    border: none;
    padding: 10px 16px;
    position: relative;
  }
  .results-section td:before {
    content: attr(data-label);
    font-weight: 700;
    color: var(--color-primary-dark, #2d5c4d);
    display: block;
    margin-bottom: 4px;
    text-transform: uppercase;
    font-size: 0.93em;
    letter-spacing: 0.02em;
  }
}

@media (max-width: 1250px) {
  .ficha-card {
    max-width: 980px;
    padding: 35px 40px;
  }
  .form-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
  .form-group.full-width .form-grid {
    grid-template-columns: repeat(
      auto-fit,
      minmax(220px, 1fr)
    );
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
  .form-group.full-width .form-grid {
    grid-template-columns: 1fr;
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
  .checkbox-group.form-grid {
    grid-template-columns: 1fr;
    gap: 10px;
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
  .form-grid {
    grid-template-columns: 1fr;
  }
  .form-group.full-width .form-grid {
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
  .button-group {
    flex-direction: column;
    gap: 5px;
  }
  .add-remove-button {
    width: 100%;
  }
  .add-remove-button.remove {
    margin-left: 0;
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
