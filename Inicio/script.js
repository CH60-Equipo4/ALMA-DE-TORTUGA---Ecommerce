/**
 * Función auxiliar para actualizar el contador del carrito en el navbar.
 */
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
  }
}

/**
 * Extrae la información del producto estático desde el DOM de la tarjeta.
 * @param {HTMLElement} card - El elemento div.card que contiene el producto.
 * @returns {Object|null} El objeto del producto para el carrito.
 */
function getProductDataFromCard(card) {
  const nameElement = card.querySelector('.product-name');
  const priceElement = card.querySelector('.product-price');
  const imgElement = card.querySelector('.card-img-top');

  if (!nameElement || !priceElement || !imgElement) {
    console.error("Faltan elementos clave en la tarjeta del producto.");
    return null;
  }

  // Limpiamos el precio (ej: "$1,200.00 MXN" -> 1200.00)
  const priceText = priceElement.textContent.replace('$', '').replace(' MXN', '').replace(',', '');
  const price = parseFloat(priceText) || 0;

  // Generamos un ID simple y único basado en el nombre (suficiente para productos estáticos)
  const productId = nameElement.textContent.trim().replace(/\s/g, '_').toLowerCase() + '-' + price;

  return {
    id: productId,
    name: nameElement.textContent.trim(),
    price: price,
    imageURL: imgElement.src,
    category: 'mas_comprado',
    description: 'Producto destacado de la sección "Lo más comprado".',
    quantity: 1
  };
}

/**
 * Maneja la adición de un producto estático al carrito.
 */
function handleStaticAddToCart(productData) {
  if (!productData) return;

  const productId = productData.id;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Verificar si ya existe en el carrito
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // Añadir el producto completo al carrito
    cart.push(productData);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`"${productData.name}" añadido al carrito!`);
}

/**
 * Inicializa los listeners para los botones de las tarjetas estáticas.
 */
function attachStaticCartListeners() {
  // Seleccionamos todos los botones "Agregar al carrito" en la página
  const cartButtons = document.querySelectorAll('.cards-comprado .add-to-cart-btn');

  cartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();

      // Subimos hasta el contenedor principal de la tarjeta (.card)
      const card = event.target.closest('.card');
      if (card) {
        const productData = getProductDataFromCard(card);
        handleStaticAddToCart(productData);
      }
    });
  });
}

// --------------------------------------------------------------------------------
// --- CÓDIGO DEL SLIDER ORIGINAL ---
// --------------------------------------------------------------------------------

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

  // ... (rest of slider object methods: render, getSlides, getDots, getHeroSlide, getChristmasSlide, getClassicSlide, getCustomizeSlide, updateDots, nextSlide, prevSlide, startAutoPlay, pauseAutoPlay, resetAutoPlay, clearAutoPlay)

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
                        aria-selected="${i === this.currentSlide ? "true" : "false"
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
                        ${step.description
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
    // Nota: Asumiendo que dotsContainer no está renderizado en tu getSlides, 
    // pero lo mantenemos si lo renderizas por CSS o después.
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
    // Nota: Si quieres que los dots se actualicen, debes agregarlos al DOM
    // en el método render o aquí.
    // this.updateDots(); 
  },

  // Añadidos los métodos que faltaban en tu snippet
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
  // 💡 Inicializar la lógica del carrito estático al cargar el DOM
  attachStaticCartListeners();
  // 💡 Asegurar que el contador del carrito se cargue al inicio
  updateCartCount();
});