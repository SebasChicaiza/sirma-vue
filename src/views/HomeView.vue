<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToPersonasList = () => {
  router.push('/personas')
}

const goToCreatePersona = () => {
  router.push('/personas/crear')
}
</script>

<template>
  <div
    class="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 overflow-hidden"
  >
    <div
      class="absolute inset-0 z-0 opacity-20"
      style="
        background-image: linear-gradient(
          to bottom right,
          var(--color-background-light),
          var(--color-primary-lightest)
        );
      "
    ></div>

    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1
        class="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-blue-900 leading-tight mb-6 animate-fade-in-down"
      >
        Bienvenido al
        <span style="color: var(--color-accent-green)">Sistema de Gestión de Fichas Médicas</span>
      </h1>

      <p class="text-xl sm:text-2xl text-gray-700 mb-10 animate-fade-in-up delay-200">
        Optimiza la atención al paciente y la gestión de datos de salud en tu comunidad.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div class="feature-card animate-fade-in delay-400">
          <div class="icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fill-rule="evenodd"
                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A1 1 0 0011.364 3H8.636a1 1 0 00-.707.293L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-blue-800 mb-2">Registro Centralizado</h3>
          <p class="text-gray-600">
            Gestiona toda la información de tus pacientes en un solo lugar.
          </p>
        </div>
        <div class="feature-card animate-fade-in delay-600">
          <div class="icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 1H8l-1-1H5V5zm5 9a1 1 0 100-2 1 1 0 000 2z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-blue-800 mb-2">Fichas Detalladas</h3>
          <p class="text-gray-600">
            Crea y consulta fichas completas de enfermería y fisioterapia.
          </p>
        </div>
        <div class="feature-card animate-fade-in delay-800">
          <div class="icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 text-purple-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fill-rule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-blue-800 mb-2">Seguimiento Integral</h3>
          <p class="text-gray-600">
            Facilita el seguimiento y la toma de decisiones para una mejor atención.
          </p>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in delay-1000">
        <button
          @click="goToPersonasList"
          class="btn-primary-lg shadow-xl hover:shadow-2xl flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            />
          </svg>
          Ver Listado de Pacientes
        </button>
        <button
          @click="goToCreatePersona"
          class="btn-secondary-lg shadow-xl hover:shadow-2xl flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clip-rule="evenodd"
            />
          </svg>
          Registrar Nuevo Paciente
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feature-card {
  background-color: var(--color-background-light);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 1px solid var(--color-border);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.icon-wrapper {
  background-color: var(--color-primary-lightest); /* light blue background for icons */
  padding: 15px;
  border-radius: 50%;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(var(--color-primary-rgb), 0.1);
}

/* Estilos para botones grandes y llamativos */
.btn-primary-lg {
  background-color: var(--color-primary-dark);
  color: white;
  padding: 18px 35px;
  border: none;
  border-radius: 10px;
  font-size: 1.25rem; /* text-xl */
  font-weight: 700; /* font-bold */
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 8px 20px rgba(var(--color-primary-rgb), 0.25);
  text-decoration: none; /* Si se usa con router-link */
}

.btn-primary-lg:hover {
  background-color: var(--color-primary-medium);
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(var(--color-primary-rgb), 0.35);
}

.btn-secondary-lg {
  background-color: var(--color-background-light);
  color: var(--color-primary);
  padding: 18px 35px;
  border: 2px solid var(--color-primary);
  border-radius: 10px;
  font-size: 1.25rem; /* text-xl */
  font-weight: 700; /* font-bold */
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    transform 0.2s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  text-decoration: none; /* Si se usa con router-link */
}

.btn-secondary-lg:hover {
  background-color: var(--color-primary-medium);
  color: var(--color-text-light);
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(var(--color-primary-rgb), 0.35);
}

/* Animaciones */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in-down {
  animation: fadeInDown 1s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.delay-200 {
  animation-delay: 0.2s;
}
.delay-400 {
  animation-delay: 0.4s;
}
.delay-600 {
  animation-delay: 0.6s;
}
.delay-800 {
  animation-delay: 0.8s;
}
.delay-1000 {
  animation-delay: 1s;
}
</style>
