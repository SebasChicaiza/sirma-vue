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
import HomeViewUser from '@/views/HomeViewUser.vue'
import AcercaProyecto from '@/views/AcercaProyecto.vue'
import ReportesViewUser from '@/views/ReportesViewUser.vue'
import MiembrosEquipo from '@/views/MiembrosEquipo.vue'
import ChatbotView from '@/views/IA/ChatbotView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeViewUser,
      meta: { public: true }
    },
    { path: '/personas', component: PersonaListView, meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/personas/crear', component: PersonaCreateView, meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/personas/editar/:id', component: PersonaEditView, props: true, meta: { requiresAuth: true, requiresAdmin: true } },
    //{ path: '/fichas', component: FichaListView },
    { path: '/chat', component: ChatBot },
    { path: '/ficha/general', component: FichaGeneralView, meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/ficha/medica', component: FichaMedicaView, meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/fichas', component: FichaSeleccionView, meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/registro', component: RegistroView },
    { path: '/login', component: LoginView },
    { path: '/ficha/enfermeria', component: FichaEnfermeriaView, meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/ficha/nutricion', component: FichaNutricionView, meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/ficha/fisioterapia', component: FichaFisioterapiaView, meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/Gestion', component: HomeView, meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/acerca-del-sistema', component: AcercaProyecto, meta: { public: true } },
    { path: '/miembros-del-equipo', component: MiembrosEquipo, meta: { public: true } },
    { path: '/reportes-view', component: ReportesViewUser, meta: { public: true } },
    { path: '/chatbot', component: ChatbotView }
  ],
})

router.beforeEach((to, from, next) => {
  const userData = localStorage.getItem('usuario')
  const usuario = userData ? JSON.parse(userData) : null

  const isLoggedIn = !!usuario
  const isAdmin = usuario?.userRol === 'admin'

  // Requiere autenticación pero no está logueado
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next('/login')
  }

  // Requiere ser admin, pero no lo es
  if (to.meta.requiresAdmin && !isAdmin) {
    return next('/')
  }

  // Usuario logueado quiere acceder a página pública (como login o home)
  if (to.meta.public && isLoggedIn) {
    return isAdmin ? next('/Gestion') : next('/')
  }

  return next()
})
export default router
