/**
 * ==============================================================================
 * 🐢 LÓGICA DEL CARRITO ESTÁTICO (SECCIÓN 'LO MÁS COMPRADO')
 * ==============================================================================
 */

/**
 * Función auxiliar para actualizar el contador del carrito en el navbar.
 */
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCountElement = document.getElementById('cart-count');
  // Suma las cantidades de todos los productos
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartCountElement) {
    cartCountElement.textContent = totalItems.toString();
  }
}

/**
 * Extrae la información del producto estático desde el DOM de la tarjeta.
 */
function getProductDataFromCard(card) {
  const nameElement = card.querySelector('.product-name');
  const priceElement = card.querySelector('.product-price');
  const imgElement = card.querySelector('.card-img-top');

  if (!nameElement || !priceElement || !imgElement) {
    console.error("Faltan elementos clave en la tarjeta del producto.");
    return null;
  }

  const priceText = priceElement.textContent.replace('$', '').replace(' MXN', '').trim();
  const price = parseFloat(priceText.replace(/,/g, '')) || 0;

  const productId = nameElement.textContent.trim().replace(/\s/g, '_').toLowerCase() + '-' + price.toFixed(2);

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

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
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
  const cartButtons = document.querySelectorAll('.cards-comprado .add-to-cart-btn');

  cartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();

      const card = event.target.closest('.card');
      if (card) {
        const productData = getProductDataFromCard(card);
        handleStaticAddToCart(productData);
      }
    });
  });
}


/**
 * ==============================================================================
 * 🖼️ LÓGICA DEL SLIDER
 * ==============================================================================
 */

const slider = {
  currentSlide: 0,
  totalSlides: 0,
  autoPlayInterval: null,
  autoPlayDuration: 5000,
  rootElement: null,

  init() {
    this.rootElement = document.getElementById("sliderHome");
    if (!this.rootElement) return;

    this.render();

    this.totalSlides = this.rootElement.querySelectorAll(".slide").length;

    this.renderDots();

    this.attachEventListeners();
    this.updateSlider();
    this.startAutoPlay();
  },

  render() {
    this.rootElement.innerHTML = `
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
        
        <div class="dots-container" id="dotsContainer"></div> 
      </div>
    `;
  },

  renderDots() {
    const dotsContainer = document.getElementById("dotsContainer");
    if (!dotsContainer) return;

    let dotsHTML = "";
    for (let i = 0; i < this.totalSlides; i++) {
      dotsHTML += `<button 
                          class="dot" 
                          data-slide="${i}" 
                          aria-label="Ir al slide ${i + 1}" 
                          aria-selected="${i === this.currentSlide ? "true" : "false"}"
                          tabindex="${i === this.currentSlide ? "0" : "-1"}">
                      </button>`;
    }
    dotsContainer.innerHTML = dotsHTML;
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

  // 1. SLIDE HERO: CAUSA
  getHeroSlide() {
    return `
      <div class="slide slide-hero">
          <div class="hero-content">
              <div class="hero-text">
                  <h1 class="slide-title">
                      Lleva el Océano Contigo: <span class="highlight">El Arte que Salva Tortugas.</span>
                  </h1>
                  <p class="slide-subtitle">
                      Cada totebag es tejida con amor y propósito. Con tu compra, financias directamente proyectos de conservación marina en México. 
                      <span class="highlight-text">Únete a la causa.</span>
                  </p>
                  <a class="btn-explore" href="./Pages/About/about.html">Conoce Nuestra Causa</a>
              </div>
              <div class="hero-image">
                  <div class="image-container">
                      <div class="placeholder-bag">
                          <img src="https://picsum.photos/id/152/380/380" alt="Totebag Alebrije">
                      </div>
                  </div>
              </div>
          </div>
      </div>
    `;
  },

  // 2. SLIDE PROMOCIÓN / OFERTAS
  getChristmasSlide() {
    return `
      <div class="slide slide-christmas">
          <div class="center-content">
              <div class="left-col">
                  <div class="badge-special">
                      <i class="fas fa-percent"></i>
                      <span>Promociones del Mes</span>
                  </div>
                  <h1 class="slide-title">
                      Diseños Únicos con <span class="highlight">Descuento Especial.</span>
                  </h1>
                  <p class="slide-subtitle">
                      Encuentra tus totebags favoritas de colecciones pasadas con precios irrepetibles. ¡Stock limitado!
                  </p>
                  <a class="btn-explore" href="./Pages/Totebags/Coleccion/coleccion.html">Ver Ofertas</a>
              </div>
              <div class="card-collection">
                  <div class="card-image">
                      <img src="https://picsum.photos/id/292/380/380" alt="Totebag en Oferta">
                  </div>
              </div>
          </div>
      </div>
    `;
  },

  // 3. SLIDE CLÁSICOS
  getClassicSlide() {
    return `
      <div class="slide slide-classic">
          <div class="center-content">
              <div class="left-col">
                  <div class="badge-special">
                      <i class="fas fa-leaf"></i>
                      <span>Tejido Premium</span>
                  </div>
                  <h1 class="slide-title">
                      Durabilidad y <span class="highlight">Estilo Atemporal.</span>
                  </h1>
                  <p class="slide-subtitle">
                      Nuestra línea clásica, hecha con materiales orgánicos y responsables, es la compañera ideal para tu día a día, sin perder el toque de elegancia.
                  </p>
                  <a class="btn-explore" href="./Pages/Totebags/Clasicas/clasicas.html">Comprar Clásicos</a>
              </div>
              <div class="card-collection">
                  <div class="card-image">
                      <img src="https://picsum.photos/id/350/380/380" alt="Totebag Clásica">
                  </div>
              </div>
          </div>
      </div>
    `;
  },

  // 4. SLIDE PERSONALIZAR
  getCustomizeSlide() {
    const steps = [
      { number: 1, icon: "fa-tshirt", title: "Escoge la Base" },
      { number: 2, icon: "fa-pencil-ruler", title: "Sube tu Diseño" },
      { number: 3, icon: "fa-palette", title: "Define Colores" },
      { number: 4, icon: "fa-truck", title: "Recibe tu Pieza Única" },
    ];

    const stepsHTML = steps
      .map(
        (step, index) => `
          <div class="step-card">
              <div class="step-icon">
                  <i class="fas ${step.icon}"></i>
              </div>
              <div class="step-number">Paso ${step.number}</div>
              <h3>${step.title}</h3>
          </div>
        `
      )
      .join("");

    return `
      <div class="slide slide-customize">
          <div class="center-content">
              <h1 class="slide-title">
                  Crea tu <span class="highlight">Propia Obra de Arte.</span>
              </h1>
              <p class="slide-subtitle">
                Diseña una totebag 100% personalizada: desde el estilo del bolso hasta el bordado. ¡Tú eres el artista!
              </p>

              <div class="steps-grid">
                  ${stepsHTML}
              </div>

              <a class="btn-customize" href="./Pages/Totebags/Personalizada/personalizada.html">Diseñar mi ToteBag</a>
          </div>
      </div>
    `;
  },


  attachEventListeners() {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const dotsContainer = document.getElementById("dotsContainer");
    const sliderContainer = this.rootElement;

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

    sliderContainer?.addEventListener("mouseenter", () => this.pauseAutoPlay());
    sliderContainer?.addEventListener("mouseleave", () => this.startAutoPlay());
    sliderContainer?.addEventListener("focusin", () => this.pauseAutoPlay());
    sliderContainer?.addEventListener("focusout", () => this.startAutoPlay());

    window.addEventListener("resize", () => this.updateSlider());
  },

  updateSlider() {
    const slides = document.getElementById("slides");
    if (!slides) return;
    slides.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    this.updateDots();
  },

  updateDots() {
    const dots = document.querySelectorAll("#dotsContainer .dot");
    dots.forEach((dot, index) => {
      const isActive = index === this.currentSlide;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-selected", isActive ? "true" : "false");
      dot.setAttribute("tabindex", isActive ? "0" : "-1");
    });
  },

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlider();
  },

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlider();
  },

  startAutoPlay() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    this.clearAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDuration);
  },

  pauseAutoPlay() {
    this.clearAutoPlay();
  },

  resetAutoPlay() {
    this.clearAutoPlay();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) this.startAutoPlay();
  },

  clearAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  },
};


/**
 * ==============================================================================
 * 🚀 INICIALIZACIÓN GLOBAL
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar el Slider
  slider.init();

  // Inicializar la lógica del carrito estático
  attachStaticCartListeners();

  // Asegurar que el contador del carrito se cargue al inicio
  updateCartCount();
});