<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">
          <FontAwesomeIcon :icon="faRobot" class="mr-2" />
          SIRMA IA
        </h1>

      </div>

      <!-- Main Chat Interface -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Chat Messages -->
        <div class="h-96 overflow-y-auto p-6 bg-gray-50" ref="chatContainer">
          <div v-if="messages.length === 0" class="text-center text-gray-500 mt-20">
            <div class="text-6xl mb-4">
              <FontAwesomeIcon :icon="faComments" class="text-gray-400" />
            </div>
            <p>Hola, ¿En qué puedo ayudarte?</p>
          </div>

          <div v-for="(message, index) in messages" :key="index" class="mb-6">
            <!-- User Message -->
            <div v-if="message.role === 'user'" class="flex justify-end">
              <div class="bg-blue-500 text-white rounded-2xl px-4 py-3 max-w-xs lg:max-w-md">
                <p class="text-sm">{{ message.text }}</p>
                <div v-if="message.images && message.images.length > 0" class="mt-2">
                  <div class="grid grid-cols-2 gap-2">
                    <img
                      v-for="(image, imgIndex) in message.images"
                      :key="imgIndex"
                      :src="image.preview"
                      alt="Imagen enviada"
                      class="w-full h-20 object-cover rounded-lg"
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- AI Response -->
            <div v-else class="flex justify-start">
              <div class="bg-white border rounded-2xl px-4 py-3 max-w-xs lg:max-w-md shadow-sm">
                <div class="flex items-center mb-2">
                  <div class="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2"></div>
                  <span class="text-sm font-medium text-gray-700">Gemini</span>
                </div>
                <div class="text-sm text-gray-800 whitespace-pre-wrap">{{ message.text }}</div>
              </div>
            </div>
          </div>

          <!-- Loading indicator -->
          <div v-if="isLoading" class="flex justify-start">
            <div class="bg-white border rounded-2xl px-4 py-3 shadow-sm">
              <div class="flex items-center">
                <div class="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2"></div>
                <span class="text-sm font-medium text-gray-700">Gemini</span>
              </div>
              <div class="flex items-center mt-2">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                <span class="text-sm text-gray-600">{{ loadingMessage }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="border-t p-4 bg-white">
          <!-- Image Preview -->
          <div v-if="selectedImages.length > 0" class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Imágenes seleccionadas:</span>
              <button @click="clearImages" class="text-red-500 hover:text-red-700 text-sm">
                Limpiar todas
              </button>
            </div>
            <div class="grid grid-cols-4 gap-2">
              <div v-for="(image, index) in selectedImages" :key="index" class="relative">
                <img
                  :src="image.preview"
                  alt="Preview"
                  class="w-full h-20 object-cover rounded-lg border-2 border-gray-200"
                >
                <button
                  @click="removeImage(index)"
                  class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  <FontAwesomeIcon :icon="faTimes" />
                </button>
              </div>
            </div>
          </div>

          <!-- Input Form -->
          <div class="flex items-end space-x-2">
            <div class="flex-1">
              <textarea
                v-model="userInput"
                @keypress.enter.prevent="sendMessage"
                placeholder="Escribe tu pregunta aquí..."
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
                rows="1"
                :disabled="isLoading"
              ></textarea>
            </div>

            <!-- Image Upload Button -->
            <button
              @click="$refs.fileInput.click()"
              class="px-4 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors disabled:opacity-50"
              :disabled="isLoading"
              title="Subir imágenes"
            >
              <FontAwesomeIcon :icon="faCamera" />
            </button>

            <!-- Send Button -->
            <button
              @click="sendMessage"
              :disabled="isLoading || (!userInput.trim() && selectedImages.length === 0)"
              class="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FontAwesomeIcon :icon="isLoading ? faClock : faRocket" />
            </button>
          </div>

          <!-- Hidden file input -->
          <input
            ref="fileInput"
            type="file"
            multiple
            accept="image/*"
            @change="handleFileSelect"
            class="hidden"
          >
        </div>
      </div>

      <!-- API Key Configuration -->
      <div v-if="!hasEnvApiKey" class="mt-6 bg-white rounded-xl shadow-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Configuración de API</h3>
            <p class="text-sm text-gray-600">
              {{ apiKeyStatus }}
            </p>
          </div>
          <button
            @click="showApiKeyInput = !showApiKeyInput"
            class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            {{ showApiKeyInput ? 'Ocultar' : 'Configurar' }}
          </button>
        </div>

        <div v-if="showApiKeyInput" class="mt-4">
          <div class="flex space-x-2">
            <input
              v-model="tempApiKey"
              type="password"
              placeholder="Introduce tu API Key de Google Gemini"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
            <button
              @click="saveApiKey"
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Guardar
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-1">
            Obtén tu API Key en:
            <a href="https://ai.google.dev/" target="_blank" class="text-blue-500 hover:underline">
              https://ai.google.dev/
            </a>
          </p>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="text-red-500 mr-2">
              <FontAwesomeIcon :icon="faExclamationTriangle" />
            </div>
            <div>
              <h4 class="text-red-800 font-medium">Error</h4>
              <p class="text-red-700 text-sm">{{ error }}</p>
            </div>
          </div>
          <button
            @click="retryLastMessage"
            class="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
          >
            <FontAwesomeIcon :icon="faRedo" class="mr-1" />
            Reintentar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faRobot,
  faComments,
  faCamera,
  faRocket,
  faClock,
  faLock,
  faExclamationTriangle,
  faRedo,
  faTimes,
  faTrash,
  faCog,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons';

export default {
  name: 'GeminiView',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      userInput: '',
      messages: [],
      isLoading: false,
      loadingMessage: 'Pensando...',
      error: null,
      apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
      tempApiKey: '',
      showApiKeyInput: false,
      selectedImages: [],
      genAI: null,
      model: null,
      // Íconos
      faRobot,
      faComments,
      faCamera,
      faRocket,
      faClock,
      faLock,
      faExclamationTriangle,
      faRedo,
      faTimes,
      faTrash,
      faCog,
      faEye,
      faEyeSlash
    }
  },
  mounted() {
    this.initializeGemini();
  },
  computed: {
    apiKeyStatus() {
      if (!this.apiKey) {
        return 'API Key no configurada ❌';
      }
      return import.meta.env.VITE_GEMINI_API_KEY
        ? 'API Key configurada desde variables de entorno ✅'
        : 'API Key configurada manualmente ✅';
    },
    hasEnvApiKey() {
      return !!import.meta.env.VITE_GEMINI_API_KEY;
    }
  },
  methods: {
    initializeGemini() {
      if (this.apiKey) {
        try {
          this.genAI = new GoogleGenerativeAI(this.apiKey);
          this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
          this.error = null;
        } catch (err) {
          this.error = 'Error al inicializar Gemini: ' + err.message;
        }
      }
    },

    saveApiKey() {
      if (this.tempApiKey.trim()) {
        this.apiKey = this.tempApiKey.trim();
        localStorage.setItem('gemini_api_key', this.apiKey);
        this.tempApiKey = '';
        this.showApiKeyInput = false;
        this.initializeGemini();
      }
    },

    handleFileSelect(event) {
      const files = Array.from(event.target.files);
      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.selectedImages.push({
              file: file,
              preview: e.target.result,
              mimeType: file.type
            });
          };
          reader.readAsDataURL(file);
        }
      });
      event.target.value = '';
    },

    removeImage(index) {
      this.selectedImages.splice(index, 1);
    },

    clearImages() {
      this.selectedImages = [];
    },

    fileToGenerativePart(file, mimeType) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Data = e.target.result.split(',')[1];
          resolve({
            inlineData: {
              data: base64Data,
              mimeType: mimeType
            }
          });
        };
        reader.readAsDataURL(file);
      });
    },

    async sendMessage() {
      if (!this.apiKey) {
        this.error = 'Por favor, configura tu API Key de Gemini primero';
        return;
      }

      if (!this.userInput.trim() && this.selectedImages.length === 0) {
        return;
      }

      this.isLoading = true;
      this.error = null;
      this.loadingMessage = 'Pensando...';

      // Add user message
      const userMessage = {
        role: 'user',
        text: this.userInput || 'Analiza estas imágenes',
        images: this.selectedImages.map(img => ({ preview: img.preview }))
      };
      this.messages.push(userMessage);

      try {
        const prompt = this.userInput || 'Describe qué ves en estas imágenes';

        // Crear contexto en español para mejores respuestas
        const spanishContext = `Eres un asistente de IA que trabaja en español. Tu función es ayudar a los usuarios de manera clara, detallada y profesional. Siempre responde en español.

Pregunta del usuario: ${prompt}

Responde de manera natural y útil:`;

        let parts = [spanishContext];

        // Process images if any
        if (this.selectedImages.length > 0) {
          const imageParts = await Promise.all(
            this.selectedImages.map(img =>
              this.fileToGenerativePart(img.file, img.mimeType)
            )
          );
          parts = [spanishContext, ...imageParts];
        }

        // Intentar generar contenido con reintentos
        const text = await this.generateContentWithRetry(parts);

        // Add AI response
        this.messages.push({
          role: 'assistant',
          text: text
        });

        // Clear input and images
        this.userInput = '';
        this.selectedImages = [];

      } catch (err) {
        this.handleError(err);
      } finally {
        this.isLoading = false;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },

    async generateContentWithRetry(parts, maxRetries = 3) {
      let lastError;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const result = await this.model.generateContent(parts);
          const response = await result.response;
          return response.text();
        } catch (err) {
          lastError = err;

          // Si es error 503 (modelo sobrecargado), esperar y reintentar
          if (err.message.includes('503') || err.message.includes('overloaded')) {
            if (attempt < maxRetries) {
              const waitTime = Math.pow(2, attempt) * 1000; // Espera exponencial: 2s, 4s, 8s
              this.updateLoadingMessage(`Modelo sobrecargado. Reintentando en ${waitTime/1000}s... (${attempt}/${maxRetries})`);
              await this.sleep(waitTime);
              continue;
            }
          }

          // Si es error 429 (rate limit), esperar más tiempo
          if (err.message.includes('429') || err.message.includes('rate limit')) {
            if (attempt < maxRetries) {
              const waitTime = 10000; // 10 segundos para rate limit
              this.updateLoadingMessage(`Límite de velocidad alcanzado. Esperando ${waitTime/1000}s... (${attempt}/${maxRetries})`);
              await this.sleep(waitTime);
              continue;
            }
          }

          // Para otros errores, no reintentar
          throw err;
        }
      }

      throw lastError;
    },

    updateLoadingMessage(message) {
      // Actualizar el mensaje de carga sin agregar un nuevo mensaje
      this.loadingMessage = message;
    },

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    handleError(err) {
      console.error('Error:', err);

      if (err.message.includes('503') || err.message.includes('overloaded')) {
        this.error = 'El modelo Gemini está sobrecargado. Inténtalo de nuevo en unos minutos.';
      } else if (err.message.includes('429') || err.message.includes('rate limit')) {
        this.error = 'Has alcanzado el límite de solicitudes. Espera un momento antes de intentar nuevamente.';
      } else if (err.message.includes('400')) {
        this.error = 'Solicitud inválida. Verifica tu mensaje o las imágenes enviadas.';
      } else if (err.message.includes('401') || err.message.includes('403')) {
        this.error = 'Error de autenticación. Verifica tu API Key.';
      } else if (err.message.includes('404')) {
        this.error = 'Modelo no encontrado. Verifica la configuración.';
      } else {
        this.error = `Error al comunicarse con Gemini: ${err.message}`;
      }
    },

    retryLastMessage() {
      if (this.messages.length > 0) {
        const lastMessage = this.messages[this.messages.length - 1];
        if (lastMessage.role === 'user') {
          // Restaurar el contenido del último mensaje del usuario
          this.userInput = lastMessage.text;
          this.selectedImages = lastMessage.images ? lastMessage.images.map(img => ({
            preview: img.preview,
            file: null, // No podemos recuperar el archivo original
            mimeType: 'image/jpeg' // Tipo por defecto
          })) : [];

          // Eliminar el último mensaje para evitar duplicados
          this.messages.pop();

          // Reintentar el envío
          this.sendMessage();
        }
      }
    },

    scrollToBottom() {
      if (this.$refs.chatContainer) {
        this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;
      }
    }
  }
}
</script>

<style scoped>
/* Estilos adicionales si es necesario */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
