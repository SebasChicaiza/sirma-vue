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
import GeminiView from '@/views/IA/GeminiView.vue'
import VerFichas from '@/views/VerFichas.vue'
import PerfilView from '@/views/Usuario/PerfilView.vue'
import ReportesView from '@/views/ReportesView.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeViewUser,
      meta: { public: true }
    },
    { path: '/personas', component: PersonaListView, meta: { requiresAuth: true} },
    { path: '/personas/crear', component: PersonaCreateView, meta: { requiresAuth: true} },
    { path: '/personas/editar/:id', component: PersonaEditView, props: true, meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/chat', component: ChatBot },


    { path: '/ficha/general', component: FichaGeneralView, meta: { requiresAuth: true} },
    { path: '/ficha/medica', component: FichaMedicaView, meta: { requiresAuth: true} },
    { path: '/ficha/enfermeria', component: FichaEnfermeriaView, meta: { requiresAuth: true} },
    { path: '/ficha/nutricion', component: FichaNutricionView, meta: { requiresAuth: true} },
    { path: '/ficha/fisioterapia', component: FichaFisioterapiaView, meta: { requiresAuth: true} },

    { path: '/fichas/generales/:id', name: 'ficha-generales', component: FichaGeneralView, props: true, meta: { requiresAuth: true} },
    { path: '/fichas/medicina/:id', name: 'ficha-medicina', component: FichaMedicaView, props: true, meta: { requiresAuth: true} },
    { path: '/fichas/enfermeria/:id', name: 'ficha-enfermeria', component: FichaEnfermeriaView, props: true, meta: { requiresAuth: true} },
    { path: '/fichas/nutricion/:id', name: 'ficha-nutricion', component: FichaNutricionView, props: true, meta: { requiresAuth: true} },
    { path: '/fichas/fisioterapia/:id', name: 'ficha-fisioterapia', component: FichaFisioterapiaView, props: true, meta: { requiresAuth: true } },

    { path: '/fichas', component: FichaSeleccionView, meta: { requiresAuth: true} },
    { path: '/registro', component: RegistroView },
    { path: '/login', component: LoginView },
    { path: '/Gestion', component: HomeView, meta: { requiresAuth: true } },
    { path: '/acerca-del-sistema', component: AcercaProyecto, meta: { public: true } },
    { path: '/miembros-del-equipo', component: MiembrosEquipo, meta: { public: true } },
    { path: '/reportes-view', component: ReportesViewUser, meta: { public: true } },
    { path: '/chatbot', component: ChatbotView, meta: { requiresAuth: true } },
    { path: '/gemini', component: GeminiView, meta: { requiresAuth: true } },
    { path: '/ficha/buscar', component: VerFichas, meta: { requiresAuth: true } },
    { path: '/perfil', component: PerfilView, meta: { requiresAuth: true } },
    { path: '/reportes', component: ReportesView, meta: { requiresAuth: true } },
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  userStore.syncFromLocalStorage()

  const usuario = userStore.usuario
  const isLoggedIn = !!usuario
  const isAdmin = usuario?.userRol === 'admin'

  if (to.meta.requiresAuth && !isLoggedIn) return next('/login')
  if (to.meta.requiresAdmin && !isAdmin) return next('/')
  if (to.meta.public && isLoggedIn) return next('/Gestion')

  return next()
})


export default router
