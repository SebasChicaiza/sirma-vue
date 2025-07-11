<script setup>
import { useUserStore } from '@/stores/user'
// Importa el componente de Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUser,
  faEnvelope,
  faIdCard,
  faLock,
  faCheckCircle,
  faHome,
  faFingerprint
} from '@fortawesome/free-solid-svg-icons'

// Añade los íconos a la librería
library.add(faUser, faEnvelope, faIdCard, faLock, faCheckCircle, faHome, faFingerprint)

const userStore = useUserStore()
const usuario = userStore.usuario
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div
      class="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl"
    >
      <div class="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white text-center">
        <font-awesome-icon
          :icon="['fas', 'user']"
          class="text-6xl mb-4 text-white drop-shadow-lg"
        />
        <h2 class="text-3xl font-extrabold tracking-tight">
          ¡Hola, {{ usuario.userNombre }}!
        </h2>
        <p class="text-sm opacity-80 mt-1">
          Aquí está la información de tu perfil.
        </p>
      </div>

      <div class="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex items-start bg-gray-100 rounded-lg p-4 shadow-sm">
          <font-awesome-icon
            :icon="['fas', 'user']"
            class="text-xl text-indigo-500 mr-4 mt-1"
          />
          <div>
            <label class="text-xs text-gray-500 font-semibold uppercase">Nombre completo</label>
            <p class="text-lg font-medium text-gray-800 break-words">{{ usuario.userNombre }} {{ usuario.userApellido }}</p>
          </div>
        </div>

        <div class="flex items-start bg-gray-100 rounded-lg p-4 shadow-sm">
          <font-awesome-icon
            :icon="['fas', 'envelope']"
            class="text-xl text-indigo-500 mr-4 mt-1"
          />
          <div>
            <label class="text-xs text-gray-500 font-semibold uppercase">Correo electrónico</label>
            <p class="text-lg font-medium text-gray-800 break-words">{{ usuario.userCorreo }}</p>
          </div>
        </div>

        <div class="flex items-start bg-gray-100 rounded-lg p-4 shadow-sm">
          <font-awesome-icon
            :icon="['fas', 'id-card']"
            class="text-xl text-indigo-500 mr-4 mt-1"
          />
          <div>
            <label class="text-xs text-gray-500 font-semibold uppercase">Número de cédula</label>
            <p class="text-lg font-medium text-gray-800">{{ usuario.userCedula }}</p>
          </div>
        </div>

        <div class="flex items-start bg-gray-100 rounded-lg p-4 shadow-sm">
          <font-awesome-icon
            :icon="['fas', 'fingerprint']"
            class="text-xl text-indigo-500 mr-4 mt-1"
          />
          <div>
            <label class="text-xs text-gray-500 font-semibold uppercase">Rol</label>
            <p class="text-lg font-semibold text-indigo-600 capitalize">{{ usuario.userRol }}</p>
          </div>
        </div>

        <div class="flex items-start bg-gray-100 rounded-lg p-4 shadow-sm col-span-1 md:col-span-2">
          <font-awesome-icon
            :icon="['fas', 'check-circle']"
            class="text-xl text-indigo-500 mr-4 mt-1"
          />
          <div>
            <label class="text-xs text-gray-500 font-semibold uppercase">Estado de la cuenta</label>
            <p class="text-lg font-medium text-gray-800">{{ usuario.userEstado }}</p>
          </div>
        </div>
      </div>

      <div class="p-8 border-t border-gray-200 text-center">
        <router-link
          to="/Gestion"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <font-awesome-icon :icon="['fas', 'home']" class="mr-2" />
          Volver al inicio
        </router-link>
      </div>
    </div>
  </div>
</template>
