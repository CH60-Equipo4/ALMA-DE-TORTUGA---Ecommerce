document.addEventListener('DOMContentLoaded', function () {


    const form = document.getElementById('registrationForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const feedbackConfirmPassword = document.getElementById('feedbackConfirmPassword');
    const telefono = document.getElementById('telefono');
    const terminos = document.getElementById('terminos');
    const email = document.getElementById('email');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');

    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            const icon = this.querySelector('i');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });

    function validateTelefono() {

        const phoneRegex = /^[0-9]{10,}$/;
        const isValid = telefono.value.trim() !== '' && phoneRegex.test(telefono.value.trim());

        if (isValid) {
            telefono.classList.remove('is-invalid');
            telefono.classList.add('is-valid');
        } else {
            telefono.classList.add('is-invalid');
            telefono.classList.remove('is-valid');
        }
        return isValid;
    }

    function validateEmail() {

        const emailInput = document.getElementById('email');
        const emailValue = emailInput.value.trim();
        // Regex estándar para verificar formato de email básico (usuario@dominio.extension)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (emailValue === '' || !emailRegex.test(emailValue)) {
            emailInput.classList.add('is-invalid');
            emailInput.classList.remove('is-valid');
            document.getElementById('feedbackEmail').textContent = 'Por favor, ingresa un formato de correo electrónico válido.';
            return false;
        } else {
            emailInput.classList.add('is-valid');
            emailInput.classList.remove('is-invalid');
            return true;
        }
    }


    function validatePasswordMatch() {

        if (password.value !== confirmPassword.value) {
            confirmPassword.classList.add('is-invalid');
            confirmPassword.classList.remove('is-valid');
            feedbackConfirmPassword.textContent = 'Las contraseñas no coinciden.';
            return false;
        } else {

            if (password.checkValidity() && confirmPassword.checkValidity()) {
                confirmPassword.classList.add('is-valid');
                confirmPassword.classList.remove('is-invalid');
            } else if (!confirmPassword.checkValidity()) {
                confirmPassword.classList.add('is-invalid');
                confirmPassword.classList.remove('is-valid');
            }
            return confirmPassword.checkValidity();
        }
    }


    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const appendAlert = (message, type) => {

        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible py-1" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper);
        setTimeout(() => wrapper.remove(), 7000);
    }


    form.addEventListener('submit', function (event) {

        event.preventDefault();
        event.stopPropagation();

        let allValid = true;


        if (!validatePasswordMatch()) {
            allValid = false;
        }

        if (!validateTelefono()) {
            allValid = false;
        }

        if (!validateEmail()) {
            allValid = false;
        }

        if (!form.checkValidity()) {
            allValid = false;
        }

        form.classList.add('was-validated');

        if (allValid) {

            appendAlert('Registro Exitoso! Revisa tu bandeja de entrada!', 'success');
            form.reset();
            form.classList.remove('was-validated');
            password.classList.remove('is-valid', 'is-invalid');
            confirmPassword.classList.remove('is-valid', 'is-invalid');
            telefono.classList.remove('is-valid', 'is-invalid');

        }
    }, false);

    password.addEventListener('input', validatePasswordMatch);
    confirmPassword.addEventListener('input', validatePasswordMatch);
    telefono.addEventListener('input', validateTelefono);
    email.addEventListener('input', validateEmail);
});