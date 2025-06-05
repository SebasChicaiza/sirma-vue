import { createRouter, createWebHistory } from 'vue-router'
import PersonaListView from '../views/PersonaListView.vue'
import PersonaCreateView from '../views/PersonaCreateView.vue'
import PersonaEditView from '../views/PersonaEditView.vue'
import FichaListView from '@/views/Ficha/FichaListView.vue'
import FichaCreateWithPersona from '@/views/Ficha/FichaCreateWithPersona.vue'
import FichaEditView from '@/views/Ficha/FichaEditView.vue'

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
    { path: '/fichas', component: FichaListView},
    { path: '/fichas/crear/:id', component: FichaCreateWithPersona, props: true}, //Create a Ficha With Persona id
    { path: '/fichas/editar/:id/:ficha', component: FichaEditView}

  ],
})

export default router
