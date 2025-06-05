<script setup>
import { useRoute } from 'vue-router';

const $route = useRoute();
</script>

<template>
  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo / Marca -->
        <router-link to="/" class="text-xl font-bold text-blue-600">SIRMA</router-link>

        <!-- Links de navegación -->
        <div class="flex space-x-6">
          <router-link
            to="/personas"
            class="text-gray-700 hover:text-blue-600 transition duration-200 font-medium"
            :class="{ 'text-blue-700 font-semibold': $route.path === '/personas' }"
          >
            Personas
          </router-link>

          <router-link
            to="/fichas"
            class="text-gray-700 hover:text-blue-600 transition duration-200 font-medium"
            :class="{ 'text-blue-700 font-semibold': $route.path === '/fichas' }"
          >
            Fichas
          </router-link>

          <router-link
            to="/chat"
            class="text-gray-700 hover:text-blue-600 transition duration-200 font-medium"
            :class="{ 'text-blue-700 font-semibold': $route.path === '/chat' }"
          >
            Chat
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

