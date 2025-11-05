
const form = document.getElementById("formToteBag");
const personalizadaCheck = document.getElementById("personalizada");
const mensajeContainer = document.getElementById("mensajePersonalizadoContainer");
const alertContainer = document.getElementById("alertContainer");
const jsonCardContainer = document.getElementById("jsonCardContainer");
const resultadoJSON = document.getElementById("resultadoJSON");
const btnOcultar = document.getElementById("btnOcultar");


// Mostrar alertas Bootstrap
function mostrarAlerta(mensaje, tipo = "danger") {
    alertContainer.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible fade show" role="alert" id="autoDismissAlert">
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
`;

    // Crear temporizador de 3 segundos
    setTimeout(() => {
        const alerta = document.getElementById("autoDismissAlert");
        if (alerta) {
            // Usar la clase de Bootstrap para animar el cierre
            const alert = bootstrap.Alert.getOrCreateInstance(alerta);
            alert.close();
        }
    }, 3000); // 3000 milisegundos = 3 segundos
}


// Evento de envío
form.addEventListener("submit", (e) => {
    e.preventDefault();
    alertContainer.innerHTML = "";

    const nombre = document.getElementById("nombre").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const precio = document.getElementById("precio").value;
    const categoria = document.getElementById("categoria").value;
    const imagenURL = document.getElementById("imagenURL").value.trim();

    if (!nombre || !descripcion || !precio || !categoria || !imagenURL) {
        mostrarAlerta("Por favor, completa todos los campos obligatorios.");
        return;
    }

    // Crear objeto JSON
    const toteBag = {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        categoria,
        imagenURL
    };

    // Mostrar JSON en tarjeta
    resultadoJSON.textContent = JSON.stringify(toteBag, null, 2);
    jsonCardContainer.style.display = "block";
    mostrarAlerta("¡Producto creado correctamente!", "success");

    // Guardar en localStorage
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos.push(toteBag);
    localStorage.setItem("productos", JSON.stringify(productos));

    // 🔹 Redirigir según categoría (opcional)
setTimeout(() => {
    if (categoria === "clasicas") {
        window.location.href = "../Clasicas/clasicas.html";
    } else if (categoria === "coleccion") {
        window.location.href = "../Coleccion/coleccion.html";
    } else {
        window.location.href = "../Clasicas/clasicas.html"; // valor por defecto
    }
}, 2000);


    // Limpiar formulario
    form.reset();
    if (typeof mensajeContainer !== "undefined") {
        mensajeContainer.style.display = "none";
    }
});

// Ocultar tarjeta JSON
btnOcultar.addEventListener("click", () => {
    jsonCardContainer.style.display = "none";
});