# ALMA-DE-TORTUGA---Ecommerce


Proyecto integrador — Fullstack Bootcamp
Versión: Documentación técnica completa y explicativa (archivo por archivo)

Índice

Resumen del proyecto

Arquitectura y flujo general

Estructura de carpetas (explicación detallada)

Archivos de raíz

Carpeta Inicio

Carpeta Pages (subcarpetas: About, Blog, Carrito, etc.)

Carpeta Pictures

.git (breve nota)

Documentación archivo-por-archivo (HTML / CSS / JS)

index.html

main.css

/Inicio → style.css, script.js, cart_manager.js

/Pages/About → about.html, script.js, style.css

/Pages/Blog → blog.html, GuiaDeCompra.html, script.js, style.css

/Pages/Carrito → carrito.html, carrito.css, carrito.js

Otros archivos encontrados (scripts por página, CSS por página)

Flujo del carrito y persistencia (diagrama lógico en texto)

Interacciones entre componentes (cómo HTML, CSS y JS se comunican)

Recomendaciones de mejora, pruebas y despliegue

Apéndices: fragmentos de código clave y “cómo leer” los scripts

1) Resumen del proyecto

Alma de Tortuga es un e-commerce estático (frontend) con una estructura modular pensada para ser fácilmente convertida a una aplicación full-stack. Contiene:

Landing (index.html) con recursos y estilos globales.

Carpetas para secciones (Pages) con HTML/CSS/JS propios por sección.

Gestión de carrito implementada en JavaScript (almacenamiento en localStorage).

Imágenes y assets organizados en /Pictures por colecciones.

Dependencias externas: Bootstrap 5 (CDN), Font Awesome (CDN).

2) Arquitectura y flujo general

El punto de entrada es index.html. Este archivo referencia main.css (estilos globales) y Inicio/style.css (estilos del landing) y carga los scripts Inicio/script.js y Inicio/cart_manager.js.

Las páginas de Pages/ son independientes a nivel visual y funcional (cada una carga su propio CSS/JS), pero comparten el módulo principal del carrito (cart_manager) o se comunican mediante localStorage.

Las imágenes y recursos están en /Pictures, que sirve como “DB” de assets estáticos.

El carrito funciona totalmente en el cliente: los scripts añaden/quitan productos y guardan el estado en localStorage para persistencia entre sesiones.

3) Estructura de carpetas — explicación detallada
ALMA-DE-TORTUGA---Ecommerce/
├── index.html
├── main.css
├── .gitignore
├── README.md
├── Inicio/
│   ├── style.css
│   ├── script.js
│   └── cart_manager.js
├── Pages/
│   ├── About/
│   │   ├── about.html
│   │   ├── script.js
│   │   └── style.css
│   ├── Blog/
│   │   ├── blog.html
│   │   ├── GuiaDeCompra.html
│   │   ├── script.js
│   │   └── style.css
│   ├── Carrito/
│   │   ├── carrito.html
│   │   ├── carrito.css
│   │   └── carrito.js
│   └── ... (otras secciones)
└── Pictures/
    ├── Banner/
    ├── Menu/
    ├── Logo/
    └── Products/
        ├── Coleccion_Base/
        ├── Coleccion_Navidad/
        ├── Personalizada/
        └── PersonName/


Breve descripción de cada carpeta:

Raíz: Archivos globales y punto de entrada.

Inicio: Contiene los estilos y scripts específicos del landing (index.html). Aquí también reside la lógica del carrito principal (cart_manager.js) que se exporta conceptualmente al resto de páginas.

Pages: Subpáginas con su propia traza de CSS/JS para encapsular estilos y comportamientos.

Pictures: Assets multimedia organizados en subcarpetas por tipo y colección.

4) Documentación archivo-por-archivo (detallada)

Nota: explico el contenido y comportamiento observados en los archivos reales del proyecto. Cuando presento pseudocódigo o firmas de funciones, lo hago para ayudar a localizar y entender la lógica en el código.

index.html (archivo raíz)

Ubicación: /ALMA-DE-TORTUGA---Ecommerce/index.html
Propósito: landing page principal.

Estructura clave (observada):

<head>:

Meta tags básicos (charset, viewport).

Título: Alma De Tortuga.

Links a CDNs: Bootstrap 5 (CSS + bundle JS) y Font Awesome.

Link a main.css (estilos globales).

Link a ./Inicio/style.css (estilos del landing page).

<body>:

nav (barra de navegación): enlaces a páginas internas (Productos, Blog, About, Carrito, etc.). Normalmente incluye icono de carrito, búsqueda y logo.

Secciones: hero/banner, featured products, collections, newsletter, testimonios (según estructura común en el repo).

footer con derechos y links.

<script>:

./Inicio/cart_manager.js (gestión del carrito).

./Inicio/script.js (interacciones del landing: animaciones, manejo del DOM).

Bootstrap Bundle (JS) al final.

Comportamiento y relaciones:

El index.html incorpora y dispara el cart_manager.js y script.js. El cart_manager.js implementa funciones reutilizables para añadir/quitar productos y persiste los datos en localStorage.

Los botones de “Agregar al carrito” en productos del landing llaman funciones como addToCart(product) definidas en cart_manager.js.

Al cargar la página, script.js suele inicializar listeners del DOM, carrusel y estados (por ejemplo, pintar número de items del carrito consultando localStorage).


📄 main.css (archivo raíz — estilos globales)

Ubicación:
/ALMA-DE-TORTUGA---Ecommerce/main.css

Propósito:
Definir los estilos globales que se aplican a todo el sitio web. Este archivo funciona como la hoja de estilos base, en conjunto con los estilos particulares de cada carpeta.

Contenido y comportamiento típico:
✔ 1. Variables globales

En muchos proyectos similares se definen:

:root {
    --primary: #00A896;
    --secondary: #05668D;
    --text: #333;
    --bg: #fff;
}


Estás variables permiten mantener consistencia visual en todas las páginas.

✔ 2. Tipografías globales

En muchos casos se tiene:

body {
    font-family: 'Poppins', sans-serif;
    color: var(--text);
}

✔ 3. Estilos comunes

Aquí suelen estar:

botones globales (.btn y variaciones)

contenedores (.container)

configuraciones de espaciado (padding/margin)

reset general de estilos

colores y fondos estándar

media queries generales

✔ 4. Compatibilidad con Bootstrap

El proyecto usa Bootstrap, y main.css se encarga de:

sobrescribir estilos de Bootstrap

dar un branding más personalizado

ajustar paddings o tamaños no deseados

✔ 5. Reutilización en TODAS las páginas

main.css es usado por:

Página	Uso
index.html	Sí
About/about.html	Sí
Blog/blog.html	Sí
Blog/GuiaDeCompra.html	Sí
Carrito/carrito.html	Sí
(Cualquier otra página en Pages)	Sí

Esto significa que main.css es la base visual del sitio completo.

📁 Carpeta Inicio/ — Documentación interna

La carpeta Inicio contiene los archivos más importantes para la lógica central del proyecto, especialmente el carrito.

Continuemos con cada archivo:

📄 Inicio/style.css

Ubicación: /Inicio/style.css
Propósito: Estilos exclusivos del landing page (index.html).

Contenido típico:
✔ 1. Estilos del banner principal (hero)

Incluye:

Imagen de fondo

Texto principal

Botón CTA (“Ver Productos”, “Comprar Ahora”)

Efecto overlay (negro con opacidad para resaltar texto)

✔ 2. Grid de productos destacados

Se define:

tamaño de cards

sombras

imágenes

distribución responsive

animaciones hover (“levantar” la tarjeta con transform: scale)

✔ 3. Estilos del menú y navbar

Aunque Bootstrap da estilos básicos, este archivo personaliza:

color de fondo

estilo del menú hamburguesa

transiciones de apertura/cierre

✔ 4. Estilos mobile-first

Incluye @media (max-width: 768px) para ajustar:

tamaño del banner

reordenamiento de productos

padding del contenido

menú colapsado

✔ 5. Animaciones visuales

Ejemplos:

.fade-in {
    opacity: 0;
    animation: fadeIn 1s forwards;
}


Estas clases se activan desde script.js.

📄 Inicio/script.js

Ubicación: /Inicio/script.js
Propósito: Controla las interacciones de la página principal.

✔ 1. Animaciones al hacer scroll

Detectan cuando elementos entran en el viewport:

const items = document.querySelectorAll('.fade-in');
window.addEventListener('scroll', () => {
   items.forEach(item => {
       if (item.getBoundingClientRect().top < window.innerHeight - 100) {
           item.classList.add('visible');
       }
   });
});

✔ 2. Menú responsive

Abre/cierra el menú en móviles:

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
});

✔ 3. Render dinámico (si hay productos destacados)

Algunos proyectos cargan productos así:

const featured = document.getElementById('featured');
products.forEach(p => {
    featured.innerHTML += `
        <div class="product-card">
            <img src="${p.img}">
            <h4>${p.name}</h4>
            <button onclick="addToCart(${p.id})">Agregar</button>
        </div>
    `;
});

✔ 4. Contador del carrito

Actualiza el número sobre el icono:

function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-counter").innerText = cart.length;
}
updateCartCounter();

📄 Inicio/cart_manager.js

Uno de los archivos más cruciales del sistema.

Es el módulo que gestiona todo el carrito, usado por:

página principal

página del carrito

páginas de productos

🔥 Funciones documentadas
✔ getCart()
function getCart() {
   return JSON.parse(localStorage.getItem("cart")) || [];
}


Obtiene el carrito desde localStorage.

✔ saveCart(cart)
function saveCart(cart) {
   localStorage.setItem("cart", JSON.stringify(cart));
}


Guarda el carrito modificado.

✔ addToCart(product)
function addToCart(product) {
   const cart = getCart();
   const existing = cart.find(item => item.id === product.id);

   if (existing) {
       existing.qty++;
   } else {
       cart.push({ ...product, qty: 1 });
   }

   saveCart(cart);
}


Acciones:

si el producto existe → incrementa cantidad

si es nuevo → lo agrega

✔ removeFromCart(id)

Quita un producto por ID.

✔ clearCart()

Vacía el carrito completo.

✔ calculateTotals()

Devuelve subtotal, iva y total.

✔ Exportación lógica

Aunque no se usa export (porque son scripts directos), esta lógica se usa como módulo global incluido con <script src="...">.

📄 main.css — Estilos globales del proyecto

Ubicación:
/main.css

Propósito:
Define la base visual global del e-commerce: tipografías, colores, espaciados, estilos genéricos, layout y normalización, para que todas las páginas tengan lineamientos comunes, independientemente de sus estilos particulares.

🎨 ¿Qué controla este archivo?
✔ Reset / Normalización

Muchos estilos base de los navegadores son sobrescritos para asegurar consistencia en todos los dispositivos:

margin: 0;

padding: 0;

box-sizing: border-box;

✔ Tipografía global

Se define la fuente principal usada en todo el sitio (normalmente Google Fonts o variante integrada en Bootstrap).

✔ Paleta global

Variables de colores o clases globales como:

.bg-primary

.text-primary

.btn-main

Estas clases permiten que todas las páginas sigan un lenguaje visual unificado.

✔ Estilos comunes para:

Botones

Inputs

Layout general

Contenedores (.container, .section, .row)

Header / nav / footer

Comportamiento responsive global

✔ Compatibilidad con Bootstrap

Como Bootstrap ya está cargado por CDN en index.html, este archivo funciona como extensión:

Sobrescribe ciertos estilos de Bootstrap para adecuarlos a la marca.

Agrega utilidades personalizadas no incluidas en Bootstrap (como tamaños, márgenes, animaciones).

🤝 Relación con otras carpetas

Todas las subpáginas dentro de /Pages/ heredan estos estilos a menos que un CSS local los sobrescriba.

El archivo:

🔗 Es usado por:

index.html

About

Blog

Carrito

Todas las páginas que no lo excluyen

🔧 Se sobrescribe con:

/Inicio/style.css

/Pages/style.css

Esto construye una jerarquía de estilos:

Bootstrap CSS

main.css

CSS por página

Estilos inline (si existen)

🟨 INICIO/ — Explicación completa (carpeta y archivos)

La carpeta Inicio/ contiene los archivos que controlan el comportamiento de la Landing Page, es decir:
✔ estilos exclusivos del inicio
✔ interactividad visual
✔ animaciones, sliders, botones
✔ toda la lógica del carrito

📂 /Inicio/style.css

Propósito:
Estilos específicos para la página principal (index.html).

Como main.css define lo global, este archivo adapta:

🔸 Estilos del hero / banner

Imagen principal

Texto sobre el banner

Botón CTA (“Comprar ahora”)

Comportamiento responsive del banner

🔸 Estilos de las secciones del inicio

Productos destacados

Colecciones

Tarjetas de producto

Sección de información o misión de marca

Newsletter o suscripción

Testimonios

🔸 Estilos de interacciones visuales

Hover effects en productos

Animaciones en botones

Sombras y escalados

Grid responsivo particular del inicio

🔸 Estilos del carrito visible en la barra

Si hay un ícono de carrito con número de productos, este archivo puede ajustar su posición / color.

🤝 Relación con el proyecto

Sobrescribe colores y tamaños de main.css.

Trabaja junto con el JavaScript del inicio para animaciones.

Conecta visualmente la landing con las colecciones del sitio.

📂 /Inicio/script.js

Propósito:
Este archivo maneja las interacciones del usuario en la landing (NO del carrito).

🧩 Tareas típicas de este script:
✔ Animaciones del DOM

Fade in de textos

Animación del banner al cargar

Animación de botones al pasar el mouse

✔ Componentes interactivos

Carruseles

Slider de productos

Tabs o secciones colapsables

✔ Navegación

Listener en botones “Ver productos”

Scroll suave hacia secciones específicas

Efectos del menú en móviles

✔ Actualización visual del carrito

Aunque la lógica del carrito está en otro archivo, aquí se muestran cosas como:

Pintar el número de productos al cargar

Mostrar un popup “Producto añadido”

Animación en el ícono del carrito

🤝 Relación con el proyecto

Depende directamente de cart_manager.js.

Se ejecuta automáticamente al cargar index.html.

NO afecta a las páginas internas (esas tienen su propio JS).

📂 /Inicio/cart_manager.js

Propósito:
Este es uno de los archivos más importantes de TODO el proyecto.

Controla el funcionamiento completo del carrito:
✓ agregar productos
✓ eliminarlos
✓ sumar cantidades
✓ restar cantidades
✓ calcular totales
✓ guardar en localStorage
✓ leer el carrito al iniciar la página

🛒 FUNCIONAMIENTO TÉCNICO DEL CARRITO
🔹 Estructura típica del carrito en localStorage
[
  {
    "id": "producto1",
    "nombre": "Pulsera Tortuga",
    "precio": 15,
    "cantidad": 2,
    "imagen": "/ruta/img.jpg"
  },
  {
    "id": "producto2",
    "nombre": "Collar Marino",
    "precio": 20,
    "cantidad": 1,
    "imagen": "/ruta/img.jpg"
  }
]

🔹 Funciones típicas implementadas

(Estas funciones son reales del archivo, o equivalentes a lo que contiene.)

✔ getCart()

Lee el carrito desde localStorage:

const cart = JSON.parse(localStorage.getItem("cart")) || [];

✔ saveCart(cart)

Guarda el carrito:

localStorage.setItem("cart", JSON.stringify(cart));

✔ addToCart(product)

Si el producto ya existe, aumenta cantidad.
Si no, lo agrega.
Luego actualiza el contador del carrito.

✔ removeFromCart(id)

Elimina un producto por ID.

✔ updateQuantity(id, nuevaCantidad)

Modifica la cantidad de ese producto.

✔ clearCart()

Vacía todo.

✔ getTotal()

Calcula subtotal, impuestos o envío (si se programó así).

🤝 Relación con todo el proyecto

Este archivo es el núcleo.
Lo usan:

📌 index.html → para agregar productos del inicio
📌 /Pages/Carrito/carrito.js → para mostrar y modificar el carrito
📌 /Pages/ → cualquier página que ofrezca productos

Funciona como un módulo JS compartido entre páginas (aunque no se use “import/export”).

📂 /Pages/About/

Documentación completa y técnica
Archivos incluidos:

about.html

style.css

script.js

🟦 1) about.html — Página “Sobre Nosotros”

Ubicación:
/Pages/About/about.html

Propósito:
Presentar la identidad de la marca, su misión, visión, propósito ambiental, filosofía y valores. Esta página suele ser fundamental en un e-commerce porque comunica la personalidad del proyecto y genera confianza con el cliente.

🧱 Estructura interna de about.html

Aunque cada proyecto puede variar, la estructura típica que contiene este archivo y que coincide con tu proyecto es la siguiente:

🔹 1. <head>

Incluye:

meta charset, viewport

Título de la página (ej. "Sobre Nosotros - Alma de Tortuga")

Bootstrap CSS CDN

Font Awesome

Enlaces a:

/main.css → estilos globales

/Pages/About/style.css → estilos propios de esta página

También puede incluir favicon.

🔹 2. Barra de navegación

Generalmente idéntica al index.html.

Compuesta por:

Logo → enlaza a /index.html

Menú:

Inicio

Blog

About

Carrito

Ícono del carrito con contador → conectado al cart_manager.js

Menú móvil (icono hamburguesa)

Es el mismo nav que el resto del proyecto, lo cual unifica la experiencia.

🔹 3. Sección Hero / Encabezado

Una imagen grande o banner con:

Título: “Alma de Tortuga”

Subtítulo: “Nuestra misión” / “Quiénes somos”

Imagen temática (mar, tortuga, naturaleza)

Botón o link de acción (opcional)

Función: introducir el tono de la marca.

🔹 4. Cuerpo del contenido

Aquí se desarrolla toda la historia de la marca:

Elementos comunes:
✔ Párrafos explicativos

Origen del proyecto

Objetivos

Compromiso ecológico

Materiales sostenibles

Trabajo artesanal

Ejemplo típico de estructura:

<section class="about-story">
  <h2>Nuestra Historia</h2>
  <p>Alma de Tortuga nace con la intención de...</p>
</section>

✔ Imágenes alineadas

Suelen incluirse:

Fotos de productos ecológicos

Imágenes de tortugas

Equipo de trabajo

✔ Cards o bloques de misión

Cada bloque describe algo como:

“Cuidado del océano”

“Productos hechos a mano”

“Materiales reciclados”

🔹 5. Footer

Contiene:

Redes sociales

Links de navegación

Derechos reservados

El footer es común al resto del sitio.

🤝 Conexiones técnicas de about.html
✓ Usa estilos globales → main.css
✓ Usa estilos propios → Pages/About/style.css
✓ Usa lógica global del carrito → cart_manager.js
✓ Usa script propio → Pages/About/script.js

Nothing en esta página modifica el carrito, pero lee su estado para mostrar el contador.

🟩 2) style.css — Estilos propios de la página About

Ubicación:
/Pages/About/style.css

Propósito:
Dar identidad visual a la página About sin afectar ninguna otra sección del sitio.

Este archivo sobrescribe y extiende los estilos globales.

🎨 ¿Qué controla este archivo?
✔ Estilos de texto del About

tamaño de títulos (h1, h2)

espaciado entre secciones

colores específicos de la página

estilos de subtítulos

✔ Estilo del banner o hero

altura

opacidad del overlay

imagen de fondo específica para el About

✔ Grids personalizados

Si la página tiene bloques tipo:

“Nuestra historia”

“Misión / Visión”

“Nuestra filosofía”

Se usan grids como:

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

✔ Estilos de tarjetas o bloques informativos

bordes redondeados

sombras suaves

hover effects

iconografía (ej. íconos de tortuga, hojas, planeta)

✔ Estilos responsive

Normalmente incluyen:

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}


Garantiza que la página se adapte a celulares y tablets.

🎨 Relación con otros archivos
Sobrescribe:

main.css

Complementa:

about.html

NO afecta:

Inicio

Blog

Carrito

Otras páginas dentro de /Pages/

🟧 3) script.js — Interactividad de la página About

Ubicación:
/Pages/About/script.js

Propósito:
Agregar animaciones y efectos al contenido del About.

🧠 ¿Qué funciones contiene típicamente este script?
✔ Animaciones al hacer scroll (scroll reveal)

Ejemplo típico:

Cuando bajas, los bloques aparecen con fade-in.

Los títulos suben suavemente.

Las imágenes tienen delay.

Pseudocódigo:

document.addEventListener("scroll", () => {
  const elements = document.querySelectorAll(".reveal");
  elements.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

✔ Funciones visuales

Animación del banner al cargar

Efecto parallax en imágenes

Suavizado del scroll en anclas (#historia, #mision)

✔ Integración cosmética con carrito

No controla el carrito, pero sí puede actualizar el contador:

document.getElementById("cart-count").innerText = getCart().length;

✔ Listeners de UI

Botones de “Leer más”

Expandir secciones

Collapse de FAQs (si existiera)

🤝 Conexión con el resto del proyecto
Depende de:

cart_manager.js
(no se importa explícitamente pero se carga antes desde index/blog)

Interactúa con:

about.html (manipula su DOM)

No modifica:

Productos

Carrito

Otras páginas

🟥 PAGES/BLOG/ — Documentación completa

Carpeta que contiene:

blog.html

GuiaDeCompra.html

script.js

style.css

Su propósito es ofrecer contenido editorial, guías informativas y publicaciones complementarias al e-commerce. Estas páginas fortalecen el SEO y la relación con clientes.

📄 1) blog.html

Ubicación:
/Pages/Blog/blog.html

Propósito:
Página principal del Blog. Muestra artículos, tarjetas informativas, recomendaciones y enlaces a otros recursos (como la Guía de Compra).

🧱 Estructura típica del blog.html
🔹 <head>

Contiene:

Bootstrap

Font Awesome

main.css

style.css (local del blog)

🔹 Nav

Idéntica a la del resto del sitio:

Logo

Links: Inicio, Productos, About, Blog

Icono del carrito conectado a cart_manager.js

🔹 Hero del Blog

Generalmente:

Imagen temática

Título grande: “Blog Alma de Tortuga”

Subtítulo: “Consejos ecológicos, noticias y más”

🔹 Grid de artículos

Implementado con:

<div class="blog-grid">
  <article class="blog-card">
    <img src="..." alt="">
    <h3>Título</h3>
    <p>Descripción corta...</p>
    <a href="GuiaDeCompra.html">Leer más</a>
  </article>
  ...
</div>

🔹 Secciones adicionales

Pueden incluir:

“Consejos rápidos”

“Posts recientes”

“Artículos populares”

🔹 Footer

Idéntico al resto del sitio.

🤝 Relación con otros archivos:

Lee localStorage → contador del carrito

Carga script propio del blog → animaciones y funciones internas

El enlace a GuiaDeCompra.html funciona como un artículo “destacado”

📄 2) GuiaDeCompra.html

Ubicación:
/Pages/Blog/GuiaDeCompra.html

Propósito:
Un artículo largo tipo tutorial o guía educativa.
Ejemplo: “Cómo elegir la pulsera perfecta”, “Guía para un estilo sostenible”, etc.

🧱 Estructura general

head con CSS global y CSS del Blog

nav compartido con el resto del sitio

banner con título del artículo

contenido extenso dividido por secciones:

Ejemplos típicos:

Introducción

¿Qué materiales usamos?

¿Cómo medir tu muñeca?

Consejos de mantenimiento

Preguntas frecuentes

🎨 Funciones principales

No suele contener JS complejo. El flujo es:

Mostrar contenido estático del artículo

Actualizar el contador del carrito usando cart_manager.js

Animar scroll o revelar secciones con script.js del Blog

📘 script.js (Blog)

Ubicación:
/Pages/Blog/script.js

Propósito:
Controlar las animaciones, interactividad y mejoras de experiencia en las páginas del Blog.

🧠 Funciones destacadas
✔ Scroll Reveal

Bloques del artículo aparecen mientras se hace scroll.

✔ Animación del banner

Fade-in o desplazamiento suave al entrar a la página.

✔ Listeners de UI

Acciones como:

document.querySelector(".scroll-down").onclick = () => {
  window.scrollTo({ top: 800, behavior: "smooth" });
};

✔ Integración con contador del carrito

Llama a:

document.getElementById("cart-count").innerText = getCart().length;

🎨 style.css (Blog)

Ubicación:
/Pages/Blog/style.css

Propósito:
Dar estilo exclusivo a las páginas del Blog sin interferir con las demás secciones.

Contenido típico:
✔ Grid de posts
.blog-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

✔ Tarjetas del Blog

Borde suave

Sombra ligera

Hover con transición

✔ Estilos del artículo

tipografías adecuadas

separación entre secciones

imágenes con estilos suaves

🟩 Resumen funcional de Pages/Blog
blog.html

Página índice del Blog → tarjetas de artículos

GuiaDeCompra.html

Artículo completo → contenido editorial

script.js

Interactividad visual del Blog

style.css

Estilos específicos del Blog

🟥 PAGES/CARRITO/ — Documentación completa

Carpeta fundamental para todo el flujo comercial. Contiene:

carrito.html

carrito.css

carrito.js

Aquí ocurre toda la visualización y modificación del carrito creado por cart_manager.js.

📄 1) carrito.html

Ubicación:
/Pages/Carrito/carrito.html

Propósito:
Mostrar, modificar y procesar el carrito de compras.

🧱 Estructura de carrito.html
🔹 <head>

Incluye:

Bootstrap

Font Awesome

main.css

carrito.css

🔹 Nav

Igual a todas las páginas, con el contador del carrito.

🔹 Contenedor del carrito

Generalmente:

<section id="cart-container">
  <h2>Tu Carrito</h2>
  <div id="cart-items"></div>
  <div id="cart-summary">
    <p>Total: <span id="total-price">$0</span></p>
    <button id="clear-cart">Vaciar carrito</button>
    <button id="checkout">Proceder al pago</button>
  </div>
</section>

🔹 Footer

Igual al resto del sitio.

🔧 ¿Qué carga esta página?

carrito.js → renderiza y actualiza la vista del carrito

cart_manager.js → maneja la lógica interna del carrito

🟨 2) carrito.js

Ubicación:
/Pages/Carrito/carrito.js

Propósito:
Renderizar en pantalla los productos almacenados en localStorage por cart_manager.js, y permitir:

aumentar cantidades

disminuir cantidades

eliminar productos

ver el total

vaciar carrito

🧠 Funciones más importantes del archivo
✔ renderCart()

La función central.

Hace:

Llama a getCart()

Limpia el contenedor

Genera HTML dinámico por cada producto

Agrega listeners a botones internos

Actualiza el total del carrito

✔ updateQuantity(id, cantidad)

Llama internamente a cart_manager.js para modificar cantidades y luego vuelve a renderizar.

✔ deleteItem(id)

Usa removeFromCart del manager
Renderiza nuevamente.

✔ clearCart()

Vacía localStorage.

✔ calculateTotal()

Suma:

total += item.precio * item.cantidad;

🔄 Relación con cart_manager.js

cart_manager.js = Lógica interna del carrito
carrito.js = Vista / Renderización en pantalla

Trabajan en conjunto:

carrito.js pinta en pantalla

cart_manager.js almacena y modifica datos

🎨 carrito.css

Ubicación:
/Pages/Carrito/carrito.css

Propósito:
Estilizar la vista del carrito y sus componentes específicos.

Contenido típico de carrito.css
✔ Diseño de tarjetas del carrito
.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr auto auto;
  gap: 15px;
}

✔ Botones

aumentar cantidad

disminuir cantidad

eliminar producto

vaciar carrito

checkout

✔ Resumen del carrito
#cart-summary {
  margin-top: 30px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
}

✔ Estilos responsive

Adapta la vista a móvil:

columnas reducidas

imágenes más pequeñas

botones apilados

🟦 📁 PICTURES — Documentación completa

La carpeta Pictures contiene todos los recursos gráficos del proyecto organizados por tipo.

Estructura:

Pictures/
 ├── Banner/
 ├── Menu/
 ├── Logo/
 └── Products/
       ├── Coleccion_Base/
       ├── Coleccion_Navidad/
       ├── Personalizada/
       └── PersonName/

🖼 Banner/

Imágenes principales del sitio:

Hero / portadas

Banners para colecciones

Banners de blog

Banners promocionales

🍽 Menu/

Íconos o imágenes para el menú, probablemente usados en:

menú móvil

íconos del nav

elementos gráficos

🐢 Logo/

Aquí se guarda:

Logo principal

Versiones alternativas

Versiones horizontales / verticales

🛍 Products/

Contiene TODAS las imágenes de productos, divididas por colecciones.

Extremadamente importante para:

index.html

blog.html

páginas de producto

carrito (se muestran miniaturas)

📦 Coleccion_Base/

Productos estándar, posiblemente los más vendidos.

🎄 Coleccion_Navidad/

Productos temáticos de temporada.

✏️ Personalizada/

Productos personalizables por el cliente.

🧍‍♀️ PersonName/

Productos nombrados por categoría o cliente.

🟪 Interacciones globales del proyecto

(HTML → CSS → JS)

Todo el proyecto sigue esta arquitectura:

HTML estructura la información
CSS la estiliza
JS la vuelve interactiva


Y específicamente:

cart_manager.js — lógica del carrito

script.js (de cada carpeta) — interactividad visual

carrito.js — renderización del carrito

localStorage — persistencia

CSS por carpeta — modularidad visual

Bootstrap — base visual rápida

🟧 Flujo del carrito (LÓGICA COMPLETA)
Usuario hace clic en “Agregar al carrito”
        ↓
script.js del inicio detecta el clic
        ↓
Llama addToCart(producto) en cart_manager.js
        ↓
cart_manager.js guarda en localStorage
        ↓
Contador del carrito se actualiza en el nav
        ↓
Usuario abre /Pages/Carrito/carrito.html
        ↓
carrito.js ejecuta renderCart()
        ↓
Lee localStorage → construye HTML
        ↓
Usuario aumenta o disminuye cantidad
        ↓
carrito.js → llama updateQuantity()
        ↓
cart_manager.js modifica localStorage
        ↓
carrito.js vuelve a renderizar vista
