// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    usuario: null,
  }),
  getters: {
    isAdmin: (state) => state.usuario?.userRol === 'admin',
    isLogged: (state) => !!state.usuario,
    userRol: (state) => state.usuario?.userRol || null,
    userNombre: (state) => `${state.usuario?.userNombre || ''} ${state.usuario?.userApellido || ''}`,
  },
  actions: {
    setUsuario(usuario) {
      if (usuario && typeof usuario === 'object' && usuario.userCorreo) {
        this.usuario = usuario
        localStorage.setItem('usuario', JSON.stringify(usuario))
      } else {
        this.usuario = null
        localStorage.removeItem('usuario')
      }
    },
    logout() {
      this.setUsuario(null)
    },
    syncFromLocalStorage() {
      try {
        const stored = localStorage.getItem('usuario')
        const parsed = stored ? JSON.parse(stored) : null

        // Validación mínima
        if (parsed && typeof parsed === 'object' && parsed.userCorreo) {
          this.usuario = parsed
        } else {
          this.usuario = null
          localStorage.removeItem('usuario')
        }
      } catch (err) {
        console.error('Error al leer usuario desde localStorage:', err)
        this.usuario = null
        localStorage.removeItem('usuario')
      }
    },
  },
})
