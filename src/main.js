import './styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* Importar Font Awesome */
import { library } from '@fortawesome/fontawesome-svg-core' // El núcleo de Font Awesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' // El componente Vue
import { useUserStore } from './stores/user'
/* Importar los íconos que vas a usar (Free Solid Icons) */
import {
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
  faEnvelope,
  faRobot,
  // ADD THESE ICONS FOR THE 'HOW IT WORKS' SECTION:
  faUserPlus,   // For "Registra pacientes"
  faHistory,    // For "Accede al historial"
  faChartLine   // For "Optimiza la atención" (or faChartBar if you prefer, but faChartLine is a common alternative for optimization/growth)
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
  faEnvelope,
  faRobot,
  // ADD THEM TO THE LIBRARY AS WELL:
  faUserPlus,
  faHistory,
  faChartLine
)

const app = createApp(App)

/* Registra el componente <font-awesome-icon> globalmente */
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())

const userStore = useUserStore()
userStore.syncFromLocalStorage()

app.use(router)
app.mount('#app')
