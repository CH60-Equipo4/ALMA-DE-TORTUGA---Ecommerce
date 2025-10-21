const form = document.getElementById('form');
const message = document.getElementById('message');

const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\d{10}$/; //^\+?52?\s?\d{10}$

form.addEventListener('submit', function(event){
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if( !emailRegex.test(email) ) {
        message.textContent = 'Por favor escribe una dirección de correo válida.';
        message.style.color = 'red';
        return;
    }

    if( !phoneRegex.test(phone) ) {
        message.textContent = 'Por favor escribe un número de teléfono válido de 10 dígitos.';
        message.style.color = 'red';
        return;
    }

    message.textContent = "Formulario válido, enviado con éxito.";
    message.style.color = 'green';
});