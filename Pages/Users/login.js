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
                    turtle.eyes.forEach(eye => {
                        eye.style.background = '#9ca876';
                        eye.style.borderRadius = '50%';

                        const pupil = eye.querySelector('.turtle-pupil');
                        if (pupil) {
                            pupil.style.opacity = '0';
                        }
                    })
                });
            } else {
                Object.values(turtles).forEach(turtle => {
                    turtle.eyes.forEach(eye => {
                        eye.style.background = '';
                        eye.style.borderRadius = '';
                        eye.style.boxShadow = ''; 
                        eye.style.transform = '';

                        const pupil = eye.querySelector('.turtle-pupil');
                        if (pupil) {
                            pupil.style.opacity = '';
                        }
                    })
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
                eye.style.height = '';
                eye.style.borderTop = '';
                eye.style.borderRadius = '';
                eye.style.transform = '';
                eye.style.background = '';
                eye.style.border = '';
                eye.style.boxShadow = '';

                const pupil = eye.querySelector('.turtle-pupil');
                if (pupil) {
                    pupil.style.opacity = '';
                }
            });
            turtle.mouth.classList.remove('happy', 'sad', 'laughing', 'angry');
        });
    }

    document.addEventListener('mousemove', function (e) {
        if (passwordInput === document.activeElement) {
            return;
        }
        Object.values(turtles).forEach(turtle => {
            const firstPupil = turtle.eyes[0].querySelector('.turtle-pupil');
            if (!firstPupil) return;

            const eyeRect = turtle.eyes[0].getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;
            const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
            const distance = Math.min(2.5, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 100);
            const pupilX = Math.cos(angle) * distance;
            const pupilY = Math.sin(angle) * distance;

            turtle.eyes.forEach(eye => {
                const pupil = eye.querySelector('.turtle-pupil');
                if (pupil) {
                    pupil.style.transform = 'translate(' + pupilX + 'px, ' + pupilY + 'px)';
                }
            });
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

            turtles.main.eyes.forEach(eye => {
                eye.style.background = '#9ca876';
                eye.style.borderRadius = '50%';

                const pupil = eye.querySelector('.turtle-pupil');
                if (pupil) {
                    mainPupilRight.style.opacity = '0';
                }
            });
            const directions = [
                'translate(-2px, -2px)','translate(2px, -2px)',
                'translate(-2px, 2px)', 'translate(2px, 2px)',
                'translate(-3px, 0)', 'translate(3px, 0)',
                'translate(0, -3px)', 'translate(0, 3px)'
            ];
            let directionsIndex = 0;
            Object.keys(turtles).forEach(key => {
                if (key !== 'main') {
                    const turtle = turtles[key];
                    turtle.eyes.forEach(eye => {
                        const pupil = eye.querySelector('.turtle-pupil');
                        if (pupil) {
                            pupil.style.transform = directions[directionsIndex % directions.length]; 
                        }
                    });
                    directionsIndex++;
                }
            });
        }});

    passwordInput.addEventListener('blur', function () {
        mainTurtleHands.classList.remove('visible');
        mainTurtleHead.classList.remove('covering');
        if (this.getAttribute('type') === 'password') {
            turtles.main.eyes.forEach(eye => {
                eye.style.background = '';
                eye.style.borderRadius = '';
                eye.style.boxShadow = '';
                eye.style.transform = '';

                const pupil = eye.querySelector('.turtle-pupil');
                if (pupil) {
                    pupil.style.opacity = '';
                }
            });
        }
    });

    // agrego que la sonrisa de las tortugas solo dure 3 segundas porque mas tiempo se ven raras
    let emailValidationTimeout;
    emailInput.addEventListener('input', function () {
        const email = this.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        clearTimeout(emailValidationTimeout);

        if (emailRegex.test(email)) {
            resetAllTurtles();
            Object.values(turtles).forEach(turtle => {
                turtle.element.classList.add('jump');
                turtle.eyes.forEach(eye => eye.classList.add('happy'));
                turtle.mouth.classList.add('happy');
    });

    emailValidationTimeout = setTimeout(() => {
                resetAllTurtles();
            }, 3000);
        }
    });

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let hasError = false;

        // Ocultar el error de autenticación al re-intentar
        const loginAuthError = document.getElementById('loginAuthError');
        if (loginAuthError) {
            loginAuthError.style.display = 'none';
        }

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

        // Lógica de Autenticación ---
        if (hasError) {
            resetAllTurtles();
            turtles.main.head.classList.add('shake-no');
            turtles.main.eyes.forEach(eye => eye.classList.add('angry'));
            turtles.main.mouth.classList.add('angry');

        } else {

            const usuariosRegistrados = JSON.parse(localStorage.getItem('users')) || [];

            // Buscamos al usuario por email Y contraseña
            const usuarioEncontrado = usuariosRegistrados.find(
                user => user.email === email && user.password === password
            );

            if (usuarioEncontrado) {
                // --- Usuario encontrado ---
                resetAllTurtles();
                Object.values(turtles).forEach((turtle, index) => {
                    setTimeout(() => {
                        turtle.element.classList.add('jump');
                        turtle.eyes.forEach(eye => eye.classList.add('happy'));
                        turtle.mouth.classList.add('happy');
                    }, index * 150);
                });

                // Guardar al usuario en sessionStorage para saber que está logueado
                sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioEncontrado));

                // Mostrar bienvenida y redirigir
                setTimeout(() => {
                    alert('¡Bienvenido a Alma de Tortuga! 🐢💚');
                    // Redirigir al inicio o a la página de "Mi Cuenta"
                    /* CREAR UNA PAGINA DE USUARIO! */
                    window.location.href = '../../index.html';
                }, 600);

            } else {
                // --- ¡FALLO! Correo o contraseña incorrectos ---

                // Mostramos el error de autenticación que añadimos en el HTML
                if (loginAuthError) {
                    loginAuthError.style.display = 'block';
                }

                emailInput.classList.remove('is-valid');
                passwordInput.classList.remove('is-valid');

                // Hacemos que las tortugas reaccionen al error
                resetAllTurtles();
                Object.values(turtles).forEach(turtle => {
                    turtle.head.classList.add('shake-no');
                    turtle.mouth.classList.add('sad');
                    turtle.eyes.forEach(eye => {
                        eye.style.height = '10px';
                        eye.style.borderTop = '2px solid #283429';
                        eye.style.borderRadius = '50% 50% 0 0';
                        eye.style.transform = 'scaleY(0.6)';
                    });
                });
            }
        }
    });
});