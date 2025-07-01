<template>
  <div class="registration-container">
    <div class="registration-card">
      <h2 class="form-title">Registrar Nuevo Usuario</h2>
      <p class="form-subtitle">
        Completa los campos para crear tu cuenta en el sistema de fichas médicas.
      </p>

      <form @submit.prevent="handleSubmit" class="registration-form">
        <div class="form-group">
          <label for="nombre">Nombre(s):</label>
          <input
            type="text"
            id="nombre"
            v-model.trim="formData.nombre"
            placeholder="Ej: Juan"
            required
            aria-required="true"
            :class="{ 'input-error': errors.nombre }"
          />
          <p v-if="errors.nombre" class="error-message">{{ errors.nombre }}</p>
        </div>

        <div class="form-group">
          <label for="apellido">Apellido(s):</label>
          <input
            type="text"
            id="apellido"
            v-model.trim="formData.apellido"
            placeholder="Ej: Pérez"
            required
            aria-required="true"
            :class="{ 'input-error': errors.apellido }"
          />
          <p v-if="errors.apellido" class="error-message">{{ errors.apellido }}</p>
        </div>

        <div class="form-group">
          <label for="cedula">Cédula de Identidad:</label>
          <input
            type="text"
            id="cedula"
            v-model.trim="formData.cedula"
            placeholder="Ej: 1712345678"
            required
            maxlength="10"
            aria-required="true"
            :class="{ 'input-error': errors.cedula }"
          />
          <p v-if="errors.cedula" class="error-message">{{ errors.cedula }}</p>
        </div>

        <div class="form-group">
          <label for="correo">Correo Electrónico:</label>
          <input
            type="email"
            id="correo"
            v-model.trim="formData.correo"
            placeholder="ejemplo@puce.edu.ec"
            required
            aria-required="true"
            :class="{ 'input-error': errors.correo }"
          />
          <p v-if="errors.correo" class="error-message">{{ errors.correo }}</p>
        </div>

        <div class="form-group">
          <label for="clave">Contraseña:</label>
          <input
            type="password"
            id="clave"
            v-model="formData.clave"
            placeholder="Mínimo 8 caracteres (letras, números, símbolos)"
            required
            minlength="8"
            aria-required="true"
            :class="{ 'input-error': errors.clave }"
          />
          <p v-if="errors.clave" class="error-message">{{ errors.clave }}</p>
        </div>

        <div class="form-group">
          <label for="confirmClave">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmClave"
            v-model="formData.confirmClave"
            placeholder="Repite tu contraseña"
            required
            aria-required="true"
            :class="{ 'input-error': errors.confirmClave }"
          />
          <p v-if="errors.confirmClave" class="error-message">{{ errors.confirmClave }}</p>
        </div>

        <button type="submit" class="submit-button" :disabled="isSubmitting">
          {{ isSubmitting ? 'Registrando...' : 'Registrar' }}
        </button>

        <p v-if="submitMessage" :class="['submit-info', submitStatus]">
          {{ submitMessage }}
        </p>

        <div class="login-redirect">
          ¿Ya tienes una cuenta? <router-link to="/login">Inicia Sesión aquí</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios' // Importar axios para las llamadas a la API
import { useRouter } from 'vue-router' // Mantener router para la redirección

const router = useRouter()

// Estado del formulario
const formData = reactive({
  nombre: '',
  apellido: '',
  correo: '',
  clave: '',
  cedula: '',
  confirmClave: '',
})

// Objeto para almacenar errores de validación
const errors = reactive({
  nombre: '',
  apellido: '',
  correo: '',
  clave: '',
  cedula: '',
  confirmClave: '',
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref('') // 'success' o 'error'

// Función para validar la cédula ecuatoriana
const validateCedula = (cedula) => {
  if (!/^\d{10}$/.test(cedula)) {
    return 'La cédula debe tener 10 dígitos numéricos.'
  }

  const provincia = parseInt(cedula.substring(0, 2))
  if (provincia < 1 || provincia > 24) {
    return 'Cédula inválida: código de provincia fuera de rango.'
  }

  const digitos = cedula.split('').map(Number)
  const tercerDigito = digitos[2]
  if (tercerDigito >= 6) {
    return 'Cédula inválida: tercer dígito incorrecto.'
  }

  const checksum = digitos[9]
  let sum = 0
  for (let i = 0; i < 9; i++) {
    let digit = digitos[i]
    if (i % 2 === 0) {
      // Posiciones impares
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    sum += digit
  }

  const lastDigitCalculated = sum % 10 === 0 ? 0 : 10 - (sum % 10)
  if (lastDigitCalculated !== checksum) {
    return 'Cédula inválida: dígito verificador incorrecto.'
  }

  return '' // Vacío si es válida
}

// Función de validación general del formulario
const validateForm = () => {
  let isValid = true

  // Resetear errores
  Object.keys(errors).forEach((key) => (errors[key] = ''))

  // Validación de Nombre
  if (!formData.nombre) {
    errors.nombre = 'El nombre es obligatorio.'
    isValid = false
  } else if (formData.nombre.length < 2) {
    errors.nombre = 'El nombre debe tener al menos 2 caracteres.'
    isValid = false
  }

  // Validación de Apellido
  if (!formData.apellido) {
    errors.apellido = 'El apellido es obligatorio.'
    isValid = false
  } else if (formData.apellido.length < 2) {
    errors.apellido = 'El apellido debe tener al menos 2 caracteres.'
    isValid = false
  }

  // Validación de Cédula
  const cedulaError = validateCedula(formData.cedula)
  if (cedulaError) {
    errors.cedula = cedulaError
    isValid = false
  }

  // Validación de Correo
  if (!formData.correo) {
    errors.correo = 'El correo electrónico es obligatorio.'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
    errors.correo = 'Formato de correo inválido.'
    isValid = false
  } else if (!formData.correo.endsWith('@puce.edu.ec')) {
    errors.correo = 'El correo debe ser @puce.edu.ec.'
    isValid = false
  }

  // Validación de Clave
  if (!formData.clave) {
    errors.clave = 'La contraseña es obligatoria.'
    isValid = false
  } else if (formData.clave.length < 8) {
    errors.clave = 'La contraseña debe tener al menos 8 caracteres.'
    isValid = false
  }

  // Validación de Confirmar Clave
  if (!formData.confirmClave) {
    errors.confirmClave = 'Debes confirmar la contraseña.'
    isValid = false
  } else if (formData.clave !== formData.confirmClave) {
    errors.confirmClave = 'Las contraseñas no coinciden.'
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

  // Construir el payload según la especificación de la API
  const payload = {
    userNombre: formData.nombre,
    userApellido: formData.apellido,
    userCorreo: formData.correo,
    userClave: formData.clave,
    userCedula: formData.cedula,
  }

  // --- ADDED FOR DEBUGGING ---
  console.log('Payload being sent:', payload);
  // --- END ADDED FOR DEBUGGING ---

  try {
    // Realizar la llamada a la API
    const response = await axios.post(
      `${import.meta.env.VITE_URL_BACKEND}/usuarios/registro`,
      payload
    )
    console.log('Respuesta del servidor:', response.data)
    submitMessage.value = '¡Registro exitoso! Ahora puedes iniciar sesión.'
    submitStatus.value = 'success'

    // Opcional: Limpiar el formulario después de un registro exitoso
    // Object.keys(formData).forEach(key => formData[key] = '');
    // Redirigir al usuario a la página de inicio de sesión después de un breve retraso
    setTimeout(() => {
      router.push('/login')
    }, 1500) // Esperar 1.5 segundos
  } catch (error) {
    console.error('Error al registrar el usuario:', error)
    submitMessage.value = 'Ocurrió un error al registrar el usuario. Por favor, intente de nuevo.'
    submitStatus.value = 'error'
    if (error.response && error.response.data && error.response.data.message) {
      submitMessage.value += ` Detalles: ${error.response.data.message}`
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* IMPORTANTE: Las variables CSS (ej. --color-primary-dark) DEBEN ser definidas globalmente
   en tu main.js o App.vue (sin scoped), como se explicó anteriormente, para que sean accesibles aquí. */

/* Nuevas variables de color para los inputs y el fondo */
:root {
  --color-input-border-default: #d1d8df; /* Gris claro para el borde por defecto */
  --color-input-background-default: #fdfdfd; /* Blanco casi puro para el fondo del input */
  --color-input-placeholder: #a0a8b3; /* Gris suave para el placeholder */
}

.registration-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - var(--navbar-height, 65px) - var(--footer-height, 100px));
  background-color: var(--color-background-light); /* Fondo claro y suave */
  padding: 30px 20px;
}

.registration-card {
  background-color: var(
    --color-card-background,
    #ffffff
  ); /* Blanco o gris muy claro para la tarjeta */
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); /* Sombra más pronunciada para un efecto flotante */
  padding: 40px;
  width: 100%;
  max-width: 500px; /* Ancho máximo para mantener la legibilidad */
  text-align: center;
}

.form-title {
  color: var(--color-primary); /* Azul principal para el título */
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.form-subtitle {
  color: var(--color-text-secondary); /* Gris oscuro para el subtítulo */
  font-size: 1rem;
  margin-bottom: 30px;
  line-height: 1.5;
}

.registration-form {
  display: flex;
  flex-direction: column;
  gap: 22px; /* Ligeramente más espacio entre grupos de formulario para mayor claridad */
}

.form-group {
  text-align: left;
}

.form-group label {
  display: block;
  font-size: 0.9rem; /* Ligeramente más pequeño para la etiqueta, pero más oscuro */
  color: var(--color-text-primary); /* Gris oscuro para las etiquetas */
  margin-bottom: 6px; /* Menos espacio entre label y input */
  font-weight: 600; /* Más peso para la legibilidad */
  letter-spacing: 0.02em; /* Sutil espaciado de letras */
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
  opacity: 1; /* Asegura que el color se aplique en todos los navegadores */
}

.form-group input:focus {
  border-color: var(--color-primary); /* Borde azul al enfocar */
  box-shadow: 0 0 0 4px rgba(var(--color-primary-rgb), 0.25); /* Sombra más pronunciada y clara al enfocar */
  outline: none;
  background-color: #ffffff; /* Asegura un fondo blanco puro al enfocar */
}

.form-group input.input-error {
  border-color: var(--color-error); /* Borde rojo para errores */
  box-shadow: 0 0 0 4px rgba(var(--color-error-rgb), 0.25);
}

.error-message {
  color: var(--color-error); /* Rojo para mensajes de error */
  font-size: 0.85rem;
  margin-top: 8px; /* Más espacio entre input y mensaje de error */
  text-align: left;
  font-weight: 500;
}

.submit-button {
  background-color: var(--color-primary); /* Fondo azul principal */
  color: var(--color-text-light); /* Texto blanco */
  padding: 15px 25px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease,
    box-shadow 0.3s ease; /* Añadimos transición para la sombra */
  margin-top: 10px; /* Espacio antes del botón */
  box-shadow: 0 4px 10px rgba(var(--color-primary-rgb), 0.2); /* Sombra para el botón */
}

.submit-button:hover:not(:disabled) {
  background-color: var(--color-primary-dark); /* Azul más oscuro al pasar el ratón */
  transform: translateY(-2px); /* Efecto sutil al pasar el ratón */
  box-shadow: 0 6px 15px rgba(var(--color-primary-rgb), 0.3); /* Sombra más intensa al hover */
}

.submit-button:disabled {
  background-color: var(--color-disabled); /* Gris claro para el botón deshabilitado */
  cursor: not-allowed;
  opacity: 0.8; /* Ligeramente más opaco para deshabilitado */
  transform: none; /* Eliminar transformación si está deshabilitado */
  box-shadow: none; /* Eliminar sombra si está deshabilitado */
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
  background-color: var(--color-success-light); /* Verde claro para éxito */
  color: var(--color-success); /* Verde oscuro para texto de éxito */
  border: 1px solid var(--color-success);
}

.submit-info.error {
  background-color: var(--color-error-light); /* Rojo claro para error */
  color: var(--color-error); /* Rojo oscuro para texto de error */
  border: 1px solid var(--color-error);
}

.login-redirect {
  margin-top: 25px;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.login-redirect a {
  color: var(--color-accent-green); /* Enlace en color de acento */
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.login-redirect a:hover {
  color: var(--color-primary); /* Cambia a azul principal al pasar el ratón */
  text-decoration: underline;
}

/* Responsividad para pantallas más pequeñas */
@media (max-width: 600px) {
  .registration-card {
    padding: 25px;
    margin: 20px; /* Margen para que no toque los bordes de la pantalla */
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
