
const form = document.getElementById("formToteBag");
const personalizadaCheck = document.getElementById("personalizada");
const mensajeContainer = document.getElementById("mensajePersonalizadoContainer");
const alertContainer = document.getElementById("alertContainer");
const jsonCardContainer = document.getElementById("jsonCardContainer");
const resultadoJSON = document.getElementById("resultadoJSON");
const btnOcultar = document.getElementById("btnOcultar");

// Mostrar/ocultar campo personalizado
personalizadaCheck.addEventListener("change", () => {
    mensajeContainer.style.display = personalizadaCheck.checked ? "block" : "none";
});

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
    const personalizada = personalizadaCheck.checked;
    const mensajePersonalizado = document.getElementById("mensajePersonalizado").value.trim();
    const imagenURL = document.getElementById("imagenURL").value.trim();

    if (!nombre || !descripcion || !precio || !categoria || !imagenURL) {
        mostrarAlerta("Por favor, completa todos los campos obligatorios.");
        return;
    }

    if (personalizada && !mensajePersonalizado) {
        mostrarAlerta("Por favor, ingresa el mensaje o diseño personalizado.");
        return;
    }

    // Crear objeto JSON
    const toteBag = {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        categoria,
        personalizada,
        mensajePersonalizado: personalizada ? mensajePersonalizado : null,
        imagenURL
    };

     // Crear LocalStorage

    // Mostrar JSON en tarjeta
    resultadoJSON.textContent = JSON.stringify(toteBag, null, 2);
    jsonCardContainer.style.display = "block";
    mostrarAlerta("¡Producto creado correctamente!", "success");

    // Limpiar formulario
    form.reset();
    mensajeContainer.style.display = "none";


    // Método para agregar nombre, descripción, precio, la URL de la imagen, y cuando se creó el item
    function addItem(name, description, price, imageURL, category, createdAt) {
        const item = {
            // Añadimos ID genéricos empezando en 0
            id: this.currentId++,
            name: name,
            description: description,
            price: price,
            imageURL: imageURL,
            category: category,
            createdAt: createdAt || new Date().toLocaleDateString()
        };
        this.items.push(item);
    }


});

// Ocultar tarjeta JSON
btnOcultar.addEventListener("click", () => {
    jsonCardContainer.style.display = "none";
});