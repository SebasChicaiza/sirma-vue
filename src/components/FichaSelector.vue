<template>
  <div>
    <div class="search-section">
      <input
        v-model="searchQuery"
        @keyup.enter="buscarFichas"
        type="text"
        placeholder="Buscar por cédula, nombre o apellido"
        class="small-input titulo-search"
      />
      <button @click="buscarFichas" class="submit-button" style="margin-left: 10px">Buscar</button>
    </div>

    <div v-if="fichas.length > 0" class="results-section">
      <table>
        <thead>
          <tr>
            <th>ID Ficha</th>
            <th>Cédula</th>
            <th>Nombres Completos</th>
            <th>Fecha Primer Contacto</th>
            <th>Estado General</th>
            <th>Observaciones</th>
            <th>Seleccionar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ficha in paginatedFichas" :key="ficha.idFicha">
            <td>{{ ficha.idFicha }}</td>
            <td>{{ ficha.PER_CEDULA }}</td>
            <td>
              {{
                [
                  ficha.PER_PRIMERNOMBRE,
                  ficha.PER_SEGUNDONOMBRE,
                  ficha.PER_PRIMERAPELLIDO,
                  ficha.PER_SEGUNDOAPELLIDO,
                ]
                  .filter(Boolean)
                  .join(' ')
              }}
            </td>
            <td>
              {{ ficha.PAC_FECHAPRIMERCONTACTO ? ficha.PAC_FECHAPRIMERCONTACTO.split('T')[0] : '' }}
            </td>
            <td>{{ ficha.PAC_ESTADOGENERAL }}</td>
            <td>{{ ficha.PAC_OBSERVACIONES }}</td>
            <td>
              <button
                @click="seleccionarFicha(ficha)"
                :class="['add-remove-button', { selected: selectedFichaId === ficha.idFicha }]"
              >
                {{ selectedFichaId === ficha.idFicha ? 'Seleccionado' : 'Seleccionar' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Controles de paginación -->
      <div class="pagination" v-if="totalPages > 1">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Anterior</button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
          Siguiente
        </button>
      </div>
    </div>

    <div v-if="selectedFichaId">
      <p><strong>Ficha seleccionada:</strong> {{ selectedFichaId }}</p>
    </div>

    <div v-if="showManualInput" class="manual-id-section">
      <label for="manualFichaId"
        ><strong>No se encontraron fichas.</strong> Ingrese el ID de ficha manualmente:</label
      >
      <input
        id="manualFichaId"
        v-model="manualFichaId"
        @input="emitManualId"
        type="text"
        placeholder="Ej: FCH001"
        class="small-input"
        style="margin-top: 10px; max-width: 220px"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'

const emit = defineEmits(['update:idficha'])

const searchQuery = ref('')
const fichas = ref([])
const selectedFichaId = ref(null)
const showManualInput = ref(false)
const manualFichaId = ref('')

const currentPage = ref(1)
const pageSize = 5

const totalPages = computed(() => Math.ceil(fichas.value.length / pageSize))

const paginatedFichas = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return fichas.value.slice(start, start + pageSize)
})

const buscarFichas = async () => {
  fichas.value = []
  selectedFichaId.value = null
  showManualInput.value = false
  manualFichaId.value = ''
  currentPage.value = 1
  if (!searchQuery.value) return
  try {
    const res = await axios.get(
      `https://backend-sirma-nest.onrender.com/api/pacientes/ficha/cedula/${encodeURIComponent(searchQuery.value)}`,
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
  selectedFichaId.value = ficha.idFicha
  emit('update:idficha', ficha.idFicha)
  showManualInput.value = false
  manualFichaId.value = ''
}

const emitManualId = () => {
  selectedFichaId.value = manualFichaId.value
  emit('update:idficha', manualFichaId.value)
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<style scoped>
.titulo-search {
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
  transition:
    background-color 0.3s ease,
    transform 0.2s ease,
    box-shadow 0.3s ease;
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
.add-remove-button.selected {
  background-color: var(--color-accent-green, #7ed957);
  color: #fff;
  cursor: default;
  pointer-events: none;
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
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: 18px 0 10px 0;
}
.pagination button {
  background: var(--color-primary-dark, #2d5c4d);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.pagination button:disabled {
  background: #ccc;
  color: #888;
  cursor: not-allowed;
}
</style>
