const API_KEY = "OYxg6CHgqlStw3QQI9noYXNIfHm9MScpETZp1y5I";
const API_URL = "https://api.nasa.gov/planetary/apod";
const FAVORITOS_KEY = "apod_favoritos";
const PRIMERA_FECHA_APOD = "1995-06-16";

const fechaInput = document.getElementById("fecha");
const buscarBtn = document.getElementById("buscar");
const apodContenedor = document.getElementById("apod");
const guardarBtn = document.getElementById("guardar");
const favoritosLista = document.getElementById("favoritos");
const mensaje = document.getElementById("mensaje");

let apodActual = null;

function obtenerFechaHoy() {
    return new Date().toISOString().split("T")[0];
}

function mostrarMensaje(texto) {
    mensaje.textContent = texto;
}

async function obtenerAPOD(fecha = "") {
    let url = `${API_URL}?api_key=${API_KEY}`;
    if (fecha) {
        url += `&date=${fecha}`;
    }

    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(datos.msg || "No se pudo obtener la información de la NASA.");
    }

    return datos;
}

function mostrarAPOD(datos) {
    apodActual = datos;

    apodContenedor.innerHTML = `
        <h2>${datos.title}</h2>
        <p>${datos.date}</p>
        ${
            datos.media_type === "image"
                ? `<img src="${datos.url}" alt="${datos.title}" width="600">`
                : `<iframe src="${datos.url}" width="600" height="400" title="${datos.title}"></iframe>`
        }
        <p>${datos.explanation}</p>
    `;

    guardarBtn.disabled = false;
}

async function buscarAPOD(fecha = "") {
    mostrarMensaje("Cargando...");
    guardarBtn.disabled = true;
    try {
        const datos = await obtenerAPOD(fecha);
        mostrarAPOD(datos);
        mostrarMensaje("");
    } catch (error) {
        apodActual = null;
        apodContenedor.innerHTML = "";
        mostrarMensaje(error.message);
    }
}

function validarFecha(fecha) {
    const hoy = obtenerFechaHoy();

    if (fecha > hoy) {
        mostrarMensaje("No puedes seleccionar una fecha futura.");
        return false;
    }

    if (fecha < PRIMERA_FECHA_APOD) {
        mostrarMensaje(`La NASA no tiene APOD antes del ${PRIMERA_FECHA_APOD}.`);
        return false;
    }

    return true;
}

function obtenerFavoritos() {
    return JSON.parse(localStorage.getItem(FAVORITOS_KEY)) || [];
}

function guardarFavoritos(favoritos) {
    localStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritos));
}

function renderFavoritos() {
    const favoritos = obtenerFavoritos();
    favoritosLista.innerHTML = "";

    favoritos.forEach((favorito) => {
        const item = document.createElement("li");
        item.textContent = `${favorito.date} - ${favorito.title}`;
        item.addEventListener("click", () => {
            fechaInput.value = favorito.date;
            buscarAPOD(favorito.date);
        });
        favoritosLista.appendChild(item);
    });
}

function agregarFavorito(datos) {
    const favoritos = obtenerFavoritos();

    if (favoritos.some((favorito) => favorito.date === datos.date)) {
        mostrarMensaje("Esta APOD ya está en tus favoritos.");
        return;
    }

    favoritos.push({ date: datos.date, title: datos.title });
    guardarFavoritos(favoritos);
    renderFavoritos();
    mostrarMensaje("Guardado en favoritos.");
}

buscarBtn.addEventListener("click", () => {
    const fecha = fechaInput.value;

    if (!fecha) {
        mostrarMensaje("Por favor selecciona una fecha.");
        return;
    }

    if (!validarFecha(fecha)) {
        return;
    }

    buscarAPOD(fecha);
});

guardarBtn.addEventListener("click", () => {
    if (apodActual) {
        agregarFavorito(apodActual);
    }
});

fechaInput.max = obtenerFechaHoy();
fechaInput.min = PRIMERA_FECHA_APOD;

renderFavoritos();
buscarAPOD();
