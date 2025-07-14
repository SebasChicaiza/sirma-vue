<template>
  <div class="acerca-container">
    <section class="hero-banner">
      <div class="hero-content">
        <p class="hero-subtitle">ASOCIACIONES PARA LA SALUD</p>
        <h1 class="hero-title">Acerca del Sistema</h1>
        <p class="hero-description">
          Sirma es un sistema integrado para el registro médico avanzado, diseñado para facilitar la
          gestión de pacientes y mejorar la atención en centros de salud.
        </p>
        <router-link to="/login">
          <button class="read-more-button">PRUEBALO <span class="plus-icon">+</span></button>
        </router-link>
      </div>
      <div class="hero-image">
        <img src="../assets/images/landing-page-inicio.jpg" alt="Doctor smiling" />
      </div>
    </section>

    <section class="como-funciona-section">
      <h2 class="section-title">¿Cómo funciona?</h2>
      <div class="cards-container">
        <div class="card">
          <div class="card-image-wrapper">
            <img
              src="../assets/images/registro pacientes.jpg"
              alt="Registra pacientes"
              class="card-top-image"
            />
            <div class="card-icon-square">
              <font-awesome-icon :icon="['fas', 'user-plus']" class="fa-icon" />
            </div>
          </div>
          <div class="card-body">
            <h3 class="card-title">Registra pacientes</h3>
            <p class="card-description">
              Crea y gestiona perfiles de pacientes de forma rápida y segura.
            </p>
          </div>
        </div>
        <div class="card">
          <div class="card-image-wrapper">
            <img
              src="../assets/images/historial.jpg"
              alt="Accede al historial"
              class="card-top-image"
            />
            <div class="card-icon-square">
              <font-awesome-icon :icon="['fas', 'history']" class="fa-icon" />
            </div>
          </div>
          <div class="card-body">
            <h3 class="card-title">Accede al historial</h3>
            <p class="card-description">
              Consulta el historial médico completo y actualizado en todo momento.
            </p>
          </div>
        </div>
        <div class="card">
          <div class="card-image-wrapper">
            <img
              src="../assets/images/optimizacion medica.jpg"
              alt="Optimiza la atención"
              class="card-top-image"
            />
            <div class="card-icon-square">
              <font-awesome-icon :icon="['fas', 'chart-line']" class="fa-icon" />
            </div>
          </div>
          <div class="card-body">
            <h3 class="card-title">Optimiza la atención</h3>
            <p class="card-description">
              Mejora la toma de decisiones con información centralizada y reportes visuales.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="caracteristicas-section">
      <h2 class="section-title">Características Principales</h2>
      <ul class="features-list">
        <li><span class="feature-icon">✔️</span> Registro y búsqueda avanzada de pacientes</li>
        <li><span class="feature-icon">✔️</span> Historial médico digitalizado</li>
        <li><span class="feature-icon">✔️</span> Reportes y estadísticas en tiempo real</li>
        <li><span class="feature-icon">✔️</span> Interfaz intuitiva y adaptable</li>
        <li><span class="feature-icon">✔️</span> Seguridad y privacidad de los datos</li>
      </ul>
    </section>

    <section class="tecnologias-section">
      <h2 class="section-title">Tecnologías Utilizadas</h2>
      <div class="tecnologias-lista">
        <div class="tecnologia-item">
          <img src="https://vuejs.org/images/logo.png" alt="Vue.js" class="tech-icon" />
          <span>Vue.js</span>
        </div>
        <div class="tecnologia-item">
          <img src="https://nodejs.org/static/images/logo.svg" alt="Node.js" class="tech-icon" />
          <span>Node.js</span>
        </div>
        <div class="tecnologia-item">
          <img src="/src/assets/images/mysql-ar21.svg" alt="MySQL" class="tech-icon" />
          <span>MySQL</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AcercaView',
}
</script>

<style scoped>
/* General Styles */
.acerca-container {
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #f8f9fa;
  overflow-x: hidden; /* Previene scroll horizontal */
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #2c3e50;
  position: relative;
  padding-bottom: 10px;
}

.section-title::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background-color: #2c3e50;
  border-radius: 2px;
}

/* Hero Banner Styles (UPDATED) */
.hero-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50; /* Dark blue background */
  color: #fff;
  padding: 80px 5%;
  position: relative;
  overflow: hidden; /* Important for clip-path */
  min-height: 400px;

  /* Angled cut using clip-path */
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 70px),
    0 100%
  ); /* Adjust 70px for the angle depth */
}

/* Adjust hero-banner::before if it interferes with clip-path, though it's typically fine */
.hero-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(44, 62, 80, 0.95),
    rgba(44, 62, 80, 0.6) 70%,
    transparent
  );
  z-index: 1;
  /* Apply clip-path to pseudo-element as well for consistency */
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 70px), 0 100%);
}

.hero-content {
  flex: 1;
  max-width: 600px;
  z-index: 2;
  padding-right: 30px;
}

.hero-subtitle {
  font-size: 0.9rem;
  text-transform: uppercase;
  margin-bottom: 10px;
  color: #a9d9ff; /* Lighter blue for subtitle */
  letter-spacing: 1px;
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 20px;
  line-height: 1.2;
  font-weight: bold;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
  color: #f0f0f0;
}

.read-more-button {
  background-color: #1fd1d1;
  color: #fff;
  border: none;
  padding: 12px 25px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  display: flex;
  align-items: center;
}

.read-more-button:hover {
  background-color: #137b7b;
  transform: translateY(-2px);
}

.read-more-button .plus-icon {
  margin-left: 8px;
  font-size: 1.2rem;
  font-weight: bold;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 0; /* Behind the content */
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 50%; /* Adjust based on desired visibility */
  overflow: hidden;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
  transition: transform 0.3s ease;
}

/* ¿Cómo funciona? Section - Card Layout (UPDATED) */
.como-funciona-section {
  padding: 80px 5%;
  background-color: #f8f9fa;
  text-align: center;
}

.cards-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 50px;
}

.card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  width: 300px; /* Fixed width for consistency */
  overflow: hidden; /* Ensures image and icon are contained */
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  display: flex; /* Flexbox for internal layout (image + body) */
  flex-direction: column;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  height: 180px; /* Fixed height for the image area */
  overflow: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.card-top-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Covers the area, crops if necessary */
  display: block;
}

.card-icon-square {
  position: absolute;
  top: 15px; /* Adjust as needed for padding from top */
  left: 15px; /* Adjust as needed for padding from left */
  width: 60px; /* Size of the square icon background */
  height: 60px; /* Size of the square icon background */
  background-color: #174e6f; /* Blue background for the icon square */
  border-radius: 8px; /* Slightly rounded corners for the square */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10; /* Ensures it's on top of the image */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.card-icon-square .fa-icon {
  color: #fff; /* White color for the Font Awesome icon */
  font-size: 28px; /* Size of the Font Awesome icon */
}

.card-body {
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Allows body to take up remaining space */
}

.card-title {
  font-size: 1.7rem;
  font-weight: 500;
  margin-bottom: 15px;
  color: #174e6f;
}

.card-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  flex-grow: 1; /* Allows description to take up available space */
  /* margin-bottom is removed as there's no button below it */
}

/* REMOVED .read-more-card-button STYLES ENTIRELY */

/* Características Principales Section */
.caracteristicas-section {
  padding: 80px 5%;
  background-color: #fff;
}

.features-list {
  list-style: none;
  padding: 0;
  max-width: 800px;
  margin: 50px auto 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.features-list li {
  font-size: 1.15rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  background-color: #f0f8ff;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.features-list li:hover {
  transform: translateX(5px);
}

.feature-icon {
  margin-right: 15px;
  font-size: 1.5rem;
  color: #28a745; /* Green checkmark */
}

/* Tecnologías Utilizadas Section */
.tecnologias-section {
  padding: 80px 5%;
  background-color: #f8f9fa;
  text-align: center;
}

.tecnologias-lista {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 50px;
  margin-top: 50px;
}

.tecnologia-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.tecnologia-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.tech-icon {
  width: 70px;
  height: 70px;
  object-fit: contain;
  animation: rotate360 2s linear infinite; /* 2s duration, linear speed, infinite loop */
}

@keyframes rotate360 {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}

.tecnologia-item span {
  font-size: 1.2rem;
  font-weight: bold;
  color: #34495e;
}

/* Tablets (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .hero-banner {
    padding: 60px 4%;
    min-height: 450px;
  }

  .hero-content {
    max-width: 60%;
    padding-right: 20px;
  }

  .hero-image {
    width: 40%;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.05rem;
  }

  .cards-container {
    gap: 25px;
  }

  .card {
    width: 280px;
  }

  .tecnologias-lista {
    gap: 40px;
  }
}

/* Large phones in landscape (480px - 767px) */
@media (min-width: 480px) and (max-width: 767px) {
  .hero-banner {
    min-height: 380px;
    padding: 35px 4%;
  }

  .hero-content {
    padding: 1.3rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 0.95rem;
  }

  .card {
    width: 85%;
    max-width: 350px;
  }

  .card-image-wrapper {
    height: 150px;
  }
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .hero-image {
    width: 45%;
    opacity: 0.8;
  }

  .hero-content {
    max-width: 55%;
  }
}

@media (max-width: 992px) {
  .hero-banner {
    flex-direction: column;
    text-align: center;
    padding: 60px 5%;
    /* Adjust clip-path for smaller screens */
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), 0 100%); /* Less pronounced angle */
    min-height: 500px;
  }

  .hero-banner::before {
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), 0 100%);
  }

  .hero-content {
    padding-right: 0;
    margin-bottom: 40px;
    max-width: 100%;
    z-index: 3;
    position: relative;
    background: rgba(44, 62, 80, 0.9);
    padding: 2rem;
    border-radius: 10px;
  }

  .hero-image {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 0.3;
  }

  .hero-image img {
    object-position: center top;
  }

  .hero-title {
    font-size: 2.8rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .cards-container {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 90%;
    max-width: 400px;
  }
}

@media (max-width: 768px) {
  .hero-banner {
    min-height: 400px;
    padding: 40px 5%;
  }

  .hero-content {
    padding: 1.5rem;
  }

  .hero-title {
    font-size: 2.2rem;
    margin-bottom: 15px;
  }

  .hero-description {
    font-size: 1rem;
    margin-bottom: 25px;
  }

  .read-more-button {
    padding: 10px 20px;
    font-size: 0.9rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .features-list {
    grid-template-columns: 1fr;
  }

  .tecnologias-lista {
    gap: 30px;
  }

  .card-image-wrapper {
    height: 160px;
  }

  .card-icon-square {
    width: 50px;
    height: 50px;
    top: 10px;
    left: 10px;
  }

  .card-icon-square .fa-icon {
    font-size: 22px;
  }
}

@media (max-width: 480px) {
  .hero-banner {
    padding: 30px 3%;
    min-height: 350px;
    /* Even less pronounced angle for very small screens */
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), 0 100%);
  }

  .hero-banner::before {
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), 0 100%);
  }

  .hero-content {
    padding: 1rem;
  }

  .hero-title {
    font-size: 1.8rem;
    margin-bottom: 12px;
  }

  .hero-description {
    font-size: 0.9rem;
    margin-bottom: 20px;
    line-height: 1.5;
  }

  .hero-subtitle {
    font-size: 0.8rem;
    margin-bottom: 8px;
  }

  .read-more-button {
    width: 100%;
    padding: 12px 20px;
    font-size: 1rem;
    justify-content: center;
  }

  .section-title {
    font-size: 1.5rem;
    margin-bottom: 30px;
  }

  .card-title {
    font-size: 1.4rem;
  }

  .card-description {
    font-size: 0.9rem;
  }

  .card-body {
    padding: 15px;
  }

  .card-image-wrapper {
    height: 140px;
  }

  .card-icon-square {
    width: 45px;
    height: 45px;
    top: 8px;
    left: 8px;
  }

  .card-icon-square .fa-icon {
    font-size: 18px;
  }

  .features-list li {
    font-size: 1rem;
    padding: 12px 15px;
    margin-bottom: 10px;
  }

  .feature-icon {
    font-size: 1.3rem;
    margin-right: 12px;
  }

  .tech-icon {
    width: 50px;
    height: 50px;
  }

  .tecnologia-item {
    padding: 15px;
  }

  .tecnologia-item span {
    font-size: 1rem;
  }

  .como-funciona-section,
  .caracteristicas-section,
  .tecnologias-section {
    padding: 50px 3%;
  }
}
</style>
