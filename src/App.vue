<script setup>
import { useUserStore } from '@/stores/user'
import AppNavbar from './components/AppNavbar.vue'
import AppNavbarUser from './components/AppNavBarUser.vue'
import AppFooter from './components/AppFooter.vue'
import AppFooterUser from './components/AppFooterUser.vue'
import './assets/styles/variables.css'

const userStore = useUserStore()
</script>

<template>
  <div class="app-wrapper">
    <component :is="userStore.isAdmin ? AppNavbar : AppNavbarUser" />
    <RouterView />
    <component :is="userStore.isAdmin ? AppFooter : AppFooterUser" />
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
