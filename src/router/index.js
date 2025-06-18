import { createRouter, createWebHistory } from 'vue-router'
import PersonaListView from '../views/PersonaListView.vue'
import PersonaCreateView from '../views/PersonaCreateView.vue'
import PersonaEditView from '../views/PersonaEditView.vue'
//import FichaListView from '@/views/Ficha/FichaListView.vue'
//import FichaCreateWithPersona from '@/views/Ficha/FichaCreateWithPersona.vue'
//import FichaEditView from '@/views/Ficha/FichaEditView.vue'
import ChatBot from '@/views/ChatBot.vue'
import FichaGeneralView from '../views/Fichas/FichaGeneralView.vue'
import FichaMedicaView from '@/views/Fichas/FichaMedicaView.vue'
import FichaSeleccionView from '@/views/FichaSeleccionView.vue'
import RegistroView from '@/views/Usuario/RegistroView.vue'
import LoginView from '@/views/Usuario/LoginView.vue'
import FichaEnfermeriaView from '@/views/Fichas/FichaEnfermeriaView.vue'
import FichaNutricionView from '@/views/Fichas/FichaNutricionView.vue'
import FichaFisioterapiaView from '@/views/Fichas/FichaFisioterapiaView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    { path: '/personas', component: PersonaListView },
    { path: '/personas/crear', component: PersonaCreateView },
    { path: '/personas/editar/:id', component: PersonaEditView, props: true },
    //{ path: '/fichas', component: FichaListView },
    { path: '/chat', component: ChatBot },
    { path: '/ficha/general', component: FichaGeneralView },
    { path: '/ficha/medica', component: FichaMedicaView },
    { path: '/fichas', component: FichaSeleccionView },
    { path: '/registro', component: RegistroView },
    { path: '/login', component: LoginView },
    { path: '/ficha/enfermeria', component: FichaEnfermeriaView },
    { path: '/ficha/nutricion', component: FichaNutricionView },
    { path: '/ficha/fisioterapia', component: FichaFisioterapiaView }

  ],
})

export default router
