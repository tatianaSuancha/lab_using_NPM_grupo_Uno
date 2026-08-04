const fechaInput = document.getElementById("fecha");

// obtener la fecha de hoy
const hoy = new Date();
// convierto la fecha al formato que necesita el input (yyyy-mm-dd)
const fechaActual = hoy.toISOString().split("T")[0];
//  el usuario no pueda seleccionar una fecha futura
fechaInput.max = fechaActual;

// escucho cuando el usuario cambia la fecha
fechaInput.addEventListener("change", () => {
    const fechaSeleccionada = fechaInput.value;

    if (fechaSeleccionada === "") {
        alert("por favor selecciona una fecha");
        return;
    }
    // comparo la fecha elegida con la fecha de hoy
    if (fechaSeleccionada > fechaActual) {

        alert("no puedes seleccionar una fecha futura");

        fechaInput.value = "";
        return;
    }
    console.log("fecha seleccionada:", fechaSeleccionada);

});