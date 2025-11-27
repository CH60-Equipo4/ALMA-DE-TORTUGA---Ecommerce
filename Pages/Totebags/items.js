import { ItemsController } from "./itemsController.js"; // Asegúrate que la ruta sea correcta

 // Actualiza el contador del carrito en la burbuja del icono (#cart-count).

function updateCartCount() {
    // Obtiene el carrito del localStorage o un array vacío si no existe
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        // Muestra la cantidad de productos únicos en el carrito
        cartCountElement.textContent = cart.length;
    }
}

/**
 * Función para manejar la adición de un producto al carrito en localStorage.
 */
function handleAddToCart(productId, itemsController) {
    const parsedProductId = parseInt(productId);
    // Busca el producto en el array cargado por el ItemsController
    const productToAdd = itemsController.items.find(item => item.id === parsedProductId);

    if (productToAdd) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Buscar si el producto ya existe en el carrito
        const existingItem = cart.find(item => item.id === parsedProductId);

        if (existingItem) {
            // Si existe, incrementa la cantidad
            existingItem.quantity += 1;
        } else {
            // Si no existe, lo añade con cantidad 1
            // Se usa una copia del producto y se le añade la propiedad 'quantity'
            cart.push({ ...productToAdd, quantity: 1 });
        }

        // Guarda el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(`Producto ID ${parsedProductId} añadido al carrito.`);

        updateCartCount(); // Actualiza el contador del navbar
        alert(`"${productToAdd.name}" se ha añadido al carrito.`);
    } else {
        console.error(`Producto con ID ${parsedProductId} no encontrado.`);
    }
}


/**
 * Función que crea el HTML de la card y la añade a un contenedor.
 */
function addItemCard(item, containerElement) {
    const priceDisplay = item.price ? '$' + item.price + ' MXN' : 'Precio no disponible';

    const itemHTML =
        `<div class="col-12 col-md-6 col-lg-4 mb-4">
            <div class="product-card">
                <div class="product-image">
                    <img src="${item.imageURL}" alt="${item.name}" />
                </div>
                <div class="product-content">
                    <h3 class="product-title">${item.name}</h3>
                    <p class="product-price">${priceDisplay}</p>
                    <p class="product-description">${item.description}</p>
                </div>
                <button class="product-button add-to-cart-btn" data-product-id="${item.id}">Agregar al carrito</button>
            </div>
        </div>`;

    containerElement.insertAdjacentHTML('beforeend', itemHTML);
}

/**
 * Esta función se ejecutará cuando el DOM de la página (clasicas.html o coleccion.html) esté listo.
 */
document.addEventListener('DOMContentLoaded', () => {

    const coleccionContainer = document.getElementById("list-items");
    const clasicasContainer = document.getElementById("productosContainer");

    let pageCategory = null;
    let targetContainer = null;

    if (coleccionContainer) {
        // coleccion.html
        pageCategory = "coleccion";
        targetContainer = coleccionContainer;
    } else if (clasicasContainer) {
        // clasicas.html
        pageCategory = "clasicas";
        targetContainer = clasicasContainer;
    } else {
        // MODIFICACIÓN: Actualizar contador si no estamos en una página de productos
        updateCartCount();
        return;
    }
    //limpiamos container 
    targetContainer.innerHTML = '';
    targetContainer.classList.add('row');

    // Cargar desde localStorage
    const itemsController = new ItemsController();
    itemsController.loadItemsFromLocalStorage();
    const allProducts = itemsController.items;

    const filteredProducts = allProducts.filter(item => item.category === pageCategory);

    if (filteredProducts.length === 0) {
        targetContainer.innerHTML = '<p class="col-12 text-center">No hay productos en esta categoría.</p>';
        // MODIFICACIÓN: Actualizar contador si no hay productos
        updateCartCount();
        return;
    }

    for (const item of filteredProducts) {
        addItemCard(item, targetContainer);
    }

    // --- INICIO DE MODIFICACIONES AÑADIDAS (EVENT LISTENER) ---

    // Añadir el listener al contenedor principal (Delegación de Eventos)
    targetContainer.addEventListener('click', (event) => {
        // Solo si el elemento clicado tiene la clase 'add-to-cart-btn'
        if (event.target.classList.contains('add-to-cart-btn')) {
            const productId = event.target.dataset.productId;
            handleAddToCart(productId, itemsController);
        }
    });

    // Cargar el contador inicial del carrito al cargar la página
    updateCartCount();

});