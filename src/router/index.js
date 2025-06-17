import { createRouter, createWebHistory } from 'vue-router'
import PersonaListView from '../views/PersonaListView.vue'
import PersonaCreateView from '../views/PersonaCreateView.vue'
import PersonaEditView from '../views/PersonaEditView.vue'
//import FichaListView from '@/views/Ficha/FichaListView.vue'
import FichaCreateWithPersona from '@/views/Ficha/FichaCreateWithPersona.vue'
import FichaEditView from '@/views/Ficha/FichaEditView.vue'
import ChatBot from '@/views/ChatBot.vue'
import FichaGeneralView from '../views/Fichas/FichaGeneralView.vue'
import FichaMedicaView from '@/views/Fichas/FichaMedicaView.vue'
import FichaSeleccionView from '@/views/FichaSeleccionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'personas',
      component: PersonaListView,
    },
    { path: '/personas', component: PersonaListView },
    { path: '/personas/crear', component: PersonaCreateView },
    { path: '/personas/editar/:id', component: PersonaEditView, props: true },
    //{ path: '/fichas', component: FichaListView },
    { path: '/fichas/crear/:id', component: FichaCreateWithPersona, props: true }, //Create a Ficha With Persona id
    { path: '/fichas/editar/:id/:ficha', component: FichaEditView },
    { path: '/chat', component: ChatBot },
    { path: '/personas/editar/:id', component: PersonaEditView, props: true },
    { path: '/ficha/general', component: FichaGeneralView },
    { path: '/ficha/medica', component: FichaMedicaView },
    { path: '/fichas', component: FichaSeleccionView }

  ],
})

export default router
