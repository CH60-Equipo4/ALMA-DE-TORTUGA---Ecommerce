import { ItemsController } from "./itemsController.js"; // Asegúrate que la ruta sea correcta

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
                <button class="product-button">Agregar al carrito</button>
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
        return;
    }

    for (const item of filteredProducts) {
        addItemCard(item, targetContainer);
    }
});