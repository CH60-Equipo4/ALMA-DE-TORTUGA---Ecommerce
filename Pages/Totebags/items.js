
function addItemCard(item) {
    //añadimos el signo dfe $ a price, si no esta disponible mostramos no diponible
    const priceDisplay = item.price ? '$' + item.price + 'MXN' : 'Precio no disponible';
    
    //template para añadir nuestras cards de productos
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

    const itemsContainer = document.getElementById("list-items");
    itemsContainer.insertAdjacentHTML('beforeend', itemHTML);
}

//Añadir productos a nuestro id "list-items"
function loadCardsListFromItemsController() {
    const itemsContainer = document.getElementById("list-items");
    itemsContainer.innerHTML = '';
    itemsContainer.classList.add('row');

    for (const item of itemsController.items) {
        addItemCard(item);
    }
}
 //SOLO SI QUIEREMOS LOCAL STORAGE
// itemsController.loadItemsFromLocalStorage();
loadCardsListFromItemsController();