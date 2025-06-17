<script setup>
import { reactive } from 'vue'
import '@/assets/styles/fichas.css'

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
</script>

<template>
  <div class="form-container">
    <header class="header">
      <div>
        <strong>PUCE</strong><br />
        PONTIFICIA UNIVERSIDAD CATÓLICA DEL ECUADOR<br />
        FICHA GENERAL DEL PACIENTE
      </div>
      <div class="header-right">
        <label for="numeroFicha">Ficha N°</label>
        <input id="numeroFicha" v-model="form.numeroFicha" type="text" placeholder="0001" />
      </div>
    </header>

    <section class="section">
      <h2 class="section-title">🧍 Datos del Paciente</h2>
      <div class="grid-form">
        <label>Fecha contacto</label>
        <input v-model="form.fechaContacto" type="date" />
        <label>Comunidad</label>
        <input v-model="form.comunidad" type="text" placeholder="Ej. Chugchilán" />
        <label>Zona</label>
        <input v-model="form.zona" type="text" placeholder="Rural / Urbana" />
        <label>Nombres</label>
        <input v-model="form.nombres" type="text" placeholder="Juan Carlos" />
        <label>Apellidos</label>
        <input v-model="form.apellidos" type="text" placeholder="Pérez Torres" />
        <label>Cédula</label>
        <input v-model="form.cedula" type="text" inputmode="numeric" />
        <label>Fecha nacimiento</label>
        <input v-model="form.fechaNacimiento" type="date" />
        <label>Edad</label>
        <input v-model="form.edad" type="number" min="0" />
        <label>Sexo</label>
        <select v-model="form.sexo">
          <option disabled value="">Seleccionar</option>
          <option value="Femenino">Femenino</option>
          <option value="Masculino">Masculino</option>
        </select>
        <label>Estado civil</label>
        <input v-model="form.estadoCivil" type="text" />
        <label>Ocupación</label>
        <input v-model="form.ocupacion" type="text" />
        <label>Teléfono</label>
        <input v-model="form.telefono" type="tel" />
        <label>Instrucción</label>
        <input v-model="form.instruccion" type="text" />
        <label>Responsable</label>
        <input v-model="form.responsable" type="text" />
        <label><input type="checkbox" v-model="form.dependiente" /> Dependiente</label>
        <label><input type="checkbox" v-model="form.fragil" /> Frágil</label>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">🩺 Signos Vitales</h2>
      <div class="grid-form">
        <label>Presión arterial</label>
        <input v-model="form.presionArterial" type="text" placeholder="Ej. 120/80" />
        <label>Frec. cardiaca</label>
        <input v-model="form.frecuenciaCardiaca" type="text" placeholder="Ej. 72 bpm" />
        <label>Frec. respiratoria</label>
        <input v-model="form.frecuenciaRespiratoria" type="text" placeholder="Ej. 18 rpm" />
        <label>Temperatura</label>
        <input v-model="form.temperatura" type="text" placeholder="Ej. 36.5°C" />
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">📝 Consentimiento Informado</h2>
      <textarea
        v-model="form.consentimiento"
        rows="5"
        placeholder="Escriba el consentimiento firmado..."
      ></textarea>
      <div class="grid-form">
        <label>Lugar y fecha</label>
        <input v-model="form.lugarFecha" type="text" />
        <label>Firma participante</label>
        <input v-model="form.firmaParticipante" type="text" />
        <label>Firma investigador</label>
        <input v-model="form.firmaInvestigador" type="text" />
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">📋 Registro de Atención</h2>
      <div class="grid-sellos">
        <div>
          <strong>MEDICINA</strong>
          <div class="sello">[Sello]</div>
        </div>
        <div>
          <strong>ENFERMERÍA</strong>
          <div class="sello">[Sello]</div>
        </div>
        <div>
          <strong>NUTRICIÓN</strong>
          <div class="sello">[Sello]</div>
        </div>
        <div>
          <strong>FISIOTERAPIA</strong>
          <div class="sello">[Sello]</div>
        </div>
      </div>
    </section>
  </div>
</template>
