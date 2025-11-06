document.addEventListener('DOMContentLoaded', function () {

    // Asegurarnos de que estamos en la página de login
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) {
        // Si no encontramos el formulario de login, no ejecutar nada.
        return; 
    }

    // Elementos del DOM (Login)
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

    // --- Botón para mostrar/ocultar contraseña ---
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target'); // p.ej. "password"
            const passwordInput = document.getElementById(targetId); // input de "password"
            
            if (!passwordInput) return;

            const icon = this.querySelector('i');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');

            // Reacción: todas las tortugas se voltean
            if (type === 'text') {
                Object.values(turtles).forEach(turtle => {
                    turtle.head.classList.add('turn-away');
                });
            } else {
                Object.values(turtles).forEach(turtle => {
                    turtle.head.classList.remove('turn-away');
                });
            }
        });
    });

    // Resto del script de Kim ---
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

    document.addEventListener('mousemove', function (e) {
        if (passwordInput === document.activeElement || passwordInput.type === 'text') {
            return;
        }
        allPupils.forEach(function (pupil) {
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

    passwordInput.addEventListener('focus', function () {
        if (this.type === 'password') {
            mainTurtleHands.classList.add('visible');
            mainTurtleHead.classList.add('covering');
            const mainPupilLeft = document.getElementById('mainPupilLeft');
            const mainPupilRight = document.getElementById('mainPupilRight');
            mainPupilLeft.style.transform = 'translate(0, 0)';
            mainPupilRight.style.transform = 'translate(0, 0)';
        }
    });

    passwordInput.addEventListener('blur', function () {
        mainTurtleHands.classList.remove('visible');
        mainTurtleHead.classList.remove('covering');
    });

    emailInput.addEventListener('input', function () {
        const email = this.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.length > 0) {
            if (emailRegex.test(email)) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                resetAllTurtles();
                turtles.main.element.classList.add('jump');
                turtles.main.eyes.forEach(eye => eye.classList.add('happy'));
                turtles.main.mouth.classList.add('happy');
                turtles.turtle1.element.classList.add('jump');
                turtles.turtle1.eyes.forEach(eye => eye.classList.add('happy'));
                turtles.turtle1.mouth.classList.add('happy');
                turtles.turtle2.eyes.forEach(eye => eye.classList.add('happy'));
                turtles.turtle2.mouth.classList.add('happy');
                turtles.turtle3.head.classList.add('nod-yes');
                turtles.turtle3.eyes.forEach(eye => eye.classList.add('happy'));
                turtles.turtle3.mouth.classList.add('happy');
                turtles.turtle4.element.classList.add('jump');
                turtles.turtle4.eyes.forEach(eye => eye.classList.add('happy'));
                turtles.turtle4.mouth.classList.add('happy');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        } else {
            this.classList.remove('is-valid', 'is-invalid');
            resetAllTurtles();
        }
    });

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let hasError = false;
        if (!emailRegex.test(email)) {
            emailInput.classList.add('is-invalid');
            hasError = true;
        } else {
            emailInput.classList.remove('is-invalid');
            emailInput.classList.add('is-valid');
        }
        if (password.length < 8) {
            passwordInput.classList.add('is-invalid');
            hasError = true;
        } else {
            passwordInput.classList.remove('is-invalid');
            passwordInput.classList.add('is-valid');
        }
        if (hasError) {
            resetAllTurtles();
            turtles.main.head.classList.add('shake-no');
            turtles.main.eyes.forEach(eye => eye.classList.add('angry'));
            turtles.main.mouth.classList.add('angry');
            turtles.turtle1.element.classList.add('scared');
            turtles.turtle1.eyes.forEach(eye => {
                eye.style.transform = 'scale(1.2)';
            });
            turtles.turtle1.mouth.classList.add('sad');
            turtles.turtle2.eyes.forEach(eye => eye.classList.add('happy'));
            turtles.turtle2.mouth.classList.add('laughing');
            turtles.turtle3.eyes.forEach(eye => eye.classList.add('confused'));
            turtles.turtle3.mouth.classList.add('sad');
            turtles.turtle4.eyes.forEach(eye => eye.classList.add('happy'));
            turtles.turtle4.mouth.classList.add('laughing');
            setTimeout(resetAllTurtles, 2000);
        } else {
            resetAllTurtles();
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
});