import { createRouter, createWebHistory } from 'vue-router'
import PersonaListView from '../views/PersonaListView.vue'
import PersonaCreateView from '../views/PersonaCreateView.vue'
import PersonaEditView from '../views/PersonaEditView.vue'

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
    { path: '/personas/editar/:id', component: PersonaEditView, props: true }

  ],
})

export default router
