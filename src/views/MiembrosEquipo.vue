<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="container mx-auto px-4 py-8">
      <!-- Header Section -->
      <div class="text-center mb-12 animate-fade-in-down">
        <div class="flex justify-center items-center mb-6">
          <img
            src="/src/assets/images/puce-logo.png"
            alt="PUCE Logo"
            class="h-16 w-auto mr-4 animate-bounce-in"
          />
        </div>
        <h1 class="text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up">
          <i class="fas fa-info-circle text-blue-600 mr-3"></i>
          Créditos del Proyecto
        </h1>
        <div class="w-24 h-1 bg-blue-600 mx-auto animate-expand"></div>
      </div>

      <!-- About Project Section -->
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8 animate-slide-in-left">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <i class="fas fa-project-diagram text-blue-600 mr-3"></i>
          Acerca de este Proyecto: SIRMA
        </h2>
        <div class="space-y-4 text-gray-700">
          <p class="text-lg leading-relaxed">
            Este proyecto, <strong>SIRMA</strong>, fue concebido y desarrollado por estudiantes de la carrera de
            Ingeniería en Sistemas de Información de la Pontificia Universidad Católica del Ecuador (PUCE).
          </p>
          <p class="text-lg leading-relaxed">
            Nuestra iniciativa se enmarca en la asignatura "Emprendimiento Tecnológico con Emprendimientos Sociales",
            bajo la guía del Profesor Francisco Rodríguez Clavijo. Se realizó bajo la modalidad de Aprendizaje Servicio,
            buscando aplicar conocimientos tecnológicos para generar un impacto social positivo y directo.
          </p>
          <p class="text-lg leading-relaxed">
            Agradecemos el invaluable apoyo y auspicio de la Coordinación Nacional de Innovación Educativa y
            Desarrollo Docente, Coordinación Nacional de Aprendizaje Servicio de la Pontificia Universidad
            Católica del Ecuador, sin cuyo respaldo este proyecto no habría sido posible.
          </p>
        </div>
      </div>

      <!-- Development Team Section -->
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8 animate-slide-in-right">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <i class="fas fa-users text-blue-600 mr-3"></i>
          Equipo de Desarrollo
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-600 animate-fade-in-up animation-delay-100">
            <div class="flex items-center mb-3">
              <i class="fas fa-user-tie text-blue-600 mr-2"></i>
              <h3 class="text-xl font-semibold text-gray-800">Juan José Navarrete</h3>
            </div>
            <p class="text-gray-600 flex items-center">
              <i class="fas fa-code text-green-600 mr-2"></i>
              Desarrollador FrontEnd
            </p>
          </div>
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-600 animate-fade-in-up animation-delay-200">
            <div class="flex items-center mb-3">
              <i class="fas fa-user-tie text-blue-600 mr-2"></i>
              <h3 class="text-xl font-semibold text-gray-800">Sebastián Chicaiza</h3>
            </div>
            <p class="text-gray-600 flex items-center">
              <i class="fas fa-code text-green-600 mr-2"></i>
              Desarrollador FrontEnd
            </p>
          </div>
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-600 animate-fade-in-up animation-delay-300">
            <div class="flex items-center mb-3">
              <i class="fas fa-user-tie text-blue-600 mr-2"></i>
              <h3 class="text-xl font-semibold text-gray-800">Juan David Erazo</h3>
            </div>
            <p class="text-gray-600 flex items-center">
              <i class="fas fa-server text-purple-600 mr-2"></i>
              Desarrollador BackEnd
            </p>
          </div>
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-600 animate-fade-in-up animation-delay-400">
            <div class="flex items-center mb-3">
              <i class="fas fa-user-tie text-blue-600 mr-2"></i>
              <h3 class="text-xl font-semibold text-gray-800">Nicolas Guevara</h3>
            </div>
            <p class="text-gray-600 flex items-center">
              <i class="fas fa-server text-purple-600 mr-2"></i>
              Desarrollador BackEnd
            </p>
          </div>
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-600 animate-fade-in-up animation-delay-500">
            <div class="flex items-center mb-3">
              <i class="fas fa-user-tie text-blue-600 mr-2"></i>
              <h3 class="text-xl font-semibold text-gray-800">Jhonel Moreno</h3>
            </div>
            <p class="text-gray-600 flex items-center">
              <i class="fas fa-layer-group text-orange-600 mr-2"></i>
              Desarrollador FullStack
            </p>
          </div>
        </div>
      </div>

      <!-- Professor Section -->
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8 animate-slide-in-left">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <i class="fas fa-chalkboard-teacher text-blue-600 mr-3"></i>
          Profesor Guía
        </h2>
        <div class="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border-l-4 border-yellow-600 animate-fade-in-up animation-delay-600">
          <div class="flex items-center mb-3">
            <i class="fas fa-user-graduate text-yellow-600 mr-2"></i>
            <h3 class="text-xl font-semibold text-gray-800">Ing. Francisco Rodríguez Clavijo</h3>
          </div>
          <p class="text-gray-600 flex items-center">
            <i class="fas fa-university text-blue-600 mr-2"></i>
            Profesor de Emprendimiento Tecnológico
          </p>
        </div>
      </div>

      <!-- Supporting Institutions Section -->
      <div class="bg-white rounded-lg shadow-lg p-8 animate-slide-in-right">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <i class="fas fa-hands-helping text-blue-600 mr-3"></i>
          Instituciones de Apoyo
        </h2>
        <div class="space-y-4">
          <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-l-4 border-purple-600 animate-fade-in-up animation-delay-700">
            <div class="flex items-center mb-2">
              <i class="fas fa-university text-purple-600 mr-2"></i>
              <h3 class="text-lg font-semibold text-gray-800">Pontificia Universidad Católica del Ecuador (PUCE)</h3>
            </div>
            <p class="text-gray-600 text-sm">Coordinación Nacional de Innovación Educativa y Desarrollo Docente</p>
          </div>
          <div class="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg border-l-4 border-green-600 animate-fade-in-up animation-delay-800">
            <div class="flex items-center mb-2">
              <i class="fas fa-heart text-green-600 mr-2"></i>
              <h3 class="text-lg font-semibold text-gray-800">Coordinación Nacional de Aprendizaje Servicio</h3>
            </div>
            <p class="text-gray-600 text-sm">Pontificia Universidad Católica del Ecuador</p>
          </div>
        </div>
      </div>

      <!-- Footer -->

    </div>
  </div>
</template>

<style scoped>
/* Animaciones personalizadas */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes expand {
  from {
    width: 0;
  }
  to {
    width: 6rem;
  }
}

/* Clases de animación */
.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

.animate-slide-in-left {
  animation: slideInLeft 0.8s ease-out;
}

.animate-slide-in-right {
  animation: slideInRight 0.8s ease-out;
}

.animate-bounce-in {
  animation: bounceIn 1s ease-out;
}

.animate-expand {
  animation: expand 1s ease-out 0.5s both;
}

/* Delays de animación */
.animation-delay-100 {
  animation-delay: 0.1s;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.animation-delay-500 {
  animation-delay: 0.5s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}

.animation-delay-700 {
  animation-delay: 0.7s;
}

.animation-delay-800 {
  animation-delay: 0.8s;
}

.animation-delay-900 {
  animation-delay: 0.9s;
}

/* Transiciones suaves para interacciones */
.bg-white {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.bg-white:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Efectos de hover para las tarjetas del equipo */
.bg-gradient-to-r:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}
</style>
