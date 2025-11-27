(function () {
  /* ----------------------------------------------------- */
  /* LÓGICA DE GESTIÓN DE CARRITO */
  /* ----------------------------------------------------- */

  /**
   * Función que crea el HTML de un ítem en el carrito.
   * MEJORADO: Muestra detalles específicos para productos personalizados.
   * @param {Object} item - El objeto del producto del carrito (incluye quantity y customDetails si es personalizado).
   * @returns {string} El HTML para el elemento del carrito.
   */
  function createCartItemHTML(item) {
    const itemPrice = parseFloat(item.price);
    const priceDisplay = itemPrice ? `$${itemPrice.toFixed(2)} MXN` : 'Precio no disponible';

    // **CORRECCIÓN DE ID:** Usa el ID universal (idProduct del Backend o id de LocalStorage)
    const itemId = item.idProduct || item.id;

    // **CORRECCIÓN DE IMAGEN:** Prioriza la URL de Cloudinary (urlProductImage)
    let itemImageURL = item.urlProductImage || item.imageURL;

    let detailsHTML = `<p class="text-muted mb-1">${item.description.split('\n')[0]}</p>`; // Descripción normal por defecto

    // **MEJORA PARA ÍTEMS PERSONALIZADOS**
    if (item.category === 'personalizada' && item.customDetails) {
      const details = item.customDetails;

      // 1. Mostrar la IMAGEN del DISEÑO SUBIDO si existe (item.customDetails.archivoURL)
      if (details.archivoURL) {
        itemImageURL = details.archivoURL;
      }

      // 2. Construir los detalles avanzados
      let customDetailsText = `<p class="text-muted mb-1 small m-0">Base: ${details.base.toUpperCase()} | Acabado: <strong>${details.acabado.toUpperCase()}</strong></p>`;

      // 3. Añadir detalles de la frase (Color y Tipografía)
      if (details.texto) {
        const colorStyle = details.colorTexto ? `style="color: ${details.colorTexto}; font-weight: bold;"` : 'style="font-weight: bold;"';
        const fontName = details.nombreTipografia || (details.tipografiaClase || details.tipografia) || 'Default';

        customDetailsText += `
                        <p class="text-muted mb-1 small m-0">Frase: <span ${colorStyle}>"${details.texto}"</span></p>
                        <p class="text-muted mb-1 small m-0">Tipografía: ${fontName}</p>
                    `;
      } else if (details.archivoAdjunto) {
        customDetailsText += `<p class="text-muted mb-1 small m-0">Diseño: ${details.archivoAdjunto}</p>`;
      }

      detailsHTML = customDetailsText;
    }

    // Usamos el ID del producto (itemId) para las acciones de eliminar y cambiar cantidad
    return `
                <div class="d-flex align-items-center border rounded p-3 cart-item-container" data-product-id="${itemId}">
                    <img src="${itemImageURL}" alt="${item.name}" class="img-thumbnail me-3" style="width: 100px; height: 100px; object-fit: cover;">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        ${detailsHTML} 
                        <span class="fw-bold item-price-display">${priceDisplay}</span>
                    </div>
                    <div class="text-end">
                        <input type="number" value="${item.quantity}" min="1" class="form-control mb-2 item-quantity" style="width: 70px;" data-product-id="${itemId}">
                        <button class="btn btn-outline-danger btn-sm remove-item-btn" data-product-id="${itemId}">Eliminar</button>
                    </div>
                </div>
            `;
  }

  /**
   * Calcula y actualiza el resumen del carrito y el contador del navbar.
   */
  function updateCartSummary(cart) {
    const shippingCost = 50.00;
    let subtotal = 0;

    for (const item of cart) {
      const itemPrice = parseFloat(item.price);
      if (!isNaN(itemPrice)) {
        subtotal += itemPrice * item.quantity;
      }
    }

    const total = subtotal + (subtotal > 0 ? shippingCost : 0); // Añadir envío solo si hay productos

    // Actualizar los elementos del DOM en el Resumen
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)} MXN`;
    document.getElementById('envio').textContent = subtotal > 0 ? `$${shippingCost.toFixed(2)} MXN` : 'N/A';
    document.getElementById('total').textContent = `$${total.toFixed(2)} MXN`;

    // Actualizar el contador del carrito en el navbar (cart-count)
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = cart.length;
    }
  }

  /**
   * Renderiza el contenido del carrito en el HTML.
   */
  function renderCart() {
    const cartContainer = document.getElementById('carrito-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!cartContainer) return;

    cartContainer.innerHTML = ''; // Limpiar el contenedor

    if (cart.length === 0) {
      cartContainer.innerHTML = '<p class="text-center text-muted">Tu carrito está vacío. ¡Añade algunos productos!</p>';
    } else {
      for (const item of cart) {
        const itemHTML = createCartItemHTML(item);
        cartContainer.insertAdjacentHTML('beforeend', itemHTML);
      }
    }

    updateCartSummary(cart);
  }

  /**
   * Elimina un ítem del carrito y re-renderiza.
   */
  function removeItemFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Filtramos usando la propiedad que contenga el ID (idProduct o id)
    const newCart = cart.filter(item => (item.idProduct || item.id) !== productId);

    localStorage.setItem('cart', JSON.stringify(newCart));
    console.log(`Producto ID ${productId} eliminado del carrito.`);
    renderCart();
  }

  /**
   * Actualiza la cantidad de un ítem.
   */
  function updateItemQuantity(productId, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => (item.idProduct || item.id) === productId)

    if (itemIndex > -1) {
      const quantity = Math.max(1, parseInt(newQuantity));
      cart[itemIndex].quantity = quantity;

      localStorage.setItem('cart', JSON.stringify(cart));
      // Solo actualizamos el resumen de totales
      updateCartSummary(cart);
    }
  }

  /* ----------------------------------------------------- */
  /* CÓDIGO DE ANIMACIÓN ORIGINAL */
  /* ----------------------------------------------------- */

  /* helpers y referencias DOM */
  const tortugaCont = document.querySelector('.tortuga-animada');
  const paqueteEl = document.querySelector('.paquete');
  const cartIconAnchor = document.querySelector('.cart-icon-container a.nav-link');
  const checkoutButton = document.querySelector('.btn-primary.btn-add-to-cart'); // Referencia al botón de checkout
  const seccionMar = document.getElementById('seccion-mar');

  if (!tortugaCont || !paqueteEl || !cartIconAnchor || !seccionMar) {
    console.warn('carrito.js: faltan elementos (.tortuga-animada, .paquete, cart icon o #seccion-mar).');
    window.animateTurtleToCart = async () => console.warn('animateTurtleToCart no ejecutada — elementos faltantes.');
  }

  /* Helper para pausas limpias con async/await */
  const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  /* Calcula la transform del paquete (sin cambios) */
  function calcPackageTranslateToCart() {
    const pkgRect = paqueteEl.getBoundingClientRect();
    const cartRect = cartIconAnchor.getBoundingClientRect();
    const pkgCenterX = pkgRect.left + pkgRect.width / 2;
    const pkgCenterY = pkgRect.top + pkgRect.height / 2;
    const cartCenterX = cartRect.left + cartRect.width / 2;
    const cartCenterY = cartRect.top + cartRect.height / 2;
    const dx = cartCenterX - pkgCenterX;
    const dy = cartCenterY - pkgCenterY;
    return { dx, dy };
  }

  /*Animación principal con async/await. */
  async function animateTurtleToCart() {
    console.log("Iniciando animación...");

    /* Subir tortuga */
    tortugaCont.classList.add('rise');
    await esperar(4000);

    /* Esperar un ciclo de renderizado completo. */
    await new Promise(resolve => requestAnimationFrame(resolve));
    tortugaCont.offsetHeight;
    console.log("Tortuga estabilizada en el centro.");

    /* 🧩 Fijar la posición de lanzamiento */
    tortugaCont.classList.add('launchPosition');

    /* Mostrar paquete en el centro) */
    tortugaCont.classList.add('idle'); // Reposo
    paqueteEl.classList.add('package-show');

    await esperar(350); // showDelay

    /* Lanzar paquete */
    console.log("Lanzando paquete...");
    const { dx, dy } = calcPackageTranslateToCart();
    paqueteEl.classList.add('package-throw');
    paqueteEl.style.transform = `translate3d(calc(-50% + ${dx}px), ${-8 + dy}px, 0) rotate(-18deg) scale(.95)`;
    paqueteEl.style.opacity = '1';

    /* Esperar el vuelo */
    await esperar(4000); // flightDuration

    /* Impacto en el carrito */
    console.log("Paquete llegó!");
    paqueteEl.style.opacity = '0';
    paqueteEl.style.transition = 'opacity .18s ease';
    cartIconAnchor.classList.add('cart-hit');

    /* Resetear el paquete */
    setTimeout(() => {
      paqueteEl.style.transform = '';
      paqueteEl.classList.remove('package-throw');
      paqueteEl.classList.remove('package-show');
      paqueteEl.style.transition = '';
    }, 120);

    /* Esperar a que el 'hit' del carrito termine */
    await esperar(420);
    cartIconAnchor.classList.remove('cart-hit');

    /* Bajar tortuga */
    console.log("Tortuga bajando...");
    tortugaCont.classList.remove('rise');
    tortugaCont.classList.remove('idle');
    tortugaCont.classList.add('descend');

    /* Esperamos a que termine la bajada (2.9s en tu CSS) */
    await esperar(2900);

    /* Resetear tortuga */
    console.log("Animación de tortuga terminada.");
    tortugaCont.classList.remove('descend');
  }

  // Exponer la función globalmente (sin cambios)
  window.animateTurtleToCart = animateTurtleToCart;

  /* Función que envuelve la animación completa */
  async function triggerTurtleAnimation(buttonElement) {
    if (!buttonElement) return;

    // Evitar múltiples clicks
    buttonElement.disabled = true;

    /* Mostrar el mar */
    console.log("Mostrando el mar...");
    seccionMar.classList.add('mar-visible');
    await esperar(600);

    /* Ejecutar la animación de tortuga */
    console.log("Lanzando tortuga...");
    await animateTurtleToCart(); // Esperamos a que la tortuga termine

    /* Ocultar el mar */
    console.log("Ocultando el mar...");
    seccionMar.classList.remove('mar-visible');
    await esperar(600);

    /* Reactivar el botón */
    buttonElement.disabled = false;

    /* ✅ Abrir offcanvas de pago después de la animación */
    const offcanvasPago = new bootstrap.Offcanvas(document.getElementById('offcanvasPago'));
    offcanvasPago.show();
  }

  /* ----------------------------------------------------- */
  /* EVENT LISTENERS DE CARRITO Y ANIMACIÓN */
  /* ----------------------------------------------------- */

  document.addEventListener('DOMContentLoaded', () => {

    // 1. Renderiza el carrito al cargar la página
    renderCart();

    const cartContainer = document.getElementById('carrito-items');

    if (cartContainer) {
      // Delegación de eventos para el botón 'Eliminar'
      cartContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item-btn')) {
          const productId = parseInt(event.target.dataset.productId);
          removeItemFromCart(productId);
        }
      });

      // Delegación de eventos para el input 'Cantidad'
      cartContainer.addEventListener('change', (event) => {
        if (event.target.classList.contains('item-quantity')) {
          const productId = parseInt(event.target.dataset.productId);
          const newQuantity = event.target.value;
          updateItemQuantity(productId, newQuantity);
        }
      });
    }

    // 2. Enlace del botón "Proceder al pago" con la animación
    if (checkoutButton) {
      checkoutButton.addEventListener('click', (event) => {
        event.preventDefault();

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length > 0) {
          triggerTurtleAnimation(event.target);
        } else {
          alert("Tu carrito está vacío. ¡No hay productos para proceder al pago!");
        }
      });
    }
  });

  /* ----------------------------------------------------- */
  /* VALIDACIÓN DEL FORMULARIO DE PAGO (offcanvas) — MEJORADA */
  /* ----------------------------------------------------- */

  document.addEventListener('DOMContentLoaded', function () {
    const paymentForm = document.getElementById('paymentForm');
    if (!paymentForm) return;

    // Campos
    const nombreTarjeta = document.getElementById('nombreTarjeta');
    const numeroTarjeta = document.getElementById('numeroTarjeta');
    const fechaVencimiento = document.getElementById('fechaVencimiento');
    const cvv = document.getElementById('cvv');
    const telefono = document.getElementById('telefono');
    const cp = document.getElementById('cp');

    // Expresiones regulares
    const regex = {
      nombreTitular: /^[a-zA-Z\s]{2,50}$/,
      numeroTarjeta: /^\d{16}$/,
      fechaVencimiento: /^\d{2}\/\d{2}$/,
      cvv: /^\d{3,4}$/,
      telefono: /^[1-9]\d{9}$/,
      cp: /^\d{5}$/
    };

    // === FUNCIONES DE VALIDACIÓN ===
    function validateNombreTarjeta() {
      const value = nombreTarjeta.value.trim();
      const isValid = value !== '' && regex.nombreTitular.test(value);
      toggleValidation(nombreTarjeta, isValid, 'El nombre debe contener solo letras y espacios (2–50 caracteres).');
      return isValid;
    }

    function validateNumeroTarjeta() {
      const raw = numeroTarjeta.value.replace(/\D/g, '');
      const isValid = raw.length === 16 && regex.numeroTarjeta.test(raw);
      toggleValidation(numeroTarjeta, isValid, 'El número de tarjeta debe tener 16 dígitos.');
      return isValid;
    }

    function validateFechaVencimiento() {
      const value = fechaVencimiento.value;
      const isValid = regex.fechaVencimiento.test(value);
      toggleValidation(fechaVencimiento, isValid, 'Formato inválido. Usa MM/AA (ej. 12/28).');
      return isValid;
    }

    function validateCvv() {
      const isValid = cvv.value !== '' && regex.cvv.test(cvv.value);
      toggleValidation(cvv, isValid, 'El CVV debe tener 3 o 4 dígitos.');
      return isValid;
    }

    function validateTelefono() {
      const clean = telefono.value.replace(/\D/g, '');
      const isValid = clean !== '' && regex.telefono.test(clean);
      toggleValidation(telefono, isValid, 'Ingresa un número de teléfono válido de 10 dígitos.');
      return isValid;
    }

    function validateCp() {
      const isValid = cp.value !== '' && regex.cp.test(cp.value);
      toggleValidation(cp, isValid, 'El código postal debe tener 5 dígitos.');
      return isValid;
    }

    // === FUNCION AUXILIAR PARA ERRORES ===
    function toggleValidation(input, isValid, message) {
      const feedback = input.parentNode.querySelector('.invalid-feedback');
      input.classList.remove('is-valid', 'is-invalid');

      if (isValid) {
        input.classList.add('is-valid');
        if (feedback) feedback.remove();
      } else {
        input.classList.add('is-invalid');
        if (!feedback) {
          const div = document.createElement('div');
          div.className = 'invalid-feedback';
          div.textContent = message;
          input.parentNode.appendChild(div);
        }
      }
    }

    // === FORMATEO AUTOMÁTICO ===
    numeroTarjeta.addEventListener('input', function (e) {
      let v = e.target.value.replace(/\D/g, '').slice(0, 16);
      e.target.value = v.replace(/(.{4})/g, '$1 ').trim();
      validateNumeroTarjeta(); // validar mientras escribe
    });

    fechaVencimiento.addEventListener('input', function (e) {
      let v = e.target.value.replace(/\D/g, '').slice(0, 4);
      if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2);
      e.target.value = v;
      validateFechaVencimiento();
    });

    // === VALIDACIÓN EN TIEMPO REAL ===
    nombreTarjeta.addEventListener('input', validateNombreTarjeta);
    cvv.addEventListener('input', validateCvv);
    telefono.addEventListener('input', validateTelefono);
    cp.addEventListener('input', validateCp);

    // === ENVÍO DEL FORMULARIO ===
    paymentForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const validaciones = [
        validateNombreTarjeta(),
        validateNumeroTarjeta(),
        validateFechaVencimiento(),
        validateCvv(),
        validateTelefono(),
        validateCp()
      ];

      // Validar campos de dirección obligatorios
      const camposDir = ['calle', 'numero', 'colonia', 'ciudad', 'estado'];
      const validDir = camposDir.map(id => {
        const campo = document.getElementById(id);
        const valido = campo.value.trim() !== '';
        campo.classList.toggle('is-invalid', !valido);
        return valido;
      });

      if (validaciones.every(v => v) && validDir.every(v => v)) {
        alert('¡Gracias por tu compra en Alma de Tortuga! 🐢');
        const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasPago'));
        offcanvas?.hide();
      }
    });
  });

})();