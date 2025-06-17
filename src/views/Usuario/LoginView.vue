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
            aria-required="true"
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
            aria-required="true"
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
          <router-link to="/registro" class="register-link">
            ¿No tienes cuenta? Regístrate aquí
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
// import { useRouter } from 'vue-router' // Descomentar si vas a redirigir al éxito

// const router = useRouter() // Descomentar si vas a redirigir al éxito

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
const submitStatus = ref('') // 'success' o 'error'

// Función para validar el formulario de login
const validateForm = () => {
  let isValid = true

  // Resetear errores
  Object.keys(errors).forEach((key) => (errors[key] = ''))

  // Validación de Correo
  if (!formData.email) {
    errors.email = 'El correo electrónico es obligatorio.'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Formato de correo inválido.'
    isValid = false
  } else if (!formData.email.endsWith('@puce.edu.ec')) {
    errors.email = 'El correo debe ser @puce.edu.ec.'
    isValid = false
  }

  // Validación de Contraseña
  if (!formData.password) {
    errors.password = 'La contraseña es obligatoria.'
    isValid = false
  } else if (formData.password.length < 8) {
    // Mínimo 8 caracteres, igual que en el registro
    errors.password = 'La contraseña debe tener al menos 8 caracteres.'
    isValid = false
  }

  return isValid
}

// Manejador del envío del formulario
const handleSubmit = async () => {
  submitMessage.value = ''
  submitStatus.value = ''

  if (!validateForm()) {
    submitMessage.value = 'Por favor, corrige los errores en el formulario.'
    submitStatus.value = 'error'
    return
  }

  isSubmitting.value = true
  try {
    // Aquí iría tu lógica para enviar los datos a tu backend para autenticación
    // Por ejemplo, usando fetch o axios:
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     email: formData.email,
    //     password: formData.password
    //   })
    // });
    // const data = await response.json();

    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simula retraso de red

    // if (response.ok && data.token) { // Si la autenticación es exitosa
    //   localStorage.setItem('userToken', data.token); // Guardar token de sesión
    submitMessage.value = '¡Inicio de sesión exitoso! Redirigiendo...'
    submitStatus.value = 'success'
    // setTimeout(() => {
    //   router.push('/dashboard'); // Redirigir a la página principal o dashboard
    // }, 1000);
    // } else {
    //   submitMessage.value = data.message || 'Credenciales incorrectas. Inténtalo de nuevo.';
    //   submitStatus.value = 'error';
    // }
  } catch (error) {
    submitMessage.value = 'Ocurrió un error de conexión. Inténtalo más tarde.'
    submitStatus.value = 'error'
    console.error('Error al iniciar sesión:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/*
  IMPORTANTE: Las variables CSS (ej. --color-primary-dark) DEBEN ser definidas globalmente
  en tu main.js o App.vue (sin scoped), como se explicó anteriormente, para que sean accesibles aquí.
  Asegúrate de que las variables para los inputs que definimos en RegistroForm.vue también estén disponibles:
  --color-input-border-default, --color-input-background-default, --color-input-placeholder
*/

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* Ajusta min-height para llenar el espacio entre navbar y footer */
  min-height: calc(100vh - var(--navbar-height, 65px) - var(--footer-height, 100px));
  background-color: var(--color-background-light); /* Fondo claro y suave */
  padding: 30px 20px;
}

.login-card {
  background-color: var(--color-card-background, #ffffff);
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 450px; /* Un poco más estrecho que el de registro, si lo deseas */
  text-align: center;
}

.form-title {
  color: var(--color-primary);
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.form-subtitle {
  color: var(--color-text-secondary);
  font-size: 1rem;
  margin-bottom: 30px;
  line-height: 1.5;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 22px; /* Espacio entre grupos de formulario */
}

.form-group {
  text-align: left;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  color: var(--color-text-primary);
  margin-bottom: 6px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.form-group input {
  width: 100%;
  padding: 16px 20px; /* Mayor padding para un look más "relleno" y espacioso */
  border: 1px solid var(--color-input-border-default); /* Borde claro por defecto */
  border-radius: 10px; /* Bordes más redondeados */
  font-size: 1.05rem; /* Un poco más grande para el texto de entrada */
  color: var(--color-text-primary);
  background-color: var(--color-input-background-default); /* Fondo blanco casi puro */
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05); /* Sutil sombra interna para profundidad */
}

/* Estilo del placeholder */
.form-group input::placeholder {
  color: var(--color-input-placeholder); /* Color más suave para el placeholder */
  opacity: 1;
}

.form-group input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(var(--color-primary-rgb), 0.25);
  outline: none;
  background-color: #ffffff;
}

.form-group input.input-error {
  border-color: var(--color-error);
  box-shadow: 0 0 0 4px rgba(var(--color-error-rgb), 0.25);
}

.error-message {
  color: var(--color-error);
  font-size: 0.85rem;
  margin-top: 8px;
  text-align: left;
  font-weight: 500;
}

.submit-button {
  background-color: var(--color-primary);
  color: var(--color-text-light);
  padding: 15px 25px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease,
    box-shadow 0.3s ease;
  margin-top: 10px;
  box-shadow: 0 4px 10px rgba(var(--color-primary-rgb), 0.2);
}

.submit-button:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(var(--color-primary-rgb), 0.3);
}

.submit-button:disabled {
  background-color: var(--color-disabled);
  cursor: not-allowed;
  opacity: 0.8;
  transform: none;
  box-shadow: none;
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
  background-color: var(--color-success-light);
  color: var(--color-success);
  border: 1px solid var(--color-success);
}

.submit-info.error {
  background-color: var(--color-error-light);
  color: var(--color-error);
  border: 1px solid var(--color-error);
}

.form-links {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 15px; /* Espacio entre los enlaces */
  font-size: 0.9rem;
}

.form-links a {
  color: var(--color-accent-green);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.form-links a:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

/* Responsividad para pantallas más pequeñas */
@media (max-width: 600px) {
  .login-card {
    padding: 25px;
    margin: 20px;
  }

  .form-title {
    font-size: 1.8rem;
  }

  .form-subtitle {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }

  .form-group input {
    padding: 12px 15px;
    font-size: 0.95rem;
  }

  .submit-button {
    padding: 12px 20px;
    font-size: 1rem;
  }
}
</style>
