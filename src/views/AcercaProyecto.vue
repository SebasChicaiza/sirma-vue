<template>
  <div class="acerca-container">
    <div class="logo-sirma">
      <img src="../assets/images/sirma-logo.png" alt="Logo SIRMA" />
    </div>
    <h1>Acerca del Sistema</h1>
    <p class="intro">
      Un sistema integrado para el registro médico avanzado, diseñado para facilitar la gestión de pacientes y mejorar la atención en centros de salud.
    </p>

    <section class="como-funciona">
      <h2>¿Cómo funciona?</h2>
      <div class="pasos">
        <div class="paso">
          <div class="icono">1</div>
          <h3>Registra pacientes</h3>
          <p>Crea y gestiona perfiles de pacientes de forma rápida y segura.</p>
        </div>
        <div class="paso">
          <div class="icono">2</div>
          <h3>Accede al historial</h3>
          <p>Consulta el historial médico completo y actualizado en todo momento.</p>
        </div>
        <div class="paso">
          <div class="icono">3</div>
          <h3>Optimiza la atención</h3>
          <p>Mejora la toma de decisiones con información centralizada y reportes visuales.</p>
        </div>
      </div>
    </section>

    <section class="caracteristicas">
      <h2>Características Principales</h2>
      <ul>
        <li>Registro y búsqueda avanzada de pacientes</li>
        <li>Historial médico digitalizado</li>
        <li>Reportes y estadísticas en tiempo real</li>
        <li>Interfaz intuitiva y adaptable</li>
        <li>Seguridad y privacidad de los datos</li>
      </ul>
    </section>

    <section class="tecnologias">
      <h2>Tecnologías Utilizadas</h2>
      <div class="tecnologias-lista">
        <div class="tecnologia">
          <img src="https://vuejs.org/images/logo.png" alt="Vue.js" />
          <span>Vue.js</span>
        </div>
        <div class="tecnologia">
          <img src="https://nodejs.org/static/images/logo.svg" alt="Node.js" />
          <span>Node.js</span>
        </div>
        <div class="tecnologia">
          <img src="https://www.mongodb.com/assets/images/global/leaf.png" alt="MongoDB" />
          <span>MongoDB</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.logo-sirma {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}
.logo-sirma img {
  width: 180px;
  max-width: 90vw;
  height: auto;
  display: block;
}
.acerca-container {
  max-width: 900px;
  margin: 40px auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 16px #0001;
  padding: 36px 28px;
}
.intro {
  font-size: 1.2rem;
  color: #444;
  margin-bottom: 32px;
  text-align: center;
}
.como-funciona {
  background: #f6f9fc;
  border-radius: 10px;
  padding: 28px 18px;
  margin-bottom: 36px;
}
.pasos {
  display: flex;
  justify-content: space-around;
  gap: 24px;
  margin-top: 18px;
  flex-wrap: wrap;
}
.paso {
  flex: 1 1 200px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px #0001;
  padding: 18px 14px;
  text-align: center;
  margin: 8px;
}
.icono {
  width: 44px;
  height: 44px;
  background: #2563eb;
  color: #fff;
  border-radius: 50%;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px auto;
  font-weight: bold;
}
.caracteristicas ul {
  margin: 0;
  padding-left: 20px;
}
.caracteristicas li {
  margin-bottom: 8px;
  font-size: 1.08rem;
}
.tecnologias-lista {
  display: flex;
  gap: 32px;
  justify-content: center;
  margin-top: 18px;
  flex-wrap: wrap;
}
.tecnologia {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.tecnologia img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}
</style>
