// cart-count.js
// Script ligero para actualizar el contador del icono de carrito en cualquier página.
// Inclúyelo con <script src="/ruta/a/js/cart-count.js" defer></script>

function updateCartCountSimple() {
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    if (!cartCountElement) return;
    cartCountElement.textContent = cart.length;
    // ocultar la burbuja si 0 (opcional)
    if (cart.length === 0) {
      cartCountElement.style.display = 'none';
    } else {
      cartCountElement.style.display = 'inline-block';
    }
  } catch (err) {
    console.error('Error al actualizar contador', err);
  }
}

// Actualiza al cargar la página
document.addEventListener('DOMContentLoaded', updateCartCountSimple);

// Actualiza si se modifica el localStorage en otra pestaña
window.addEventListener('storage', (e) => {
  if (e.key === 'cart') updateCartCountSimple();
});

// Exponer función global por si otros scripts quieren forzar actualización
window.updateCartCountSimple = updateCartCountSimple;
