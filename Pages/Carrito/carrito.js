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

    let detailsHTML = `<p class="text-muted mb-1">${item.description.split('\n')[0]}</p>`; // Descripción normal por defecto

    // Usamos la URL de la TOTE BASE por defecto
    let itemImageURL = item.imageURL;

    // **MEJORA PARA ÍTEMS PERSONALIZADOS**
    if (item.category === 'personalizada' && item.customDetails) {
      const details = item.customDetails;

      // 1. Mostrar la IMAGEN del DISEÑO SUBIDO si existe (item.customDetails.archivoURL)
      // Esto sobrescribe la imagen base de la tote con el diseño
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

    // Usamos el ID del producto para las acciones de eliminar y cambiar cantidad
    return `
            <div class="d-flex align-items-center border rounded p-3 cart-item-container" data-product-id="${item.id}">
                <img src="${itemImageURL}" alt="${item.name}" class="img-thumbnail me-3" style="width: 100px; height: 100px; object-fit: cover;">
                <div class="flex-grow-1">
                    <h6 class="mb-1">${item.name}</h6>
                    ${detailsHTML} 
                    <span class="fw-bold item-price-display">${priceDisplay}</span>
                </div>
                <div class="text-end">
                    <input type="number" value="${item.quantity}" min="1" class="form-control mb-2 item-quantity" style="width: 70px;" data-product-id="${item.id}">
                    <button class="btn btn-outline-danger btn-sm remove-item-btn" data-product-id="${item.id}">Eliminar</button>
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
    const newCart = cart.filter(item => item.id !== productId);

    localStorage.setItem('cart', JSON.stringify(newCart));
    console.log(`Producto ID ${productId} eliminado del carrito.`);
    renderCart(); // Vuelve a renderizar la lista y el resumen
  }

  /**
   * Actualiza la cantidad de un ítem.
   */
  function updateItemQuantity(productId, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);

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

  /* Referencia al contenedor del mar */
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

    /* Calcular el vector desde la posición ESTABLE del paquete */
    const { dx, dy } = calcPackageTranslateToCart();

    paqueteEl.classList.add('package-throw');

    /* Aplicamos la transformación (ya que el cálculo del vector es correcto) */
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
    await esperar(600); // Esperar la transición de 0.6s del CSS

    /* Ejecutar la animación de tortuga */
    console.log("Lanzando tortuga...");
    await animateTurtleToCart(); // Esperamos a que la tortuga termine

    /* Ocultar el mar */
    console.log("Ocultando el mar...");
    seccionMar.classList.remove('mar-visible');
    await esperar(600); // Esperar a que se oculte

    /* Reactivar el botón (solo si no se redirigió) */
    buttonElement.disabled = false;

    // **AQUÍ IRÍA LA REDIRECCIÓN A LA PÁGINA DE PAGO SI ES NECESARIO**
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
          // Convertir el data-product-id a número para asegurar la comparación
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

})();