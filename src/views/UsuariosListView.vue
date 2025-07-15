<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import SearchBar from '@/components/SearchBar.vue'
const usuarios = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

// Estados para modales
const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingUser = ref(null)

// Formulario para crear/editar usuario
const userForm = ref({
  userNombre: '',
  userApellido: '',
  userCorreo: '',
  userClave: '',
  userCedula: '',
  userRol: 'estudiante',
  userEstado: 'activo'
})

const cargarUsuarios = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const res = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/api/usuarios`)
    usuarios.value = res.data
  } catch (error) {
    errorMessage.value = 'Error al cargar los usuarios. Por favor, intente de nuevo.'
    console.error('Error al cargar usuarios:', error)
  } finally {
    isLoading.value = false
  }
}

const handleSearch = async (searchTerm) => {
  if (!searchTerm) {
    cargarUsuarios()
    return
  }
  isLoading.value = true
  errorMessage.value = ''
  try {
    const res = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/api/usuarios`)
    // Filtrar usuarios por email o nombre en el frontend
    usuarios.value = res.data.filter(usuario =>
      usuario.userCorreo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.userNombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.userApellido?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  } catch (error) {
    errorMessage.value = 'Error al buscar usuarios.'
    usuarios.value = []
    console.error('Error en búsqueda:', error)
  } finally {
    isLoading.value = false
  }
}

const eliminarUsuario = async (id) => {
  // Validar si el usuario logueado es admin
  if (!isUserAdmin()) {
    alert('Solo los administradores pueden eliminar usuarios.')
    return
  }

  if (confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción es irreversible.')) {
    try {
      await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/api/usuarios/${id}`)
      await cargarUsuarios() // Recargar la lista después de eliminar
      alert('Usuario eliminado exitosamente.')
    } catch (error) {
      alert('Error al eliminar el usuario. Por favor, intente de nuevo.')
      console.error('Error al eliminar usuario:', error)
    }
  }
}

const cambiarEstado = async (usuario) => {
  // Validar si el usuario logueado es admin
  if (!isUserAdmin()) {
    alert('Solo los administradores pueden cambiar el estado de usuarios.')
    return
  }

  try {
    const nuevoEstado = usuario.userEstado === 'activo' ? 'inactivo' : 'activo'
    await axios.put(`${import.meta.env.VITE_URL_BACKEND}/api/usuarios/${usuario.idusuario}`, {
      ...usuario,
      userEstado: nuevoEstado
    })
    usuario.userEstado = nuevoEstado
    alert(`Usuario ${nuevoEstado === 'activo' ? 'activado' : 'desactivado'} exitosamente.`)
  } catch (error) {
    alert('Error al cambiar el estado del usuario. Por favor, intente de nuevo.')
    console.error('Error al cambiar estado:', error)
  }
}

const getRoleBadgeClass = (role) => {
  switch (role?.toLowerCase()) {
    case 'admin':
      return 'admin'
    case 'estudiante':
      return 'default'
    default:
      return 'default'
  }
}

// Función para validar si el usuario logueado es admin
const isUserAdmin = () => {
  const usuarioLogueado = JSON.parse(localStorage.getItem('usuario') || 'null')
  return usuarioLogueado && usuarioLogueado.userRol === 'admin'
}

// Funciones para modales
const openCreateModal = () => {
  resetForm()
  showCreateModal.value = true
}

const openEditModal = (usuario) => {
  editingUser.value = usuario
  userForm.value = {
    userNombre: usuario.userNombre || '',
    userApellido: usuario.userApellido || '',
    userCorreo: usuario.userCorreo || '',
    userClave: '', // No prellenar la contraseña por seguridad
    userCedula: usuario.userCedula || '',
    userRol: usuario.userRol || 'estudiante', // Asignar rol por defecto
    userEstado: usuario.userEstado || 'activo'
  }
  showEditModal.value = true
}

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingUser.value = null
  resetForm()
}

const resetForm = () => {
  userForm.value = {
    userNombre: '',
    userApellido: '',
    userCorreo: '',
    userClave: '',
    userCedula: '',
    userRol: 'estudiante',
    userEstado: 'activo'
  }
}

const crearUsuario = async () => {
  // Validar si el usuario logueado es admin
  if (!isUserAdmin()) {
    alert('Solo los administradores pueden crear usuarios.')
    return
  }

  try {
    // Preparar el JSON con solo los campos necesarios para la creación
    const userData = {
      userNombre: userForm.value.userNombre,
      userApellido: userForm.value.userApellido,
      userCorreo: userForm.value.userCorreo,
      userClave: userForm.value.userClave,
      userCedula: userForm.value.userCedula,
      userRol: userForm.value.userRol // Enviar el rol exactamente como está en el formulario
    }

    await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/usuarios`, userData)
    await cargarUsuarios()
    closeModals()
    alert('Usuario creado exitosamente.')
  } catch (error) {
    if (error.response && error.response.status === 403) {
      alert('No tienes permisos para crear usuarios. Solo los administradores pueden realizar esta acción.')
    } else {
      alert('Error al crear el usuario. Por favor, intente de nuevo.')
    }
    console.error('Error al crear usuario:', error)
  }
}

const actualizarUsuario = async () => {
  // Validar si el usuario logueado es admin
  if (!isUserAdmin()) {
    alert('Solo los administradores pueden actualizar usuarios.')
    return
  }

  try {
    const dataToUpdate = { ...userForm.value }
    if (!dataToUpdate.userClave) {
      delete dataToUpdate.userClave // No enviar contraseña vacía
    }

    await axios.patch(`${import.meta.env.VITE_URL_BACKEND}/api/usuarios/${editingUser.value.idusuario}`, dataToUpdate)
    await cargarUsuarios()
    closeModals()
    alert('Usuario actualizado exitosamente.')
  } catch (error) {
    alert('Error al actualizar el usuario. Por favor, intente de nuevo.')
    console.error('Error al actualizar usuario:', error)
  }
}

onMounted(() => {
  cargarUsuarios()
})
</script>

<template>
  <div class="usuarios-container">
    <div class="usuarios-wrapper">
      <div class="header">
        <h1 class="title">
          <i class="fas fa-users icon-title"></i>
          Gestión de Usuarios
        </h1>
        <div class="counter">
          <span>Total: {{ usuarios.length }}</span>
        </div>
      </div>

      <div class="toolbar">
        <button v-if="isUserAdmin()" @click="openCreateModal" class="btn-primary">
          <i class="fas fa-user-plus"></i>
          Registrar nuevo usuario
        </button>
        <SearchBar
          placeholder="Buscar usuario por email, nombre o apellido..."
          @search="handleSearch"
          class="search-bar"
        />
      </div>

      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Cargando usuarios...</p>
      </div>

      <div v-else-if="errorMessage" class="error-message">
        <strong>¡Error!</strong>
        <span>{{ errorMessage }}</span>
      </div>

      <div v-else-if="usuarios.length === 0" class="empty-state">
        <i class="fas fa-user-slash empty-icon"></i>
        <p class="empty-title">No hay usuarios registrados aún.</p>
        <p class="empty-subtitle">¡Comienza añadiendo un nuevo usuario al sistema!</p>
      </div>

      <div v-else class="table-container">
        <table class="usuarios-table">
          <thead>
            <tr>
              <th>
                <i class="fas fa-user"></i>Usuario
              </th>
              <th>
                <i class="fas fa-envelope"></i>Email
              </th>
              <th>
                <i class="fas fa-id-card"></i>Cédula
              </th>
              <th>
                <i class="fas fa-user-tag"></i>Rol
              </th>
              <th class="text-center">
                <i class="fas fa-toggle-on"></i>Estado
              </th>
              <th class="text-center">
                <i class="fas fa-cogs"></i>Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="usuario in usuarios"
              :key="usuario.idusuario"
              class="table-row"
              :class="{ 'inactive': usuario.userEstado === 'inactivo' }"
            >
              <td class="user-cell">
                <div class="user-info">
                  <div class="avatar">
                    <span>{{ (usuario.userNombre || usuario.userCorreo).charAt(0).toUpperCase() }}</span>
                  </div>
                  <div class="user-details">
                    <div class="user-name">{{ usuario.userNombre }} {{ usuario.userApellido }}</div>
                    <div class="user-id">ID: {{ usuario.idusuario }}</div>
                  </div>
                </div>
              </td>
              <td class="email-cell">
                <i class="fas fa-at icon-small"></i>
                {{ usuario.userCorreo }}
              </td>
              <td class="cedula-cell">
                <i class="fas fa-id-card icon-small"></i>
                {{ usuario.userCedula }}
              </td>
              <td>
                <span :class="['role-badge', getRoleBadgeClass(usuario.userRol)]">
                  {{ usuario.userRol || 'Sin rol' }}
                </span>
              </td>
              <td class="text-center">
                <button
                  v-if="isUserAdmin()"
                  @click="cambiarEstado(usuario)"
                  :class="['status-btn', usuario.userEstado === 'activo' ? 'active' : 'inactive']"
                >
                  <i :class="usuario.userEstado === 'activo' ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
                  {{ usuario.userEstado === 'activo' ? 'Activo' : 'Inactivo' }}
                </button>
                <span v-else :class="['status-badge', usuario.userEstado === 'activo' ? 'active' : 'inactive']">
                  <i :class="usuario.userEstado === 'activo' ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
                  {{ usuario.userEstado === 'activo' ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td v-if="isUserAdmin()" class="actions-cell">
                <button @click="openEditModal(usuario)" class="btn-edit">
                  <i class="fas fa-edit"></i>
                  Editar
                </button>
                <button @click="eliminarUsuario(usuario.idusuario)" class="btn-delete">
                  <i class="fas fa-trash"></i>
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Estadísticas -->
      <div class="stats-grid">
        <div class="stat-card stat-total">
          <i class="fas fa-users stat-icon"></i>
          <div class="stat-content">
            <p class="stat-label">Total Usuarios</p>
            <p class="stat-value">{{ usuarios.length }}</p>
          </div>
        </div>
        <div class="stat-card stat-active">
          <i class="fas fa-user-check stat-icon"></i>
          <div class="stat-content">
            <p class="stat-label">Activos</p>
            <p class="stat-value">{{ usuarios.filter(u => u.userEstado === 'activo').length }}</p>
          </div>
        </div>
        <div class="stat-card stat-inactive">
          <i class="fas fa-user-times stat-icon"></i>
          <div class="stat-content">
            <p class="stat-label">Inactivos</p>
            <p class="stat-value">{{ usuarios.filter(u => u.userEstado === 'inactivo').length }}</p>
          </div>
        </div>
        <div class="stat-card stat-admin">
          <i class="fas fa-user-shield stat-icon"></i>
          <div class="stat-content">
            <p class="stat-label">Administradores</p>
            <p class="stat-value">{{ usuarios.filter(u => u.userRol?.toLowerCase() === 'admin').length }}</p>
          </div>
        </div>
        <div class="stat-card stat-student">
          <i class="fas fa-graduation-cap stat-icon"></i>
          <div class="stat-content">
            <p class="stat-label">Estudiantes</p>
            <p class="stat-value">{{ usuarios.filter(u => u.userRol?.toLowerCase() === 'estudiante').length }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para Crear Usuario -->
    <div v-if="showCreateModal" class="modal-overlay" @click="closeModals">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>
            <i class="fas fa-user-plus"></i>
            Crear Nuevo Usuario
          </h2>
          <button @click="closeModals" class="modal-close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <form @submit.prevent="crearUsuario" class="modal-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="nombre">Nombre <span class="required">*</span></label>
              <input
                id="nombre"
                v-model="userForm.userNombre"
                type="text"
                required
                class="form-input"
                placeholder="Ingrese el nombre"
              />
            </div>
            <div class="form-group">
              <label for="apellido">Apellido <span class="required">*</span></label>
              <input
                id="apellido"
                v-model="userForm.userApellido"
                type="text"
                required
                class="form-input"
                placeholder="Ingrese el apellido"
              />
            </div>
            <div class="form-group">
              <label for="correo">Correo Electrónico <span class="required">*</span></label>
              <input
                id="correo"
                v-model="userForm.userCorreo"
                type="email"
                required
                class="form-input"
                placeholder="ejemplo@correo.com"
              />
            </div>
            <div class="form-group">
              <label for="cedula">Cédula <span class="required">*</span></label>
              <input
                id="cedula"
                v-model="userForm.userCedula"
                type="text"
                required
                class="form-input"
                placeholder="1234567890"
                maxlength="10"
              />
            </div>
            <div class="form-group">
              <label for="clave">Contraseña <span class="required">*</span></label>
              <input
                id="clave"
                v-model="userForm.userClave"
                type="password"
                required
                class="form-input"
                placeholder="Mínimo 8 caracteres"
                minlength="8"
              />
            </div>
            <div class="form-group">
              <label for="rol">Rol <span class="required">*</span></label>
              <select id="rol" v-model="userForm.userRol" required class="form-select">
                <option value="estudiante">Estudiante</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </div>
          <div class="modal-actions">
            <button type="button" @click="closeModals" class="btn-cancel">
              <i class="fas fa-times"></i>
              Cancelar
            </button>
            <button type="submit" class="btn-save">
              <i class="fas fa-save"></i>
              Crear Usuario
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal para Editar Usuario -->
    <div v-if="showEditModal" class="modal-overlay" @click="closeModals">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>
            <i class="fas fa-user-edit"></i>
            Editar Usuario
          </h2>
          <button @click="closeModals" class="modal-close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <form @submit.prevent="actualizarUsuario" class="modal-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="edit-nombre">Nombre <span class="required">*</span></label>
              <input
                id="edit-nombre"
                v-model="userForm.userNombre"
                type="text"
                required
                class="form-input"
                placeholder="Ingrese el nombre"
              />
            </div>
            <div class="form-group">
              <label for="edit-apellido">Apellido <span class="required">*</span></label>
              <input
                id="edit-apellido"
                v-model="userForm.userApellido"
                type="text"
                required
                class="form-input"
                placeholder="Ingrese el apellido"
              />
            </div>
            <div class="form-group">
              <label for="edit-correo">Correo Electrónico <span class="required">*</span></label>
              <input
                id="edit-correo"
                v-model="userForm.userCorreo"
                type="email"
                required
                class="form-input"
                placeholder="ejemplo@correo.com"
              />
            </div>
            <div class="form-group">
              <label for="edit-cedula">Cédula <span class="required">*</span></label>
              <input
                id="edit-cedula"
                v-model="userForm.userCedula"
                type="text"
                required
                class="form-input"
                placeholder="1234567890"
                maxlength="10"
              />
            </div>
            <div class="form-group">
              <label for="edit-clave">Nueva Contraseña <span class="optional">(opcional)</span></label>
              <input
                id="edit-clave"
                v-model="userForm.userClave"
                type="password"
                class="form-input"
                placeholder="Dejar vacío para mantener actual"
                minlength="8"
              />
            </div>
            <div class="form-group">
              <label for="edit-rol">Rol <span class="required">*</span></label>
              <select id="edit-rol" v-model="userForm.userRol" required class="form-select">
                <option value="estudiante">Estudiante</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </div>
          <div class="modal-actions">
            <button type="button" @click="closeModals" class="btn-cancel">
              <i class="fas fa-times"></i>
              Cancelar
            </button>
            <button type="submit" class="btn-save">
              <i class="fas fa-save"></i>
              Actualizar Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Container principal */
.usuarios-container {
  min-height: 100vh;
  background-color: #f3f4f6;
  padding: 2rem;
}

.usuarios-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #1e3a8a;
  margin: 0;
  display: flex;
  align-items: center;
}

.icon-title {
  color: #3b82f6;
  margin-right: 0.75rem;
}

.counter {
  color: #6b7280;
  font-size: 0.875rem;
}

/* Toolbar */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: #16a34a;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  background-color: #15803d;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary i {
  margin-right: 0.5rem;
}

.search-bar {
  min-width: 300px;
}

/* Estados */
.loading-state {
  text-align: center;
  padding: 3rem 0;
  color: #3b82f6;
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  background-color: #fef2f2;
  border: 1px solid #f87171;
  color: #dc2626;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 0;
  color: #6b7280;
}

.empty-icon {
  font-size: 4rem;
  color: #d1d5db;
  margin-bottom: 1rem;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.empty-subtitle {
  margin: 0;
}

/* Tabla */
.table-container {
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  margin-bottom: 2rem;
}

.usuarios-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.usuarios-table thead {
  background-color: #eff6ff;
  color: #1e40af;
}

.usuarios-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.usuarios-table th i {
  margin-right: 0.5rem;
}

.usuarios-table tbody tr {
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.15s ease;
}

.usuarios-table tbody tr:hover {
  background-color: #eff6ff;
}

.usuarios-table tbody tr.inactive {
  opacity: 0.6;
}

.usuarios-table td {
  padding: 1rem;
  white-space: nowrap;
}

.text-center {
  text-align: center;
}

/* Celdas específicas */
.user-cell {
  font-weight: 500;
  color: #111827;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
}

.avatar span {
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
}

.user-details {
  min-width: 0;
}

.user-name {
  font-weight: 500;
  color: #111827;
  font-size: 0.875rem;
}

.user-id {
  color: #6b7280;
  font-size: 0.75rem;
}

.email-cell {
  color: #374151;
}

.cedula-cell {
  color: #374151;
  font-family: monospace;
  font-weight: 500;
}

.icon-small {
  color: #9ca3af;
  margin-right: 0.5rem;
}

.date-cell {
  color: #374151;
}

/* Role badges */
.role-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.role-badge.admin {
  background-color: #f3e8ff;
  color: #7c3aed;
}

.role-badge.default {
  background-color: #eff6ff;
  color: #1d4ed8;
}

/* Botón de estado */
.status-btn {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  border: none;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.status-btn.active {
  background-color: #dcfce7;
  color: #16a34a;
}

.status-btn.active:hover {
  background-color: #bbf7d0;
}

.status-btn.inactive {
  background-color: #fef2f2;
  color: #dc2626;
}

.status-btn.inactive:hover {
  background-color: #fecaca;
}

.status-btn i {
  margin-right: 0.25rem;
}

/* Badge de estado (solo lectura) */
.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
}

.status-badge.active {
  background-color: #dcfce7;
  color: #16a34a;
}

.status-badge.inactive {
  background-color: #fef2f2;
  color: #dc2626;
}

.status-badge i {
  margin-right: 0.25rem;
}

/* Acciones */
.actions-cell {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}

.btn-edit,
.btn-delete {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border: 1px solid transparent;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-edit {
  color: #2563eb;
  background: transparent;
  border: none;
}

.btn-edit:hover {
  color: #1d4ed8;
  background-color: #eff6ff;
}

.btn-delete {
  color: #dc2626;
  background: transparent;
  border: none;
}

.btn-delete:hover {
  color: #b91c1c;
  background-color: #fef2f2;
}

.btn-edit i,
.btn-delete i {
  margin-right: 0.25rem;
}

/* Estadísticas */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.stat-card {
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
}

.stat-total {
  background-color: #eff6ff;
}

.stat-active {
  background-color: #f0fdf4;
}

.stat-inactive {
  background-color: #fef2f2;
}

.stat-admin {
  background-color: #faf5ff;
}

.stat-student {
  background-color: #eff6ff;
}

.stat-icon {
  font-size: 1.25rem;
  margin-right: 0.75rem;
}

.stat-total .stat-icon {
  color: #3b82f6;
}

.stat-active .stat-icon {
  color: #16a34a;
}

.stat-inactive .stat-icon {
  color: #dc2626;
}

.stat-admin .stat-icon {
  color: #7c3aed;
}

.stat-student .stat-icon {
  color: #3b82f6;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 0.25rem 0;
}

.stat-total .stat-label {
  color: #1d4ed8;
}

.stat-active .stat-label {
  color: #15803d;
}

.stat-inactive .stat-label {
  color: #b91c1c;
}

.stat-admin .stat-label {
  color: #6b21a8;
}

.stat-student .stat-label {
  color: #1d4ed8;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.stat-total .stat-value {
  color: #1e3a8a;
}

.stat-active .stat-value {
  color: #14532d;
}

.stat-inactive .stat-value {
  color: #991b1b;
}

.stat-admin .stat-value {
  color: #581c87;
}

.stat-student .stat-value {
  color: #1e3a8a;
}

/* Responsive */
@media (max-width: 768px) {
  .usuarios-container {
    padding: 1rem;
  }

  .usuarios-wrapper {
    padding: 1rem;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-primary {
    justify-content: center;
  }

  .search-bar {
    min-width: 100%;
  }

  .title {
    font-size: 1.5rem;
  }

  .usuarios-table {
    font-size: 0.75rem;
  }

  .usuarios-table th,
  .usuarios-table td {
    padding: 0.5rem;
  }

  .avatar {
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
  }

  .actions-cell {
    flex-direction: column;
    gap: 0.25rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .usuarios-container {
    padding: 0.5rem;
  }

  .table-container {
    margin: 0 -1rem;
    border-radius: 0;
  }
}

/* Estilos para Modales */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalEnter 0.3s ease-out;
}

@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f8fafc;
  border-radius: 12px 12px 0 0;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e3a8a;
  display: flex;
  align-items: center;
}

.modal-header h2 i {
  margin-right: 0.5rem;
  color: #3b82f6;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.modal-close:hover {
  color: #dc2626;
  background-color: #f3f4f6;
}

.modal-form {
  padding: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.required {
  color: #dc2626;
}

.optional {
  color: #6b7280;
  font-weight: normal;
}

.form-input,
.form-select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.15s ease;
  background-color: white;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input::placeholder {
  color: #9ca3af;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.btn-cancel,
.btn-save {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.15s ease;
  text-decoration: none;
}

.btn-cancel {
  background-color: #f3f4f6;
  color: #374151;
}

.btn-cancel:hover {
  background-color: #e5e7eb;
}

.btn-save {
  background-color: #16a34a;
  color: white;
}

.btn-save:hover {
  background-color: #15803d;
}

.btn-cancel i,
.btn-save i {
  margin-right: 0.5rem;
}

/* Responsive para modales */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 0.5rem;
  }

  .modal-content {
    max-height: 95vh;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .modal-header {
    padding: 1rem;
  }

  .modal-form {
    padding: 1rem;
  }

  .modal-actions {
    flex-direction: column-reverse;
  }

  .btn-cancel,
  .btn-save {
    justify-content: center;
  }
}
</style>
