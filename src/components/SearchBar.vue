<template>
  <div class="search-bar">
    <input
      type="text"
      :placeholder="placeholder"
      v-model="searchTerm"
      class="search-input"
    />
    <button @click="emitSearch" class="search-btn flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    placeholder: {
      type: String,
      default: 'Buscar...'
    },
    // Add the new prop to receive the initial value
    initialValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // Use the prop's value to set the initial state of the input
      searchTerm: this.initialValue
    };
  },
  // Use a watcher to react to changes in the prop
  watch: {
    initialValue(newValue) {
      this.searchTerm = newValue;
    }
  },
  methods: {
    emitSearch() {
      this.$emit('search', this.searchTerm);
    }
  }
};
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  justify-content: flex-start;
  margin: 0 auto;
}

.search-input {
  width: 400px;
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 6px;
}

.search-btn {
  padding: 0.5rem;
  background-color: var(--color-text-light); /* Azul similar al del navbar: Tailwind blue-600 */
  border: none;
  border-radius: 0.375rem; /* rounded-md */
  height: 100%;
  transition: background-color 0.3s ease;
}
.search-btn:hover {
  background-color: #1d4ed8; /* Hover: Tailwind blue-700 */
}
</style>
