/**
 * ==============================================================================
 * 🐢 LÓGICA DEL CARRITO ESTÁTICO (SECCIÓN 'LO MÁS COMPRADO') - SE MANTIENE
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
 * 🖼️ LÓGICA DEL SLIDER (SIN INYECCIÓN DE ESTRUCTURA PRINCIPAL)
 * ==============================================================================
 */

const slider = {
  currentSlide: 0,
  totalSlides: 0,
  autoPlayInterval: null,
  autoPlayDuration: 5000,
  rootElement: null,
  slidesContainer: null,

  init() {
    this.rootElement = document.getElementById("sliderHome");
    if (!this.rootElement) return;

    this.slidesContainer = this.rootElement.querySelector("#slides");
    if (!this.slidesContainer) return;

    // Calcula el total de slides leyendo el DOM, ya que están en el HTML
    this.totalSlides = this.slidesContainer.querySelectorAll(".slide").length;

    // Renderiza los puntos (dots), que es una estructura dinámica de estado
    this.renderDots();

    this.attachEventListeners();
    this.updateSlider();
    this.startAutoPlay();
  },

  // Función para renderizar los dots, ya que es estado dinámico
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

  attachEventListeners() {
    // Los botones prevBtn y nextBtn ahora se seleccionan directamente desde el DOM
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const dotsContainer = document.getElementById("dotsContainer");
    const sliderContainer = this.rootElement.querySelector(".slider-container");

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
    if (!this.slidesContainer) return;
    // Aplica la transformación CSS para mover el slide
    this.slidesContainer.style.transform = `translateX(-${this.currentSlide * 100}%)`;
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
 * 🚀 INICIALIZACIÓN GLOBAL - SE MANTIENE
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