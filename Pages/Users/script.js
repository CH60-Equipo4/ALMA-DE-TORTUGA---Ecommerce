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

            // 1. Recolectar datos y crear el objeto
            const newUserData = {
                nombre: document.getElementById('nombre').value.trim(),
                apellido: document.getElementById('apellido').value.trim(),
                telefono: telefono.value.trim(),
                email: email.value.trim(),
                password: password.value
            };

            // 2. Guardar los datos en Local Storage
            saveToLocalStorage(newUserData);

            // 3. Mostrar alerta y resetear
            appendAlert('Registro Exitoso! Revisa tu bandeja de entrada!', 'success');
            form.reset();
            form.classList.remove('was-validated');

            // Limpiar clases de validación (is-valid, is-invalid) en campos específicos
            password.classList.remove('is-valid', 'is-invalid');
            confirmPassword.classList.remove('is-valid', 'is-invalid');
            telefono.classList.remove('is-valid', 'is-invalid');
            email.classList.remove('is-valid', 'is-invalid'); // Agregado para limpiar el email

        }
    }, false);

    password.addEventListener('input', validatePasswordMatch);
    confirmPassword.addEventListener('input', validatePasswordMatch);
    telefono.addEventListener('input', validateTelefono);
    email.addEventListener('input', validateEmail);
});



// Escript de Kim para login

// Elementos del DOM
const passwordInput = document.getElementById('password');
const emailInput = document.getElementById('usuario');
const mainTurtleHands = document.getElementById('mainTurtleHands');
const mainTurtleHead = document.getElementById('mainTurtleHead');
const allPupils = document.querySelectorAll('.turtle-pupil');
const togglePasswordButtons = document.querySelectorAll('.toggle-password');

// Elementos de las tortugas
const turtles = {
    main: {
        element: document.querySelector('.turtle-main'),
        head: document.querySelector('.turtle-main .head'),
        eyes: document.querySelectorAll('.turtle-main .eye'),
        mouth: document.querySelector('.turtle-mouth-main')
    },
    turtle1: {
        element: document.querySelector('.turtle-small-1'),
        head: document.querySelector('.turtle-head-1'),
        eyes: document.querySelectorAll('.turtle-small-1 .eye'),
        mouth: document.querySelector('.turtle-mouth-1')
    },
    turtle2: {
        element: document.querySelector('.turtle-small-2'),
        head: document.querySelector('.turtle-head-2'),
        eyes: document.querySelectorAll('.turtle-small-2 .eye'),
        mouth: document.querySelector('.turtle-mouth-2')
    },
    turtle3: {
        element: document.querySelector('.turtle-medium'),
        head: document.querySelector('.turtle-head-3'),
        eyes: document.querySelectorAll('.turtle-medium .eye'),
        mouth: document.querySelector('.turtle-mouth-3')
    },
    turtle4: {
        element: document.querySelector('.turtle-mini'),
        head: document.querySelector('.turtle-head-4'),
        eyes: document.querySelectorAll('.turtle-mini .eye'),
        mouth: document.querySelector('.turtle-mouth-4')
    }
};

// Función para resetear expresiones de todas las tortugas
function resetAllTurtles() {
    Object.values(turtles).forEach(turtle => {
        turtle.element.classList.remove('jump', 'scared');
        turtle.head.classList.remove('shake-no', 'nod-yes', 'turn-away');
        turtle.eyes.forEach(eye => {
            eye.classList.remove('angry', 'happy', 'confused', 'x-eyes');
        });
        turtle.mouth.classList.remove('happy', 'sad', 'laughing', 'angry');
    });
}

// Función para mover todas las pupilas siguiendo el cursor
document.addEventListener('mousemove', function(e) {
    // No mover los ojos si está escribiendo la contraseña o si está visible
    if (passwordInput === document.activeElement || passwordInput.type === 'text') {
        return;
    }

    // Mover cada pupila
    allPupils.forEach(function(pupil) {
        const eye = pupil.parentElement;
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;
        
        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        const distance = Math.min(2.5, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 100);
        
        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;
        
        pupil.style.transform = 'translate(' + pupilX + 'px, ' + pupilY + 'px)';
    });
});

// Botón para mostrar/ocultar contraseña
togglePasswordButtons.forEach(button => {
    button.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        const passwordInput = document.getElementById(targetId);
        const icon = this.querySelector('i');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');

        // Reacción: todas las tortugas se voltean cuando la contraseña es visible
        if (type === 'text') {
            // Contraseña visible - tortugas se voltean
            Object.values(turtles).forEach(turtle => {
                turtle.head.classList.add('turn-away');
            });
        } else {
            // Contraseña oculta - tortugas regresan
            Object.values(turtles).forEach(turtle => {
                turtle.head.classList.remove('turn-away');
            });
        }
    });
});

// Tapar ojos de la tortuga principal cuando escribe la contraseña (si está oculta)
passwordInput.addEventListener('focus', function() {
    if (this.type === 'password') {
        mainTurtleHands.classList.add('visible');
        mainTurtleHead.classList.add('covering');
        
        const mainPupilLeft = document.getElementById('mainPupilLeft');
        const mainPupilRight = document.getElementById('mainPupilRight');
        mainPupilLeft.style.transform = 'translate(0, 0)';
        mainPupilRight.style.transform = 'translate(0, 0)';
    }
});

passwordInput.addEventListener('blur', function() {
    mainTurtleHands.classList.remove('visible');
    mainTurtleHead.classList.remove('covering');
});

// Validación de email en tiempo real
emailInput.addEventListener('input', function() {
    const email = this.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email.length > 0) {
        if (emailRegex.test(email)) {
            // Email válido - ¡Celebración!
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            
            resetAllTurtles();
            
            // Tortuga principal: feliz y salta
            turtles.main.element.classList.add('jump');
            turtles.main.eyes.forEach(eye => eye.classList.add('happy'));
            turtles.main.mouth.classList.add('happy');
            
            // Tortuga 1: muy feliz
            turtles.turtle1.element.classList.add('jump');
            turtles.turtle1.eyes.forEach(eye => eye.classList.add('happy'));
            turtles.turtle1.mouth.classList.add('happy');
            
            // Tortuga 2: sonriente
            turtles.turtle2.eyes.forEach(eye => eye.classList.add('happy'));
            turtles.turtle2.mouth.classList.add('happy');
            
            // Tortuga 3: celebra
            turtles.turtle3.head.classList.add('nod-yes');
            turtles.turtle3.eyes.forEach(eye => eye.classList.add('happy'));
            turtles.turtle3.mouth.classList.add('happy');
            
            // Tortuga 4: emocionada
            turtles.turtle4.element.classList.add('jump');
            turtles.turtle4.eyes.forEach(eye => eye.classList.add('happy'));
            turtles.turtle4.mouth.classList.add('happy');
            
        } else {
            // Email inválido
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
        }
    } else {
        this.classList.remove('is-valid', 'is-invalid');
        resetAllTurtles();
    }
});

// Validación del formulario al enviar
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value;
    const password = passwordInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    let hasError = false;
    
    // Validar email
    if (!emailRegex.test(email)) {
        emailInput.classList.add('is-invalid');
        hasError = true;
    } else {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
    }
    
    // Validar contraseña
    if (password.length < 8) {
        passwordInput.classList.add('is-invalid');
        hasError = true;
    } else {
        passwordInput.classList.remove('is-invalid');
        passwordInput.classList.add('is-valid');
    }
    
    if (hasError) {
        // ERROR: Reacciones negativas
        resetAllTurtles();
        
        // Tortuga principal: enojada y dice que no
        turtles.main.head.classList.add('shake-no');
        turtles.main.eyes.forEach(eye => eye.classList.add('angry'));
        turtles.main.mouth.classList.add('angry');
        
        // Tortuga 1: asustada
        turtles.turtle1.element.classList.add('scared');
        turtles.turtle1.eyes.forEach(eye => {
            eye.style.transform = 'scale(1.2)';
        });
        turtles.turtle1.mouth.classList.add('sad');
        
        // Tortuga 2: se burla
        turtles.turtle2.eyes.forEach(eye => eye.classList.add('happy'));
        turtles.turtle2.mouth.classList.add('laughing');
        
        // Tortuga 3: confundida
        turtles.turtle3.eyes.forEach(eye => eye.classList.add('confused'));
        turtles.turtle3.mouth.classList.add('sad');
        
        // Tortuga 4: también se burla
        turtles.turtle4.eyes.forEach(eye => eye.classList.add('happy'));
        turtles.turtle4.mouth.classList.add('laughing');
        
        setTimeout(resetAllTurtles, 2000);
        
    } else {
        // ÉXITO: ¡Todas celebran!
        resetAllTurtles();
        
        // Todas las tortugas celebran
        Object.values(turtles).forEach((turtle, index) => {
            setTimeout(() => {
                turtle.element.classList.add('jump');
                turtle.eyes.forEach(eye => eye.classList.add('happy'));
                turtle.mouth.classList.add('happy');
            }, index * 100);
        });
        
        setTimeout(() => {
            alert('¡Bienvenido a Alma de Tortuga! 🐢💚');
        }, 600);
    }
});