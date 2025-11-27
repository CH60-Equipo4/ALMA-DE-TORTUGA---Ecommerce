import { ItemsController } from '../itemsController.js';

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

// **FUNCIÓN: Crear producto en el backend**
async function crearProductoEnBackend(productoData) {
    try {
        const response = await fetch('http://localhost:8080/api/v1/products/new-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Producto creado en backend:', data);
            return { success: true, data: data };
        } else {
            const error = await response.json();
            console.error('Error del servidor:', error);
            return { success: false, message: error.message || 'Error al crear producto' };
        }

    } catch (error) {
        console.error('Error de conexión:', error);
        return {
            success: false,
            message: 'No se pudo conectar con el servidor. Verifica que esté corriendo en http://localhost:8080'
        };
    }
}

// Evento de envío
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    alertContainer.innerHTML = "";

    const nombre = document.getElementById("nombre").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const precio = document.getElementById("precio").value;
    const categoria = document.getElementById("categoria").value;
    const imagenURL = document.getElementById("imagenURL").value.trim();
    const stock = document.getElementById("stock").value;

    if (!nombre || !descripcion || !precio || !categoria || !imagenURL) {
        mostrarAlerta("Por favor, completa todos los campos obligatorios.");
        return;
    }


    // **Preparar datos según entidad Product**
    const productoData = {
        name: nombre,                      // name_product en DB
        description: descripcion,          // description_product en DB
        price: parseFloat(precio),         // price (BigDecimal en Java)
        stock: parseInt(stock),
        urlProductImage: imagenURL,        // url_image_product en DB
        category: categoria  // Category enum (COLECCION, CLASICAS)
    };

    // Mostrar JSON generado
    if (jsonCardContainer && resultadoJSON) {
        resultadoJSON.textContent = JSON.stringify(productoData, null, 2);
        jsonCardContainer.style.display = 'block';
    }

    // Guardar en backend primero
    const resultBackend = await crearProductoEnBackend(productoData);
    if (resultBackend.success) {
        // Si se guardó en el backend, también guardamos en localStorage
        const itemsController = new ItemsController();
        itemsController.loadItemsFromLocalStorage();
        itemsController.addItem(nombre, descripcion, precio, imagenURL, categoria);

        mostrarAlerta("¡Producto creado correctamente en el servidor! 🎉", "success");

        // Limpiar formulario
        form.reset();
        if (typeof mensajeContainer !== "undefined" && mensajeContainer) {
            mensajeContainer.style.display = "none";
        }

        // Ocultar JSON después de 2 segundos
        if (jsonCardContainer) {
            setTimeout(() => {
                jsonCardContainer.style.display = 'none';
            }, 2000);
        }

        // Redirigir según categoría
        setTimeout(() => {
            if (categoria === "CLASSIC") {
                window.location.href = "../Clasicas/clasicas.html";
            } else if (categoria === "COLLECTION") {
                window.location.href = "../Coleccion/coleccion.html";
            } else {
                window.location.href = "../Clasicas/clasicas.html";
            }
        }, 2500);

    } else {
        // Si falló el backend, mostramos el error
        mostrarAlerta('Error al crear producto: ' + resultBackend.message, 'danger');
    }
});

// Ocultar tarjeta JSON
if (btnOcultar) {
    btnOcultar.addEventListener("click", () => {
        jsonCardContainer.style.display = "none";
    });
}