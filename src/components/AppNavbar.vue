<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import logo from '../assets/images/puce-logo.png'

// Importar Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Importar solo los íconos 'solid' que necesitas
import {
  faHome,
  faNotesMedical,
  faUsers,
  faCalendarAlt, // Usamos CalendarAlt ya que 'calendar' sin el 'Alt' puede ser ambiguo o no existir en free-solid
  faChartBar,
  faUserCircle,
  faBell,
  faSignOutAlt,
  faSignInAlt, // Icono para iniciar sesión
} from '@fortawesome/free-solid-svg-icons'

// Añadir los íconos a la biblioteca de Font Awesome
// ¡IMPORTANTE! Esto debería estar idealmente en tu main.js una sola vez.
// Lo incluyo aquí por si lo estás probando de forma aislada,
// pero si ya lo tienes en main.js, puedes eliminar estas líneas.
library.add(
  faHome,
  faNotesMedical,
  faUsers,
  faCalendarAlt,
  faChartBar,
  faUserCircle,
  faBell,
  faSignOutAlt,
  faSignInAlt, // Añadido aquí también
)

const isMenuOpen = ref(false)
const notificationCount = ref(3) // Ejemplo: podrías obtener esto de Vuex o una API

// Estado para saber si hay usuario logueado
const usuarioLogueado = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  // Cierra el menú solo si está abierto y en vista móvil
  if (window.innerWidth <= 768 && isMenuOpen.value) {
    isMenuOpen.value = false
  }
}

const checkLogin = () => {
  usuarioLogueado.value = !!localStorage.getItem('usuario')
}

onMounted(() => {
  checkLogin()
  window.addEventListener('storage', checkLogin)
  window.addEventListener('focus', checkLogin)
})

onUnmounted(() => {
  window.removeEventListener('storage', checkLogin)
  window.removeEventListener('focus', checkLogin)
})

const logout = () => {
  localStorage.removeItem('usuario')
  usuarioLogueado.value = false
  closeMenu()
  window.location.href = '/login'
}

// Listener para cerrar el menú si la ventana es redimensionada a desktop
const handleResize = () => {
  if (window.innerWidth > 768 && isMenuOpen.value) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <nav :class="['navbar', { 'navbar-expanded': isMenuOpen }]">
    <div class="navbar-brand">
      <router-link
        to="/"
        @click="closeMenu"
        class="logo-link"
        aria-label="Ir a la página de inicio"
      >
        <img :src="logo" alt="Logo PUCE" class="logo" />
        <div class="navbar-title-group">
          <div class="navbar-main-title">SISTEMA INTEGRADO DE REGISTRO MÉDICO AVANZADO</div>
          <div class="navbar-subtitle">Pontificia Universidad Católica del Ecuador</div>
        </div>
      </router-link>
    </div>

    <button class="hamburger-menu" @click="toggleMenu" aria-label="Abrir menú de navegación">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>

    <ul :class="['navbar-links', { 'navbar-links-open': isMenuOpen }]">
      <li>
        <router-link to="/" @click="closeMenu">
          <font-awesome-icon icon="home" /> Inicio
        </router-link>
      </li>
      <li>
        <router-link to="/fichas" @click="closeMenu">
          <font-awesome-icon icon="notes-medical" /> Fichas
        </router-link>
      </li>
      <li>
        <router-link to="/personas" @click="closeMenu">
          <font-awesome-icon icon="users" /> Personas
        </router-link>
      </li>
      <li>
        <router-link to="/reportes" @click="closeMenu">
          <font-awesome-icon icon="chart-bar" /> Reportes
        </router-link>
      </li>
      <li class="navbar-separator mobile-only"></li>
      <li class="navbar-user-info mobile-only">
        <router-link to="/perfil" @click="closeMenu">
          <font-awesome-icon icon="user-circle" /> Mi Perfil
        </router-link>
      </li>
      <li class="mobile-only">
        <router-link to="/notificaciones" @click="closeMenu">
          <font-awesome-icon icon="bell" /> Notificaciones
          <span v-if="notificationCount > 0" class="notification-badge">{{
            notificationCount
          }}</span>
        </router-link>
      </li>
      <li class="mobile-only">
        <template v-if="usuarioLogueado">
          <button @click="logout" class="logout-button">
            <font-awesome-icon icon="sign-out-alt" /> Cerrar Sesión
          </button>
        </template>
        <template v-else>
          <router-link to="/login" class="logout-button" @click="closeMenu">
            <font-awesome-icon icon="sign-in-alt" /> Iniciar Sesión
          </router-link>
        </template>
      </li>
    </ul>

    <div class="navbar-right desktop-only">
      <router-link to="/notificaciones" class="navbar-icon-link" aria-label="Ver notificaciones">
        <font-awesome-icon icon="bell" />
        <span v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</span>
      </router-link>
      <router-link to="/perfil" class="navbar-user-avatar" aria-label="Ir a mi perfil">
        <font-awesome-icon icon="user-circle" />
      </router-link>
      <template v-if="usuarioLogueado">
        <button @click="logout" class="logout-button">
          <font-awesome-icon icon="sign-out-alt" /> Cerrar Sesión
        </button>
      </template>
      <template v-else>
        <router-link to="/login" class="logout-button">
          <font-awesome-icon icon="sign-in-alt" /> Iniciar Sesión
        </router-link>
      </template>
    </div>
  </nav>
</template>

<style scoped>
/*
  IMPORTANTE: Las variables CSS (ej. --color-primary-dark) DEBEN ser definidas globalmente
  en tu main.js o App.vue (sin scoped), como se explicó anteriormente, para que sean accesibles aquí.
*/

/* --- Base del Navbar --- */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-primary-dark);
  color: var(--color-text-light);
  padding: 12px 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); /* Sutil sombra para profundidad */
  position: sticky; /* Sticky para que siempre esté visible al hacer scroll */
  top: 0;
  z-index: 1000; /* Asegura que esté sobre otros elementos */
  min-height: 65px; /* Altura mínima para estabilidad visual, ajustada un poco */
  transition: all 0.3s ease-in-out; /* Animación para expansiones/contracciones */
}

/* --- Brand/Logo --- */
.navbar-brand {
  display: flex;
  align-items: center;
}

.logo-link {
  /* Agregado para hacer el logo y título clicable */
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit; /* Hereda el color del navbar */
}

.logo {
  height: 45px; /* Tamaño un poco más grande para el logo */
  width: auto;
  filter: brightness(0) invert(1); /* Si el logo es oscuro, lo vuelve blanco */
}

.navbar-title-group {
  line-height: 1.3;
}

.navbar-main-title {
  font-size: 1.05rem; /* Un poco más grande para mejor legibilidad */
  font-weight: 600; /* Semi-bold */
  color: var(--color-text-lighter);
}

.navbar-subtitle {
  font-size: 0.85rem;
  font-weight: 400; /* Normal */
  color: var(--color-accent-green); /* Con un toque de color para distinción */
}

/* --- Enlaces de Navegación Principales --- */
.navbar-links {
  list-style: none;
  display: flex;
  gap: 30px; /* Mayor separación entre elementos */
  margin: 0;
  padding: 0;
  transition: transform 0.3s ease-in-out; /* Transición para menú hamburguesa */
}

.navbar-links li {
  font-size: 1rem;
  font-weight: 500; /* Ligeramente más grueso */
}

.navbar-links a {
  color: var(--color-text-light);
  text-decoration: none;
  padding: 8px 0; /* Padding vertical para una mejor zona de clic */
  position: relative; /* Para la línea inferior */
  display: flex;
  align-items: center;
  gap: 10px; /* Espacio entre ícono y texto */
  transition: color 0.3s ease;
}

/* Estilo para los iconos de Font Awesome dentro de los enlaces */
.navbar-links a .fa-icon {
  font-size: 1.15rem; /* Tamaño de los íconos */
  color: var(--color-text-light); /* Color base de los íconos */
  transition: color 0.3s ease;
}

/* --- Estados de Interacción (Hover/Activo) --- */
.navbar-links a:hover {
  color: var(--color-accent-green);
}

.navbar-links a:hover .fa-icon {
  color: var(--color-accent-green);
}

.navbar-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background-color: var(--color-accent-green);
  transition: width 0.3s ease; /* Animación de la línea */
}

.navbar-links a:hover::after {
  width: 100%;
}

/* Estilo para el enlace activo (usando la clase 'router-link-active' de Vue Router) */
.router-link-active {
  color: var(--color-accent-green) !important;
  font-weight: 600 !important; /* Más énfasis en el activo */
}

.router-link-active .fa-icon {
  /* Objetivo el ícono dentro del enlace activo */
  color: var(--color-accent-green) !important;
}

.router-link-active::after {
  width: 100% !important;
  background-color: var(--color-accent-green) !important;
}

/* --- Notificaciones y Perfil (Desktop) --- */
.navbar-right {
  display: flex;
  align-items: center;
  gap: 25px; /* Mayor separación en el lado derecho */
}

.navbar-icon-link {
  color: var(--color-text-light);
  text-decoration: none;
  position: relative;
  font-size: 1.4rem; /* Tamaño del ícono de campana */
  transition: color 0.3s ease;
}

.navbar-icon-link:hover {
  color: var(--color-accent-green);
}

.notification-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--color-notification); /* Rojo vibrante */
  color: var(--color-text-lighter);
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 50%;
  padding: 3px 7px;
  min-width: 18px; /* Para números de 1 o 2 dígitos */
  text-align: center;
  border: 1px solid var(--color-primary-dark); /* Borde para que destaque */
  animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55); /* Animación de rebote */
}

@keyframes bounceIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}

/* Estilo para el icono de usuario de Font Awesome */
.navbar-user-avatar .fa-icon {
  font-size: 1.8rem; /* Tamaño del ícono de usuario */
  color: var(--color-text-light);
  transition: color 0.3s ease;
}

.navbar-user-avatar:hover .fa-icon {
  color: var(--color-accent-green);
}

.logout-button {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.3); /* Borde sutil para distinguirlo */
  color: var(--color-text-light);
  font-size: 0.95rem; /* Un poco más pequeño que los enlaces */
  cursor: pointer;
  padding: 8px 15px;
  border-radius: 6px;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.logout-button:hover {
  background-color: rgba(255, 255, 255, 0.15);
  color: var(--color-accent-green);
  border-color: var(--color-accent-green);
}

/* Separador en el menú móvil */
.navbar-separator {
  display: none; /* Oculto por defecto en desktop */
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 20px 0;
}

/* Clases de utilidad para responsividad */
.desktop-only {
  display: flex;
} /* Valor por defecto para desktop */
.mobile-only {
  display: none;
} /* Valor por defecto para desktop */

/* --- Responsividad: Menú Hamburguesa --- */
.hamburger-menu {
  display: none; /* Oculto por defecto en desktop */
  flex-direction: column;
  justify-content: space-around;
  width: 32px; /* Un poco más grande para mejor toque */
  height: 28px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001; /* Para que esté por encima del menú desplegado */
  margin-left: auto; /* Empuja la hamburguesa a la derecha si el navbar-brand es elástico */
}

.hamburger-menu .bar {
  width: 100%;
  height: 3px;
  background-color: var(--color-text-light);
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* Animación de la hamburguesa a X */
.navbar-expanded .hamburger-menu .bar:nth-child(1) {
  transform: translateY(12px) rotate(45deg);
}
.navbar-expanded .hamburger-menu .bar:nth-child(2) {
  opacity: 0;
}
.navbar-expanded .hamburger-menu .bar:nth-child(3) {
  transform: translateY(-12px) rotate(-45deg);
}

/* Media Queries para Responsividad */
@media (max-width: 992px) {
  /* Tabletas y móviles grandes */
  .navbar-links {
    gap: 20px; /* Reduce un poco el gap en tabletas */
  }
}

@media (max-width: 768px) {
  /* Teléfonos Móviles */
  .navbar {
    padding: 10px 20px;
  }

  .navbar-brand .logo-link {
    flex-grow: 1; /* Permite que el logo-link ocupe más espacio */
    justify-content: flex-start;
  }

  .navbar-main-title {
    font-size: 0.9rem;
  }
  .navbar-subtitle {
    font-size: 0.75rem;
  }
  .logo {
    height: 38px;
  }

  .navbar-links {
    position: fixed;
    top: 0; /* Asegura que el menú empiece desde arriba */
    right: 0;
    width: 280px; /* Ancho del menú lateral */
    height: 100%;
    background-color: var(--color-primary-dark);
    flex-direction: column;
    padding: 80px 25px 20px; /* Padding para evitar el logo */
    transform: translateX(100%); /* Oculto por defecto */
    box-shadow: -6px 0 15px rgba(0, 0, 0, 0.3); /* Sombra más pronunciada */
    z-index: 999; /* Por debajo de la hamburguesa */
    gap: 18px; /* Espaciado en el menú vertical */
    overflow-y: auto; /* Para menús largos */
  }

  .navbar-links-open {
    transform: translateX(0); /* Muestra el menú */
  }

  .navbar-links li a {
    justify-content: flex-start; /* Alinea texto e íconos a la izquierda */
    padding: 12px 15px; /* Mayor padding para toques */
    border-radius: 8px; /* Bordes suaves */
    font-size: 1.05rem; /* Un poco más grande para móvil */
  }

  .navbar-links li a .fa-icon {
    font-size: 1.25rem;
  }

  .navbar-links li a:hover,
  .router-link-active {
    background-color: rgba(255, 255, 255, 0.08); /* Fondo sutil para hover/activo */
  }

  .navbar-links a::after,
  .router-link-active::after {
    display: none; /* Ocultar la línea inferior en móvil */
  }

  .hamburger-menu {
    display: flex; /* Mostrar hamburguesa en móvil */
  }

  /* Oculta elementos de desktop en móvil y viceversa */
  .desktop-only {
    display: none;
  }
  .mobile-only {
    display: block;
  } /* Asegúrate de que los elementos solo en móvil se muestren */

  /* Asegurarse de que el botón de cerrar sesión se vea bien en móvil */
  .logout-button {
    width: 100%;
    text-align: left;
    justify-content: flex-start;
    padding: 12px 15px;
    background-color: rgba(255, 255, 255, 0.05); /* Un poco de fondo para el botón */
  }
  .logout-button:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
}
</style>
