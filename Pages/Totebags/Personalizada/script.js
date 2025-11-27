/**
 * Script final para manejar la personalización dinámica de la ToteBag:
 * - Soluciona QuotaExceededError (eliminando DataURL de save).
 * - IMPLEMENTACIÓN: Guarda el NOMBRE legible de la tipografía (ej: "1. Clásica").
 */

// --------------------------------------------------------------------------------
// --- LÓGICA DE CARRITO ---
// --------------------------------------------------------------------------------

// Referencia al botón de añadir al carrito en el offcanvas
const btnAnadirCarrito = document.getElementById('btn-anadir-carrito');


function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

/**
 * Función que recopila todos los datos del formulario para crear el objeto final del carrito.
 */
function collectPersonalizationData() {
    const baseSeleccionada = Array.from(radiosBolsa).find(radio => radio.checked);
    const acabadoSeleccionado = Array.from(radiosAcabado).find(radio => radio.checked);
    const detalleSeleccionado = Array.from(radiosDetalle).find(radio => radio.checked);
    const esFraseConDiseno = detalleSeleccionado && detalleSeleccionado.value === 'fraseDiseno';

    const precios = calcularPrecioTotal();

    // Generar la descripción detallada
    let descriptionDetail = `Base: ${baseSeleccionada ? baseSeleccionada.value.charAt(0).toUpperCase() + baseSeleccionada.value.slice(1) : 'N/A'}`;
    descriptionDetail += `\nAcabado: ${acabadoSeleccionado ? acabadoSeleccionado.id : 'N/A'}`;
    descriptionDetail += `\nDetalle: ${detalleSeleccionado ? detalleSeleccionado.id : 'N/A'}`;

    // --- CAPTURA DEL NOMBRE DE LA TIPOGRAFÍA (TEXTO LEGIBLE) ---
    let selectedTipografiaName = '';
    if (esFraseConDiseno) {
        selectedTipografiaName = selectTipografia.options[selectTipografia.selectedIndex].text.trim();
        descriptionDetail += `\nFrase: "${inputEscribirFrase.value.trim() || 'Sin texto'}"`;
        descriptionDetail += ` | Tipografía: ${selectedTipografiaName}`;
    }


    // El ID ÚNICO se genera con el timestamp
    const uniqueId = Date.now();

    // Obtener color HEX
    const selectedColorHex = Array.from(radiosColorTexto).find(radio => radio.checked)?.dataset.colorHex;

    // Objeto del producto personalizado listo para el carrito
    const personalizedItem = {
        id: uniqueId,
        name: `Tote Personalizada (${baseSeleccionada ? baseSeleccionada.value : ''})`,
        price: precios.total,
        // Usamos la URL genérica para la imagen base, PERO el carrito.js la ignorará si archivoURL existe
        imageURL: "../../../Pictures/Products/Personalizada/ToteClasica.png",
        category: 'personalizada',
        quantity: 1,
        description: descriptionDetail,

        customDetails: {
            base: baseSeleccionada?.value,
            acabado: acabadoSeleccionado?.value,
            detalle: detalleSeleccionado?.value,
            posicionDiseno: selectPosicionDiseno.value,
            texto: esFraseConDiseno ? inputEscribirFrase.value.trim() : null,

            nombreTipografia: esFraseConDiseno ? selectedTipografiaName : null,
            colorTexto: esFraseConDiseno ? (selectedColorHex || '#000000') : null,
            tipografiaClase: esFraseConDiseno ? selectTipografia.value : null,

            archivoAdjunto: inputSubirArchivo.files[0] ? inputSubirArchivo.files[0].name : null,
            archivoURL: imagenPrevia.src.startsWith('data:image') ? imagenPrevia.src : null
        }
    };

    return personalizedItem;
}

/**
 * Guarda el producto personalizado en el carrito (localStorage).
 */
function savePersonalizedItemToCart() {
    if (!verificarSeleccionesMinimas()) {
        alert("Por favor, completa todas las selecciones obligatorias (Base, Acabado, Detalle y Archivo) antes de añadir al carrito.");
        return;
    }

    const personalizedItem = collectPersonalizationData();
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Añadir el ítem único al carrito
    cart.push(personalizedItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartCount();

    alert(`Tote Personalizada añadida al carrito por $${personalizedItem.price} MXN.`);

    // Cerrar el offcanvas (Lógica que funciona)
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasResumen);
    if (bsOffcanvas) {
        bsOffcanvas.hide();
    }
}

// --------------------------------------------------------------------------------
// --- FIN DE LÓGICA DE CARRITO ---
// --------------------------------------------------------------------------------


// 1. Definición de Precios Base y Constantes (Misma)
const preciosBases = {
    'clasica': 450,
    'caparazon': 550,
    'mini': 350
};
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIMES = ['image/png', 'image/jpeg', 'image/jpg'];

// CAMBIO KIM
const progressLine = document.getElementById('progress-line');
const stepItems = document.querySelectorAll('.step-item');
const sectionCards = document.querySelectorAll('.section-card');
// fin cambio kim


// 2. Obtención de Elementos del DOM
const precioTotalStrong = document.getElementById('precio-total');
const precioBaseSpan = document.getElementById('precio-base-seleccionado');

const radiosBolsa = document.querySelectorAll('input[name="bolsaBase"]');
const radiosAcabado = document.querySelectorAll('input[name="tipoAcabado"]');
const radiosDetalle = document.querySelectorAll('input[name="tipoDetalle"]');
const selectTipografia = document.getElementById('tipografia');
const radiosColorTexto = document.querySelectorAll('input[name="colorTexto"]');
const colorSelectorContainer = document.getElementById('color-selector-container');

// Campos de Detalle
const inputEscribirFrase = document.getElementById('escribirFrase');
const selectPosicionTexto = document.getElementById('posicionTexto');
const selectPosicionDiseno = document.getElementById('posicionDiseno');
const inputSubirArchivo = document.getElementById('subirArchivo');

// Elementos de UI y Offcanvas
const previewContenedor = document.getElementById('preview-contenedor');
const imagenPrevia = document.getElementById('imagen-previa');
const btnSiguiente = document.getElementById('btn-siguiente');
const offcanvasResumen = document.getElementById('offcanvasResumen');
const contenidoResumen = document.getElementById('resumen-contenido');

// cambio kim
function actualizarProgreso() {
    let completedSteps = 0;

    // Paso 1: Base seleccionada
    const baseSeleccionada = Array.from(radiosBolsa).some(radio => radio.checked);
    if (baseSeleccionada) {
        completedSteps = 1;
        marcarSeccionCompleta(1);
        habilitarSeccion(2);
    }

    // Paso 2: Acabado y detalle
    const acabadoSeleccionado = Array.from(radiosAcabado).some(radio => radio.checked);
    const detalleSeleccionado = Array.from(radiosDetalle).some(radio => radio.checked);
    if (acabadoSeleccionado && detalleSeleccionado) {
        completedSteps = 2;
        marcarSeccionCompleta(2);
        habilitarSeccion(3);
    }

    // Paso 3: Archivo subido
    const archivoValido = inputSubirArchivo.files.length > 0 && !inputSubirArchivo.classList.contains('is-invalid');
    if (archivoValido) {
        completedSteps = 3;
        marcarSeccionCompleta(3);
        habilitarSeccion(4);
    }

    // Paso 4: Texto (si aplica)
    const esFraseConDiseno = Array.from(radiosDetalle).some(r => r.checked && r.value === 'fraseDiseno');
    if (!esFraseConDiseno || (esFraseConDiseno && inputEscribirFrase.value.trim())) {
        if (completedSteps >= 3) {
            completedSteps = 4;
            marcarSeccionCompleta(4);
        }
    }

    // Actualizar barra de progreso
    const progressPercentage = (completedSteps / 5) * 100;
    if (progressLine) {
        progressLine.style.width = progressPercentage + '%';
    }

    // Actualizar círculos de paso
    stepItems.forEach((item, index) => {
        const stepNum = index + 1;
        item.classList.remove('active', 'completed');

        if (stepNum < completedSteps) {
            item.classList.add('completed');
        } else if (stepNum === completedSteps + 1) {
            item.classList.add('active');
        }
    });
}

function marcarSeccionCompleta(seccionNum) {
    const seccion = document.getElementById(`section-${seccionNum}`);
    if (seccion) {
        seccion.classList.add('completed');
        seccion.classList.remove('active');
    }
}

function habilitarSeccion(seccionNum) {
    const seccion = document.getElementById(`section-${seccionNum}`);
    if (seccion) {
        seccion.classList.remove('disabled');
        seccion.classList.add('active');
    }
}
// fin cambio kim 

// --------------------------------------------------------------------------------
// FUNCIONES DE LÓGICA Y UI
// --------------------------------------------------------------------------------

function verificarSeleccionesMinimas() {
    const baseSeleccionada = Array.from(radiosBolsa).some(radio => radio.checked);
    const acabadoSeleccionado = Array.from(radiosAcabado).some(radio => radio.checked);
    const detalleSeleccionado = Array.from(radiosDetalle).some(radio => radio.checked);

    const archivoSubidoValido = inputSubirArchivo.files.length > 0 && !inputSubirArchivo.classList.contains('is-invalid');

    const ready = baseSeleccionada && acabadoSeleccionado && detalleSeleccionado && archivoSubidoValido;

    if (btnSiguiente) {
        btnSiguiente.disabled = !ready;
    }
    return ready;
}

function calcularPrecioTotal() {
    let precioTotal = 0;
    let precioBaseSeleccionado = 0;

    const baseSeleccionada = Array.from(radiosBolsa).find(radio => radio.checked)?.value;
    if (baseSeleccionada) {
        precioBaseSeleccionado = preciosBases[baseSeleccionada];
        precioTotal += precioBaseSeleccionado;
    }

    const acabadoSeleccionado = Array.from(radiosAcabado).find(radio => radio.checked);
    if (acabadoSeleccionado) {
        precioTotal += parseInt(acabadoSeleccionado.dataset.precio || 0);
    }

    let esFraseConDiseno = false;
    const detalleSeleccionado = Array.from(radiosDetalle).find(radio => radio.checked);

    if (detalleSeleccionado) {
        precioTotal += parseInt(detalleSeleccionado.dataset.precio || 0);
        if (detalleSeleccionado.value === 'fraseDiseno') {
            esFraseConDiseno = true;
        }
    }

    if (esFraseConDiseno) {
        const selectedOption = selectTipografia.options[selectTipografia.selectedIndex];
        if (selectedOption && selectedOption.value !== 'default') {
            const precioTipografia = parseInt(selectTipografia.dataset.precio || 0);
            precioTotal += precioTipografia;
        }
    }

    return { total: precioTotal, base: precioBaseSeleccionado };
}

/**
 * Habilita/deshabilita los campos de la sección de la frase y el color.
 * SE AJUSTÓ LA LÓGICA DE LIMPIEZA POST-ELIMINACIÓN DEL SELECT.
 */
function manejarInteraccionFrase() {
    let esFraseConDiseno = Array.from(radiosDetalle).some(radio => radio.checked && radio.value === 'fraseDiseno');

    // **AJUSTADO:** Solo los campos que quedan.
    const camposFrase = [inputEscribirFrase, selectTipografia, selectPosicionTexto];

    camposFrase.forEach(campo => { campo.disabled = !esFraseConDiseno; });

    // Habilitar/Deshabilitar radios de color y contenedor
    radiosColorTexto.forEach(radio => { radio.disabled = !esFraseConDiseno; });
    if (colorSelectorContainer) {
        if (!esFraseConDiseno) {
            colorSelectorContainer.setAttribute('disabled', 'true');
        } else {
            colorSelectorContainer.removeAttribute('disabled');
        }
    }

    // Limpieza si se deshabilita
    if (!esFraseConDiseno) {
        if (selectTipografia.value !== 'default') selectTipografia.value = 'default';
        inputEscribirFrase.value = '';
        radiosColorTexto.forEach(radio => { radio.checked = false; });
    }
}

function manejarSubidaArchivo() {
    const archivo = inputSubirArchivo.files[0];
    const smallText = inputSubirArchivo.nextElementSibling;

    previewContenedor.style.display = 'none';
    imagenPrevia.style.display = 'none';
    imagenPrevia.src = '';

    if (archivo) {
        let error = null;
        if (archivo.size > MAX_FILE_SIZE) { error = 'El archivo es demasiado grande (Máx. 5MB).'; }
        else if (!ALLOWED_MIMES.includes(archivo.type)) { error = 'Formato no permitido. Usa PNG o JPG.'; }

        if (error) {
            inputSubirArchivo.classList.add('is-invalid');
            smallText.textContent = error;
            smallText.style.color = 'red';
            inputSubirArchivo.value = '';
        } else {
            inputSubirArchivo.classList.remove('is-invalid');
            inputSubirArchivo.classList.add('is-valid');
            smallText.textContent = `Archivo seleccionado: ${archivo.name}`;
            smallText.style.color = 'green';

            const reader = new FileReader();
            reader.onload = function (e) {
                imagenPrevia.src = e.target.result;
                previewContenedor.style.display = 'block';
                imagenPrevia.style.display = 'block';
            };
            reader.readAsDataURL(archivo);
        }
    } else {
        inputSubirArchivo.classList.remove('is-invalid', 'is-valid');
        smallText.textContent = 'Max. 5MB. Formatos: PNG, JPG.';
        smallText.style.color = 'gray';
    }

    actualizarInterfazCompleta();
}


/**
 * Genera el HTML para el resumen VISUAL.
 */
function generarResumenHTML() {
    const baseSeleccionada = Array.from(radiosBolsa).find(radio => radio.checked);
    const acabadoSeleccionado = Array.from(radiosAcabado).find(radio => radio.checked);
    const detalleSeleccionado = Array.from(radiosDetalle).find(radio => radio.checked);

    if (!baseSeleccionada || !acabadoSeleccionado || !detalleSeleccionado) {
        return `<div class="alert alert-warning text-center">Debes seleccionar una **Base**, un **Acabado** y un **Detalle** para generar el resumen.</div>`;
    }

    // 1. OBTENCIÓN DE DATOS PARA EL LIENZO
    const nombreBase = baseSeleccionada.value.charAt(0).toUpperCase() + baseSeleccionada.value.slice(1);
    const imagenBaseURL = `../../../Pictures/Products/Personalizada/Main.png`;
    const urlArchivoSubido = imagenPrevia.src.startsWith('data:image') ? imagenPrevia.src : '';

    const esFraseConDiseno = detalleSeleccionado.value === 'fraseDiseno';
    const textoFrase = esFraseConDiseno ? inputEscribirFrase.value.trim() : '';
    const fontClase = esFraseConDiseno ? selectTipografia.value : '';
    const textoPosicion = esFraseConDiseno ? selectPosicionTexto.value : '';
    const posicionDiseno = selectPosicionDiseno.value;
    const colorSeleccionadoHex = Array.from(radiosColorTexto).find(radio => radio.checked)?.dataset.colorHex || 'var(--color-texto)';

    // 2. GENERACIÓN DEL LIENZO VISUAL (Superposición de Capas)
    const imagenPrincipalHTML = `
        <div class="custom-tote-preview-container">
            <img src="${imagenBaseURL}" alt="Tote Bag Base" class="tote-base-img">
            ${urlArchivoSubido ? `<img src="${urlArchivoSubido}" alt="Diseño" class="tote-diseno ${posicionDiseno}">` : ''}
            ${(esFraseConDiseno && textoFrase) ?
            `<div class="tote-texto ${textoPosicion} ${fontClase}" style="color: ${colorSeleccionadoHex};">${textoFrase}</div>` : ''}
        </div>
    `;

    // 3. Generación del Resumen de Texto
    const resumenFrase = esFraseConDiseno ? `
        <h6 class="mt-3">Opciones de Frase:</h6>
        <ul class="list-unstyled">
            <li>Texto: <strong>"${textoFrase || 'No especificado'}"</strong></li>
            <li>Tipografía: ${selectTipografia.options[selectTipografia.selectedIndex].text.trim()}</li>
            <li>Color: <strong style="color: ${colorSeleccionadoHex};">${colorSeleccionadoHex}</strong></li>
            <li>Posición del Texto: ${selectPosicionTexto.value}</li>
        </ul>
    ` : '';

    const nombreArchivo = inputSubirArchivo.files[0] ? inputSubirArchivo.files[0].name : "No subido";

    return `
        <div class="card mb-3 border-0">
            ${imagenPrincipalHTML}
            <p class="text-center"> *Imagen de Referencia* </p>
        </div>
        <h6>Tu Selección:</h6>
        <ul class="list-unstyled">
            <li><strong>Base:</strong> ${nombreBase}</li>
            <li><strong>Acabado:</strong> ${acabadoSeleccionado.id.charAt(0).toUpperCase() + acabadoSeleccionado.id.slice(1)}</li>
            <li><strong>Detalle:</strong> ${detalleSeleccionado.id.charAt(0).toUpperCase() + detalleSeleccionado.id.slice(1)}</li>
        </ul>
        <h6 class="mt-3">Opciones de Diseño:</h6>
        <ul class="list-unstyled">
            <li>Archivo: <strong>${nombreArchivo}</strong></li>
            <li>Posición: ${selectPosicionDiseno.value}</li>
        </ul>
        ${resumenFrase}
    `;
}


/**
 * Función principal que se ejecuta al cambiar cualquier opción relevante.
 */
function actualizarInterfazCompleta() {
    manejarInteraccionFrase();
    const precios = calcularPrecioTotal();
    precioTotalStrong.textContent = `$${precios.total}`;
    precioBaseSpan.textContent = precios.base > 0 ? `$${precios.base}` : '--';
    verificarSeleccionesMinimas();
    actualizarProgreso();
}

// --------------------------------------------------------------------------------
// 5. Asignación de Event Listeners e Inicialización
// --------------------------------------------------------------------------------

// Eventos para actualizar precio y lógica
document.querySelectorAll('input[name="bolsaBase"], input[name="tipoAcabado"], input[name="tipoDetalle"]').forEach(input => {
    input.addEventListener('change', actualizarInterfazCompleta);
});
selectTipografia.addEventListener('change', actualizarInterfazCompleta);
selectPosicionDiseno.addEventListener('change', actualizarInterfazCompleta);
selectPosicionTexto.addEventListener('change', actualizarInterfazCompleta);
inputEscribirFrase.addEventListener('input', actualizarInterfazCompleta);
inputSubirArchivo.addEventListener('change', manejarSubidaArchivo);
radiosColorTexto.forEach(radio => {
    radio.addEventListener('change', actualizarInterfazCompleta);
});

if (offcanvasResumen) {
    offcanvasResumen.addEventListener('show.bs.offcanvas', function () {
        const precios = calcularPrecioTotal();

        // Generamos el resumen justo antes de que se muestre el Offcanvas
        contenidoResumen.innerHTML = generarResumenHTML();

        // Actualizamos el precio final del botón
        document.getElementById('resumen-precio-final').textContent = `$${precios.total}`;
    });
}

// Listener para el botón de Añadir al Carrito
if (btnAnadirCarrito) {
    btnAnadirCarrito.addEventListener('click', savePersonalizedItemToCart);
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarInterfazCompleta();
    updateCartCount();
});