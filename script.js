// Efecto de tortugas aleatorias al enviar el formulario
function lanzarTortugas() {
    const cantidad = 20; // número total de tortugas
    for (let i = 0; i < cantidad; i++) {
        setTimeout(() => crearTortuga(), Math.random() * 2000);
    }
}

function crearTortuga() {
    const tortuga = document.createElement("div");
    tortuga.classList.add("tortuga");
    tortuga.textContent = "🐢";

    const size = Math.random() * 40 + 20; // tamaño entre 20-60px
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    tortuga.style.left = `${x}vw`;
    tortuga.style.top = `${y}vh`;
    tortuga.style.fontSize = `${size}px`;
    tortuga.style.animationDuration = `${3 + Math.random() * 2}s`;

    document.body.appendChild(tortuga);

    setTimeout(() => tortuga.remove(), 5000);
}

// === Inicialización y Regex ===
const form = document.getElementById('formulario-contacto');
const message = document.createElement('p');
message.id = 'form-message';
message.style.textAlign = 'center';
message.style.marginTop = '1rem';
form.appendChild(message);

const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\d{10}$/;

// Declaramos las variables necesarias antes del event listener para que estén disponibles
const btn = document.getElementById('enviarContacto');
const toast = document.getElementById("toast");
const toastMsg = document.getElementById("toast-message");


// === Animación del Toast (Reubicada) ===
function showToast(message, type = null) {
    toastMsg.textContent = message;

    // Limpia clases anteriores
    toast.classList.remove("success", "error");
    if (type) toast.classList.add(type);

    // Muestra el toast
    toast.classList.add("show");

    // Oculta luego de 4 segundos
    setTimeout(() => {
        toast.classList.remove("show");
    }, 4000);
}

// === Lógica de Envío del Formulario === //
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();


    if (!nombre || !email || !telefono || !mensaje) {
        message.textContent = 'Por favor completa todos los campos.';
        message.style.color = 'red';
        return;
    }

    if (!emailRegex.test(email)) {
        message.textContent = 'Por favor escribe una dirección de correo válida.';
        console.log("Correo inválido:", email);
        message.style.color = 'red';
        return;
    }

    if (!phoneRegex.test(telefono)) {
        message.textContent = 'Por favor escribe un número de teléfono válido de 10 dígitos';
        console.log("Número de teléfono inválido:", telefono);
        message.style.color = 'red';
        return;
    }

    // Validación exitosa: Inicia el proceso de envío
    message.textContent = "Formulario válido, enviado con éxito.";
    console.log('Formulario enviado con éxito:', { nombre, email, telefono, mensaje });
    message.style.color = 'green';

    // Lanzar las tortugas 
    lanzarTortugas();

    // Muestra el estado de envío
    btn.value = 'Enviando Mensaje...';
    showToast("Enviando mensaje...");

    const serviceID = 'default_service';
    const templateID = 'template_sk8kifp';

    // Envío con EmailJS
    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.value = 'Enviar Mensaje';
            showToast("✅ ¡Mensaje enviado correctamente!", "success");
            form.reset();
        }, (err) => {
            btn.value = 'Enviar Mensaje';
            showToast("❌ Error al enviar el mensaje", "error");
            form.reset();
        });

});