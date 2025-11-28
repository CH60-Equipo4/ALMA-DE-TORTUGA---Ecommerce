import { ItemsController } from "./itemsController.js";

// -----------------------------------------------------------------------------
// 🛒 LÓGICA DEL CARRITO (usa la función global updateCartCount)
// -----------------------------------------------------------------------------

// Llama a la función global para inicializar el contador del carrito en el navbar.
if (window.updateCartCount) {
    window.updateCartCount();
}

/**
 * Función para manejar la adición de un producto al carrito en localStorage.
 * Soporta productos que usan 'idProduct' (del backend) o 'id' (del fallback).
 */
function handleAddToCart(productId, products) {
    const parsedProductId = parseInt(productId);
    // Busca el producto en el array con el que se renderizó la vista (productos o productsList)
    const productToAdd = products.find(item => (item.idProduct || item.id) === parsedProductId);

    if (productToAdd) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => (item.idProduct || item.id) === parsedProductId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            // Asegura que el producto añadido tenga una cantidad inicial de 1
            cart.push({ ...productToAdd, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(`Producto ID ${parsedProductId} añadido al carrito.`);

        // window.updateCartCount debe estar definida en cart_manager.js
        window.updateCartCount();
        alert(`"${productToAdd.name}" se ha añadido al carrito.`);
    } else {
        console.error(`Producto con ID ${parsedProductId} no encontrado.`);
    }
}

// -----------------------------------------------------------------------------
//  LÓGICA DE CARGA Y RENDERIZADO
// -----------------------------------------------------------------------------

/**
 * Función para cargar productos desde el backend por categoría
 */
async function cargarProductosDesdeBackend(categoria) {
    try {
        // Mapear categorías del frontend al backend
        const categoriaMap = {
            'clasicas': 'CLASSIC',
            'coleccion': 'COLLECTION',
            'personalizada': 'CUSTOM'
        };

        const categoriaBackend = categoriaMap[categoria] || categoria.toUpperCase();

        const response = await fetch(`http://localhost:8080/api/v1/products/category/${categoriaBackend}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const productos = await response.json();
            return productos;
        } else {
            console.error('Error al cargar productos del backend:', response.statusText);
            return [];
        }

    } catch (error) {
        console.error('Error de conexión con el backend:', error);
        return [];
    }
}

/**
 * Función que crea el HTML de la card y la añade a un contenedor.
 */
function addItemCard(item, containerElement) {
    const productId = item.idProduct || item.id;
    const imageUrl = item.urlProductImage || item.imageURL;
    const priceDisplay = item.price ? '$' + item.price + ' MXN' : 'Precio no disponible';

    const itemHTML =
        `<div class="col-12 col-md-6 col-lg-4 mb-4">
            <div class="product-card">
                <div class="product-image">
                    <img src="${imageUrl}" alt="${item.name}" />
                </div>
                <div class="product-content">
                    <h3 class="product-title">${item.name}</h3>
                    <p class="product-price">${priceDisplay}</p>
                    <p class="product-description">${item.description || ''}</p>
                    <p class="product-stock">Stock: ${item.stock || 'N/A'}</p>
                </div>
                <button class="product-button add-to-cart-btn" data-product-id="${productId}">
                    Agregar al carrito
                </button>
            </div>
        </div>`;

    containerElement.insertAdjacentHTML('beforeend', itemHTML);
}

/**
 * Función central para limpiar y renderizar los productos.
 */
function renderProducts(products, container) {
    container.innerHTML = '';
    if (products.length === 0) {
        container.innerHTML = '<p class="col-12 text-center">No hay productos en esta categoría.</p>';
        return;
    }
    for (const item of products) {
        addItemCard(item, container);
    }
}

// -----------------------------------------------------------------------------
// LÓGICA DE ORDENAMIENTO
// -----------------------------------------------------------------------------

/**
 * Lógica para ordenar el array de productos.
 */
function sortProducts(products, sortBy) {
    if (sortBy === 'default') {
        // Devuelve el array sin ordenar si se selecciona 'default'
        return products;
    }

    // Usamos el operador spread para crear una copia y no mutar el array original (allProducts)
    const sortedProducts = [...products];

    sortedProducts.sort((a, b) => {
        // Usamos .name o price, asumiendo que el backend proporciona estos campos.
        const nameA = (a.name || '').toUpperCase();
        const nameB = (b.name || '').toUpperCase();
        const priceA = a.price || 0;
        const priceB = b.price || 0;

        switch (sortBy) {
            case 'name_asc':
                return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
            case 'name_desc':
                return (nameA > nameB) ? -1 : (nameA < nameB) ? 1 : 0;
            case 'price_asc':
                return priceA - priceB;
            case 'price_desc':
                return priceB - priceA;
            default:
                return 0;
        }
    });
    return sortedProducts; // Devuelve la copia ordenada
}

// -----------------------------------------------------------------------------
// INICIALIZACIÓN Y EVENTOS
// -----------------------------------------------------------------------------

// Almacena la referencia a los productos originales cargados (sin ordenar).
let allProducts = [];
let targetContainer = null;

document.addEventListener('DOMContentLoaded', async () => {

    const coleccionContainer = document.getElementById("list-items");
    const clasicasContainer = document.getElementById("productosContainer");
    const sortSelector = document.getElementById("sortSelector");

    let pageCategory = null;

    // 1. Determinar la categoría y el contenedor
    if (coleccionContainer) {
        pageCategory = "coleccion";
        targetContainer = coleccionContainer;
    } else if (clasicasContainer) {
        pageCategory = "clasicas";
        targetContainer = clasicasContainer;
    } else {
        window.updateCartCount();
        return;
    }

    // Mostrar mensaje de carga
    targetContainer.innerHTML = '<p class="col-12 text-center">Cargando productos...</p>';

    // 2. Cargar productos
    allProducts = await cargarProductosDesdeBackend(pageCategory);

    // 3. Fallback (usando la clase ItemsController importada)
    if (allProducts.length === 0) {
        console.log('Backend no disponible. Cargando desde localStorage...');
        const itemsController = new ItemsController();
        itemsController.loadItemsFromLocalStorage();

        const categoriaLocalStorage = pageCategory;
        allProducts = itemsController.items.filter(item =>
            item.category === categoriaLocalStorage ||
            item.category === categoriaLocalStorage.toUpperCase()
        );
    }

    // 4. Renderizar productos inicialmente
    renderProducts(allProducts, targetContainer);

    // 5. Asignar Event Listener para el botón de Agregar al Carrito (delegación)
    targetContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const productId = event.target.dataset.productId;
            // Pasamos el array 'allProducts' para que handleAddToCart pueda encontrar el objeto completo
            handleAddToCart(productId, allProducts);
        }
    });

    // 6. Asignar Event Listener para el Selector de Orden
    if (sortSelector) {
        sortSelector.addEventListener('change', (event) => {
            const sortBy = event.target.value;

            // a) Clonar y ordenar la lista de productos basada en el array original (allProducts)
            const sortedProducts = sortProducts(allProducts, sortBy);

            // b) Re-renderizar la vista con la nueva lista ordenada
            renderProducts(sortedProducts, targetContainer);

            // NOTA: No es necesario re-adjuntar el listener del carrito, 
            // ya que está delegado al 'targetContainer' (el div principal).
        });
    }

    // 7. Actualizar contador del carrito
    window.updateCartCount();
});