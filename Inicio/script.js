const slider = {
  currentSlide: 0,
  totalSlides: 4,
  autoPlayInterval: null,
  autoPlayDuration: 5000,

  init() {
    this.render();
    this.attachEventListeners();
    this.startAutoPlay();
  },

  render() {
    const root = document.getElementById("sliderHome");
    root.innerHTML = `
          <div class="slider-container" role="region" aria-label="Hero slider" tabindex="0">
            <div class="slides" id="slides" aria-live="polite" aria-atomic="true">
              ${this.getSlides()}
            </div>
      
            <button class="nav-button prev" id="prevBtn" aria-label="Slide anterior">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button class="nav-button next" id="nextBtn" aria-label="Siguiente slide">
              <i class="fas fa-chevron-right"></i>
            </button>
      
         
          </div>
        `;

    this.totalSlides = document.querySelectorAll(".slide").length;
    this.updateSlider(); /* <- se asegura que el slider aparece en la posición correcta */
  },

  getSlides() {
    const slides = [
      this.getHeroSlide(),
      this.getChristmasSlide(),
      this.getClassicSlide(),
      this.getCustomizeSlide(),
    ];
    return slides.join("");
  },

  getDots() {
    let dots = "";
    for (let i = 0; i < this.totalSlides; i++) {
      dots += `<button 
                    class="dot" 
                    data-slide="${i}" 
                    aria-label="Ir al slide ${i + 1}" 
                    aria-selected="${
                      i === this.currentSlide ? "true" : "false"
                    }"
                    tabindex="${i === this.currentSlide ? "0" : "-1"}">
                  </button>`;
    }
    return dots;
  },

  getHeroSlide() {
    return `
          <div class="slide slide-hero">
            <div class="hero-content">
              <div class="hero-text">
                <h1 class="slide-title">
                  Alma de
                  <span class="highlight">Tortuga</span>
                </h1>
                <p class="slide-subtitle">
                  Hechas a mano, hechas para durar,
                  <br>
                  <span class="highlight-text">hechas para ti</span>
                </p>
                <a class="btn-explore" href="./Pages/Totebags/Coleccion/coleccion.html">Explorar colección</a>
              </div>
              <div class="hero-image">
                <div class="image-container">
                  <div class="placeholder-bag">
                    <img src="./Pictures/Products/Coleccion_Navidad/Merry_Xmas.png" alt="Totebag Natural">
                  </div>
                  <div class="badge-new">Nuevo</div>
                </div>
              </div>
            </div>
          </div>
        `;
  },

  getChristmasSlide() {
    return `
          <div class="slide slide-christmas">
            <div class="center-content">
      
              <!-- COLUMNA IZQUIERDA -->
              <div class="left-col">
                <div class="badge-special">
                  <i class="fas fa-sparkles"></i>
                  <span>Edición Especial</span>
                </div>
      
                <h1 class="slide-title">
                  Conoce nuestra colección
                  <br>
                  <span class="highlight">Navideña</span>
                </h1>
      
                <p class="slide-subtitle">
                  El regalo perfecto para tus seres queridos
                </p>
              </div>
      
              <!-- COLUMNA DERECHA -->
              <div class="card-collection">
                <div class="card-image">
                  <img src="./Pictures/Products/Coleccion_Navidad/SuperXmas.png" alt="Edición navideña">
                </div>
                <div class="card-content">
                  <a class="btn-collection" href="./Pages/Totebags/Coleccion/coleccion.html">Ver colección</a>
                </div>
              </div>
      
            </div>
          </div>
        `;
  },

  getClassicSlide() {
    return `
         <div class="slide slide-classic">
            <div class="center-content">

        <!-- COLUMNA IZQUIERDA -->
        <div class="left-col">
          <div class="badge-special">
            <i class="fas fa-sparkles"></i>
            <span>Más vendidas</span>
          </div>

          <h1 class="slide-title">
          Conoce nuestras
          <br>
          <span class="highlight">Totebags clásicas</span>
          </h1>

          <p class="slide-subtitle">
          Las favoritas de siempre
          </p>
        </div>

        <!-- COLUMNA DERECHA -->
        <div class="card-collection">
            <div class="card-image">
                <img src="./Pictures/Products/Clasicas/clasica_1.jpg" alt="Totebag Clásica Negra">
            </div>
          <div class="card-content">
            <a class="btn-collection" href="./Pages/Totebags/Clasicas/clasicas.html">Ver colección</a>
          </div>
        </div>

      </div>
    </div>
        `;
  },

  getCustomizeSlide() {
    const steps = [
      {
        number: 1,
        icon: "fa-shopping-bag",
        title: "Selecciona el tipo de totebag",
      },
      {
        number: 2,
        icon: "fa-palette",
        title: "Elige el tipo de personalización",
      },
      {
        number: 3,
        icon: "fa-cloud-arrow-up",
        title: "Sube tu diseño o frase",
      },
      {
        number: 4,
        icon: "fa-font",
        title: "Elige tipografía y color",
      },
    ];

    const stepsHTML = steps
      .map(
        (step) => `
          <div class="step-card">
            <div class="step-icon">
              <i class="fas ${step.icon}"></i>
            </div>
            <div class="step-number">Paso ${step.number}</div>
            <h3>${step.title}</h3>
            ${
              step.description
                ? `<p class="step-description">${step.description}</p>`
                : ""
            }
          </div>
        `
      )
      .join("");

    return `
          <div class="slide slide-customize">
            <div class="center-content">
              <h1 class="slide-title">
                Personaliza tu <span class="highlight">Totebag</span>
              </h1>
              <p class="slide-subtitle">Crea algo único en 4 sencillos pasos</p>
    
              <div class="steps-grid">
                ${stepsHTML}
              </div>
    
              <a class="btn-customize" href="./Pages/Totebags/Personalizada/personalizada.html">Personalizar</a>
            </div>
          </div>
        `;
  },

  attachEventListeners() {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const dotsContainer = document.getElementById("dotsContainer");
    const sliderContainer = document.querySelector(".slider-container");

    prevBtn?.addEventListener("click", () => {
      this.prevSlide();
      this.resetAutoPlay();
    });
    nextBtn?.addEventListener("click", () => {
      this.nextSlide();
      this.resetAutoPlay();
    });

    dotsContainer?.addEventListener("click", (e) => {
      const dot = e.target.closest(".dot");
      if (dot) {
        this.currentSlide = parseInt(dot.dataset.slide, 10);
        this.updateSlider();
        this.resetAutoPlay();
      }
    });

    // Pausar autoplay al pasar el mouse o al enfocarlo (accesibilidad)
    sliderContainer?.addEventListener("mouseenter", () => this.pauseAutoPlay());
    sliderContainer?.addEventListener("mouseleave", () => this.startAutoPlay());
    sliderContainer?.addEventListener("focusin", () => this.pauseAutoPlay());
    sliderContainer?.addEventListener("focusout", () => this.startAutoPlay());

    // Recalcular en resize por si usas tamaños dependientes
    window.addEventListener("resize", () => this.updateSlider());
  },

  updateSlider() {
    const slides = document.getElementById("slides");
    if (!slides) return;
    slides.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    this.updateDots();
  },

  updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlide);
      dot.setAttribute(
        "aria-selected",
        index === this.currentSlide ? "true" : "false"
      );
      dot.setAttribute("tabindex", index === this.currentSlide ? "0" : "-1");
    });
  },

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlider();
  },

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlider();
  },

  startAutoPlay() {
    // Si el usuario prefiera reducir movimiento, no autoplay
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    this.clearAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
      this.updateSlider();
    }, this.autoPlayDuration);
  },

  pauseAutoPlay() {
    this.clearAutoPlay();
  },

  resetAutoPlay() {
    this.clearAutoPlay();
    // restart only if the user doesn't prefer reduced motion
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!reduce) this.startAutoPlay();
  },

  clearAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  },
};

document.addEventListener("DOMContentLoaded", () => {
  slider.init();
});
