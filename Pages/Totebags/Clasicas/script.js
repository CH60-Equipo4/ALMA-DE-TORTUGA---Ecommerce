const productos = JSON.parse(localStorage.getItem("productos")) || [];
const contenedor = document.getElementById("productosContainer");

if (productos.length === 0) {
    contenedor.innerHTML = "<p class='text-center'>No hay productos creados aún.</p>";
} else {
    productos.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-12", "col-md-6", "col-lg-4");

        card.innerHTML = `
        <div class="product-card shadow-sm rounded-4 p-3 text-center h-100" style="background-color:#fdfaf3;">
        <img src="${producto.imagenURL}" alt="${producto.nombre}" class="img-fluid rounded-3 mb-3" style="max-height: 280px; object-fit: cover;">
        
        <h5 class="fw-semibold mb-1">${producto.nombre}</h5>
        <p class="fw-bold text-dark mb-1">$${parseFloat(producto.precio).toFixed(2)} MXN</p>
        <p class="text-muted small mb-3">${producto.descripcion}</p>

        <button class="btn btn-success w-100 fw-semibold" style="background-color:#7a9155; border:none;">
        Agregar al carrito
        </button>
        </div>
    `;

        contenedor.appendChild(card);
    });
}
