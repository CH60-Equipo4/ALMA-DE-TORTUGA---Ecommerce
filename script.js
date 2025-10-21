/* EmailJS y funcionalidad del Toast*/

const btn = document.getElementById('enviarContacto');
const form = document.querySelector("form");
const toast = document.getElementById("toast");
const toastMsg = document.getElementById("toast-message");

document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        btn.value = 'Enviando Mensaje...';
        showToast("Enviando mensaje...");

        const serviceID = 'default_service';
        const templateID = 'template_sk8kifp';

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

// Animación del toast
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
