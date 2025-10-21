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