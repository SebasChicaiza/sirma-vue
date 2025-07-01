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

      <!-- Progress Indicator -->
      <div class="progress-indicator">
        <div
          v-for="stepNum in totalSteps"
          :key="stepNum"
          :class="['step-circle', { active: currentStep === stepNum, completed: currentStep > stepNum }]"
        >
          {{ stepNum }}
        </div>
        <div class="step-label">{{ getStepLabel(currentStep) }}</div>
      </div>

      <!-- Step 1: Información General y Problemas Actuales -->
      <section v-if="currentStep === 1" class="form-section">
        <h3 class="section-title">📝 Información General y Problemas Actuales</h3>
        <div class="form-metadata">
          <div class="form-group inline-group">
            <label for="fechaContacto">Fecha de Contacto:<span class="required">*</span></label>
            <input id="fechaContacto" v-model="form.fechaContacto" type="date" class="small-input" required />
          </div>
          <div class="form-group inline-group">
            <label for="nombreFisioterapeuta">Fisioterapeuta:<span class="required">*</span></label>
            <input
              id="nombreFisioterapeuta"
              v-model.trim="form.nombreFisioterapeuta"
              type="text"
              placeholder="Ej. Ana García"
              class="small-input"
              required
            />
          </div>
        </div>

        <FichaSelector v-model:idficha="form.idficha" />

        <div class="form-group full-width mt-4">
          <label for="problemasActuales">Descripción de Problemas:<span class="required">*</span></label>
          <textarea
            id="problemasActuales"
            v-model.trim="form.problemasActuales"
            rows="4"
            placeholder="Ej. Paciente presenta dolor en la columna lumbar a la palpación. No puede hacer movimientos de flexoextensión."
            required
          ></textarea>
        </div>

        <div class="form-grid-3-col">
          <div class="form-group">
            <label for="fisPeso">Peso (kg):</label>
            <input id="fisPeso" v-model.number="form.fisPeso" type="number" step="0.1" placeholder="Ej. 75.5" />
          </div>
          <div class="form-group">
            <label for="fisTalla">Talla (m):</label>
            <input id="fisTalla" v-model.number="form.fisTalla" type="number" step="0.01" placeholder="Ej. 1.68" />
          </div>
          <div class="form-group">
            <label for="fisDiscapacidad">Discapacidad (%):</label>
            <input id="fisDiscapacidad" v-model.number="form.fisDiscapacidad" type="number" step="1" placeholder="Ej. 25" />
          </div>
        </div>

        <h4 class="section-subtitle">Marcha:</h4>
        <div class="form-grid-2-col">
          <div class="form-group radio-group-horizontal">
            <label
              ><input type="radio" value="Libre" v-model="form.marcha.tipo" /> Libre</label
            >
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
            <label
              ><input type="radio" value="Ataxica" v-model="form.marcha.tipo" /> Atáxica</label
            >
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

      <!-- Step 2: Tono Muscular -->
      <section v-if="currentStep === 2" class="form-section">
        <h3 class="section-title">✨ Tono Muscular</h3>
        <div class="form-grid-2-col">
          <div class="form-group">
            <h4 class="section-subtitle">Escala de Ashworth (Marque con una X)<span class="required">*</span></h4>
            <div class="radio-group ashworth-scale">
              <label
                ><input type="radio" :value="0" v-model.number="form.tonoMuscular.ashworth" /> 0:
                Tono normal. No incremento del tono muscular.</label
              >
              <label
                ><input type="radio" :value="1" v-model.number="form.tonoMuscular.ashworth" /> 1:
                Ligero incremento de tono, detectable al final del recorrido articular.</label
              >
              <label
                ><input type="radio" :value="2" v-model.number="form.tonoMuscular.ashworth" /> 2:
                Ligero incremento de tono, detectable en menos de la mitad del recorrido
                articular.</label
              >
              <label
                ><input type="radio" :value="3" v-model.number="form.tonoMuscular.ashworth" /> 3:
                Notable aumento del tono, detención en más de la mitad del recorrido.</label
              >
              <label
                ><input type="radio" :value="4" v-model.number="form.tonoMuscular.ashworth" /> 4:
                Considerable aumento del tono, la movilización pasiva es difícil.</label
              >
              <label
                ><input type="radio" :value="5" v-model.number="form.tonoMuscular.ashworth" /> 5:
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
            <h4 class="section-subtitle">Escala de Campbell (Marque con una X)<span class="required">*</span></h4>
            <div class="radio-group campbell-scale">
              <label
                ><input type="radio" :value="0" v-model.number="form.tonoMuscular.campbell" /> Normal
                (0)</label
              >
              <label
                ><input type="radio" :value="1" v-model.number="form.tonoMuscular.campbell" />
                Hipotonía leve (1)</label
              >
              <label
                ><input
                  type="radio"
                  :value="2"
                  v-model.number="form.tonoMuscular.campbell"
                />
                Hipotonía moderada (2)</label
              >
              <label
                ><input type="radio" :value="3" v-model.number="form.tonoMuscular.campbell" />
                Hipotonía grave (3)</label
              >
            </div>
          </div>
        </div>
      </section>

      <!-- Step 3: Evaluación de la Fuerza -->
      <section v-if="currentStep === 3" class="form-section">
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

        <h4 class="section-subtitle mt-4">Fuerza por Segmento (Marque con una X)</h4>
        <div class="form-grid-2-col">
          <div class="form-group">
            <label>Brazos Izquierdo:<span class="required">*</span></label>
            <div class="radio-group horizontal-group">
              <label v-for="n in 5" :key="n"
                ><input type="radio" :value="n" v-model.number="form.fuerza.brazoIzq" /> {{ n }}</label
              >
              <label><input type="radio" value="0" v-model.number="form.fuerza.brazoIzq" /> 0</label>
            </div>
          </div>
          <div class="form-group">
            <label>Brazos Derecho:<span class="required">*</span></label>
            <div class="radio-group horizontal-group">
              <label v-for="n in 5" :key="n"
                ><input type="radio" :value="n" v-model.number="form.fuerza.brazoDer" /> {{ n }}</label
              >
              <label><input type="radio" value="0" v-model.number="form.fuerza.brazoDer" /> 0</label>
            </div>
          </div>
          <div class="form-group">
            <label>Piernas Izquierda:<span class="required">*</span></label>
            <div class="radio-group horizontal-group">
              <label v-for="n in 5" :key="n"
                ><input type="radio" :value="n" v-model.number="form.fuerza.piernaIzq" /> {{ n }}</label
              >
              <label><input type="radio" value="0" v-model.number="form.fuerza.piernaIzq" /> 0</label>
            </div>
          </div>
          <div class="form-group">
            <label>Piernas Derecha:<span class="required">*</span></label>
            <div class="radio-group horizontal-group">
              <label v-for="n in 5" :key="n"
                ><input type="radio" :value="n" v-model.number="form.fuerza.piernaDer" /> {{ n }}</label
              >
              <label><input type="radio" value="0" v-model.number="form.fuerza.piernaDer" /> 0</label>
            </div>
          </div>
          <div class="form-group">
            <label>Tronco Izquierdo:<span class="required">*</span></label>
            <div class="radio-group horizontal-group">
              <label v-for="n in 5" :key="n"
                ><input type="radio" :value="n" v-model.number="form.fuerza.troncoIzq" /> {{ n }}</label
              >
              <label><input type="radio" value="0" v-model.number="form.fuerza.troncoIzq" /> 0</label>
            </div>
          </div>
          <div class="form-group">
            <label>Tronco Derecho:<span class="required">*</span></label>
            <div class="radio-group horizontal-group">
              <label v-for="n in 5" :key="n"
                ><input type="radio" :value="n" v-model.number="form.fuerza.troncoDer" /> {{ n }}</label
              >
              <label><input type="radio" value="0" v-model.number="form.fuerza.troncoDer" /> 0</label>
            </div>
          </div>
          <div class="form-group">
            <label>Cuello Izquierdo:<span class="required">*</span></label>
            <div class="radio-group horizontal-group">
              <label v-for="n in 5" :key="n"
                ><input type="radio" :value="n" v-model.number="form.fuerza.cuelloIzq" /> {{ n }}</label
              >
              <label><input type="radio" value="0" v-model.number="form.fuerza.cuelloIzq" /> 0</label>
            </div>
          </div>
          <div class="form-group">
            <label>Cuello Derecho:<span class="required">*</span></label>
            <div class="radio-group horizontal-group">
              <label v-for="n in 5" :key="n"
                ><input type="radio" :value="n" v-model.number="form.fuerza.cuelloDer" /> {{ n }}</label
              >
              <label><input type="radio" value="0" v-model.number="form.fuerza.cuelloDer" /> 0</label>
            </div>
          </div>
        </div>
      </section>

      <!-- Step 4: Equilibrio Dinámico (Marcha) -->
      <section v-if="currentStep === 4" class="form-section">
        <h3 class="section-title">🚶 Escala de Tinetti - Equilibrio Dinámico (Marcha)</h3>
        <h4 class="section-subtitle">Parte 2: Máx. 12 puntos</h4>
        <div class="tinetti-question-group">
          <label class="tinetti-question-label">Inicio de la marcha:<span class="required">*</span></label>
          <div class="radio-group horizontal-group">
            <label
              ><input
                type="radio"
                :value="1"
                v-model.number="form.tinetti.equilibrioDinamico.inicioMarcha"
              />
              1 punto si se levanta sin oscilaciones, 0 si no.</label
            >
            <label
              ><input
                type="radio"
                :value="0"
                v-model.number="form.tinetti.equilibrioDinamico.inicioMarcha"
              />
              0 si no.</label
            >
          </div>
        </div>
        <div class="tinetti-question-group">
          <label class="tinetti-question-label">Paso continuo:<span class="required">*</span></label>
          <div class="radio-group horizontal-group">
            <label
              ><input
                type="radio"
                :value="1"
                v-model.number="form.tinetti.equilibrioDinamico.pasoContinuo"
              />
              1 punto si el paso es continuo y no detenido, 0 si no.</label
            >
            <label
              ><input
                type="radio"
                :value="0"
                v-model.number="form.tinetti.equilibrioDinamico.pasoContinuo"
              />
              0 si no.</label
            >
          </div>
        </div>
        <div class="tinetti-question-group">
          <label class="tinetti-question-label">Longitud del paso:<span class="required">*</span></label>
          <div class="radio-group horizontal-group">
            <label
              ><input
                type="radio"
                :value="1"
                v-model.number="form.tinetti.equilibrioDinamico.longitudPaso"
              />
              1 punto si la longitud es adecuada, 0 si no.</label
            >
            <label
              ><input
                type="radio"
                :value="0"
                v-model.number="form.tinetti.equilibrioDinamico.longitudPaso"
              />
              0 si no.</label
            >
          </div>
        </div>
        <div class="tinetti-question-group">
          <label class="tinetti-question-label">Paso elevado:<span class="required">*</span></label>
          <div class="radio-group horizontal-group">
            <label
              ><input
                type="radio"
                :value="1"
                v-model.number="form.tinetti.equilibrioDinamico.pasoElevado"
              />
              1 punto si el paso es elevado, 0 si no.</label
            >
            <label
              ><input
                type="radio"
                :value="0"
                v-model.number="form.tinetti.equilibrioDinamico.pasoElevado"
              />
              0 si no.</label
            >
          </div>
        </div>
        <div class="tinetti-question-group">
          <label class="tinetti-question-label">Rotación del tronco:<span class="required">*</span></label>
          <div class="radio-group horizontal-group">
            <label
              ><input
                type="radio"
                :value="1"
                v-model.number="form.tinetti.equilibrioDinamico.rotacionTronco"
              />
              1 punto si no hay rotación, 0 si hay.</label
            >
            <label
              ><input
                type="radio"
                :value="0"
                v-model.number="form.tinetti.equilibrioDinamico.rotacionTronco"
              />
              0 si hay.</label
            >
          </div>
        </div>
        <div class="tinetti-question-group">
          <label class="tinetti-question-label">Paso final:<span class="required">*</span></label>
          <div class="radio-group horizontal-group">
            <label
              ><input
                type="radio"
                :value="1"
                v-model.number="form.tinetti.equilibrioDinamico.pasoFinal"
              />
              1 punto si es estable, 0 si no.</label
            >
            <label
              ><input
                type="radio"
                :value="0"
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
      </section>

      <!-- Step 5: Equilibrio Estático -->
      <section v-if="currentStep === 5" class="form-section">
        <h3 class="section-title">🚶 Escala de Tinetti - Equilibrio Estático</h3>
        <h4 class="section-subtitle">Parte 1: Máx. 16 puntos</h4>
        <div class="tinetti-question-group">
          <label class="tinetti-question-label">Sentado sin apoyos:<span class="required">*</span></label>
          <div class="radio-group horizontal-group">
            <label
              ><input
                type="radio"
                :value="1"
                v-model.number="form.tinetti.equilibrioEstatico.sentadoSinApoyos"
              />
              1 punto si es capaz, 0 si no lo es.</label
            >
            <label
              ><input
                type="radio"
                :value="0"
                v-model.number="form.tinetti.equilibrioEstatico.sentadoSinApoyos"
              />
              0 si no lo es.</label
            >
          </div>
        </div>
        <div class="tinetti-question-group">
          <label class="tinetti-question-label">Parado sin apoyos:<span class="required">*</span></label>
          <div class="radio-group horizontal-group">
            <label
              ><input
                type="radio"
                :value="1"
                v-model.number="form.tinetti.equilibrioEstatico.paradoSinApoyos"
              />
              1 punto si es capaz, 0 si no lo es.</label
            >
            <label
              ><input
                type="radio"
                :value="0"
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
      </section>

      <!-- Step 6: Evaluación del Dolor y Zonas -->
      <section v-if="currentStep === 6" class="form-section">
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

        <h4 class="section-subtitle mt-4">Zona Específica del Dolor (Body Chart):<span class="required">*</span></h4>
        <p class="section-description">Haz clic en las partes del cuerpo donde el paciente siente dolor.</p>
        <div class="body-chart-container">
          <svg viewBox="0 0 300 500" class="body-chart-svg">
            <!-- Head -->
            <circle cx="150" cy="50" r="40" data-idzona="1" data-name="Cabeza" @click="togglePainZone(1)" :class="{ 'pain-active': isPainActive(1) }"></circle>
            <!-- Neck -->
            <rect x="140" y="90" width="20" height="20" data-idzona="2" data-name="Cuello" @click="togglePainZone(2)" :class="{ 'pain-active': isPainActive(2) }"></rect>
            <!-- Shoulders -->
            <polygon points="150,110 120,130 180,130" class="shoulder-base" />
            <circle cx="120" cy="130" r="15" data-idzona="4" data-name="Hombro Izquierdo" @click="togglePainZone(4)" :class="{ 'pain-active': isPainActive(4) }"></circle>
            <circle cx="180" cy="130" r="15" data-idzona="3" data-name="Hombro Derecho" @click="togglePainZone(3)" :class="{ 'pain-active': isPainActive(3) }"></circle>

            <!-- Arms -->
            <rect x="105" y="145" width="15" height="60" data-idzona="6" data-name="Brazo Izquierdo" @click="togglePainZone(6)" :class="{ 'pain-active': isPainActive(6) }"></rect>
            <rect x="180" y="145" width="15" height="60" data-idzona="5" data-name="Brazo Derecho" @click="togglePainZone(5)" :class="{ 'pain-active': isPainActive(5) }"></rect>
            <!-- Elbows -->
            <circle cx="112.5" cy="205" r="7.5" data-idzona="8" data-name="Codo Izquierdo" @click="togglePainZone(8)" :class="{ 'pain-active': isPainActive(8) }"></circle>
            <circle cx="187.5" cy="205" r="7.5" data-idzona="7" data-name="Codo Derecho" @click="togglePainZone(7)" :class="{ 'pain-active': isPainActive(7) }"></circle>
            <!-- Forearms -->
            <rect x="105" y="212.5" width="15" height="60" data-idzona="10" data-name="Antebrazo Izquierdo" @click="togglePainZone(10)" :class="{ 'pain-active': isPainActive(10) }"></rect>
            <rect x="180" y="212.5" width="15" height="60" data-idzona="9" data-name="Antebrazo Derecho" @click="togglePainZone(9)" :class="{ 'pain-active': isPainActive(9) }"></rect>
            <!-- Wrists -->
            <circle cx="112.5" cy="272.5" r="7.5" data-idzona="12" data-name="Muñeca Izquierda" @click="togglePainZone(12)" :class="{ 'pain-active': isPainActive(12) }"></circle>
            <circle cx="187.5" cy="272.5" r="7.5" data-idzona="11" data-name="Muñeca Derecha" @click="togglePainZone(11)" :class="{ 'pain-active': isPainActive(11) }"></circle>
            <!-- Hands -->
            <rect x="100" y="280" width="25" height="20" data-idzona="14" data-name="Mano Izquierda" @click="togglePainZone(14)" :class="{ 'pain-active': isPainActive(14) }"></rect>
            <rect x="175" y="280" width="25" height="20" data-idzona="13" data-name="Mano Derecha" @click="togglePainZone(13)" :class="{ 'pain-active': isPainActive(13) }"></rect>

            <!-- Trunk -->
            <rect x="125" y="110" width="50" height="100" data-idzona="15" data-name="Tronco Superior" @click="togglePainZone(15)" :class="{ 'pain-active': isPainActive(15) }"></rect>
            <rect x="125" y="210" width="50" height="80" data-idzona="16" data-name="Tronco Inferior" @click="togglePainZone(16)" :class="{ 'pain-active': isPainActive(16) }"></rect>

            <!-- Hips -->
            <circle cx="115" cy="290" r="15" data-idzona="18" data-name="Cadera Izquierda" @click="togglePainZone(18)" :class="{ 'pain-active': isPainActive(18) }"></circle>
            <circle cx="185" cy="290" r="15" data-idzona="17" data-name="Cadera Derecha" @click="togglePainZone(17)" :class="{ 'pain-active': isPainActive(17) }"></circle>

            <!-- Legs -->
            <rect x="110" y="305" width="20" height="80" data-idzona="20" data-name="Muslo Izquierdo" @click="togglePainZone(20)" :class="{ 'pain-active': isPainActive(20) }"></rect>
            <rect x="170" y="305" width="20" height="80" data-idzona="19" data-name="Muslo Derecho" @click="togglePainZone(19)" :class="{ 'pain-active': isPainActive(19) }"></rect>
            <!-- Knees -->
            <circle cx="120" cy="385" r="10" data-idzona="22" data-name="Rodilla Izquierda" @click="togglePainZone(22)" :class="{ 'pain-active': isPainActive(22) }"></circle>
            <circle cx="180" cy="385" r="10" data-idzona="21" data-name="Rodilla Derecha" @click="togglePainZone(21)" :class="{ 'pain-active': isPainActive(21) }"></circle>
            <!-- Calves -->
            <rect x="110" y="395" width="20" height="70" data-idzona="24" data-name="Pierna Izquierda" @click="togglePainZone(24)" :class="{ 'pain-active': isPainActive(24) }"></rect>
            <rect x="170" y="395" width="20" height="70" data-idzona="23" data-name="Pierna Derecha" @click="togglePainZone(23)" :class="{ 'pain-active': isPainActive(23) }"></rect>
            <!-- Ankles -->
            <circle cx="120" cy="465" r="8" data-idzona="26" data-name="Tobillo Izquierdo" @click="togglePainZone(26)" :class="{ 'pain-active': isPainActive(26) }"></circle>
            <circle cx="180" cy="465" r="8" data-idzona="25" data-name="Tobillo Derecho" @click="togglePainZone(25)" :class="{ 'pain-active': isPainActive(25) }"></circle>
            <!-- Feet -->
            <polygon points="110,473 130,473 135,490 105,490" data-idzona="28" data-name="Pie Izquierdo" @click="togglePainZone(28)" :class="{ 'pain-active': isPainActive(28) }"></polygon>
            <polygon points="170,473 190,473 195,490 165,490" data-idzona="27" data-name="Pie Derecho" @click="togglePainZone(27)" :class="{ 'pain-active': isPainActive(27) }"></polygon>
          </svg>
        </div>
        <div class="form-group full-width mt-4">
          <label for="dolorZonaEspecifica">Observaciones Adicionales sobre el Dolor:</label>
          <textarea
            id="dolorZonaEspecifica"
            v-model.trim="form.dolor.zonaEspecifica"
            rows="3"
            placeholder="Detalle cualquier observación adicional sobre las zonas de dolor seleccionadas o no seleccionadas."
          ></textarea>
        </div>
      </section>

      <!-- Navigation Buttons -->
      <div class="form-navigation">
        <button
          v-if="currentStep > 1"
          type="button"
          class="nav-button prev-button"
          @click="prevStep"
          :disabled="isSubmitting"
        >
          Anterior
        </button>
        <button
          v-if="currentStep < totalSteps"
          type="button"
          class="nav-button next-button"
          @click="nextStep"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Cargando...' : 'Siguiente' }}
        </button>
        <button
          v-if="currentStep === totalSteps"
          type="submit"
          class="submit-button"
          :disabled="isSubmitting"
          @click="submitFinalForm"
        >
          {{ isSubmitting ? 'Guardando Ficha...' : 'Guardar Ficha de Fisioterapia' }}
        </button>
      </div>

      <p v-if="submitMessage" :class="['submit-info', submitStatus]">
        {{ submitMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue' // Added watch
import axios from 'axios'
import FichaSelector from '@/components/FichaSelector.vue'

// Reactive state for the form
const form = reactive({
  idficha: null, // Populated by FichaSelector
  fechaContacto: '',
  nombreFisioterapeuta: '',
  problemasActuales: '',
  fisPeso: null,
  fisTalla: null,
  fisDiscapacidad: null,
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
    evaScore: null,
    wongBakerScore: null,
    zonaEspecifica: '',
    zonasDolorosas: [], // New: Array to store idzona of painful areas
  },

  fuerza: {
    izq: null,
    der: null,
    observaciones: '',
    brazoIzq: null,
    brazoDer: null,
    piernaIzq: null,
    piernaDer: null,
    troncoIzq: null,
    troncoDer: null,
    cuelloIzq: null,
    cuelloDer: null,
  },

  tonoMuscular: {
    ashworth: null,
    ashworthObservaciones: '',
    campbell: '',
  },

  tinetti: {
    equilibrioEstatico: {
      sentadoSinApoyos: null,
      paradoSinApoyos: null,
      sentadoSilla: null,
      equilibrioBipedestacion: null,
      ligeroEmpujon: null,
      ojosCerrados: null,
      giro360: null,
      sentarse: null,
    },
    equilibrioDinamico: {
      inicioMarcha: null,
      pasoContinuo: null,
      longitudPaso: null,
      pasoElevado: null,
      rotacionTronco: null,
      pasoFinal: null,
      simetriaPaso: null,
      continuidadPaso: null,
      trayectoriaPaso: null,
      troncoMarcha: null,
      balanceoBrazos: null,
      distanciaTalones: null,
    },
  },

  // Fields for the /api/medicina payload (final submission) - These will no longer be sent in submitFinalForm
  medNombreencuestador: '',
  medAnamnesis: '',
  medObservacionesrevact: '',
  medObservacionexamenes: '',
  medPlanintegral: '', // This field will no longer be part of the final submission
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
    patoObservaciones: '',
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
    revactObservaciones: '',
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
});

// Multi-step form state
const currentStep = ref(1);
const totalSteps = 6; // Total number of steps
const fisioterapiaId = ref(null); // To store idfisioterapia from the first API call
const initialZonasDolorosasState = reactive({}); // Stores initial state of pain zones from backend

// Watch for changes in idficha to fetch initial pain zones
watch(() => form.idficha, async (newIdFicha) => {
  if (newIdFicha) {
    fisioterapiaId.value = newIdFicha; // Assuming idficha can directly be used as idfisioterapia for fetching
    await fetchInitialPainZones(newIdFicha);
  }
}, { immediate: true }); // immediate: true to run on component mount if idficha is already set

// Function to fetch initial pain zones
const fetchInitialPainZones = async (idFicha) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/api/dolor-fisio?idfisioterapia=${idFicha}`);
    // Clear previous state
    form.dolor.zonasDolorosas = [];
    for (const key in initialZonasDolorosasState) {
      delete initialZonasDolorosasState[key];
    }

    response.data.forEach(zone => {
      initialZonasDolorosasState[zone.idzona] = zone.zonaDuele;
      if (zone.zonaDuele) {
        form.dolor.zonasDolorosas.push(zone.idzona);
      }
    });
    console.log('Initial pain zones fetched:', initialZonasDolorosasState);
  } catch (error) {
    console.error('Error fetching initial pain zones:', error);
    // It's okay if no records exist, just means no pain zones are pre-selected
  }
};


// Computed properties for Tinetti totals
const totalEquilibrioEstatico = computed(() => {
  return (
    (form.tinetti.equilibrioEstatico.sentadoSinApoyos || 0) +
    (form.tinetti.equilibrioEstatico.paradoSinApoyos || 0) +
    (form.tinetti.equilibrioEstatico.sentadoSilla || 0) +
    (form.tinetti.equilibrioEstatico.equilibrioBipedestacion || 0) +
    (form.tinetti.equilibrioEstatico.ligeroEmpujon || 0) +
    (form.tinetti.equilibrioEstatico.ojosCerrados || 0) +
    (form.tinetti.equilibrioEstatico.giro360 || 0) +
    (form.tinetti.equilibrioEstatico.sentarse || 0)
  );
});

const totalEquilibrioDinamico = computed(() => {
  return (
    (form.tinetti.equilibrioDinamico.inicioMarcha || 0) +
    (form.tinetti.equilibrioDinamico.pasoContinuo || 0) +
    (form.tinetti.equilibrioDinamico.longitudPaso || 0) +
    (form.tinetti.equilibrioDinamico.pasoElevado || 0) +
    (form.tinetti.equilibrioDinamico.rotacionTronco || 0) +
    (form.tinetti.equilibrioDinamico.pasoFinal || 0) +
    (form.tinetti.equilibrioDinamico.simetriaPaso || 0) +
    (form.tinetti.equilibrioDinamico.continuidadPaso || 0) +
    (form.tinetti.equilibrioDinamico.trayectoriaPaso || 0) +
    (form.tinetti.equilibrioDinamico.troncoMarcha || 0) +
    (form.tinetti.equilibrioDinamico.balanceoBrazos || 0) +
    (form.tinetti.equilibrioDinamico.distanciaTalones || 0)
  );
});

const totalTinetti = computed(() => {
  return totalEquilibrioEstatico.value + totalEquilibrioDinamico.value;
});

// Form submission and status
const isSubmitting = ref(false);
const submitMessage = ref('');
const submitStatus = ref(''); // 'success' or 'error'

// Helper to get step label for progress indicator
const getStepLabel = (step) => {
  switch (step) {
    case 1: return 'Información General';
    case 2: return 'Tono Muscular';
    case 3: return 'Evaluación de la Fuerza';
    case 4: return 'Equilibrio Dinámico';
    case 5: return 'Equilibrio Estático';
    case 6: return 'Evaluación del Dolor y Zonas';
    default: return '';
  }
};

// Validation logic for each step
const validateStep = (step) => {
  submitMessage.value = '';
  submitStatus.value = '';

  switch (step) {
    case 1:
      if (!form.idficha) { submitMessage.value = 'Debe seleccionar una ficha médica existente.'; submitStatus.value = 'error'; return false; }
      if (!form.fechaContacto) { submitMessage.value = 'La fecha de contacto es requerida.'; submitStatus.value = 'error'; return false; }
      if (!form.nombreFisioterapeuta.trim()) { submitMessage.value = 'El nombre del fisioterapeuta es requerido.'; submitStatus.value = 'error'; return false; }
      if (!form.problemasActuales.trim()) { submitMessage.value = 'La descripción de problemas actuales es requerida.'; submitStatus.value = 'error'; return false; }
      return true;
    case 2:
      if (form.tonoMuscular.ashworth === null) { submitMessage.value = 'Debe seleccionar un grado en la Escala de Ashworth.'; submitStatus.value = 'error'; return false; }
      if (form.tonoMuscular.campbell === null || form.tonoMuscular.campbell === '') { submitMessage.value = 'Debe seleccionar un valor en la Escala de Campbell.'; submitStatus.value = 'error'; return false; }
      return true;
    case 3:
      if (form.fuerza.izq === null || form.fuerza.der === null) { submitMessage.value = 'Debe seleccionar un grado de fuerza para ambos lados (IZQ y DER) en la escala de Daniels.'; submitStatus.value = 'error'; return false; }
      if (form.fuerza.brazoIzq === null || form.fuerza.brazoDer === null ||
          form.fuerza.piernaIzq === null || form.fuerza.piernaDer === null ||
          form.fuerza.troncoIzq === null || form.fuerza.troncoDer === null ||
          form.fuerza.cuelloIzq === null || form.fuerza.cuelloDer === null) {
        submitMessage.value = 'Debe seleccionar un grado de fuerza para todos los segmentos (Brazos, Piernas, Tronco, Cuello) en ambos lados.';
        submitStatus.value = 'error';
        return false;
      }
      return true;
    case 4:
      if (form.tinetti.equilibrioDinamico.inicioMarcha === null ||
          form.tinetti.equilibrioDinamico.pasoContinuo === null ||
          form.tinetti.equilibrioDinamico.longitudPaso === null ||
          form.tinetti.equilibrioDinamico.pasoElevado === null ||
          form.tinetti.equilibrioDinamico.rotacionTronco === null ||
          form.tinetti.equilibrioDinamico.pasoFinal === null) {
        submitMessage.value = 'Debe completar todas las preguntas de Equilibrio Dinámico.';
        submitStatus.value = 'error';
        return false;
      }
      return true;
    case 5:
      if (form.tinetti.equilibrioEstatico.sentadoSinApoyos === null ||
          form.tinetti.equilibrioEstatico.paradoSinApoyos === null) {
        submitMessage.value = 'Debe completar todas las preguntas de Equilibrio Estático.';
        submitStatus.value = 'error';
        return false;
      }
      return true;
    case 6:
      if (!form.dolor.evaNoValorado && form.dolor.evaScore === null) { submitMessage.value = 'Debe seleccionar un puntaje EVA o marcar "No Valorada".'; submitStatus.value = 'error'; return false; }
      if (form.dolor.wongBakerScore === null) { submitMessage.value = 'Debe seleccionar un puntaje Wong-Baker.'; submitStatus.value = 'error'; return false; }
      if (form.dolor.zonasDolorosas.length === 0 && !form.dolor.zonaEspecifica.trim()) {
        submitMessage.value = 'Debe seleccionar al menos una zona de dolor en el Body Chart o añadir observaciones sobre el dolor.';
        submitStatus.value = 'error';
        return false;
      }
      return true;
    default:
      return true;
  }
};

// Toggle pain zone on body chart
const togglePainZone = (idzona) => {
  const index = form.dolor.zonasDolorosas.indexOf(idzona);
  if (index > -1) {
    form.dolor.zonasDolorosas.splice(index, 1); // Remove if already exists
  } else {
    form.dolor.zonasDolorosas.push(idzona); // Add if it doesn't exist
  }
};

// Check if a pain zone is active
const isPainActive = (idzona) => {
  return form.dolor.zonasDolorosas.includes(idzona);
};

// Handle navigation to the next step and API calls
const nextStep = async () => {
  if (!validateStep(currentStep.value)) {
    return;
  }

  isSubmitting.value = true;
  submitMessage.value = 'Guardando datos...';
  submitStatus.value = '';

  try {
    let response;
    switch (currentStep.value) {
      case 1:
        response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/fisioterapia`, {
          idficha: form.idficha,
          fisNombreencuestador: form.nombreFisioterapeuta.trim(),
          fisProblemasactual: form.problemasActuales.trim(),
          fisMarcha: form.marcha.tipo,
          fisTraslado: form.traslados.tipo,
          fisDolor: form.dolor.evaNoValorado ? null : form.dolor.evaScore, // Assuming EVA score is used here
          fisPeso: form.fisPeso,
          fisTalla: form.fisTalla,
          fisDiscapacidad: form.fisDiscapacidad,
        });
        fisioterapiaId.value = response.data.idfisioterapia; // Store the ID for subsequent calls
        submitMessage.value = 'Información general guardada.';
        submitStatus.value = 'success';
        break;
      case 2:
        if (!fisioterapiaId.value) throw new Error('ID de fisioterapia no disponible. Vuelva al paso anterior.');
        try {
          response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/tono-muscular`, {
            idfisioterapia: fisioterapiaId.value,
            musAshworth: Number(form.tonoMuscular.ashworth),
            musCampbell: Number(form.tonoMuscular.campbell),
            musObservaciones: form.tonoMuscular.ashworthObservaciones.trim() || null,
          });
          submitMessage.value = 'Tono muscular guardado.';
          submitStatus.value = 'success';
        } catch (error) {
          if (error.response && error.response.data && error.response.data.message && error.response.data.message.includes('Ya existe un registro de Tono Muscular')) {
            console.warn('Tono Muscular record already exists, attempting PATCH.');
            response = await axios.patch(`${import.meta.env.VITE_URL_BACKEND}/api/tono-muscular/${fisioterapiaId.value}`, {
              idfisioterapia: fisioterapiaId.value,
              musAshworth: Number(form.tonoMuscular.ashworth),
              musCampbell: Number(form.tonoMuscular.campbell),
              musObservaciones: form.tonoMuscular.ashworthObservaciones.trim() || null,
            });
            submitMessage.value = 'Tono muscular actualizado.';
            submitStatus.value = 'success';
          } else {
            throw error;
          }
        }
        break;
      case 3:
        if (!fisioterapiaId.value) throw new Error('ID de fisioterapia no disponible. Vuelva al paso anterior.');
        try {
          response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/fuerza`, {
            idfisioterapia: fisioterapiaId.value,
            fueBrazoizq: form.fuerza.brazoIzq,
            fueBrazoder: form.fuerza.brazoDer,
            fuePiernaizq: form.fuerza.piernaIzq,
            fuePiernader: form.fuerza.piernaDer,
            fueTroncoizq: form.fuerza.troncoIzq,
            fueTroncoder: form.fuerza.troncoDer,
            fueCuelloizq: form.fuerza.cuelloIzq,
            fueCuelloder: form.fuerza.cuelloDer,
          });
          submitMessage.value = 'Fuerza muscular guardada.';
          submitStatus.value = 'success';
        } catch (error) {
          if (error.response && error.response.data && error.response.data.message && error.response.data.message.includes('Ya existe un registro de Fuerza')) {
            console.warn('Fuerza record already exists, attempting PATCH.');
            response = await axios.patch(`${import.meta.env.VITE_URL_BACKEND}/api/fuerza/${fisioterapiaId.value}`, {
              idfisioterapia: fisioterapiaId.value,
              fueBrazoizq: form.fuerza.brazoIzq,
              fueBrazoder: form.fuerza.brazoDer,
              fuePiernaizq: form.fuerza.piernaIzq,
              fuePiernader: form.fuerza.piernaDer,
              fueTroncoizq: form.fuerza.troncoIzq,
              fueTroncoder: form.fuerza.troncoDer,
              fueCuelloizq: form.fuerza.cuelloIzq,
              fueCuelloder: form.fuerza.cuelloDer,
            });
            submitMessage.value = 'Fuerza muscular actualizada.';
            submitStatus.value = 'success';
          } else {
            throw error;
          }
        }
        break;
      case 4:
        if (!fisioterapiaId.value) throw new Error('ID de fisioterapia no disponible. Vuelva al paso anterior.');
        try {
          response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/equilibrio-dinamico`, {
            idfisioterapia: fisioterapiaId.value,
            edLevantarse: form.tinetti.equilibrioDinamico.inicioMarcha === 1,
            edPasocontinuo: form.tinetti.equilibrioDinamico.pasoContinuo === 1,
            edLongpaso: form.tinetti.equilibrioDinamico.longitudPaso === 1,
            edPasoelevado: form.tinetti.equilibrioDinamico.pasoElevado === 1,
            edRotaciontronco: form.tinetti.equilibrioDinamico.rotacionTronco === 1,
            edPasofinal: form.tinetti.equilibrioDinamico.pasoFinal === 1,
          });
          submitMessage.value = 'Equilibrio dinámico guardado.';
          submitStatus.value = 'success';
        } catch (error) {
          // Check if the error indicates a record already exists
          if (error.response && error.response.data && error.response.data.message && error.response.data.message.includes('Ya existe un registro de Equilibrio Dinámico')) {
            console.warn('Equilibrio Dinámico record already exists, attempting PATCH.');
            response = await axios.patch(`${import.meta.env.VITE_URL_BACKEND}/api/equilibrio-dinamico/${fisioterapiaId.value}`, {
              idfisioterapia: fisioterapiaId.value,
              edLevantarse: form.tinetti.equilibrioDinamico.inicioMarcha === 1,
              edPasocontinuo: form.tinetti.equilibrioDinamico.pasoContinuo === 1,
              edLongpaso: form.tinetti.equilibrioDinamico.longitudPaso === 1,
              edPasoelevado: form.tinetti.equilibrioDinamico.pasoElevado === 1,
              edRotaciontronco: form.tinetti.equilibrioDinamico.rotacionTronco === 1,
              edPasofinal: form.tinetti.equilibrioDinamico.pasoFinal === 1,
            });
            submitMessage.value = 'Equilibrio dinámico actualizado.';
            submitStatus.value = 'success';
          } else {
            throw error; // Re-throw other errors
          }
        }
        break;
      case 5:
        if (!fisioterapiaId.value) throw new Error('ID de fisioterapia no disponible. Vuelva al paso anterior.');
        try {
          response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/equilibrio-estatico`, {
            idfisioterapia: fisioterapiaId.value,
            eeSentadonoapoyo: form.tinetti.equilibrioEstatico.sentadoSinApoyos === 1,
            eeParadonoapoyo: form.tinetti.equilibrioEstatico.paradoSinApoyos === 1,
          });
          submitMessage.value = 'Equilibrio estático guardado.';
          submitStatus.value = 'success';
        } catch (error) {
          // Check if the error indicates a record already exists
          if (error.response && error.response.data && error.response.data.message && error.response.data.message.includes('Ya existe un registro de Equilibrio Estático')) {
            console.warn('Equilibrio Estático record already exists, attempting PATCH.');
            response = await axios.patch(`${import.meta.env.VITE_URL_BACKEND}/api/equilibrio-estatico/${fisioterapiaId.value}`, {
              idfisioterapia: fisioterapiaId.value,
              eeSentadonoapoyo: form.tinetti.equilibrioEstatico.sentadoSinApoyos === 1,
              eeParadonoapoyo: form.tinetti.equilibrioEstatico.paradoSinApoyos === 1,
            });
            submitMessage.value = 'Equilibrio estático actualizado.';
            submitStatus.value = 'success';
          } else {
            throw error; // Re-throw other errors
          }
        }
        break;
    }

    currentStep.value++;
  } catch (error) {
    submitMessage.value = 'Error al guardar los datos. Por favor, intente de nuevo.';
    submitStatus.value = 'error';
    console.error('Error submitting step:', error);
    if (error.response && error.response.data && error.response.data.message) {
      submitMessage.value += ` Detalles: ${error.response.data.message}`;
    } else if (error.message) {
      submitMessage.value += ` Detalles: ${error.message}`;
    }
  } finally {
    isSubmitting.value = false;
  }
};

// Handle navigation to the previous step
const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
    submitMessage.value = ''; // Clear messages when navigating back
    submitStatus.value = '';
  }
};

// Final form submission (Step 6)
const submitFinalForm = async () => {
  if (!validateStep(currentStep.value)) {
    return;
  }

  isSubmitting.value = true;
  submitMessage.value = 'Guardando zonas de dolor...';
  submitStatus.value = '';

  try {
    if (!fisioterapiaId.value) throw new Error('ID de fisioterapia no disponible. Vuelva al paso 1 para iniciar la ficha.');

    const allPossibleZoneIds = Array.from({ length: 28 }, (_, i) => i + 1); // IDs from 1 to 28

    for (const idzona of allPossibleZoneIds) {
      const isCurrentlySelected = form.dolor.zonasDolorosas.includes(idzona);
      const wasPreviouslyActive = initialZonasDolorosasState[idzona] === true;

      if (isCurrentlySelected && !wasPreviouslyActive) {
        // Zone is selected now, but wasn't active before (or didn't exist) -> POST
        try {
          await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/dolor-fisio`, {
            idfisioterapia: fisioterapiaId.value,
            idzona: idzona,
            zonaDuele: true,
          });
          console.log(`Zona ${idzona} POSTed as true.`);
        } catch (error) {
          if (error.response && error.response.status === 409) { // Assuming 409 Conflict for "already exists"
            console.warn(`Zona ${idzona} already exists, attempting PATCH to set true.`);
            await axios.patch(`${import.meta.env.VITE_URL_BACKEND}/api/dolor-fisio/${fisioterapiaId.value}/${idzona}`, {
              zonaDuele: true,
            });
            console.log(`Zona ${idzona} PATCHed to true.`);
          } else {
            console.error(`Error POSTing zona ${idzona}:`, error);
            submitMessage.value = `Error al guardar/actualizar zona ${idzona}. Detalles: ${error.message}`;
            submitStatus.value = 'error';
          }
        }
      } else if (!isCurrentlySelected && wasPreviouslyActive) {
        // Zone is not selected now, but was active before -> PATCH to false
        try {
          await axios.patch(`${import.meta.env.VITE_URL_BACKEND}/api/dolor-fisio/${fisioterapiaId.value}/${idzona}`, {
            zonaDuele: false,
          });
          console.log(`Zona ${idzona} PATCHed to false.`);
        } catch (error) {
          console.error(`Error PATCHing zona ${idzona} to false:`, error);
          submitMessage.value = `Error al actualizar zona ${idzona} a no dolorosa. Detalles: ${error.message}`;
          submitStatus.value = 'error';
        }
      }
      // If isCurrentlySelected && wasPreviouslyActive, do nothing (already true and remains true)
      // If !isCurrentlySelected && !wasPreviouslyActive, do nothing (already false and remains false, or never existed)
    }

    if (submitStatus.value !== 'error') {
      submitMessage.value = '¡Zonas de dolor guardadas correctamente!';
      submitStatus.value = 'success';
    }

  } catch (error) {
    console.error('Error general al guardar las zonas de dolor:', error);
    submitMessage.value = 'Ocurrió un error general al guardar las zonas de dolor. Por favor, intente de nuevo.';
    submitStatus.value = 'error';
    if (error.response && error.response.data && error.response.data.message) {
      submitMessage.value += ` Detalles: ${error.response.data.message}`;
    } else if (error.message) {
      submitMessage.value += ` Detalles: ${error.message}`;
    }
  } finally {
    isSubmitting.value = false;
  }
};

// Function to get Wong-Baker faces (assuming images are in assets)
const getWongBakerFace = (score) => {
  return new URL(`../assets/images/wong-baker/face${score}.png`, import.meta.url).href;
};
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

/* Progress Indicator Styles */
.progress-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  gap: 10px;
  flex-wrap: wrap;
}

.step-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-background-light);
  border: 2px solid var(--color-primary-light);
  color: var(--color-primary-dark);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease; /* Added transitions */
}

.step-circle.active {
  background-color: var(--color-primary-dark); /* Changed as per user request */
  color: white;
  border-color: var(--color-primary); /* Updated as per user request */
  box-shadow: 0 0 0 6px rgba(var(--color-primary-rgb), 0.4), 0 6px 15px rgba(0, 0, 0, 0.3); /* More pronounced shadow */
  transform: scale(1.15); /* Slightly more pronounced scale */
}

.step-circle.completed {
  background-color: var(--color-accent-green);
  color: white;
  border-color: var(--color-accent-green);
}

.step-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-left: 10px;
  transition: all 0.3s ease;
}

.step-circle.active + .step-label {
  font-weight: 900; /* Even bolder */
  color: var(--color-primary-dark);
  transform: translateY(-3px) translateX(5px); /* More noticeable lift and slight shift */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); /* Subtle text shadow */
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

.form-grid-3-col {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 25px;
  margin-bottom: 25px;
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

/* Body Chart Styles */
.body-chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
  background-color: #f9f9f9;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 20px;
}

.body-chart-svg {
  width: 100%;
  max-width: 300px; /* Limit width for better display */
  height: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}

.body-chart-svg circle,
.body-chart-svg rect,
.body-chart-svg polygon {
  fill: #e0e0e0; /* Default color for body parts */
  stroke: #999;
  stroke-width: 1;
  transition: fill 0.2s ease-in-out, stroke 0.2s ease-in-out; /* Removed transform */
  cursor: pointer;
}

.body-chart-svg circle:hover,
.body-chart-svg rect:hover,
.body-chart-svg polygon:hover {
  fill: #c0c0c0; /* Hover color */
}

.body-chart-svg .pain-active {
  fill: #ff6b6b; /* Red color for painful areas */
  stroke: #c0392b;
  stroke-width: 2;
  /* Removed transform: scale(1.05); */
}

/* Specific styling for shoulder base to be non-interactive */
.body-chart-svg .shoulder-base {
  fill: #e0e0e0;
  stroke: #999;
  pointer-events: none; /* Make it not clickable */
}

/* Navigation Buttons */
.form-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  gap: 20px;
}

.nav-button {
  background-color: var(--color-secondary);
  color: var(--color-text-light);
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(var(--color-secondary-rgb), 0.2);
}

.nav-button:hover:not(:disabled) {
  background-color: var(--color-secondary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(var(--color-secondary-rgb), 0.3);
}

.nav-button:disabled {
  background-color: var(--color-disabled);
  cursor: not-allowed;
  opacity: 0.8;
  transform: none;
  box-shadow: none;
}

.prev-button {
  background-color: var(--color-grey-dark);
}

.prev-button:hover:not(:disabled) {
  background-color: var(--color-grey-darker);
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
  box-shadow: 0 4px 10px rgba(var(--color-primary-rgb), 0.2);
  width: auto;
  display: block;
  margin-left: auto; /* Centers the button if it's the only one */
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

/* Estilo para el indicador de campo requerido */
.required {
  color: var(--color-error); /* Usa un color rojo o distintivo */
  margin-left: 4px;
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
  .form-grid-2-col,
  .form-grid-3-col {
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

  .form-navigation {
    flex-direction: column;
    gap: 15px;
  }
  .nav-button, .submit-button {
    width: 100%;
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
</style>
