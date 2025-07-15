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
      <button @click="buscarFichas" class="submit-button">Buscar</button>
    </div>

    <div v-if="fichas.length > 0" class="results-section">
      <div class="table-container">
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
              <td data-label="ID Ficha">{{ ficha.idFicha }}</td>
              <td data-label="Cédula">{{ ficha.PER_CEDULA }}</td>
              <td data-label="Nombres Completos">
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
              <td data-label="Fecha Primer Contacto">
                {{ ficha.PAC_FECHAPRIMERCONTACTO ? ficha.PAC_FECHAPRIMERCONTACTO.split('T')[0] : '' }}
              </td>
              <td data-label="Estado General">{{ ficha.PAC_ESTADOGENERAL }}</td>
              <td data-label="Observaciones">{{ ficha.PAC_OBSERVACIONES }}</td>
              <td data-label="Seleccionar">
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
      </div>
      <!-- Pagination Controls -->
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
/* Base styles (for larger screens first, then override with media queries) */
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
  margin-left: 10px; /* Keep original margin for larger screens */
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
  min-width: 200px; /* Adjust or remove for mobile */
}
.search-section input.small-input:focus {
  border-color: var(--color-accent-green);
  outline: none;
  background: #fff;
}
.results-section {
  margin-bottom: 35px;
  background: var(--color-input-background-default, #fff);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(var(--color-primary-rgb, 52, 120, 99), 0.07);
  padding: 18px 0 0 0;
}

/* Base table styles */
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
  width: 100%; /* Make input full width on mobile */
  max-width: none; /* Remove max-width constraint for mobile */
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: 18px 0 10px 0;
  flex-wrap: wrap; /* Allow pagination buttons to wrap */
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

/* --- Mobile Adaptations (Media Queries) --- */
@media (max-width: 768px) {
  .search-section {
    flex-direction: column; /* Stack items vertically */
    align-items: stretch; /* Stretch items to full width */
    padding: 15px; /* Adjust padding for smaller screens */
    gap: 15px; /* Increase gap between stacked items */
  }

  .search-section input.small-input {
    min-width: unset; /* Remove min-width constraint */
    width: 100%; /* Occupy full width */
    padding: 12px 16px; /* Adjust padding */
    font-size: 0.95rem; /* Slightly smaller font size */
  }

  .submit-button {
    width: 100%; /* Make button full width */
    margin-left: 0; /* Remove left margin when stacked */
    padding: 12px 20px; /* Adjust padding */
  }

  .results-section {
    padding: 0; /* Remove padding from results section itself, handled by table-container */
  }

  /* Table specific adjustments for smaller screens (Cards Layout) */
  .table-container {
    overflow-x: unset; /* Disable horizontal scrolling */
  }

  .results-section table {
    border: none; /* Remove table border */
    min-width: unset; /* Remove min-width */
  }

  .results-section thead {
    display: none; /* Hide table headers on small screens */
  }

  .results-section tr {
    display: block; /* Make each row a block element */
    margin-bottom: 15px; /* Add spacing between "cards" */
    border: 1px solid var(--color-border, #e0e0e0);
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }

  .results-section td {
    display: block; /* Make each cell a block element */
    text-align: right; /* Align cell content to the right */
    border-bottom: 1px dashed var(--color-border, #e0e0e0); /* Add a dashed border */
    padding: 10px 0; /* Adjust padding */
    position: relative; /* For data-label positioning */
  }

  .results-section td:last-child {
    border-bottom: none; /* No border for the last item in the card */
    text-align: center; /* Center the select button */
    padding-top: 15px; /* Add padding above the button */
  }

  /* Use data-label to show the header text before the cell content */
  .results-section td::before {
    content: attr(data-label);
    float: left; /* Float the label to the left */
    font-weight: bold; /* Make the label bold */
    text-transform: uppercase;
    color: var(--color-primary-dark, #2d5c4d);
    margin-right: 10px; /* Space between label and content */
    font-size: 0.85rem;
  }

  .add-remove-button {
    padding: 8px 16px; /* Adjust button size for better tapping */
    font-size: 0.9rem;
    width: 100%; /* Make button full width in the card */
  }

  .manual-id-section {
    padding: 15px;
    font-size: 0.95rem;
    max-width: 100%; /* Allow manual input section to take full width */
  }

  .manual-id-section input {
    padding: 10px 12px;
    font-size: 0.9rem;
  }

  .pagination {
    flex-direction: column; /* Stack pagination controls */
    gap: 10px; /* Reduce gap when stacked */
  }

  .pagination button {
    width: 100%; /* Make pagination buttons full width */
    padding: 10px 16px;
  }
}

/* Even smaller screens (e.g., phones) */
@media (max-width: 480px) {
  .search-section,
  .manual-id-section {
    padding: 10px; /* Even less padding */
  }

  .search-section input.small-input,
  .submit-button {
    font-size: 0.9rem; /* Slightly smaller font for input and button */
  }

  .manual-id-section label,
  .manual-id-section input {
    font-size: 0.85rem; /* Smaller font for manual input section */
  }

  .results-section tr {
    padding: 10px; /* Reduce card padding */
    margin-bottom: 10px;
  }

  .results-section td {
    padding: 8px 0; /* Even smaller padding in table cells */
    font-size: 0.85rem; /* Even smaller font size for table content */
  }

  .results-section td::before {
    font-size: 0.75rem;
  }

  .add-remove-button {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
}
</style>
