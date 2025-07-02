<template>
  <div class="landing-page animate-fade-in">
    <!-- Hero Section -->
    <section class="hero-section animate-slide-up">
      <div class="overlay"></div>
      <div class="hero-content">
        <h1>
            <span class="highlight">SIRMA</span> <span >PUCE</span>
        </h1>
        <p>
          Este sistema busca optimizar la gestión de fichas médicas, permitiendo un seguimiento efectivo del estado de salud de los pacientes en zonas rurales, incluso sin conexión a internet.
        </p>
        <div class="hero-buttons">
          <button class="btn-primary" @click="goToReportes">
            <i class="fas fa-th-list"></i> ESTADÍSTICAS
          </button>
          <button class="btn-secondary" @click="scrollToDepartments">
            <i class="fas fa-user-md" style="color: var(--color-primary-dark);"></i> NUESTRAS ÁREAS
          </button>
        </div>
      </div>
      <img class="doctor-img doctor-animate" src="@/assets/images/doctor.png" alt="Doctor" />
    </section>

    <!-- Emergency, Schedule, Call Center Section -->
    <section class="info-section animate-slide-up" style="animation-delay: 0.2s;">
      <button class="info-card info-btn" @click="goToAcerca">
        <div class="info-icon">
          <i class="fas fa-info-circle"></i>
        </div>
        <h3>Acerca del Proyecto</h3>
        <p>Entérate más sobre SIRMA</p>
      </button>
      <button class="info-card info-btn" @click="goToMiembros">
        <div class="info-icon">
          <i class="fas fa-users"></i>
        </div>
        <h3>Miembros del equipo</h3>
        <p>Conoce más sobre los desarrolladores del sistema SIRMA</p>
      </button>
      <button class="info-card info-btn" @click="goToReportes">
        <div class="info-icon">
          <i class="fas fa-chart-bar"></i>
        </div>
        <h3>Reportes</h3>
        <p>Infórmate de los datos médicos de Chugchilán</p>
      </button>
    </section>

    <!-- Hospital Info Carousel Section -->
    <section class="hospital-info animate-slide-up" style="animation-delay: 0.4s;">
      <div class="carousel-container">
        <div class="carousel-slider" :style="{ transform: `translateX(-${currentImage * 100}%)` }">
          <img
            v-for="(img, idx) in carouselImages"
            :key="idx"
            :src="img"
            alt="Hospital Carousel"
            class="carousel-image"
          />
        </div>
        <button class="carousel-btn prev" @click="prevImage">&#10094;</button>
        <button class="carousel-btn next" @click="nextImage">&#10095;</button>
      </div>
    </section>

    <!-- Departments Section -->
    <section ref="departmentsSection" class="departments animate-slide-up" style="animation-delay: 0.6s;">
      <h2 class="departments-title">Nuestras Áreas</h2>
      <div class="departments-grid grid-2x2">
        <div class="department-card animate-fade-in" v-for="(dep, i) in departments" :key="i" :style="{animationDelay: (0.7 + i*0.1) + 's'}">
          <Icon :icon="dep.icon" class="department-icon"/>
          <h3>{{ dep.title }}</h3>
          <p>{{ dep.desc }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const carouselImages = [
  new URL('@/assets/images/landing1.jpg', import.meta.url).href,
  new URL('@/assets/images/landing2.jpg', import.meta.url).href,
  new URL('@/assets/images/landing3.jpg', import.meta.url).href
]
const currentImage = ref(0)
let intervalId = null

const prevImage = () => {
  currentImage.value = (currentImage.value - 1 + carouselImages.length) % carouselImages.length
}

const nextImage = () => {
  currentImage.value = (currentImage.value + 1) % carouselImages.length
}

const startAutoSlide = () => {
  intervalId = setInterval(() => {
    nextImage()
  }, 3500)
}

const stopAutoSlide = () => {
  if (intervalId) clearInterval(intervalId)
}

onMounted(() => {
  startAutoSlide()
})

onBeforeUnmount(() => {
  stopAutoSlide()
})

const navigateToDepartments = () => {
  // Puedes dejarlo vacío o eliminarlo si no lo usas
}

// Scroll to departments section
const departmentsSection = ref(null)

const scrollToDepartments = () => {
  departmentsSection.value?.scrollIntoView({ behavior: 'smooth' })
}

// Navegar a la vista de reportes
const goToReportes = () => {
  router.push('/reportes-view')
}
const goToAcerca = () => {
  router.push('/acerca-del-sistema')
}
const goToMiembros = () => {
  router.push('/miembros-del-equipo')
}

const departments = [
  {
    icon: 'mdi:stethoscope',
    title: 'Medicina',
    desc: 'Atención médica integral para todas las edades, diagnóstico y tratamiento de enfermedades comunes y crónicas.'
  },
  {
    icon: 'mdi:face-woman',
    title: 'Enfermería',
    desc: 'Cuidado profesional y humano, administración de medicamentos, curaciones y apoyo en la recuperación del paciente.'
  },
  {
    icon: 'mdi:food-apple-outline',
    title: 'Nutrición',
    desc: 'Asesoría nutricional personalizada, planes de alimentación y promoción de hábitos saludables para todas las edades.'
  },
  {
    icon: 'mdi:arm-flex',
    title: 'Fisioterapia',
    desc: 'Rehabilitación física, ejercicios terapéuticos y técnicas para mejorar la movilidad y calidad de vida de los pacientes.'
  }
]
</script>

<style scoped>
.landing-page {
  font-family: 'Segoe UI', sans-serif;
  background-color: #f9fafb;
  color: #333;
}

.hero-section {
  position: relative;
  width: 100%;
  height: 90vh;
  background: url('@/assets/images/fondo.jpg') center center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(30, 60, 90, 0.4);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  margin-left: 5vw;
  max-width: 600px;
  color: #fff;
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.highlight {
  color: ffff;
  letter-spacing: 2px;
  font-size: 8rem;
}

.hero-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.btn-primary {
  background: #1fd1d1;
  color: #fff;
  border: none;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.doctor-img {
  position: absolute;
  right: 5vw;
  bottom: 0;
  height: 80vh;
  z-index: 2;
  object-fit: contain;
}

/* Animación personalizada para la imagen del doctor */
@keyframes doctorIn {
  from {
    opacity: 0;
    transform: translateY(60px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.doctor-animate {
  animation: doctorIn 1.2s cubic-bezier(.77,0,.18,1) both;
}

@media (max-width: 900px) {
  .doctor-img {
    display: none;
  }
  .hero-content {
    margin-left: 2vw;
  }
}

/* Info Section */
.info-section {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background: #fff;
  padding: 3rem 2rem;
  gap: 2rem;
}

.info-card {
  background:var(--color-primary-dark);
  color: #fff;
  flex: 1;
  margin: 0 1rem;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 2.5rem 1.5rem 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.info-card h3 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.info-card p {
  font-size: 1.1rem;
  margin: 0.2rem 0;
  color: #e0f7fa;
}

.info-section-floating {
  position: relative;
  width: 90%;
  max-width: 1200px;
  margin: -100px auto 3rem auto; /* El valor negativo sube la sección sobre el hero */
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  z-index: 10;
}

.info-btn {
  background: var(--color-primary-dark);
  color: #fff;
  border: none;
  cursor: pointer;
  width: 100%;
  min-height: 180px;
  text-align: left;
  transition: box-shadow 0.2s, transform 0.2s, background 0.2s;
  outline: none;
  padding: 2.5rem 1.5rem 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.25rem;
}

.info-btn h3 {
  font-size: 1.5rem;
}

.info-btn:hover, .info-btn:focus {
  background: #174e6f;
  box-shadow: 0 8px 32px rgba(31,209,209,0.12);
  transform: translateY(-4px) scale(1.02);
}

@media (max-width: 900px) {
  .info-section {
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem 1rem;
  }
  .info-card {
    margin: 0;
    width: 100%;
  }
}

/* Hospital Info Section */
.hospital-info {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  min-height: 60vh;
}

.hospital-description {
  width: 50%;
}

.hospital-description h2 {
  font-size: 2.5rem;
  font-weight: 700;
}

.hospital-description p {
  font-size: 1.2rem;
  margin-top: 1rem;
}

.hospital-description button {
  margin-top: 1rem;
  padding: 12px 25px;
}

/* Departments Section */
.departments {
  padding: 4rem 0;
  background: #fff;
}

.departments-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
  color: #222;
}

.departments-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.department-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  padding: 2.5rem 2rem 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 350px;
  border-left: 4px solid var(--color-primary-dark);
  transition: box-shadow 0.2s, transform 0.2s;
}

.department-card:hover {
  box-shadow: 0 8px 32px rgba(31,209,209,0.12);
  transform: translateY(-6px) scale(1.03);
}

.department-icon {
  width: 70px;
  height: 70px;
  color: var(--color-primary-dark);
  margin-bottom: 1.5rem;
}

.department-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: #222;
  text-align: center;
}

.department-card p {
  color: #222;
  font-size: 1.08rem;
  text-align: center;
  margin: 0;
  line-height: 1.7;
}

.departments-grid.grid-2x2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 3rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

@media (max-width: 1100px) {
  .departments-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 900px) {
  .departments-grid.grid-2x2 {
    grid-template-columns: 1fr;
    grid-template-rows: none;
    gap: 2rem;
  }
}
@media (max-width: 700px) {
  .departments-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .department-card {
    min-height: 0;
    padding: 2rem 1rem;
  }
}

/* Carousel Styles */
.carousel-container {
  position: relative;
  width: 90vw;
  max-width: 1600px;
  height: 60vh;
  min-height: 350px;
  max-height: 700px;
  overflow: hidden;
  border-radius: 32px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  transition: width 0.3s, height 0.3s;
}

.carousel-slider {
  display: flex;
  transition: transform 0.6s cubic-bezier(.77,0,.18,1);
  height: 100%;
  width: 100%;
}

.carousel-image {
  width: 90vw;
  max-width: 1600px;
  height: 60vh;
  min-height: 350px;
  max-height: 700px;
  object-fit: cover;
  border-radius: 32px;
  flex-shrink: 0;
  transition: width 0.3s, height 0.3s;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(30, 30, 30, 0.35);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 2rem;
  cursor: pointer;
  z-index: 2;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-btn.prev {
  left: 18px;
}

.carousel-btn.next {
  right: 18px;
}

.carousel-btn:hover {
  background: rgba(30, 30, 30, 0.6);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up {
  animation: slideInUp 0.8s ease-out forwards;
}
</style>
