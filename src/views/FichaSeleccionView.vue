<template>
  <div class="ficha-seleccion-container">
    <h1 class="page-title">Seleccionar Tipo de Ficha</h1>
    <p class="page-description">Por favor, elige el tipo de ficha con el que deseas trabajar.</p>

    <div class="button-grid">
      <router-link to="/ficha/general" class="selection-button">
        <div class="button-icon-wrapper general">
          <i class="icon-file-alt"></i>
        </div>
        <span class="button-text">Ficha General</span>
        <p class="button-description">
          Información básica del paciente: datos personales, contacto, etc.
        </p>
      </router-link>

      <router-link to="/ficha/medica" class="selection-button">
        <div class="button-icon-wrapper medical">
          <i class="icon-stethoscope"></i>
        </div>
        <span class="button-text">Ficha Médica</span>
        <p class="button-description">
          Historial clínico, diagnósticos, tratamientos, alergias, etc.
        </p>
      </router-link>
      <router-link to="/ficha/enfermeria" class="selection-button">
        <div class="button-icon-wrapper enfermeria"><i class="icon-nurse-cap"></i></div>
        <span class="button-text">Ficha de Enfermería</span>
        <p class="button-description">
          Evaluación de enfermería, planes de cuidado, intervenciones y seguimiento.
        </p>
      </router-link>
      <router-link to="/ficha/enfermeria" class="selection-button">
        <div class="button-icon-wrapper nutricion"><i class="icon-nurse-cap"></i></div>
        <span class="button-text">Ficha de Nutricion</span>
        <p class="button-description">
          Evaluación de nutrición, planes de alimentación, seguimiento de peso y salud.
        </p>
      </router-link>
      <router-link to="/ficha/fisioterapia" class="selection-button">
        <div class="button-icon-wrapper fisioterapia"><i class="icon-nurse-cap"></i></div>
        <span class="button-text">Ficha de Fisioterapia</span>
        <p class="button-description">
          Evaluación de fisioterapia, planes de tratamiento, ejercicios y seguimiento.
        </p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
// No se necesita lógica de script compleja para esta vista simple de selección
</script>

<style scoped>
/*
  Las variables CSS (ej. --color-primary-dark) se asume que están definidas globalmente,
  como discutimos anteriormente (en main.js o App.vue sin scoped).
*/

.ficha-seleccion-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px); /* Ajusta la altura para que no se pegue al navbar */
  padding: 40px 20px;
  background-color: var(--color-background-body); /* Fondo gris claro */
  color: #333;
  text-align: center;
}

.page-title {
  font-size: 2.5rem;
  color: var(--color-primary-dark);
  margin-bottom: 15px;
  font-weight: 700;
}

.page-description {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 40px;
  max-width: 600px;
  line-height: 1.6;
}

.button-grid {
  display: flex;
  flex-wrap: wrap; /* Permite que los botones se envuelvan en pantallas pequeñas */
  gap: 30px; /* Espacio entre los botones */
  justify-content: center;
  width: 100%;
  max-width: 900px; /* Limita el ancho del contenedor de los botones */
}

.selection-button {
  flex: 1; /* Permite que los botones crezcan y se encojan */
  min-width: 280px; /* Ancho mínimo para cada botón */
  max-width: 400px; /* Ancho máximo para cada botón */
  background-color: var(--color-text-lighter); /* Blanco puro para el fondo del botón */
  border-radius: 12px; /* Bordes redondeados suaves */
  padding: 30px 25px;
  text-decoration: none;
  color: #333;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); /* Sombra más pronunciada para pop */
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.selection-button:hover {
  transform: translateY(-8px); /* Efecto "levantar" al pasar el ratón */
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15); /* Sombra más grande al pasar el ratón */
}

.button-icon-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 3.5rem; /* Tamaño grande para los íconos */
  color: var(--color-text-lighter); /* Color del ícono */
}

/* Colores específicos para los íconos */
.button-icon-wrapper.general {
  background-color: var(--color-primary-medium); /* Azul intermedio para Ficha General */
}
.button-icon-wrapper.medical {
  background-color: var(--color-accent-green); /* Verde menta para Ficha Médica */
}
.button-icon-wrapper.enfermeria {
  background-color: var(--color-primary-dark); /* Verde menta para Ficha Médica */
}
.button-icon-wrapper.nutricion {
  background-color: coral; /* Verde menta para Ficha Médica */
}
.button-icon-wrapper.fisioterapia {
  background-color: darkviolet; /* Verde menta para Ficha Médica */
}

.selection-button i {
  /* Asegúrate de que Font Awesome esté configurado para estos íconos */
  /* Si no, usa placeholders como un SVG o un emoji temporalmente */
  /* Los nombres de clase "icon-file-alt" y "icon-stethoscope" son placeholders */
}

.button-text {
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-primary-dark); /* Texto principal en azul oscuro */
  margin-bottom: 10px;
}

.button-description {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.4;
}

/* --- Responsividad --- */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .page-description {
    font-size: 1rem;
    margin-bottom: 30px;
  }

  .button-grid {
    flex-direction: column; /* Apila los botones en pantallas pequeñas */
    gap: 20px;
    padding: 0 15px;
  }

  .selection-button {
    min-width: unset; /* Elimina el min-width en móvil */
    width: 100%; /* Ocupa todo el ancho disponible */
    padding: 25px 20px;
  }

  .button-icon-wrapper {
    width: 70px;
    height: 70px;
    font-size: 3rem;
    margin-bottom: 15px;
  }

  .button-text {
    font-size: 1.4rem;
  }

  .button-description {
    font-size: 0.9rem;
  }
}
</style>
