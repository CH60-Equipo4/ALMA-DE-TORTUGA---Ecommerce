// Script del formulario de contacto
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Mensaje enviado correctamente ✅");
    form.reset();
  });
});