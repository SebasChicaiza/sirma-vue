import './styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* Importar Font Awesome */
import { library } from '@fortawesome/fontawesome-svg-core' // El núcleo de Font Awesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' // El componente Vue

/* Importar los íconos que vas a usar (Free Solid Icons) */
import {
  faHome,          // Ícono para 'Inicio'
  faNotesMedical,  // Ícono para 'Fichas' (más específico que faFileAlt)
  faUsers,         // Ícono para 'Usuarios'
  faCalendarAlt,   // Ícono para 'Calendario'
  faChartBar,      // Ícono para 'Reportes'
  faUserCircle,    // Ícono para 'Mi Perfil' / Avatar de usuario
  faBell,          // Ícono para 'Notificaciones'
  faSignOutAlt,    // Ícono para 'Cerrar Sesión'
  faMapMarkerAlt,  // Ícono para dirección en el Footer
  faPhone,         // Ícono para teléfono en el Footer
  faEnvelope       // Ícono para email en el Footer
  // ¡Añade aquí cualquier otro ícono que planees usar!
  // Puedes ver todos los íconos disponibles en fontawesome.com/icons
} from '@fortawesome/free-solid-svg-icons' // Asegúrate de importar de 'free-solid-svg-icons'

/* Añade los íconos importados a la biblioteca global de Font Awesome */
library.add(
  faHome,
  faNotesMedical,
  faUsers,
  faCalendarAlt,
  faChartBar,
  faUserCircle,
  faBell,
  faSignOutAlt,
  faMapMarkerAlt,
  faPhone,
  faEnvelope
)

const app = createApp(App)

/* Registra el componente <font-awesome-icon> globalmente */
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
