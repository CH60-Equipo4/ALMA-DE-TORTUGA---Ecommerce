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
