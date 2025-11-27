/**
 * Función centralizada para leer el carrito de localStorage
 * y actualizar el contador en el navbar.
 */
function updateCartCount() {
    // Lee la clave 'cart' (usada por Items.js y personalizacion.js)
    const cart = JSON.parse(localStorage.getItem('cart')) || []; 
    const cartCountElement = document.getElementById('cart-count');
    
    if (cartCountElement) {
        cartCountElement.textContent = cart.length; // Muestra el número de ítems únicos
    }
}

// Ejecutar la función cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', updateCartCount);
// (Opcional: Si necesitas exponerla globalmente para que Items.js la llame)
window.updateCartCount = updateCartCount;