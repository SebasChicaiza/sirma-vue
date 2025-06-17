<script setup>
import { ref } from 'vue'
import logo from '../assets/images/puce-logo.png'

const isMenuOpen = ref(false)
const notificationCount = ref(3) // Ejemplo: podrías obtener esto de Vuex o una API

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  if (window.innerWidth <= 768) {
    // Cierra el menú solo en móviles
    isMenuOpen.value = false
  }
}

const logout = () => {
  alert('Cerrando sesión...')
  // Aquí iría tu lógica de cierre de sesión (ej. limpiar token, redirigir)
}

// Se recomienda añadir un watcher para cerrar el menú si la ventana es redimensionada a desktop
// import { onMounted, onUnmounted } from 'vue';
// let resizeListener = null;
// onMounted(() => {
//   resizeListener = () => {
//     if (window.innerWidth > 768 && isMenuOpen.value) {
//       isMenuOpen.value = false;
//     }
//   };
//   window.addEventListener('resize', resizeListener);
// });
// onUnmounted(() => {
//   window.removeEventListener('resize', resizeListener);
// });
</script>
<template>
  <nav :class="['navbar', { 'navbar-expanded': isMenuOpen }]">
    <div class="navbar-brand">
      <img :src="logo" alt="PUCE Logo" class="logo" />
      <div class="navbar-title-group">
        <div class="navbar-main-title">PONTIFICIA UNIVERSIDAD CATÓLICA DEL ECUADOR</div>
        <div class="navbar-subtitle">Sistema de Fichas Médicas</div>
      </div>
    </div>

    <button class="hamburger-menu" @click="toggleMenu" aria-label="Abrir menú de navegación">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>

    <ul :class="['navbar-links', { 'navbar-links-open': isMenuOpen }]">
      <li>
        <router-link to="/" @click="closeMenu"> <i class="icon-home"></i> Inicio </router-link>
      </li>
      <li>
        <router-link to="/fichas" @click="closeMenu">
          <i class="icon-file-medical"></i> Fichas Médicas
        </router-link>
      </li>
      <li>
        <router-link to="/usuarios" @click="closeMenu">
          <i class="icon-users"></i> Usuarios
        </router-link>
      </li>
      <li>
        <router-link to="/calendario" @click="closeMenu">
          <i class="icon-calendar"></i> Calendario
        </router-link>
      </li>
      <li>
        <router-link to="/reportes" @click="closeMenu">
          <i class="icon-chart-bar"></i> Reportes
        </router-link>
      </li>
      <li class="navbar-separator"></li>
      <li class="navbar-user-info">
        <router-link to="/perfil" @click="closeMenu">
          <i class="icon-user-circle"></i> Mi Perfil
        </router-link>
      </li>
      <li>
        <router-link to="/notificaciones" @click="closeMenu">
          <i class="icon-bell"></i> Notificaciones
          <span v-if="notificationCount > 0" class="notification-badge">{{
            notificationCount
          }}</span>
        </router-link>
      </li>
      <li>
        <button @click="logout" class="logout-button">
          <i class="icon-sign-out-alt"></i> Cerrar Sesión
        </button>
      </li>
    </ul>

    <div class="navbar-right">
      <router-link to="/notificaciones" class="navbar-icon-link" aria-label="Ver notificaciones">
        <i class="icon-bell"></i>
        <span v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</span>
      </router-link>
      <router-link to="/perfil" class="navbar-user-avatar" aria-label="Ir a mi perfil">
        <i class="icon-user-circle"></i>
      </router-link>
      <button @click="logout" class="logout-button desktop-only">
        <i class="icon-sign-out-alt"></i> Cerrar Sesión
      </button>
    </div>
  </nav>
</template>

<style scoped>
/*
  IMPORTANTE: Para los íconos (ej. icon-home, icon-file-medical),
  necesitarás una biblioteca como Font Awesome.
  Instálala y configúrala en tu proyecto Vue:
  npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/vue-fontawesome
  Luego, impórtala en tu main.js o componente base:
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faHome, faFileMedical, faUsers, faCalendarAlt, faChartBar, faUserCircle, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  library.add(faHome, faFileMedical, faUsers, faCalendarAlt, faChartBar, faUserCircle, faBell, faSignOutAlt)
  app.component('font-awesome-icon', FontAwesomeIcon)
  Y luego úsala en el template como: <font-awesome-icon icon="home" /> o <i class="fas fa-home"></i> si usas la CDN.
  Para este ejemplo, he usado nombres de clase genéricos como "icon-home".
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
  min-height: 60px; /* Altura mínima para estabilidad visual */
}

/* --- Brand/Logo --- */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 12px; /* Espacio entre logo y texto */
  cursor: pointer;
}

.logo {
  height: 40px; /* Tamaño más balanceado para el logo */
  width: auto;
  filter: brightness(0) invert(1); /* Si el logo es oscuro, lo vuelve blanco */
}

.navbar-title-group {
  line-height: 1.3;
}

.navbar-main-title {
  font-size: 1rem; /* Un poco más pequeño para dejar espacio */
  font-weight: 600; /* Semi-bold */
  color: var(--color-text-lighter);
}

.navbar-subtitle {
  font-size: 0.8rem;
  font-weight: 400; /* Normal */
  color: var(--color-accent-green); /* Con un toque de color para distinción */
}

/* --- Enlaces de Navegación --- */
.navbar-links {
  list-style: none;
  display: flex;
  gap: 28px; /* Mayor separación entre elementos */
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
  gap: 8px; /* Espacio entre ícono y texto */
}

.navbar-links a i {
  font-size: 1.1rem; /* Tamaño de los íconos */
  color: var(--color-text-light); /* Color base de los íconos */
  transition: color 0.3s ease;
}

/* --- Estados de Interacción (Hover/Activo) --- */
.navbar-links a:hover {
  color: var(--color-accent-green);
}

.navbar-links a:hover i {
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

.router-link-active i {
  color: var(--color-accent-green) !important;
}

.router-link-active::after {
  width: 100% !important;
  background-color: var(--color-accent-green) !important;
}

/* --- Notificaciones y Perfil --- */
.navbar-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.navbar-icon-link {
  color: var(--color-text-light);
  text-decoration: none;
  position: relative;
  font-size: 1.3rem; /* Tamaño del ícono de campana */
  transition: color 0.3s ease;
}

.navbar-icon-link:hover {
  color: var(--color-accent-green);
}

.notification-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--color-notification);
  color: var(--color-text-lighter);
  font-size: 0.7rem;
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

.navbar-user-avatar i {
  font-size: 1.6rem; /* Tamaño del ícono de usuario */
  color: var(--color-text-light);
  transition: color 0.3s ease;
}

.navbar-user-avatar:hover i {
  color: var(--color-accent-green);
}

.logout-button {
  background: none;
  border: none;
  color: var(--color-text-light);
  font-size: 1rem;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.logout-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--color-accent-green);
}

/* Separador en el menú móvil */
.navbar-separator {
  display: none; /* Oculto por defecto en desktop */
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 15px 0;
}

/* --- Responsividad: Menú Hamburguesa --- */
.hamburger-menu {
  display: none; /* Oculto por defecto en desktop */
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001; /* Para que esté por encima del menú desplegado */
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
  transform: translateY(11px) rotate(45deg);
}
.navbar-expanded .hamburger-menu .bar:nth-child(2) {
  opacity: 0;
}
.navbar-expanded .hamburger-menu .bar:nth-child(3) {
  transform: translateY(-11px) rotate(-45deg);
}

/* Ocultar elementos de escritorio en móvil y viceversa */
.desktop-only {
  display: none;
}

/* Media Queries para Responsividad */
@media (max-width: 768px) {
  .navbar {
    padding: 10px 20px;
  }

  .navbar-brand {
    flex-grow: 1; /* Permite que el logo ocupe más espacio */
  }

  .navbar-links {
    position: fixed;
    top: 0; /* Ajusta esto si tu navbar tiene una altura variable */
    right: 0;
    width: 250px; /* Ancho del menú lateral */
    height: 100%;
    background-color: var(--color-primary-dark); /* Mismo fondo que el navbar */
    flex-direction: column;
    padding: 80px 20px 20px; /* Padding para evitar el logo */
    transform: translateX(100%); /* Oculto por defecto */
    box-shadow: -4px 0 10px rgba(0, 0, 0, 0.2);
    z-index: 999; /* Por debajo de la hamburguesa */
    gap: 15px; /* Espaciado en el menú vertical */
    overflow-y: auto; /* Para menús largos */
  }

  .navbar-links-open {
    transform: translateX(0); /* Muestra el menú */
  }

  .navbar-links li a {
    justify-content: flex-start; /* Alinea texto e íconos a la izquierda */
    padding: 12px 10px; /* Mayor padding para toques */
    border-radius: 6px; /* Bordes suaves */
  }

  .navbar-links li a:hover,
  .router-link-active {
    background-color: rgba(255, 255, 255, 0.08); /* Fondo sutil para hover/activo */
  }

  .navbar-links a::after {
    display: none; /* Ocultar la línea inferior en móvil */
  }
  .router-link-active::after {
    display: none;
  }

  .hamburger-menu {
    display: flex; /* Mostrar hamburguesa en móvil */
  }

  .navbar-right {
    display: none; /* Ocultar elementos de la derecha en móvil */
  }

  .navbar-separator {
    display: block; /* Mostrar separador en móvil */
  }

  /* Asegurarse de que el botón de cerrar sesión se vea bien en móvil */
  .logout-button {
    width: 100%;
    text-align: left;
    justify-content: flex-start;
    padding: 12px 10px;
    background-color: rgba(255, 255, 255, 0.05); /* Un poco de fondo para el botón */
  }
  .logout-button:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
}
</style>
