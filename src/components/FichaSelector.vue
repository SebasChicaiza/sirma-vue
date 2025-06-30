<template>
  <div>
    <div class="search-section">
      <input
        v-model="searchCedula"
        @keyup.enter="buscarFichas"
        type="text"
        placeholder="Buscar fichas disponibles por cédula"
        class="small-input titulo-search"
      />
      <button @click="buscarFichas" class="submit-button" style="margin-left: 10px">
        Buscar
      </button>
    </div>

    <div v-if="fichas.length > 0" class="results-section">
      <table>
        <thead>
          <tr>
            <th>ID Ficha</th>
            <th>Fecha Primer Contacto</th>
            <th>Estado General</th>
            <th>Observaciones</th>
            <th>Seleccionar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ficha in fichas" :key="ficha.idficha">
            <td>{{ ficha.idficha }}</td>
            <td>{{ ficha.pacFechaprimercontacto }}</td>
            <td>{{ ficha.pacEstadogeneral }}</td>
            <td>{{ ficha.pacObservaciones }}</td>
            <td>
              <button @click="seleccionarFicha(ficha)" class="add-remove-button">
                Seleccionar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="selectedFichaId">
      <p><strong>Ficha seleccionada:</strong> {{ selectedFichaId }}</p>
    </div>

    <div v-if="showManualInput" class="manual-id-section">
      <label for="manualFichaId"><strong>No se encontraron fichas.</strong> Ingrese el ID de ficha manualmente:</label>
      <input
        id="manualFichaId"
        v-model="manualFichaId"
        @input="emitManualId"
        type="text"
        placeholder="Ej: FCH001"
        class="small-input"
        style="margin-top: 10px; max-width: 220px;"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const emit = defineEmits(['update:idficha'])

const searchCedula = ref('')
const fichas = ref([])
const selectedFichaId = ref(null)
const showManualInput = ref(false)
const manualFichaId = ref('')

const buscarFichas = async () => {
  fichas.value = []
  selectedFichaId.value = null
  showManualInput.value = false
  manualFichaId.value = ''
  if (!searchCedula.value) return
  try {
    const res = await axios.get(
      `https://backend-sirma-nest.onrender.com/api/personas/fichas-medicas/${searchCedula.value}`,
    )
    fichas.value = res.data
    if (!Array.isArray(res.data) || res.data.length === 0) {
      showManualInput.value = true
    }
  } catch (e) {
    fichas.value = []
    showManualInput.value = true
  }
}

const seleccionarFicha = (ficha) => {
  selectedFichaId.value = ficha.idficha
  emit('update:idficha', ficha.idficha)
  showManualInput.value = false
  manualFichaId.value = ''
}

const emitManualId = () => {
  selectedFichaId.value = manualFichaId.value
  emit('update:idficha', manualFichaId.value)
}
</script>

<style scoped>
.titulo-search{
 width: 100%;
 padding: 2rem;
}
.submit-button {
  background-color: var(--color-primary-dark, #2d5c4d);
  color: var(--color-text-light, #fff);
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
}
.submit-button:hover {
  background-color: var(--color-primary-dark-hover, #245a4b);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  background-color: var(--color-primary-dark);
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
.manual-id-section {
  margin-top: 18px;
  background: #fffbe7;
  border: 1.5px dashed var(--color-accent-green, #7ed957);
  border-radius: 8px;
  padding: 18px 20px;
  color: var(--color-primary-dark, #2d5c4d);
  font-size: 1.08rem;
  max-width: 400px;
}
.manual-id-section label {
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
}
.manual-id-section input {
  margin-top: 8px;
}

</style>
