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
}
.app-wrapper {
  min-height: 100vh;
  min-width: 100vw;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}
</style>
