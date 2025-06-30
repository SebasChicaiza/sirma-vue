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

      <FichaSelector v-model:idficha="selectedFichaId" />

      <div class="form-metadata">
        <div class="form-group inline-group">
          <label for="fechaContacto">Fecha de Contacto:<span class="required">*</span></label>
          <input
            id="fechaContacto"
            v-model="form.fechaContacto"
            type="date"
            class="small-input"
            required
          />
        </div>
        <div class="form-group inline-group">
          <label for="nombreEvaluador">Evaluador:<span class="required">*</span></label>
          <input
            id="nombreEvaluador"
            v-model.trim="form.nombreEvaluador"
            type="text"
            placeholder="Ej. Juan Pérez"
            class="small-input"
            required
          />
        </div>
      </div>

      <!-- Se eliminó la sección de Datos Generales -->

      <section class="form-section">
        <h3 class="section-title">📋 Estado General y Revisión Actual de Sistemas</h3>
        <div class="form-group full-width">
          <label for="estadoGeneral">Estado General:<span class="required">*</span></label>
          <input
            id="estadoGeneral"
            v-model.trim="form.estadoGeneral"
            type="text"
            placeholder="Ej. Bueno, Regular, Deteriorado, etc."
            required
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
            <label
              ><input type="checkbox" value="Deambulación" v-model="form.alertas" />
              Deambulación</label
            >
            <label
              ><input type="checkbox" value="Comportamental" v-model="form.alertas" />
              Comportamental</label
            >
          </div>
        </div>

        <div class="form-group full-width">
          <label class="section-subtitle">Revisión de sistemas (selección múltiple):</label>
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
            <label
              ><input type="checkbox" value="Endocrino" v-model="form.revisionSistemas" />
              Endocrino</label
            >
            <label
              ><input type="checkbox" value="Linfático" v-model="form.revisionSistemas" />
              Linfático</label
            >
            <label
              ><input type="checkbox" value="Tegumentario" v-model="form.revisionSistemas" />
              Tegumentario</label
            >
          </div>
        </div>

        <div class="form-group full-width">
          <label for="sintomasActuales">Síntomas Actuales:<span class="required">*</span></label>
          <textarea
            id="sintomasActuales"
            v-model.trim="form.sintomasActuales"
            rows="3"
            placeholder="Escribe los síntomas relevantes que presenta el paciente actualmente."
            required
          ></textarea>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">📚 Antecedentes y Hábitos</h3>

        <div class="form-group full-width">
          <label class="section-subtitle">Antecedentes Personales (múltiple selección):</label>
          <div class="checkbox-group form-grid">
            <label
              ><input
                type="checkbox"
                value="Diabetes Mellitus"
                v-model="form.antecedentesPersonales"
              />
              Diabetes Mellitus</label
            >
            <label
              ><input
                type="checkbox"
                value="Hipertensión Arterial"
                v-model="form.antecedentesPersonales"
              />
              Hipertensión Arterial</label
            >
            <label
              ><input type="checkbox" value="Cardiopatía" v-model="form.antecedentesPersonales" />
              Cardiopatía</label
            >
            <label
              ><input
                type="checkbox"
                value="Accidente Cerebrovascular (ACV)"
                v-model="form.antecedentesPersonales"
              />
              Accidente Cerebrovascular (ACV)</label
            >
            <label
              ><input type="checkbox" value="Cáncer" v-model="form.antecedentesPersonales" />
              Cáncer</label
            >
            <label
              ><input
                type="checkbox"
                value="Enfermedad Renal Crónica"
                v-model="form.antecedentesPersonales"
              />
              Enfermedad Renal Crónica</label
            >
            <label
              ><input type="checkbox" value="Asma" v-model="form.antecedentesPersonales" />
              Asma</label
            >
            <label
              ><input type="checkbox" value="EPOC" v-model="form.antecedentesPersonales" />
              EPOC</label
            >
            <label
              ><input
                type="checkbox"
                value="Artrosis/Artritis"
                v-model="form.antecedentesPersonales"
              />
              Artrosis/Artritis</label
            >
            <label
              ><input type="checkbox" value="Osteoporosis" v-model="form.antecedentesPersonales" />
              Osteoporosis</label
            >
            <label
              ><input
                type="checkbox"
                value="Cirugía Previa"
                v-model="form.antecedentesPersonales"
              />
              Cirugía Previa</label
            >
            <label
              ><input type="checkbox" value="Fracturas" v-model="form.antecedentesPersonales" />
              Fracturas</label
            >
            <label
              ><input
                type="checkbox"
                value="Alergias Conocidas"
                v-model="form.antecedentesPersonales"
              />
              Alergias Conocidas</label
            >
            <label
              ><input
                type="checkbox"
                value="Disfunción Tiroidea"
                v-model="form.antecedentesPersonales"
              />
              Disfunción Tiroidea</label
            >
            <label
              ><input
                type="checkbox"
                value="Úlcera Gástrica/Duodenal"
                v-model="form.antecedentesPersonales"
              />
              Úlcera Gástrica/Duodenal</label
            >
            <label
              ><input type="checkbox" value="Parkinson" v-model="form.antecedentesPersonales" />
              Parkinson</label
            >
            <label
              ><input
                type="checkbox"
                value="Alzheimer/Demencia"
                v-model="form.antecedentesPersonales"
              />
              Alzheimer/Demencia</label
            >
            <label
              ><input
                type="checkbox"
                value="Depresión/Ansiedad"
                v-model="form.antecedentesPersonales"
              />
              Depresión/Ansiedad</label
            >
            <label
              ><input type="checkbox" value="Migrañas" v-model="form.antecedentesPersonales" />
              Migrañas</label
            >
            <label
              ><input
                type="checkbox"
                value="Infecciones Urinarias Recurrentes"
                v-model="form.antecedentesPersonales"
              />
              Infecciones Urinarias Recurrentes</label
            >
          </div>
          <div class="form-group full-width">
            <label for="otrosAntecedentesPersonales"
              >Otros Antecedentes Personales / Observaciones:</label
            >
            <textarea
              id="otrosAntecedentesPersonales"
              v-model.trim="form.otrosAntecedentesPersonales"
              rows="2"
              placeholder="Especifique otros antecedentes o detalles relevantes no listados."
            ></textarea>
          </div>
        </div>

        <div class="form-group full-width">
          <label class="section-subtitle">Hábitos Nocivos (selección múltiple):</label>
          <div class="checkbox-group form-grid">
            <label
              ><input type="checkbox" value="Tabaquismo" v-model="form.habitos" /> Tabaquismo</label
            >
            <label
              ><input type="checkbox" value="Alcoholismo" v-model="form.habitos" />
              Alcoholismo</label
            >
            <label
              ><input type="checkbox" value="Uso de Drogas Ilícitas" v-model="form.habitos" /> Uso
              de Drogas Ilícitas</label
            >
            <label
              ><input type="checkbox" value="Sedentarismo" v-model="form.habitos" />
              Sedentarismo</label
            >
            <label
              ><input type="checkbox" value="Dieta Inadecuada" v-model="form.habitos" /> Dieta
              Inadecuada</label
            >
            <label
              ><input type="checkbox" value="Insomnio Crónico" v-model="form.habitos" /> Insomnio
              Crónico</label
            >
            <label
              ><input type="checkbox" value="Estrés Crónico" v-model="form.habitos" /> Estrés
              Crónico</label
            >
          </div>
          <div class="form-group full-width">
            <label for="otrosHabitos">Otros Hábitos Nocivos / Observaciones:</label>
            <textarea
              id="otrosHabitos"
              v-model.trim="form.otrosHabitos"
              rows="2"
              placeholder="Especifique otros hábitos o detalles relevantes."
            ></textarea>
          </div>
        </div>

        <div class="form-group full-width">
          <label class="section-subtitle">Antecedentes Farmacológicos (selección múltiple):</label>
          <div class="checkbox-group form-grid">
            <label
              ><input
                type="checkbox"
                value="Polifarmacia (>5 medicamentos)"
                v-model="form.farmaco"
              />
              Polifarmacia (>5 medicamentos)</label
            >
            <label
              ><input type="checkbox" value="Alergia a Medicamentos" v-model="form.farmaco" />
              Alergia a Medicamentos</label
            >
            <label
              ><input type="checkbox" value="Antihipertensivos" v-model="form.farmaco" />
              Antihipertensivos</label
            >
            <label
              ><input type="checkbox" value="Antidiabéticos" v-model="form.farmaco" />
              Antidiabéticos</label
            >
            <label
              ><input type="checkbox" value="Anticoagulantes" v-model="form.farmaco" />
              Anticoagulantes</label
            >
            <label
              ><input type="checkbox" value="Antiinflamatorios (AINEs)" v-model="form.farmaco" />
              Antiinflamatorios (AINEs)</label
            >
            <label
              ><input type="checkbox" value="Analgésicos Opioides" v-model="form.farmaco" />
              Analgésicos Opioides</label
            >
            <label
              ><input type="checkbox" value="Diuréticos" v-model="form.farmaco" /> Diuréticos</label
            >
            <label
              ><input type="checkbox" value="Antidepresivos/Ansiolíticos" v-model="form.farmaco" />
              Antidepresivos/Ansiolíticos</label
            >
            <label
              ><input type="checkbox" value="Suplementos/Vitaminas" v-model="form.farmaco" />
              Suplementos/Vitaminas</label
            >
            <label
              ><input type="checkbox" value="Medicina Alternativa/Natural" v-model="form.farmaco" />
              Medicina Alternativa/Natural</label
            >
          </div>
          <div class="form-group full-width">
            <label for="otrosFarmaco">Otros Antecedentes Farmacológicos / Observaciones:</label>
            <textarea
              id="otrosFarmaco"
              v-model.trim="form.otrosFarmaco"
              rows="2"
              placeholder="Especifique medicamentos actuales, alergias no listadas o interacciones relevantes."
            ></textarea>
          </div>
        </div>

        <div class="form-group full-width">
          <label class="section-subtitle">Antecedentes Patológicos (selección múltiple):</label>
          <div class="checkbox-group form-grid">
            <label
              ><input
                type="checkbox"
                value="Enfermedades Infecciosas (TB, Hepatitis)"
                v-model="form.patologicos"
              />
              Enfermedades Infecciosas (TB, Hepatitis)</label
            >
            <label
              ><input type="checkbox" value="Enfermedades Autoinmunes" v-model="form.patologicos" />
              Enfermedades Autoinmunes</label
            >
            <label
              ><input type="checkbox" value="Cistitis Recurrente" v-model="form.patologicos" />
              Cistitis Recurrente</label
            >
            <label
              ><input type="checkbox" value="Anemia" v-model="form.patologicos" /> Anemia</label
            >
            <label
              ><input type="checkbox" value="Problemas de Coagulación" v-model="form.patologicos" />
              Problemas de Coagulación</label
            >
            <label
              ><input type="checkbox" value="Hernias" v-model="form.patologicos" /> Hernias</label
            >
            <label
              ><input
                type="checkbox"
                value="Cálculos Renales/Biliares"
                v-model="form.patologicos"
              />
              Cálculos Renales/Biliares</label
            >
            <label
              ><input type="checkbox" value="Glaucoma/Cataratas" v-model="form.patologicos" />
              Glaucoma/Cataratas</label
            >
            <label
              ><input
                type="checkbox"
                value="Otras Enfermedades Crónicas"
                v-model="form.patologicos"
              />
              Otras Enfermedades Crónicas</label
            >
          </div>
          <div class="form-group full-width">
            <label for="otrosPatologicos">Otros Antecedentes Patológicos / Observaciones:</label>
            <textarea
              id="otrosPatologicos"
              v-model.trim="form.otrosPatologicos"
              rows="2"
              placeholder="Especifique enfermedades o condiciones no listadas."
            ></textarea>
          </div>
        </div>

        <div class="form-group full-width">
          <label class="section-subtitle"
            >Antecedentes Gineco-Obstétricos (selección múltiple, si aplica):</label
          >
          <div class="checkbox-group form-grid">
            <label
              ><input type="checkbox" value="Menarquia" v-model="form.ginecoObstetricos" />
              Menarquia</label
            >
            <label
              ><input type="checkbox" value="Ciclos Regulares" v-model="form.ginecoObstetricos" />
              Ciclos Regulares</label
            >
            <label
              ><input type="checkbox" value="Ciclos Irregulares" v-model="form.ginecoObstetricos" />
              Ciclos Irregulares</label
            >
            <label
              ><input type="checkbox" value="Gestas" v-model="form.ginecoObstetricos" />
              Gestas</label
            >
            <label
              ><input type="checkbox" value="Partos" v-model="form.ginecoObstetricos" />
              Partos</label
            >
            <label
              ><input type="checkbox" value="Cesáreas" v-model="form.ginecoObstetricos" />
              Cesáreas</label
            >
            <label
              ><input type="checkbox" value="Abortos" v-model="form.ginecoObstetricos" />
              Abortos</label
            >
            <label
              ><input type="checkbox" value="FUM" v-model="form.ginecoObstetricos" /> FUM</label
            >
            <label
              ><input type="checkbox" value="Menopausia" v-model="form.ginecoObstetricos" />
              Menopausia</label
            >
            <label
              ><input
                type="checkbox"
                value="Anticonceptivos Hormonales"
                v-model="form.ginecoObstetricos"
              />
              Anticonceptivos Hormonales</label
            >
            <label
              ><input type="checkbox" value="DIU" v-model="form.ginecoObstetricos" /> DIU</label
            >
            <label
              ><input
                type="checkbox"
                value="Citología Vaginal (Papanicolau) Anormal"
                v-model="form.ginecoObstetricos"
              />
              Citología Vaginal (Papanicolau) Anormal</label
            >
            <label
              ><input type="checkbox" value="Patología Mamaria" v-model="form.ginecoObstetricos" />
              Patología Mamaria</label
            >
            <label
              ><input type="checkbox" value="Embarazo Ectópico" v-model="form.ginecoObstetricos" />
              Embarazo Ectópico</label
            >
          </div>
          <div class="form-group full-width">
            <label for="otrosGinecoObstetricos">Otros Gineco-Obstétricos / Observaciones:</label>
            <textarea
              id="otrosGinecoObstetricos"
              v-model.trim="form.otrosGinecoObstetricos"
              rows="2"
              placeholder="Especifique detalles adicionales de antecedentes gineco-obstétricos."
            ></textarea>
          </div>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">👪 Antecedentes Familiares y Sociales</h3>
        <div class="form-group full-width">
          <label class="section-subtitle">Antecedentes Familiares (selección múltiple):</label>
          <div class="checkbox-group form-grid">
            <label
              ><input type="checkbox" value="Diabetes" v-model="form.antecedentesFamiliares" />
              Diabetes</label
            >
            <label
              ><input type="checkbox" value="Hipertensión" v-model="form.antecedentesFamiliares" />
              Hipertensión</label
            >
            <label
              ><input type="checkbox" value="Cáncer" v-model="form.antecedentesFamiliares" />
              Cáncer</label
            >
            <label
              ><input
                type="checkbox"
                value="Enfermedades Cardíacas"
                v-model="form.antecedentesFamiliares"
              />
              Enfermedades Cardíacas</label
            >
            <label
              ><input
                type="checkbox"
                value="Enfermedades Renales"
                v-model="form.antecedentesFamiliares"
              />
              Enfermedades Renales</label
            >
            <label
              ><input
                type="checkbox"
                value="Enfermedades Mentales"
                v-model="form.antecedentesFamiliares"
              />
              Enfermedades Mentales</label
            >
            <label
              ><input
                type="checkbox"
                value="Enfermedades Neurológicas"
                v-model="form.antecedentesFamiliares"
              />
              Enfermedades Neurológicas</label
            >
            <label
              ><input
                type="checkbox"
                value="Enfermedades Autoinmunes"
                v-model="form.antecedentesFamiliares"
              />
              Enfermedades Autoinmunes</label
            >
            <label
              ><input type="checkbox" value="Alergias" v-model="form.antecedentesFamiliares" />
              Alergias</label
            >
            <label
              ><input
                type="checkbox"
                value="Enfermedades Respiratorias"
                v-model="form.antecedentesFamiliares"
              />
              Enfermedades Respiratorias</label
            >
            <label
              ><input type="checkbox" value="Obesidad" v-model="form.antecedentesFamiliares" />
              Obesidad</label
            >
          </div>
          <div class="form-group full-width">
            <label for="otrosAntecedentesFamiliares"
              >Otros Antecedentes Familiares / Observaciones:</label
            >
            <textarea
              id="otrosAntecedentesFamiliares"
              v-model.trim="form.otrosAntecedentesFamiliares"
              rows="2"
              placeholder="Especifique otros antecedentes familiares relevantes o detalles."
            ></textarea>
          </div>
        </div>

        <div class="form-group full-width">
          <label class="section-subtitle">Antecedentes Sociales (selección múltiple):</label>
          <div class="checkbox-group form-grid">
            <label
              ><input type="checkbox" value="Vive Solo" v-model="form.antecedentesSociales" /> Vive
              Solo</label
            >
            <label
              ><input
                type="checkbox"
                value="Dependencia Económica"
                v-model="form.antecedentesSociales"
              />
              Dependencia Económica</label
            >
            <label
              ><input
                type="checkbox"
                value="Cuidado por Familiar"
                v-model="form.antecedentesSociales"
              />
              Cuidado por Familiar</label
            >
            <label
              ><input
                type="checkbox"
                value="Acceso Limitado a Servicios Básicos"
                v-model="form.antecedentesSociales"
              />
              Acceso Limitado a Servicios Básicos</label
            >
            <label
              ><input
                type="checkbox"
                value="Dificultad de Acceso a Salud"
                v-model="form.antecedentesSociales"
              />
              Dificultad de Acceso a Salud</label
            >
            <label
              ><input
                type="checkbox"
                value="Bajo Nivel Educativo"
                v-model="form.antecedentesSociales"
              />
              Bajo Nivel Educativo</label
            >
            <label
              ><input
                type="checkbox"
                value="Actividad Laboral"
                v-model="form.antecedentesSociales"
              />
              Actividad Laboral</label
            >
            <label
              ><input type="checkbox" value="Jubilado" v-model="form.antecedentesSociales" />
              Jubilado</label
            >
            <label
              ><input type="checkbox" value="Estudiante" v-model="form.antecedentesSociales" />
              Estudiante</label
            >
          </div>
          <div class="form-group full-width">
            <label for="otrosAntecedentesSociales"
              >Otros Antecedentes Sociales / Observaciones:</label
            >
            <textarea
              id="otrosAntecedentesSociales"
              v-model.trim="form.otrosAntecedentesSociales"
              rows="2"
              placeholder="Especifique condiciones de vivienda, situación laboral/familiar, nivel de soporte social, etc."
            ></textarea>
          </div>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">🧍‍♂️ Examen Físico</h3>
        <div class="form-group full-width">
          <label class="section-subtitle">Regiones Evaluadas (selección múltiple):</label>
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
            <label
              ><input type="checkbox" value="Piel_Anexos" v-model="form.examenFisico" /> Piel y
              Anexos</label
            >
            <label
              ><input type="checkbox" value="Neurologico" v-model="form.examenFisico" />
              Neurológico</label
            >
            <label
              ><input type="checkbox" value="Cardiopulmonar" v-model="form.examenFisico" />
              Cardiopulmonar</label
            >
          </div>
        </div>
        <div class="form-group full-width">
          <label for="examenDescripcion"
            >Descripción Detallada del Examen Físico:<span class="required">*</span></label
          >
          <textarea
            id="examenDescripcion"
            v-model.trim="form.examenDescripcion"
            rows="4"
            placeholder="Detalle hallazgos relevantes por sistemas/regiones, incluyendo signos vitales (presión arterial, pulso, respiración, temperatura), peso, talla, IMC si son pertinentes. Ej: Piel pálida, mucosas secas, abdomen blando, depresible, no doloroso a la palpación."
            required
          ></textarea>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">🔍 Diagnóstico</h3>
        <div class="form-group full-width">
          <label for="diagnosticosMedicos"
            >Diagnósticos Médicos (CIE-10 si aplica):<span class="required">*</span></label
          >
          <textarea
            id="diagnosticosMedicos"
            v-model.trim="form.diagnosticosMedicos"
            rows="2"
            placeholder="Listar diagnósticos médicos con su código CIE-10 si es posible. Ej: Diabetes Mellitus tipo 2 (E11.9); Hipertensión esencial (I10)."
            required
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
              <label :for="`diagnosticoEnfermeria-${index}`"
                >Diagnóstico NANDA {{ index + 1 }}:</label
              >
              <input
                :id="`diagnosticoEnfermeria-${index}`"
                v-model.trim="form.diagnosticosEnfermeria[index]"
                type="text"
                :placeholder="`Ej: Riesgo de caídas r/c debilidad muscular. #${index + 1}`"
              />
            </div>
          </div>
          <div class="button-group">
            <button @click="addDiagnosticoEnfermeria" type="button" class="add-remove-button">
              + Añadir Diagnóstico
            </button>
            <button
              v-if="form.diagnosticosEnfermeria.length > 1"
              @click="removeDiagnosticoEnfermeria"
              type="button"
              class="add-remove-button remove"
            >
              - Eliminar Último
            </button>
          </div>
        </div>
      </section>

      <section class="form-section">
        <h3 class="section-title">📌 Plan de Manejo Integral</h3>
        <div class="form-group full-width">
          <label for="planManejo"
            >Descripción del Plan de Manejo:<span class="required">*</span></label
          >
          <textarea
            id="planManejo"
            v-model.trim="form.planManejo"
            rows="4"
            placeholder="Describe el plan de seguimiento, medicación prescrita, intervenciones de enfermería, educación al paciente y familia, referencias a otros especialistas, etc. Ej: Control de glicemia capilar diario, dieta baja en sal, caminata 30 min/día."
            required
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
import axios from 'axios'
import FichaSelector from '@/components/FichaSelector.vue'

const form = reactive({
  fechaContacto: '',
  nombreEvaluador: '',
  estadoGeneral: '',
  alertas: [], // Array para checkboxes
  revisionSistemas: [], // Array para checkboxes
  sintomasActuales: '',
  antecedentesPersonales: [], // Ahora es un array para los checkboxes
  otrosAntecedentesPersonales: '', // Nuevo campo para observaciones
  habitos: [], // Ahora es un array para los checkboxes
  otrosHabitos: '', // Nuevo campo para observaciones
  farmaco: [], // Ahora es un array para los checkboxes
  otrosFarmaco: '', // Nuevo campo para observaciones
  patologicos: [], // Ahora es un array para los checkboxes
  otrosPatologicos: '', // Nuevo campo para observaciones
  ginecoObstetricos: [], // Ahora es un array para los checkboxes
  otrosGinecoObstetricos: '', // Nuevo campo para observaciones
  antecedentesFamiliares: [], // Ahora es un array para los checkboxes
  otrosAntecedentesFamiliares: '', // Nuevo campo para observaciones
  antecedentesSociales: [], // Nuevo array para los checkboxes
  otrosAntecedentesSociales: '', // Nuevo campo para observaciones
  examenFisico: [], // Array para checkboxes
  examenDescripcion: '',
  diagnosticosMedicos: '',
  diagnosticosEnfermeria: [''], // Iniciamos con un campo vacío para el primer diagnóstico
  planManejo: '',
})

// Simulación de envío
const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref('') // 'success' o 'error'

const addDiagnosticoEnfermeria = () => {
  form.diagnosticosEnfermeria.push('')
}

const removeDiagnosticoEnfermeria = () => {
  if (form.diagnosticosEnfermeria.length > 1) {
    form.diagnosticosEnfermeria.pop()
  }
}

const validateForm = () => {
  // Resetear mensajes de validación
  submitMessage.value = ''
  submitStatus.value = ''

  // Validaciones de campos requeridos (básicos)
  const requiredFields = [
    { field: form.fechaContacto, name: 'Fecha de Contacto' },
    { field: form.nombreEvaluador, name: 'Evaluador' },
    { field: form.nombres, name: 'Nombres' },
    { field: form.apellidos, name: 'Apellidos' },
    { field: form.cedula, name: 'Cédula' },
    { field: form.fechaNacimiento, name: 'Fecha de Nacimiento' },
    { field: form.edad, name: 'Edad' },
    { field: form.sexo, name: 'Sexo' },
    { field: form.estadoGeneral, name: 'Estado General' },
    { field: form.sintomasActuales, name: 'Síntomas Actuales' },
    { field: form.examenDescripcion, name: 'Descripción del Examen Físico' },
    { field: form.diagnosticosMedicos, name: 'Diagnósticos Médicos' },
    { field: form.planManejo, name: 'Plan de Manejo' },
  ]

  for (const field of requiredFields) {
    if (!field.field || (Array.isArray(field.field) && field.field.length === 0)) {
      submitMessage.value = `El campo "${field.name}" es requerido.`
      submitStatus.value = 'error'
      return false
    }
  }

  // Validación específica para Cédula (Ecuadorian ID)
  // Nota: Esto es una validación básica de longitud y numérico.
  // Una validación de cédula ecuatoriana real requiere un algoritmo más complejo.
  if (form.cedula.length !== 10 || !/^\d+$/.test(form.cedula)) {
    submitMessage.value = 'La Cédula debe contener exactamente 10 dígitos numéricos.'
    submitStatus.value = 'error'
    return false
  }
  // Añadir aquí la validación de dígito verificador de cédula si es necesario para mayor robustez
  // Por ejemplo, una función `isValidCedula(form.cedula)`

  // Validación de Edad
  if (form.edad < 0 || form.edad > 120 || !Number.isInteger(form.edad)) {
    submitMessage.value = 'La Edad debe ser un número entero válido (entre 0 y 120).'
    submitStatus.value = 'error'
    return false
  }

  // Validación de Fecha de Nacimiento (que no sea una fecha futura)
  const today = new Date()
  const birthDate = new Date(form.fechaNacimiento)
  if (birthDate > today) {
    submitMessage.value = 'La Fecha de Nacimiento no puede ser una fecha futura.'
    submitStatus.value = 'error'
    return false
  }

  // Validación para al menos un campo de diagnóstico de enfermería si se han añadido dinámicamente
  if (
    form.diagnosticosEnfermeria.length > 0 &&
    form.diagnosticosEnfermeria.every((d) => d.trim() === '')
  ) {
    // Si solo hay un campo y está vacío, no se requiere. Si hay más y todos están vacíos, es un problema.
    // Se puede ajustar la lógica si se considera obligatorio al menos un diagnóstico NANDA.
    // Por ahora, solo se activa el mensaje si hay más de 1 campo y todos están vacíos.
    if (form.diagnosticosEnfermeria.length > 1) {
      submitMessage.value =
        'Si ha añadido diagnósticos de enfermería, al menos uno debe tener contenido.'
      submitStatus.value = 'error'
      return false
    }
  }

  return true
}

const searchCedula = ref('')
const fichas = ref([])
const selectedFichaId = ref(null)

const buscarFichas = async () => {
  fichas.value = []
  selectedFichaId.value = null
  if (!searchCedula.value) return
  try {
    const res = await axios.get(
      `https://backend-sirma-nest.onrender.com/api/personas/fichas-medicas/${searchCedula.value}`,
    )
    fichas.value = res.data
  } catch (e) {
    fichas.value = []
    alert('No se encontraron fichas o hubo un error.')
  }
}

const seleccionarFicha = (ficha) => {
  selectedFichaId.value = ficha.idficha
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  // Asegúrate de que haya una ficha seleccionada
  if (!selectedFichaId.value) {
    submitMessage.value = 'Debe seleccionar una ficha antes de guardar.'
    submitStatus.value = 'error'
    return
  }

  isSubmitting.value = true

  try {
    const payload = {
      ...form,
      idficha: selectedFichaId.value, // Solo el id de ficha
    }

    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simula API

    console.log('Datos enviados:', payload)

    submitMessage.value = 'Ficha médica del paciente guardada exitosamente.'
    submitStatus.value = 'success'
    // resetForm();
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
  max-width: 1200px; /* Ancho máximo para el diseño de escritorio (4 columnas) */
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
  /* Por defecto, intentar 4 columnas en pantallas grandes */
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
  margin-bottom: 20px; /* Espacio entre textareas grandes o grupos de checkboxes */
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

/* Estilo para el indicador de campo requerido */
.required {
  color: var(--color-error); /* Usa un color rojo o distintivo */
  margin-left: 4px;
}

/* Botones para añadir/eliminar diagnósticos de enfermería */
.button-group {
  display: flex;
  gap: 10px;
  margin-top: 15px; /* Espacio encima del grupo de botones */
  flex-wrap: wrap; /* Permite que los botones se envuelvan en pantallas pequeñas */
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

/* --- Estilos para la barra de búsqueda y resultados de fichas --- */
.titulo-search{
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

/* Responsive para la tabla */
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

/* --- RESPONSIVIDAD PARA MÓVILES --- */

/* Pantallas grandes / monitores (4 columnas) - Base ya definida */
/* max-width: 1200px */
/* grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); */

/* Para pantallas de tabletas grandes o laptops pequeñas (hasta 1250px) - Transición a 3 columnas */
@media (max-width: 1250px) {
  .ficha-card {
    max-width: 980px; /* Reducir el ancho máximo para 3 columnas */
    padding: 35px 40px;
  }
  .form-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* Ajuste para 3 columnas */
  }
  .form-group.full-width .form-grid {
    grid-template-columns: repeat(
      auto-fit,
      minmax(220px, 1fr)
    ); /* Mantener 2-3 columnas para inputs de diagnóstico */
  }
}

/* Para tabletas verticales y laptops pequeñas (hasta 980px) - Transición a 2 columnas */
@media (max-width: 980px) {
  .ficha-card {
    max-width: 760px; /* Reducir el ancho máximo para 2 columnas */
    padding: 30px 30px;
  }
  .form-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Ajuste para 2 columnas */
  }
  .form-group.full-width .form-grid {
    grid-template-columns: 1fr; /* 1 columna para inputs de diagnóstico en pantallas más pequeñas */
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
    flex-direction: column; /* Apilar checkboxes en móviles */
    align-items: flex-start;
    gap: 15px; /* Reducir el espacio entre checkboxes apilados */
  }
  .checkbox-group.form-grid {
    /* Ajustar si un checkbox-group está dentro de un form-grid */
    grid-template-columns: 1fr;
    gap: 10px;
  }
}

/* Para teléfonos grandes y tabletas pequeñas (hasta 600px) - Transición a 1 columna */
@media (max-width: 600px) {
  .ficha-card {
    padding: 20px 15px; /* Reducir el padding para pantallas muy pequeñas */
    max-width: 100%; /* Ocupar todo el ancho disponible */
    box-shadow: none; /* Opcional: remover sombra para un look más "nativo" en móvil */
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
    grid-template-columns: 1fr; /* Una sola columna para la mejor legibilidad */
  }
  .form-group.full-width .form-grid {
    grid-template-columns: 1fr; /* 1 columna para inputs de diagnóstico en móviles */
  }
  /* Ajustar tamaño de texto y padding para una mejor lectura en pantallas pequeñas */
  .submit-button {
    font-size: 1rem;
    padding: 12px 20px;
  }
  .submit-info {
    font-size: 0.9rem;
    padding: 10px;
  }
  .button-group {
    flex-direction: column; /* Apilar botones */
    gap: 5px; /* Reducir espacio entre botones apilados */
  }
  .add-remove-button {
    width: 100%; /* Botones de añadir/eliminar ocupan todo el ancho */
  }
  .add-remove-button.remove {
    margin-left: 0; /* Asegurar que no haya margen extra */
  }
}

/* Ajustes finos para pantallas realmente pequeñas (ej. iPhone SE) */
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
