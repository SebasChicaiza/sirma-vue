<template>
  <div class="ficha-container">
    <div class="ficha-card">
      <div class="ficha-header">
        <img src="@/assets/images/puce-logo.png" alt="Logo PUCE" class="puce-logo" />
        <div class="header-text">
          <p class="university-name">PONTIFICIA UNIVERSIDAD CATÓLICA DEL ECUADOR</p>
          <p class="faculty-name">FICHA DE ENFERMERÍA</p>
        </div>
      </div>

      <h2 class="form-title">FICHA DE NUTRICION</h2>

      <div class="form-metadata">
        <div class="form-group inline-group">
          <label for="fechaAplicacion">Fecha de Aplicación:</label>
          <input
            id="fechaAplicacion"
            v-model="form.fechaAplicacion"
            type="date"
            class="small-input"
          />
        </div>
        <div class="form-group inline-group">
          <label for="lugarAplicacion">Lugar de Aplicación:</label>
          <input
            id="lugarAplicacion"
            v-model.trim="form.lugarAplicacion"
            type="text"
            placeholder="Ej. Consultorio Cima"
            class="small-input"
          />
        </div>
      </div>

      <FichaSelector v-model:idficha="selectedFichaId" />


      <section class="form-section">
        <h3 class="section-title">📊 Escalas Geriátricas</h3>
        <h4 class="section-subtitle">Timular Rápido (Actividades Básicas de la Vida Diaria)</h4>
        <div class="form-table-container">
          <table class="form-table">
            <thead>
              <tr>
                <th>Actividad</th>
                <th>SI</th>
                <th>NO</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in form.timularRapido" :key="index">
                <td>{{ item.label }}</td>
                <td class="checkbox-cell">
                  <input type="checkbox" v-model="item.si" @change="item.no = !item.si" />
                </td>
                <td class="checkbox-cell">
                  <input type="checkbox" v-model="item.no" @change="item.si = !item.no" />
                </td>
                <td class="total-cell">{{ item.si ? 1 : 0 }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-right">Total:</td>
                <td class="total-cell">{{ totalTimularRapido }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p class="score-interpretation">
          Puntuación: 0-2 (Independiente), 3-5 (Dependencia Moderada), 6-9 (Dependencia Severa)
        </p>
      </section>

      <section class="form-section">
        <h4 class="section-subtitle">Actividad Instrumental (Lawton & Brody)</h4>
        <div class="form-table-container">
          <table class="form-table">
            <thead>
              <tr>
                <th>Actividad</th>
                <th>SI</th>
                <th>NO</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in form.actividadInstrumental" :key="index">
                <td>{{ item.label }}</td>
                <td class="checkbox-cell">
                  <input type="checkbox" v-model="item.si" @change="item.no = !item.si" />
                </td>
                <td class="checkbox-cell">
                  <input type="checkbox" v-model="item.no" @change="item.si = !item.no" />
                </td>
                <td class="total-cell">{{ item.si ? 1 : 0 }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-right">Total:</td>
                <td class="total-cell">{{ totalActividadInstrumental }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p class="score-interpretation">Puntuación: 0-8 (Independiente), 9-16 (Dependencia)</p>
      </section>

      <section class="form-section">
        <h4 class="section-subtitle">Estado Cognitivo (Pfeiffer)</h4>
        <div class="form-table-container">
          <table class="form-table">
            <thead>
              <tr>
                <th>Pregunta</th>
                <th>Respuesta</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in form.estadoCognitivo" :key="index">
                <td>{{ item.label }}</td>
                <td>
                  <input type="text" v-model.trim="item.respuesta" class="small-text-input" />
                </td>
                <td class="total-cell">
                  <input
                    type="number"
                    v-model.number="item.score"
                    class="score-input"
                    min="0"
                    max="1"
                  />
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right">Total:</td>
                <td class="total-cell">{{ totalEstadoCognitivo }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p class="score-interpretation">
          Puntuación: 0-2 (Normal), 3-5 (Deterioro Cognitivo Leve), 6-9 (Deterioro Cognitivo
          Moderado), 10+ (Deterioro Cognitivo Severo)
        </p>
      </section>

      <section class="form-section">
        <h3 class="section-title">⚠️ Otros Riesgos</h3>
        <div class="form-grid">
          <div class="form-group checkbox-group full-width">
            <label class="section-subtitle">Riesgos:</label>
            <div class="checkbox-grid">
              <label
                ><input type="checkbox" v-model="form.otrosRiesgos" value="Desnutricion" />
                Desnutrición</label
              >
              <label
                ><input type="checkbox" v-model="form.otrosRiesgos" value="Fragilidad" />
                Fragilidad</label
              >
              <label
                ><input type="checkbox" v-model="form.otrosRiesgos" value="Depresion" />
                Depresión</label
              >
              <label
                ><input type="checkbox" v-model="form.otrosRiesgos" value="AislamientoSocial" />
                Aislamiento Social</label
              >
              <label
                ><input type="checkbox" v-model="form.otrosRiesgos" value="Ulceras" /> Úlceras por
                Presión</label
              >
              <label
                ><input type="checkbox" v-model="form.otrosRiesgos" value="Caidas" /> Caídas</label
              >
              <label
                ><input type="checkbox" v-model="form.otrosRiesgos" value="DolorCronico" /> Dolor
                Crónico</label
              >
            </div>
          </div>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">📏 Datos Antropométricos</h3>
        <div class="form-grid">
          <div class="form-group">
            <label for="peso">Peso (kg):</label>
            <input
              id="peso"
              v-model.number="form.peso"
              type="number"
              step="0.1"
              placeholder="Ej: 70.5"
            />
          </div>
          <div class="form-group">
            <label for="talla">Talla (cm):</label>
            <input
              id="talla"
              v-model.number="form.talla"
              type="number"
              step="0.1"
              placeholder="Ej: 165.0"
            />
          </div>
          <div class="form-group">
            <label for="imc">IMC:</label>
            <input
              id="imc"
              v-model.number="form.imc"
              type="number"
              step="0.1"
              placeholder="Calculado"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="circunferenciaBraquial">Circunferencia Braquial (cm):</label>
            <input
              id="circunferenciaBraquial"
              v-model.number="form.circunferenciaBraquial"
              type="number"
              step="0.1"
              placeholder="Ej: 25.0"
            />
          </div>
        </div>
        <p class="score-interpretation">
          Clasificación IMC: &lt;18.5 (Bajo Peso), 18.5-24.9 (Normal), 25-29.9 (Sobrepeso), &gt;30
          (Obesidad)
        </p>
      </section>

      <section class="form-section">
        <h3 class="section-title">🍎 Antecedentes Nutricionales</h3>
        <div class="form-grid">
          <div class="form-group">
            <label for="dietaBalanceada">Dieta Balanceada:</label>
            <select id="dietaBalanceada" v-model="form.dietaBalanceada">
              <option disabled value="">Seleccionar</option>
              <option value="si">SI</option>
              <option value="no">NO</option>
            </select>
          </div>
          <div class="form-group">
            <label for="piezasDentales">Piezas Dentales/Prótesis Completas:</label>
            <select id="piezasDentales" v-model="form.piezasDentales">
              <option disabled value="">Seleccionar</option>
              <option value="si">SI</option>
              <option value="no">NO</option>
            </select>
          </div>
          <div class="form-group">
            <label for="dificultadMasticar">Dificultad al Masticar:</label>
            <select id="dificultadMasticar" v-model="form.dificultadMasticar">
              <option disabled value="">Seleccionar</option>
              <option value="si">SI</option>
              <option value="no">NO</option>
            </select>
          </div>
          <div class="form-group">
            <label for="estrenimiento">Estreñimiento Recurrente:</label>
            <select id="estrenimiento" v-model="form.estrenimiento">
              <option disabled value="">Seleccionar</option>
              <option value="si">SI</option>
              <option value="no">NO</option>
            </select>
          </div>
          <div class="form-group">
            <label for="alergiaAlimentos">Alergia Alimentaria:</label>
            <select id="alergiaAlimentos" v-model="form.alergiaAlimentos">
              <option disabled value="">Seleccionar</option>
              <option value="si">SI</option>
              <option value="no">NO</option>
            </select>
          </div>
        </div>
        <div class="form-group full-width">
          <label for="observacionesNutricionales">Observaciones Nutricionales:</label>
          <textarea
            id="observacionesNutricionales"
            v-model.trim="form.observacionesNutricionales"
            rows="3"
            placeholder="Detalle hábitos, preferencias, etc."
          ></textarea>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">📝 Mini Nutritional Assessment (MNA)</h3>
        <p class="section-description">
          Responda la primera parte del cuestionario indicando la puntuación adecuada para cada
          pregunta y el cuestionario para obtener una apreciación precisa del estado nutricional.
        </p>

        <div class="mna-grid">
          <div class="mna-question-group">
            <label class="mna-question-label"
              >A. ¿Ha perdido el apetito? ¿Ha comido menos por falta de apetito, problemas
              digestivos, dificultades de masticación/deglución en los últimos 3 meses?</label
            >
            <div class="radio-group">
              <label
                ><input type="radio" value="0" v-model.number="form.mna.a" /> 0. Ha comido mucho
                menos</label
              >
              <label
                ><input type="radio" value="0.5" v-model.number="form.mna.a" /> 0.5 Ha comido
                menos</label
              >
              <label
                ><input type="radio" value="1" v-model.number="form.mna.a" /> 1. Ha comido
                igual</label
              >
            </div>
          </div>

          <div class="mna-question-group">
            <label class="mna-question-label">B. Pérdida de peso en los últimos 3 meses?</label>
            <div class="radio-group">
              <label
                ><input type="radio" value="0" v-model.number="form.mna.b" /> 0. Pérdida >
                3kg</label
              >
              <label><input type="radio" value="1" v-model.number="form.mna.b" /> 1. No sabe</label>
              <label
                ><input type="radio" value="2" v-model.number="form.mna.b" /> 2. Pérdida entre 1 y
                3kg</label
              >
              <label
                ><input type="radio" value="3" v-model.number="form.mna.b" /> 3. No ha habido
                pérdida de peso</label
              >
            </div>
          </div>

          <div class="mna-question-group">
            <label class="mna-question-label">C. Movilidad?</label>
            <div class="radio-group">
              <label
                ><input type="radio" value="0" v-model.number="form.mna.c" /> 0. De la cama al
                sillón</label
              >
              <label
                ><input type="radio" value="1" v-model.number="form.mna.c" /> 1. De forma autónoma
                dentro del domicilio</label
              >
              <label
                ><input type="radio" value="2" v-model.number="form.mna.c" /> 2. Sale del
                domicilio</label
              >
            </div>
          </div>

          <div class="mna-question-group">
            <label class="mna-question-label"
              >D. ¿Ha presentado enfermedad aguda o situación de estrés psicológico en los últimos 3
              meses?</label
            >
            <div class="radio-group">
              <label><input type="radio" value="0" v-model.number="form.mna.d" /> 0. Sí</label>
              <label><input type="radio" value="2" v-model.number="form.mna.d" /> 2. No</label>
            </div>
          </div>

          <div class="mna-question-group">
            <label class="mna-question-label">E. Problemas neuropsicológicos?</label>
            <div class="radio-group">
              <label
                ><input type="radio" value="0" v-model.number="form.mna.e" /> 0. Demencia o
                depresión grave</label
              >
              <label
                ><input type="radio" value="1" v-model.number="form.mna.e" /> 1. Demencia
                leve</label
              >
              <label
                ><input type="radio" value="2" v-model.number="form.mna.e" /> 2. Sin problemas
                psicológicos</label
              >
            </div>
          </div>

          <div class="mna-question-group">
            <label class="mna-question-label"
              >F. Índice de masa corporal (IMC) = peso/(talla²)</label
            >
            <div class="radio-group">
              <label
                ><input type="radio" value="0" v-model.number="form.mna.f" /> 0. IMC &lt; 19</label
              >
              <label
                ><input type="radio" value="1" v-model.number="form.mna.f" /> 1. IMC 19 - &lt;
                21</label
              >
              <label
                ><input type="radio" value="2" v-model.number="form.mna.f" /> 2. IMC 21 - &lt;
                23</label
              >
              <label
                ><input type="radio" value="3" v-model.number="form.mna.f" /> 3. IMC ≥ 23</label
              >
            </div>
          </div>
        </div>

        <h4 class="section-subtitle">Evaluación del cribaje (MNA - Parte 1: Max. 14 puntos)</h4>
        <div class="form-group inline-group">
          <label for="mnaCribajeTotal">Total Cribaje:</label>
          <input
            id="mnaCribajeTotal"
            v-model.number="totalMnaCribaje"
            type="number"
            disabled
            class="small-input"
          />
        </div>
        <p class="score-interpretation">
          Puntuación: 12-14 puntos (normal), 8-11 puntos (riesgo de desnutrición), 0-7 puntos
          (desnutrición)
        </p>

        <div v-if="totalMnaCribaje < 12" class="mna-grid mna-grid-extended">
          <p class="section-description full-width">
            Para la evaluación más detallada, continúe con las preguntas G-R.
          </p>
          <div class="mna-question-group">
            <label class="mna-question-label"
              >G. ¿El paciente vive independiente en su domicilio?</label
            >
            <div class="radio-group">
              <label><input type="radio" value="0" v-model.number="form.mna.g" /> 0. No</label>
              <label><input type="radio" value="1" v-model.number="form.mna.g" /> 1. Sí</label>
            </div>
          </div>
          <div class="mna-question-group">
            <label class="mna-question-label">H. ¿Toma más de 3 medicamentos al día?</label>
            <div class="radio-group">
              <label><input type="radio" value="0" v-model.number="form.mna.h" /> 0. Sí</label>
              <label><input type="radio" value="1" v-model.number="form.mna.h" /> 1. No</label>
            </div>
          </div>
          <div class="mna-question-group">
            <label class="mna-question-label">I. ¿Úlceras o lesiones cutáneas?</label>
            <div class="radio-group">
              <label><input type="radio" value="0" v-model.number="form.mna.i" /> 0. Sí</label>
              <label><input type="radio" value="1" v-model.number="form.mna.i" /> 1. No</label>
            </div>
          </div>
          <div class="mna-question-group">
            <label class="mna-question-label">J. ¿Cuántas comidas completas toma al día?</label>
            <div class="radio-group">
              <label
                ><input type="radio" value="0" v-model.number="form.mna.j" /> 0. 1 comida</label
              >
              <label
                ><input type="radio" value="1" v-model.number="form.mna.j" /> 1. 2 comidas</label
              >
              <label
                ><input type="radio" value="2" v-model.number="form.mna.j" /> 2. 3 comidas</label
              >
            </div>
          </div>
          <div class="mna-question-group">
            <label class="mna-question-label">K. ¿Consume el paciente?</label>
            <div class="radio-group radio-subgroup">
              <label
                ><input type="radio" value="0" v-model.number="form.mna.k1" /> Lácteos: Si /
                No</label
              >
              <label
                ><input type="radio" value="0" v-model.number="form.mna.k2" /> Legumbres/Huevo: Si /
                No</label
              >
              <label
                ><input type="radio" value="0" v-model.number="form.mna.k3" /> Carne/Pescado/Aves:
                Si / No</label
              >
            </div>
          </div>
          <div class="mna-question-group">
            <label class="mna-question-label"
              >L. Consume frutas o verduras al menos 2 veces al día?</label
            >
            <div class="radio-group">
              <label><input type="radio" value="0" v-model.number="form.mna.l" /> 0. No</label>
              <label><input type="radio" value="1" v-model.number="form.mna.l" /> 1. Sí</label>
            </div>
          </div>
          <div class="mna-question-group">
            <label class="mna-question-label"
              >M. ¿Cuántos vasos de agua u otros líquidos toma al día? (Agua, zumo, café, té, leche,
              vino, cerveza)</label
            >
            <div class="radio-group">
              <label
                ><input type="radio" value="0" v-model.number="form.mna.m" /> 0. Menos de 3
                vasos</label
              >
              <label
                ><input type="radio" value="0.5" v-model.number="form.mna.m" /> 0.5 3 a 5
                vasos</label
              >
              <label
                ><input type="radio" value="1" v-model.number="form.mna.m" /> 1. Más de 5
                vasos</label
              >
            </div>
          </div>
          <div class="mna-question-group">
            <label class="mna-question-label">N. ¿Forma de alimentarse?</label>
            <div class="radio-group">
              <label
                ><input type="radio" value="0" v-model.number="form.mna.n" /> 0. Necesita
                ayuda</label
              >
              <label
                ><input type="radio" value="1" v-model.number="form.mna.n" /> 1. Se alimenta con
                dificultad</label
              >
              <label
                ><input type="radio" value="2" v-model.number="form.mna.n" /> 2. Se alimenta solo
                sin dificultad</label
              >
            </div>
          </div>
          <div class="mna-question-group">
            <label class="mna-question-label"
              >O. ¿Se considera el paciente que está bien nutrido?</label
            >
            <div class="radio-group">
              <label
                ><input type="radio" value="0" v-model.number="form.mna.o" /> 0. Desnutrición
                grave</label
              >
              <label
                ><input type="radio" value="1" v-model.number="form.mna.o" /> 1. No lo sabe o
                malnutrición moderada</label
              >
              <label
                ><input type="radio" value="2" v-model.number="form.mna.o" /> 2. Sin problemas de
                nutrición</label
              >
            </div>
          </div>
          <div class="mna-question-group">
            <label class="mna-question-label"
              >P. En comparación con las personas de su edad, cómo encuentra el paciente su estado
              de salud?</label
            >
            <div class="radio-group">
              <label><input type="radio" value="0" v-model.number="form.mna.p" /> 0. Peor</label>
              <label
                ><input type="radio" value="0.5" v-model.number="form.mna.p" /> 0.5 No lo
                sabe</label
              >
              <label><input type="radio" value="1" v-model.number="form.mna.p" /> 1. Igual</label>
              <label><input type="radio" value="2" v-model.number="form.mna.p" /> 2. Mejor</label>
            </div>
          </div>
        </div>

        <h4 class="section-subtitle">Evaluación del Estado Nutricional (MNA - Puntuación Final)</h4>
        <div class="form-group inline-group">
          <label for="mnaFinalTotal">Total Final MNA:</label>
          <input
            id="mnaFinalTotal"
            v-model.number="totalMnaFinal"
            type="number"
            disabled
            class="small-input"
          />
        </div>
        <div class="radio-group horizontal-group">
          <label
            ><input type="radio" value="normal" v-model="form.estadoNutricional" /> De 24 a 30
            puntos: Estado Nutricional Normal</label
          >
          <label
            ><input type="radio" value="riesgo" v-model="form.estadoNutricional" /> De 17 a 23.5
            puntos: Riesgo de Malnutrición</label
          >
          <label
            ><input type="radio" value="malnutricion" v-model="form.estadoNutricional" /> Menos de
            17 puntos: Malnutrición</label
          >
        </div>
        <div class="form-group inline-group mt-3">
          <label for="evaluacionGlobal">Evaluación Global (máx. 30 puntos):</label>
          <input
            id="evaluacionGlobal"
            type="number"
            v-model.number="totalMnaFinal"
            disabled
            class="small-input"
          />
        </div>
        <div class="form-group inline-group">
          <label for="evaluadorMNA">Evaluado por:</label>
          <input
            id="evaluadorMNA"
            v-model.trim="form.evaluadorMNA"
            type="text"
            class="small-input"
          />
        </div>
        <p class="form-note">
          Guía de Uso/Referencia:
          <a
            href="https://www.mna-elderly.com/files/defaults/files/2003-10-MNA-guia-spanish.pdf"
            target="_blank"
            >mna-elderly.com</a
          >
        </p>
      </section>

      <button type="submit" class="submit-button" :disabled="isSubmitting" @click="handleSubmit">
        {{ isSubmitting ? 'Guardando Ficha...' : 'Guardar Ficha de Enfermería' }}
      </button>

      <p v-if="submitMessage" :class="['submit-info', submitStatus]">
        {{ submitMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import FichaSelector from '@/components/FichaSelector.vue'

const selectedFichaId = ref(null)



const form = reactive({
  fechaAplicacion: '',
  lugarAplicacion: '',

  // TIMULAR RÁPIDO - Actividades Básicas
  timularRapido: [
    { label: 'Uso del Teléfono', si: false, no: false },
    { label: 'Ir de compras', si: false, no: false },
    { label: 'Preparar la comida', si: false, no: false },
    { label: 'Manejar dinero', si: false, no: false },
    { label: 'Medicación', si: false, no: false },
  ],

  // ACTIVIDAD INSTRUMENTAL (Lawton & Brody)
  actividadInstrumental: [
    { label: 'Bañarse', si: false, no: false },
    { label: 'Vestirse', si: false, no: false },
    { label: 'Aseo Personal', si: false, no: false },
    { label: 'Continencia', si: false, no: false },
    { label: 'Traslado', si: false, no: false },
    { label: 'Deambulación', si: false, no: false },
    { label: 'Alimentación', si: false, no: false },
  ],

  // ESTADO COGNITIVO (Pfeiffer)
  estadoCognitivo: [
    { label: '¿Qué día es hoy?', respuesta: '', score: null },
    { label: '¿Qué fecha es hoy?', respuesta: '', score: null },
    { label: '¿Qué mes es?', respuesta: '', score: null },
    { label: '¿Qué año es?', respuesta: '', score: null },
    { label: '¿Qué día de la semana?', respuesta: '', score: null },
    { label: '¿Dónde estamos?', respuesta: '', score: null },
    { label: '¿Qué lugar es este?', respuesta: '', score: null },
    { label: '¿Cuál es su número de teléfono?', respuesta: '', score: null },
    { label: '¿Cuál es su dirección?', respuesta: '', score: null },
    { label: '¿Cuál es su profesión?', respuesta: '', score: null },
  ],

  // Otros Riesgos
  otrosRiesgos: [], // Array para checkboxes

  // Datos Antropométricos
  peso: null,
  talla: null,
  imc: null, // Será un valor calculado
  circunferenciaBraquial: null,

  // Antecedentes Nutricionales
  dietaBalanceada: '',
  piezasDentales: '',
  dificultadMasticar: '',
  estrenimiento: '',
  alergiaAlimentos: '',
  observacionesNutricionales: '',

  // Mini Nutritional Assessment (MNA)
  mna: {
    a: null,
    b: null,
    c: null,
    d: null,
    e: null,
    f: null,
    g: null,
    h: null,
    i: null,
    j: null,
    k1: null, // Lácteos
    k2: null, // Legumbres/Huevo
    k3: null, // Carne/Pescado/Aves
    l: null,
    m: null,
    n: null,
    o: null,
    p: null,
  },
  estadoNutricional: '',
  evaluadorMNA: '',
})

// COMPUTED PROPERTIES PARA CÁLCULOS AUTOMÁTICOS

const totalTimularRapido = computed(() => {
  return form.timularRapido.filter((item) => item.si).length
})

const totalActividadInstrumental = computed(() => {
  return form.actividadInstrumental.filter((item) => item.si).length
})

const totalEstadoCognitivo = computed(() => {
  return form.estadoCognitivo.reduce((sum, item) => sum + (item.score || 0), 0)
})

const totalMnaCribaje = computed(() => {
  // Suma solo las preguntas A-F para el cribaje inicial
  return (
    (form.mna.a || 0) +
    (form.mna.b || 0) +
    (form.mna.c || 0) +
    (form.mna.d || 0) +
    (form.mna.e || 0) +
    (form.mna.f || 0)
  )
})

const totalMnaFinal = computed(() => {
  // Suma todas las preguntas para el score final
  return (
    totalMnaCribaje.value +
    (form.mna.g || 0) +
    (form.mna.h || 0) +
    (form.mna.i || 0) +
    (form.mna.j || 0) +
    (form.mna.k1 || 0) + // Suma los 3 de la K
    (form.mna.k2 || 0) +
    (form.mna.k3 || 0) +
    (form.mna.l || 0) +
    (form.mna.m || 0) +
    (form.mna.n || 0) +
    (form.mna.o || 0) +
    (form.mna.p || 0)
  )
})

// WATCHER para calcular IMC automáticamente
watch([() => form.peso, () => form.talla], ([newPeso, newTalla]) => {
  if (newPeso > 0 && newTalla > 0) {
    const tallaMts = newTalla / 100 // Convertir cm a metros
    form.imc = (newPeso / (tallaMts * tallaMts)).toFixed(2)
  } else {
    form.imc = null
  }
})

// Lógica de envío del formulario
const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref('') // 'success' o 'error'

const handleSubmit = async () => {
  submitMessage.value = ''
  submitStatus.value = ''
  isSubmitting.value = true

  // Aquí podrías añadir validación similar a la de los formularios anteriores
  // Por ejemplo, verificar que los campos requeridos estén llenos antes de enviar.

  try {
    // Simular una llamada a API para guardar la ficha
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log('Datos de la Ficha de Enfermería:', JSON.parse(JSON.stringify(form)))

    submitMessage.value = 'Ficha de enfermería guardada exitosamente.'
    submitStatus.value = 'success'
    // Opcional: resetear el formulario después de un envío exitoso
    // Para simplificar, no se resetea aquí, pero se puede añadir la lógica.
  } catch (error) {
    submitMessage.value = 'Error al guardar la ficha. Inténtalo de nuevo.'
    submitStatus.value = 'error'
    console.error('Error guardando ficha de enfermería:', error)
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
  max-width: 950px; /* Un poco más ancho para tablas complejas */
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
.checkbox-group,
.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding-top: 5px;
}

.checkbox-group label,
.radio-group label {
  display: flex;
  align-items: center;
  margin-bottom: 0;
  cursor: pointer;
  font-weight: 500;
  color: var(--color-text-primary);
  flex-basis: auto; /* Allow items to determine their width */
}

.checkbox-group input[type='checkbox'],
.radio-group input[type='radio'] {
  margin-right: 8px;
  accent-color: var(--color-accent-green);
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.form-group.full-width {
  grid-column: 1 / -1;
  margin-bottom: 15px;
}

/* Tablas para escalas */
.form-table-container {
  width: 100%;
  overflow-x: auto; /* Permite scroll horizontal en pantallas pequeñas */
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
  background-color: #f0f8f8; /* Un color más claro para filas pares */
}

.form-table tbody tr:hover {
  background-color: var(--color-hover-light);
}

.checkbox-cell {
  text-align: center;
  width: 60px; /* Ancho fijo para columnas de checkbox */
}

.checkbox-cell input[type='checkbox'] {
  margin: 0; /* Centrar el checkbox */
}

.total-cell {
  text-align: center;
  font-weight: 600;
  background-color: var(--color-primary-light);
  width: 70px;
}

.text-right {
  text-align: right;
  font-weight: 700;
  color: var(--color-primary-dark);
}

.score-interpretation {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-top: 10px;
  margin-bottom: 25px;
  line-height: 1.4;
  padding-left: 5px;
  border-left: 3px solid var(--color-accent-green);
}

/* MNA specific styles */
.mna-grid {
  display: grid;
  grid-template-columns: 1fr; /* Una columna por defecto */
  gap: 25px;
  margin-top: 20px;
}

.mna-grid-extended {
  border-top: 1px dashed var(--color-border);
  padding-top: 25px;
  margin-top: 25px;
}

.mna-question-group {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 15px 20px;
  background-color: #fdfdfd;
}

.mna-question-label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary-dark);
  margin-bottom: 10px;
  display: block;
}

.mna-question-group .radio-group {
  flex-direction: column; /* Apilar radios verticalmente */
  gap: 8px;
}

.radio-subgroup {
  margin-left: 20px; /* Indentar opciones anidadas */
  flex-direction: row; /* Volver a horizontal para sub-opciones */
  flex-wrap: wrap;
  gap: 10px 20px;
}

.small-text-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--color-input-border-default);
  border-radius: 6px;
  font-size: 0.9rem;
  color: var(--color-text-primary);
}

.score-input {
  width: 60px; /* Pequeño para la puntuación */
  text-align: center;
  padding: 8px;
  border: 1px solid var(--color-input-border-default);
  border-radius: 6px;
  font-size: 0.9rem;
}

.horizontal-group {
  flex-direction: row;
  gap: 20px;
  margin-top: 15px;
  flex-wrap: wrap;
}

.mt-3 {
  margin-top: 15px; /* Pequeño margen superior */
}

.form-note {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  margin-top: 15px;
  text-align: center;
}
.form-note a {
  color: var(--color-accent-green);
  text-decoration: none;
  font-weight: 600;
}
.form-note a:hover {
  text-decoration: underline;
}

/* Estilos del botón de envío y mensajes de estado - reutilizados */
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

  .checkbox-group,
  .radio-group {
    flex-direction: column;
    align-items: flex-start;
  }
  .horizontal-group {
    flex-direction: column;
  }

  .form-table th,
  .form-table td {
    padding: 8px 10px;
    font-size: 0.85rem;
  }
  .checkbox-cell,
  .total-cell {
    width: auto; /* Dejar que el contenido defina el ancho */
  }
  .mna-grid {
    gap: 20px;
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
  .mna-question-label {
    font-size: 0.95rem;
  }
  .radio-subgroup {
    margin-left: 10px; /* Reducir indentación */
  }
  .form-note {
    font-size: 0.8rem;
  }
}
</style>
