<script setup>
import { ref, computed, watchEffect } from 'vue'
import AppNavbar from './components/AppNavbar.vue'
import AppNavbarUser from './components/AppNavBarUser.vue'
import AppFooter from './components/AppFooter.vue'
import AppFooterUser from './components/AppFooterUser.vue'
import './assets/styles/variables.css'

// Usuario reactivo
const usuario = ref(null)

// Reevaluar usuario cada vez que cambie el localStorage (ej: luego del login)
watchEffect(() => {
  const raw = localStorage.getItem('usuario')
  usuario.value = raw ? JSON.parse(raw) : null
})

// Rol reactivo
const isAdmin = computed(() => usuario.value?.userRol === 'admin')
</script>

<template>
  <div class="app-wrapper">
    <component :is="isAdmin ? AppNavbar : AppNavbarUser" />
    <RouterView />
    <component :is="isAdmin ? AppFooter : AppFooterUser" />
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
