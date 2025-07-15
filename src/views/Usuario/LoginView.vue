<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="form-title">Iniciar Sesión</h2>
      <p class="form-subtitle">Accede a tu cuenta del Sistema de Fichas Médicas de la PUCE.</p>

      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-group">
          <label for="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            v-model.trim="formData.email"
            placeholder="ejemplo@puce.edu.ec"
            required
            autocomplete="username"
            :class="{ 'input-error': errors.email }"
          />
          <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
        </div>

        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            placeholder="Ingresa tu contraseña"
            required
            autocomplete="current-password"
            :class="{ 'input-error': errors.password }"
          />
          <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
        </div>

        <button type="submit" class="submit-button" :disabled="isSubmitting">
          {{ isSubmitting ? 'Iniciando Sesión...' : 'Entrar' }}
        </button>

        <p v-if="submitMessage" :class="['submit-info', submitStatus]">
          {{ submitMessage }}
        </p>

        <div class="form-links">
          <router-link to="/recuperar-clave" class="forgot-password-link">
            ¿Olvidaste tu contraseña?
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const formData = reactive({
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
  password: '',
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref('')

const validateForm = () => {
  let isValid = true
  Object.keys(errors).forEach((key) => (errors[key] = ''))

  if (!formData.email) {
    errors.email = 'El correo electrónico es obligatorio.'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Formato de correo inválido.'
    isValid = false
  }
  // } else if (!formData.email.endsWith('@puce.edu.ec')) {
  //   errors.email = 'El correo debe ser @puce.edu.ec.'
  //   isValid = false
  // }

  if (!formData.password) {
    errors.password = 'La contraseña es obligatoria.'
    isValid = false
  } else if (formData.password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres.'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  submitMessage.value = ''
  submitStatus.value = ''

  if (!validateForm()) {
    submitMessage.value = 'Corrige los errores antes de continuar.'
    submitStatus.value = 'error'
    return
  }

  isSubmitting.value = true

  try {
    const payload = {
      userCorreo: formData.email,
      userClave: formData.password,
    }
    console.log('Payload enviado al servidor:', payload)

    const response = await axios.post(
      `${import.meta.env.VITE_URL_BACKEND}/api/usuarios/login`,
      payload,
      { validateStatus: () => true },
    )
    console.log('Respuesta del servidor:', response)

    if (response.status === 401) {
      submitMessage.value = response.data?.message || 'No se pudieron validar sus credenciales.'
      submitStatus.value = 'error'
      isSubmitting.value = false
      return
    }

    // Si llega aquí, el login fue exitoso
    const usuario = response.data
    userStore.setUsuario(usuario) // <-- Actualiza el store y localStorage

    submitMessage.value = 'Inicio de sesión exitoso. Redirigiendo...'
    submitStatus.value = 'success'

    setTimeout(() => {
      router.push('/Gestion')
    }, 1500)
  } catch (error) {
    submitMessage.value = 'Error de conexión con el servidor. ' + error
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - var(--navbar-height, 65px) - var(--footer-height, 100px));
  background-color: var(--color-background-light, #f6f6f6);
  padding: 30px 20px;
}

.login-card {
  background-color: var(--color-card-background, #ffffff);
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 450px;
  text-align: center;
}

.form-title {
  color: var(--color-primary, #1e3a5f);
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.form-subtitle {
  color: var(--color-text-secondary, #555);
  font-size: 1rem;
  margin-bottom: 30px;
  line-height: 1.5;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.form-group {
  text-align: left;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  color: var(--color-text-primary, #222);
  margin-bottom: 6px;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 14px 18px;
  border: 1px solid var(--color-input-border-default, #ccc);
  border-radius: 10px;
  font-size: 1.05rem;
  background-color: var(--color-input-background-default, #fff);
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.form-group input.input-error {
  border-color: var(--color-error, red);
  box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.2);
}

.error-message {
  color: var(--color-error, red);
  font-size: 0.85rem;
  margin-top: 8px;
  text-align: left;
}

.submit-button {
  background-color: var(--color-primary, #1e3a5f);
  color: #fff;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: var(--color-primary-dark, #16304a);
}

.submit-button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.submit-info {
  margin-top: 20px;
  padding: 12px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  text-align: center;
}

.submit-info.success {
  background-color: #e6ffed;
  color: #2e7d32;
  border: 1px solid #a5d6a7;
}

.submit-info.error {
  background-color: #ffeaea;
  color: #c62828;
  border: 1px solid #e57373;
}

.form-links {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-size: 0.9rem;
}

.form-links a {
  color: var(--color-accent-green, #2e7d32);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.form-links a:hover {
  color: var(--color-primary, #1e3a5f);
  text-decoration: underline;
}
</style>
