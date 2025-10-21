// 🐢 Efecto de tortugas aleatorias al enviar el formulario
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // evita envío real
        lanzarTortugas();
    });
});

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

/* === Regex ==== */
const form = document.getElementById('formulario-contacto');
const message = document.createElement('p');
message.id = 'form-message';
message.style.textAlign = 'center';
message.style.marginTop = '1rem';
form.appendChild(message);

const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\d{10}$/;

form.addEventListener('submit', function(event){
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();


    if( !nombre || !email || !telefono || !mensaje) {
        message.textContent = 'Por favor completa todos los campos.';
        message.style.color = 'red';
        return;
    }

    if( !emailRegex.test(email) ) {
        message.textContent = 'Por favor escribe una dirección de correo válida.';
        console.log("Correo inválido:", email);
        message.style.color = 'red';
        return;
    }

    if( !phoneRegex.test(telefono) ) {
        message.textContent = 'Por favor escribe un número de teléfono válido de 10 dígitos';
        console.log("Número de teléfono inválido:", telefono);
        message.style.color = 'red';
        return;
    }

    message.textContent = "Formulario válido, enviado con éxito.";
    console.log('Formulario enviado con éxito:', { nombre, email, telefono, mensaje  });
    message.style.color = 'green';

    form.reset();
});
