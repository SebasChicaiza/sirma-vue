<template>
  <div class="landing-view">
    <section class="hero">
      <h1 class="title">
        Bienvenido al
        <span class="highlight">Sistema de Registro Médico Avanzado</span>
      </h1>
      <p class="subtitle">
        Una herramienta para mejorar la atención médica en comunidades rurales.
      </p>
    </section>

    <section class="estadisticas">
      <h2 class="section-title">📊 Estadísticas Generales</h2>
      <div class="stat-cards">
        <div class="card">
          <h3>235</h3>
          <p>Pacientes Registrados</p>
        </div>
        <div class="card">
          <h3>489</h3>
          <p>Fichas Médicas</p>
        </div>
        <div class="card">
          <h3>4</h3>
          <p>Centros de Salud</p>
        </div>
      </div>
    </section>

    <section class="sobre">
      <h2 class="section-title">🔍 Sobre el Proyecto</h2>
      <p>
        Este sistema busca optimizar la gestión de fichas médicas, permitiendo un seguimiento efectivo del estado de salud de los pacientes en zonas rurales, incluso sin conexión a internet.
      </p>
    </section>

    <section class="equipo">
      <h2 class="section-title">👥 Equipo de Desarrollo</h2>
      <div class="equipo-grid">
        <div class="miembro" v-for="persona in integrantes" :key="persona.nombre">
          <div class="avatar-placeholder">👤</div>
          <h3>{{ persona.nombre }}</h3>
          <p>{{ persona.rol }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const integrantes = [
  { nombre: "Sebastián Chicaiza", rol: "Desarrollador Full Stack" },
  { nombre: "David Erazo", rol: "Líder de Proyecto" },
  { nombre: "Nicolás Guevara", rol: "Diseñador UX/UI" },
  { nombre: "Jhonel Moreno", rol: "Tester QA" },
  { nombre: "Juan José Navarrete", rol: "Analista de Datos" },
];
</script>

<style scoped>
.landing-view {
  font-family: 'Segoe UI', sans-serif;
  background-color: #f9fafb;
  color: #333;
  padding: 2rem 1rem;
  line-height: 1.6;
}

.hero {
  text-align: center;
  padding: 2rem 1rem;
  background: #f0f4f8;
  margin-bottom: 2rem;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #1e3a5f;
}

.highlight {
  color: #41b883;
}

.subtitle {
  font-size: 1.1rem;
  color: #555;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e3a5f;
  margin-bottom: 1rem;
  text-align: center;
}

.stat-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
}

.card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 220px;
}

.card h3 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #1e3a5f;
}

.card p {
  color: #555;
  font-weight: 500;
}

.sobre p {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  color: #444;
}

.equipo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  justify-items: center;
}

.miembro {
  text-align: center;
}

.avatar-placeholder {
  background: #d9e1ec;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #442288;
}

.miembro h3 {
  font-size: 1rem;
  margin-top: 0.75rem;
  color: #1e3a5f;
}

.miembro p {
  font-size: 0.9rem;
  color: #444;
}
</style>