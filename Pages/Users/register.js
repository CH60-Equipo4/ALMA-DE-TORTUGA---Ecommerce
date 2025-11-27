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

    function saveToLocalStorage(userData) {

        const userDataJSON = JSON.stringify(userData);
        const existingUsersJSON = localStorage.getItem('users');
        const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];

        // Añadimos el nuevo usuario
        existingUsers.push(userData);

        // Guardamos la lista completa de vuelta en Local Storage
        localStorage.setItem('users', JSON.stringify(existingUsers));

        console.log("Usuario guardado en Local Storage:", userData);
    }

    async function saveToBackend(userData) {
        try {
            const response = await fetch('http://localhost:8080/api/v1/users/new-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: userData.nombre,          
                    lastname: userData.apellido,     
                    email: userData.email,
                    password: userData.password,
                    rol: 'CLIENT'                     // Rol por defecto
                })
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Usuario registrado en backend:', data);
                return { success: true, data: data };
            } else {
                const error = await response.json();
                console.error('Error del servidor:', error);
                return { success: false, message: error.message || 'Error al registrar' };
            }
    
        } catch (error) {
            console.error('Error de conexión:', error);
            return { success: false, message: 'No se pudo conectar con el servidor. Verifica que esté corriendo en http://localhost:8080' };
        }
    }


    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const appendAlert = (message, type) => {

        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible py-1" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper);
        setTimeout(() => wrapper.remove(), 7000);
    }


    form.addEventListener('submit', async function (event) {

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

            // Recolectar datos y crear el objeto
            const newUserData = {
                nombre: document.getElementById('nombre').value.trim(),
                apellido: document.getElementById('apellido').value.trim(),
                telefono: telefono.value.trim(),  // Se guarda en localStorage
                email: email.value.trim().toLowerCase(),
                password: password.value
            };

             // **Guardar en Backend primero**
            const result = await saveToBackend(newUserData);

          if (result.success) {
            // También guardamos en localStorage como respaldo
            saveToLocalStorage(newUserData);

            appendAlert('Registro Exitoso! Revisa tu bandeja de entrada!', 'success');

            form.reset();
            form.classList.remove('was-validated');
            password.classList.remove('is-valid', 'is-invalid');
            confirmPassword.classList.remove('is-valid', 'is-invalid');
            telefono.classList.remove('is-valid', 'is-invalid');
            email.classList.remove('is-valid', 'is-invalid');

            // Redirigir al login
            setTimeout(() => {
                window.location.href = '../Users/logIn.html';
            }, 2000);
        } else {
            // Mostrar error del servidor
            appendAlert('Error: ' + result.message, 'danger');
        }
    }
}, false);

    password.addEventListener('input', validatePasswordMatch);
    confirmPassword.addEventListener('input', validatePasswordMatch);
    telefono.addEventListener('input', validateTelefono);
    email.addEventListener('input', validateEmail);
});



// Validacion de numero y letra en la contraseña
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const feedbackPassword = document.getElementById("feedbackPassword");
const feedbackConfirm = document.getElementById("feedbackConfirmPassword");

// Expresión regular: mínimo 8 caracteres, una mayúscula y un número
const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;

    if (!regex.test(password)) {
        passwordInput.classList.add("is-invalid");
        feedbackPassword.textContent =
            "Debe tener mínimo 8 caracteres, 1 mayúscula y 1 número.";
    } else {
        passwordInput.classList.remove("is-invalid");
        passwordInput.classList.add("is-valid");
    }
});

confirmPasswordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    const confirm = confirmPasswordInput.value;

    if (password !== confirm) {
        confirmPasswordInput.classList.add("is-invalid");
    } else {
        confirmPasswordInput.classList.remove("is-invalid");
        confirmPasswordInput.classList.add("is-valid");
    }
});
