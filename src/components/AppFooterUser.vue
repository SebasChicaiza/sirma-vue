<template>
  <footer class="main-footer">
    <div class="footer-content">
      <div class="footer-section footer-branding">
        <img src="@/assets/images/puce-logo.png" alt="Logo PUCE" class="footer-logo" />
        <p class="footer-app-name">Sistema de Fichas Médicas</p>
        <p class="footer-university-name">Pontificia Universidad Católica del Ecuador</p>
      </div>

      <div class="footer-section footer-contact">
        <h3>Contacto y Soporte</h3>
        <p><font-awesome-icon icon="map-marker-alt" /> Av. 12 de Octubre 1076 y Roca, Quito, Ecuador</p>
        <p><font-awesome-icon icon="phone" /> +593 2 299 1700</p>
        <p>
          <font-awesome-icon icon="envelope" />
          <a href="mailto:soporte@puce.edu.ec">soporte@puce.edu.ec</a>
        </p>
        <p class="footer-schedule">Lunes a Viernes, 8:00 - 17:00</p>
      </div>

      <div class="footer-section footer-legal">
        <h3>Información Legal</h3>
        <ul>
          <li><router-link to="/privacidad">Política de Privacidad</router-link></li>
          <li><router-link to="/terminos">Términos y Condiciones</router-link></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} PUCE. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'

library.add(faMapMarkerAlt, faPhone, faEnvelope)

const currentYear = ref(new Date().getFullYear())
</script>

<style scoped>
/* Copia exacta de tu diseño actual adaptado */
.main-footer {
  background-color: var(--color-primary-dark);
  color: var(--color-text-light);
  padding: 40px 30px 20px;
  font-family: 'Montserrat', sans-serif;
  border-top: 4px solid var(--color-accent-green);
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  gap: 30px;
}

.footer-section {
  flex: 1;
  min-width: 200px;
  margin-bottom: 20px;
}

.footer-section h3 {
  font-size: 1.2rem;
  color: var(--color-text-lighter);
  margin-bottom: 15px;
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 8px;
}

.footer-branding {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 250px;
}

.footer-logo {
  height: 60px;
  width: auto;
  filter: brightness(0) invert(1);
  margin-bottom: 10px;
}

.footer-app-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-accent-green);
  margin-bottom: 5px;
}

.footer-university-name {
  font-size: 0.9rem;
  color: var(--color-text-light);
  line-height: 1.4;
}

.footer-contact p {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  line-height: 1.4;
}

.footer-contact a,
.footer-legal a {
  color: var(--color-text-light);
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;
}

.footer-contact a:hover,
.footer-legal a:hover {
  color: var(--color-accent-green);
  text-decoration: underline;
}

.footer-schedule {
  font-style: italic;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 10px;
}

.footer-bottom {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 25px;
  }

  .footer-branding {
    align-items: center;
    text-align: center;
  }

  .footer-logo {
    height: 50px;
  }

  .footer-section h3 {
    text-align: center;
  }

  .footer-contact p {
    justify-content: center;
    text-align: center;
  }
}
</style>
