<template>
  <footer class="main-footer">
    <div class="footer-content">
      <div class="footer-section footer-branding">
        <img src="@/assets/puce-logo-white.png" alt="Logo PUCE" class="footer-logo" />
        <p class="footer-app-name">Sistema de Fichas Médicas</p>
        <p class="footer-university-name">Pontificia Universidad Católica del Ecuador</p>
      </div>

      <div class="footer-section footer-links">
        <h3>Navegación</h3>
        <ul>
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/fichas">Fichas</router-link></li>
          <li><router-link to="/usuarios">Usuarios</router-link></li>
          <li><router-link to="/calendario">Calendario</router-link></li>
          <li><router-link to="/reportes">Reportes</router-link></li>
        </ul>
      </div>

      <div class="footer-section footer-contact">
        <h3>Contacto y Soporte</h3>
        <p><i class="icon-map-marker-alt"></i> Av. 12 de Octubre 1076 y Roca, Quito, Ecuador</p>
        <p><i class="icon-phone"></i> +593 2 299 1700</p>
        <p>
          <i class="icon-envelope"></i> <a href="mailto:soporte@puce.edu.ec">soporte@puce.edu.ec</a>
        </p>
        <p class="footer-schedule">Horario de atención: Lunes a Viernes, 8:00 - 17:00</p>
      </div>

      <div class="footer-section footer-legal">
        <h3>Información Legal</h3>
        <ul>
          <li><router-link to="/privacidad">Política de Privacidad</router-link></li>
          <li><router-link to="/terminos">Términos y Condiciones</router-link></li>
          <li><router-link to="/ayuda">Ayuda y Preguntas Frecuentes</router-link></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p>
        &copy; {{ currentYear }} Pontificia Universidad Católica del Ecuador. Todos los derechos
        reservados.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
// Opcional: Si quieres Font Awesome para los iconos de contacto
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faMapMarkerAlt, faPhone, faEnvelope)

const currentYear = ref(new Date().getFullYear())
</script>

<style scoped>
/*
  IMPORTANTE: Las variables CSS (ej. --color-primary-dark) DEBEN ser definidas globalmente
  en tu main.js o App.vue (sin scoped), como se explicó anteriormente, para que sean accesibles aquí.
*/

.main-footer {
  background-color: var(--color-primary-dark); /* Azul oscuro del navbar */
  color: var(--color-text-light); /* Gris claro para el texto */
  padding: 40px 30px 20px;
  font-family: 'Montserrat', sans-serif; /* Coherencia con la tipografía del navbar */
  border-top: 4px solid var(--color-accent-green); /* Línea de acento verde */
}

.footer-content {
  display: flex;
  flex-wrap: wrap; /* Permite que las secciones se envuelvan en pantallas pequeñas */
  justify-content: space-between;
  max-width: 1200px; /* Limita el ancho del contenido del footer */
  margin: 0 auto; /* Centra el contenido */
  gap: 30px; /* Espacio entre las secciones */
}

.footer-section {
  flex: 1; /* Permite que las secciones crezcan y se encojan */
  min-width: 200px; /* Ancho mínimo para cada columna */
  margin-bottom: 20px; /* Espacio inferior para cada sección en móvil */
}

.footer-section h3 {
  font-size: 1.2rem;
  color: var(--color-text-lighter); /* Blanco casi puro para los títulos */
  margin-bottom: 15px;
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* Línea sutil bajo el título */
  padding-bottom: 8px;
}

/* --- Sección de Branding --- */
.footer-branding {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alinea a la izquierda por defecto */
  min-width: 250px; /* Más ancho para el branding */
}

.footer-logo {
  height: 60px; /* Tamaño más grande para el logo en el footer */
  width: auto;
  filter: brightness(0) invert(1); /* Logo blanco sobre fondo oscuro */
  margin-bottom: 10px;
}

.footer-app-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-accent-green); /* Nombre de la app en verde de acento */
  margin-bottom: 5px;
}

.footer-university-name {
  font-size: 0.9rem;
  color: var(--color-text-light);
  line-height: 1.4;
}

/* --- Secciones de Enlaces y Contacto --- */
.footer-links ul,
.footer-contact ul,
.footer-legal ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li,
.footer-legal li {
  margin-bottom: 8px;
}

.footer-contact p {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px; /* Espacio entre icono y texto */
  font-size: 0.95rem;
  line-height: 1.4;
}

.footer-links a,
.footer-contact a,
.footer-legal a {
  color: var(--color-text-light);
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;
}

.footer-links a:hover,
.footer-contact a:hover,
.footer-legal a:hover {
  color: var(--color-accent-green);
  text-decoration: underline;
}

.footer-contact .fa-icon {
  /* Estilo para iconos de Font Awesome en contacto */
  color: var(--color-accent-green); /* Íconos en verde de acento */
  font-size: 1.1rem;
}

.footer-schedule {
  font-style: italic;
  font-size: 0.85rem;
  margin-top: 15px;
  color: rgba(255, 255, 255, 0.7);
}

/* --- Sección Inferior de Copyright --- */
.footer-bottom {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1); /* Separador sutil */
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

/* --- Responsividad --- */
@media (max-width: 768px) {
  .main-footer {
    padding: 30px 20px 15px;
  }

  .footer-content {
    flex-direction: column; /* Apila las secciones en móvil */
    align-items: flex-start; /* Alinea todo a la izquierda */
    gap: 25px;
  }

  .footer-section {
    width: 100%; /* Ocupa todo el ancho disponible */
    min-width: unset;
    margin-bottom: 0;
  }

  .footer-branding {
    align-items: center; /* Centra el branding en móvil */
    text-align: center;
  }

  .footer-logo {
    height: 50px;
  }

  .footer-app-name {
    font-size: 1.2rem;
  }
  .footer-university-name {
    font-size: 0.85rem;
  }

  .footer-section h3 {
    text-align: center; /* Centra los títulos de sección */
    font-size: 1.1rem;
  }

  .footer-links ul,
  .footer-contact p,
  .footer-legal ul {
    text-align: center; /* Centra el texto de enlaces y contacto */
    justify-content: center; /* Centra los items con iconos */
  }
}

@media (max-width: 480px) {
  .footer-branding {
    padding-bottom: 20px; /* Más espacio abajo del branding */
  }
}
</style>
