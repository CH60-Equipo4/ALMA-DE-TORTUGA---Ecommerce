const productos = JSON.parse(localStorage.getItem("productos")) || [];
const contenedor = document.getElementById("productosContainer");

if (productos.length === 0) {
    contenedor.innerHTML = "<p class='text-center'>No hay productos creados aún.</p>";
} else {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-md-4");
    
        card.innerHTML = `
        <div class="col-12 col-md-6 col-lg-4 mb-4">
            <div class="product-card">
                <div class="product-image">
                    <img src="${producto.imagenURL}" alt="${producto.nombre}" />
                </div>
                <div class="product-content">
                    <h3 class="product-title">${producto.nombre}</h3>
                    <p class="product-price">$${producto.precio}</p>
                    <p class="product-description">${producto.descripcion}</p>
                </div>
                <button class="product-button">Agregar al carrito</button>
            </div>
        </div>`;
        
        contenedor.appendChild(card);
    });
    
}