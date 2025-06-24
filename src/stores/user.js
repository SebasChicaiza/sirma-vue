import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    usuario: JSON.parse(localStorage.getItem('usuario')) || null,
  }),
  getters: {
    isAdmin: (state) => state.usuario?.userRol === 'admin',
    isLogged: (state) => !!state.usuario,
  },
  actions: {
    setUsuario(usuario) {
      this.usuario = usuario
      if (usuario) {
        localStorage.setItem('usuario', JSON.stringify(usuario))
      } else {
        localStorage.removeItem('usuario')
      }
    },
    logout() {
      this.setUsuario(null)
    },
    syncFromLocalStorage() {
      this.usuario = JSON.parse(localStorage.getItem('usuario')) || null
    }
  }
})
