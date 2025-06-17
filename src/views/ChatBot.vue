<script setup>
import { ref, nextTick } from 'vue';

const userInput = ref(null);
const chatBox = ref(null);

const respuestas = {
  hola: '¡Hola! Soy el asistente del proyecto. ¿En qué puedo ayudarte hoy?',
  proyecto:
    'El proyecto tiene como propósito mejorar y estructurar el registro de pacientes...',
  nombre:
    'El nombre del proyecto es SIRMA (SISTEMA INTEGRADO DE REGISTROS MÉDICOS AVANZADOS).',
  llama:
    'El nombre del proyecto es SIRMA (SISTEMA INTEGRADO DE REGISTROS MÉDICOS AVANZADOS).',
  integrantes:
    'Los integrantes del proyecto son SEBASTIAN CHICAIZA, DAVID ERAZO, NICOLAS GUEVARA, JHONEL MORENO Y JUAN JOSE NAVARRETE.',
  pene:
    'Verga para luisa',
  default: 'Lo siento, no entendí esa pregunta. ¿Puedes intentar de nuevo?'
};

function enviarMensaje() {
  const input = userInput.value.value.trim().toLowerCase();
  if (!input) return;

  // Mostrar mensaje del usuario
  chatBox.value.innerHTML += `<div><strong>Tú:</strong> ${input}</div>`;

  // Elegir respuesta
  let respuesta = respuestas.default;
  for (const clave in respuestas) {
    if (input.includes(clave) && clave !== 'default') {
      respuesta = respuestas[clave];
      break;
    }
  }

  // Mostrar respuesta del bot
  chatBox.value.innerHTML += `<div><strong>ChugchiBot:</strong> ${respuesta}</div>`;

  // Limpiar input y hacer scroll al final
  userInput.value.value = '';
  nextTick(() => {
    chatBox.value.scrollTop = chatBox.value.scrollHeight;
  });
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="w-full max-w-2xl bg-white rounded-2xl shadow-lg flex flex-col h-[80vh] p-6">
      <h2 class="text-2xl font-bold mb-4 text-blue-600">🤖 ChugchiBot</h2>

      <div
        ref="chatBox"
        class="flex-1 overflow-y-auto border border-gray-300 rounded-xl p-4 space-y-2 bg-gray-50"
      >
        <!-- Mensajes se insertan aquí -->
      </div>

      <div class="flex mt-4 gap-2">
        <input
          ref="userInput"
          type="text"
          placeholder="Escribe tu pregunta..."
          @keyup.enter="enviarMensaje"
          class="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          @click="enviarMensaje"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
        >
          Enviar
        </button>
      </div>
    </div>
  </div>
</template>
