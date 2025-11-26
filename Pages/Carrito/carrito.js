
(function () {
 /* helpers y referencias DOM */
 const tortugaCont = document.querySelector('.tortuga-animada');
 const paqueteEl = document.querySelector('.paquete');
 const cartIconAnchor = document.querySelector('.cart-icon-container a.nav-link');
 
 /*  Referencia al contenedor del mar */
 const seccionMar = document.getElementById('seccion-mar');

 if (!tortugaCont || !paqueteEl || !cartIconAnchor || !seccionMar) {
  console.warn('carrito.js: faltan elementos (.tortuga-animada, .paquete, cart icon o #seccion-mar).');
  window.animateTurtleToCart = async () => console.warn('animateTurtleToCart no ejecutada — elementos faltantes.');
  return;
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
 /* Estabiliza getBoundingClientRect() en la posición final (left: 50%, bottom: 150px) */
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

 /* Auto-enlace de botones "Agregar" */
 const addButtons = document.querySelectorAll('.btn-add-to-cart');

 addButtons.forEach(btn => {
  
    /* El listener del botón ahora es 'async' y orquesta TODA la secuencia (mar + tortuga). */
  
  btn.addEventListener('click', async (ev) => {
   /* Evitar múltiples clicks */
   btn.disabled = true;

  /*  Mostrar el mar */
   console.log("Mostrando el mar...");
   seccionMar.classList.add('mar-visible');
   await esperar(600); // Esperar la transición de 0.6s del CSS

   /*  Ejecutar la animación de tortuga */
   console.log("Lanzando tortuga...");
   await animateTurtleToCart(); // Esperamos a que la tortuga termine

   /*  Ocultar el mar */
   console.log("Ocultando el mar...");
   seccionMar.classList.remove('mar-visible');
   await esperar(600); // Esperar a que se oculte

   /* Reactivar el botón */
   btn.disabled = false;
  });
 });

})();