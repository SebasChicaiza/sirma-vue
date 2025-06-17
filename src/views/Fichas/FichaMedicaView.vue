<script setup>
import { reactive } from 'vue'

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
  alertas: [],
  revisionSistemas: [],
  sintomasActuales: '',
  antecedentesPersonales: '',
  habitos: '',
  farmaco: '',
  patologicos: '',
  ginecoObstetricos: '',
  antecedentesFamiliares: '',
  examenFisico: [],
  examenDescripcion: '',
  diagnosticosMedicos: [],
  diagnosticosEnfermeria: ['', '', '', '', ''],
  planManejo: '',
})
</script>

<template>
  <div class="form-container">
    <header class="header">
      <div>
        <strong>PUCE</strong><br />
        PONTIFICIA UNIVERSIDAD CATÓLICA DEL ECUADOR<br />
        FICHA MEDICA DEL PACIENTE
      </div>
      <div class="header-right">
        <label>Ficha Evaluador:</label>
        <input v-model="form.nombreEvaluador" type="text" placeholder="Ej. Juan Pérez" />
      </div>
    </header>

    <!-- Datos Generales -->
    <section class="section">
      <h2 class="section-title">🧍 Datos Generales</h2>
      <div class="grid-form">
        <label>Fecha primer contacto</label>
        <input v-model="form.fechaContacto" type="date" />
        <label>Comunidad</label>
        <input v-model="form.comunidad" type="text" />
        <label>Zona</label>
        <input v-model="form.zona" type="text" />
        <label>Nombres</label>
        <input v-model="form.nombres" type="text" />
        <label>Apellidos</label>
        <input v-model="form.apellidos" type="text" />
        <label>Cédula</label>
        <input v-model="form.cedula" type="text" />
        <label>Fecha de nacimiento</label>
        <input v-model="form.fechaNacimiento" type="date" />
        <label>Edad</label>
        <input v-model="form.edad" type="number" min="0" />
        <label>Sexo</label>
        <select v-model="form.sexo">
          <option disabled value="">Seleccionar</option>
          <option value="Femenino">Femenino</option>
          <option value="Masculino">Masculino</option>
        </select>
      </div>
    </section>

    <!-- Estado General y Revisión de Sistemas -->
    <section class="section">
      <h2 class="section-title">📋 Estado General y Revisión Actual de Sistemas</h2>
      <label>Estado General</label>
      <input v-model="form.estadoGeneral" type="text" placeholder="Ej. Bueno, Regular, etc." />
      <label>Alertas (selección múltiple)</label>
      <div class="grid-form">
        <label><input type="checkbox" value="Visual" v-model="form.alertas" /> Visual</label>
        <label><input type="checkbox" value="Auditiva" v-model="form.alertas" /> Auditiva</label>
        <label><input type="checkbox" value="Caídas" v-model="form.alertas" /> Caídas</label>
        <label><input type="checkbox" value="Cognitiva" v-model="form.alertas" /> Cognitiva</label>
      </div>
      <label>Revisión de sistemas</label>
      <div class="grid-form">
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
      <label>Síntomas actuales</label>
      <textarea
        v-model="form.sintomasActuales"
        rows="3"
        placeholder="Escribe los síntomas relevantes aquí..."
      ></textarea>
    </section>

    <!-- Antecedentes y hábitos -->
    <section class="section">
      <h2 class="section-title">📚 Antecedentes y Hábitos</h2>
      <label>Antecedentes personales</label>
      <textarea v-model="form.antecedentesPersonales" rows="2" />
      <label>Hábitos nocivos</label>
      <textarea v-model="form.habitos" rows="2" />
      <label>Farmacológicos</label>
      <textarea v-model="form.farmaco" rows="2" />
      <label>Patológicos</label>
      <textarea v-model="form.patologicos" rows="2" />
      <label>Gineco-obstétricos</label>
      <textarea v-model="form.ginecoObstetricos" rows="2" />
    </section>

    <!-- Familiares -->
    <section class="section">
      <h2 class="section-title">👪 Antecedentes Familiares y Sociales</h2>
      <textarea
        v-model="form.antecedentesFamiliares"
        rows="3"
        placeholder="Ej. Diabetes, hipertensión, etc."
      />
    </section>

    <!-- Examen físico -->
    <section class="section">
      <h2 class="section-title">🧍‍♂️ Examen Físico</h2>
      <div class="grid-form">
        <label><input type="checkbox" value="Cabeza" v-model="form.examenFisico" /> Cabeza</label>
        <label><input type="checkbox" value="Cuello" v-model="form.examenFisico" /> Cuello</label>
        <label><input type="checkbox" value="Tórax" v-model="form.examenFisico" /> Tórax</label>
        <label><input type="checkbox" value="Abdomen" v-model="form.examenFisico" /> Abdomen</label>
        <label
          ><input type="checkbox" value="Extremidades" v-model="form.examenFisico" />
          Extremidades</label
        >
        <label><input type="checkbox" value="Columna" v-model="form.examenFisico" /> Columna</label>
      </div>
      <label>Descripción del examen</label>
      <textarea v-model="form.examenDescripcion" rows="4" />
    </section>

    <!-- Diagnóstico -->
    <section class="section">
      <h2 class="section-title">🔍 Diagnóstico</h2>
      <label>Diagnósticos médicos</label>
      <textarea v-model="form.diagnosticosMedicos" rows="2" />
      <label>Diagnósticos de enfermería</label>
      <div class="grid-form">
        <input
          v-for="(item, index) in form.diagnosticosEnfermeria"
          :key="index"
          v-model="form.diagnosticosEnfermeria[index]"
          placeholder="Diagnóstico {{ index + 1 }}"
        />
      </div>
    </section>

    <!-- Plan de manejo -->
    <section class="section">
      <h2 class="section-title">📌 Plan de Manejo Integral</h2>
      <textarea
        v-model="form.planManejo"
        rows="4"
        placeholder="Describe el plan de seguimiento, medicación, etc."
      />
    </section>
  </div>
</template>
