import axios from "axios";

const API_KEY = "OYxg6CHgqlStw3QQI9noYXNIfHm9MScpETZp1y5I";

export async function obtenerAPOD(fecha = "") {

    let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

    if (fecha) {
        url += `&date=${fecha}`;
    }

    const respuesta = await axios.get(url);

    return respuesta.data;
}

export function mostrarAPOD(datos) {

    const contenedor = document.getElementById("apod");

    contenedor.innerHTML = `
        <h2>${datos.title}</h2>

        <p><strong>Fecha:</strong> ${datos.date}</p>

        ${
            datos.media_type === "image"
                ? `<img src="${datos.url}" alt="${datos.title}" style="max-width:100%; border-radius:10px;">`
                : `<iframe src="${datos.url}" width="100%" height="500"></iframe>`
        }

        <p>${datos.explanation}</p>
    `;
}