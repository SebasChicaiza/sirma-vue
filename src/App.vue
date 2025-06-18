<script setup>
import AppNavbar from './components/AppNavbar.vue'
import './assets/styles/variables.css'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="app-wrapper">
    <AppNavbar />
    <RouterView />
    <AppFooter />
  </div>
</template>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Evita scroll horizontal global */
}

.app-wrapper {
  min-height: 100vh;
  width: 100%; /* Cambiado de min-width: 100vw */
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  overflow-x: hidden; /* Evita scroll horizontal en el wrapper */
}
</style>
