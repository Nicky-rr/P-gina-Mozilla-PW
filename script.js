document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formulario");
    const mensajeGeneral = document.getElementById("mensaje-general");

    const campos = {
        nombre: document.getElementById("nombre"),
        ci: document.getElementById("ci"),
        contrasenna: document.getElementById("contrasenna"),
        confirmar: document.getElementById("confirmar")
    };

    function mostrarError(id, texto) {
        document.getElementById("error-" + id).textContent = texto;
        campos[id].classList.add("invalido");
    }

    function limpiarErrores() {
        for (const id in campos) {
            document.getElementById("error-" + id).textContent = "";
            campos[id].classList.remove("invalido");
        }
        mensajeGeneral.textContent = "";
        mensajeGeneral.className = "";
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        limpiarErrores();

        const nombre = campos.nombre.value.trim();
        const ci = campos.ci.value.trim();
        const pass = campos.contrasenna.value;
        const confirmar = campos.confirmar.value;
        let valido = true;

        if (nombre === "") {
            mostrarError("nombre", "El nombre no puede estar vacío.");
            valido = false;
        }

        if (ci === "") {
            mostrarError("ci", "El CI no puede estar vacío.");
            valido = false;
        } else if (!/^[0-9]+$/.test(ci)) {
            mostrarError("ci", "El CI solo debe contener números.");
            valido = false;
        } else if (ci.length < 11) {
            mostrarError("ci", "El CI debe tener al menos 11 caracteres (tiene " + ci.length + ").");
            valido = false;
        }

        if (pass === "") {
            mostrarError("contrasenna", "La contraseña no puede estar vacía.");
            valido = false;
        }

        if (confirmar === "") {
            mostrarError("confirmar", "Debe confirmar la contraseña.");
            valido = false;
        } else if (pass !== "" && pass !== confirmar) {
            mostrarError("confirmar", "Las contraseñas no coinciden.");
            valido = false;
        }

        if (valido) {
            mensajeGeneral.textContent = "Datos validados correctamente.";
            mensajeGeneral.className = "ok";
        } else {
            mensajeGeneral.textContent = "Corrija los errores indicados e intente de nuevo.";
            mensajeGeneral.className = "fallo";
        }
    });

    form.addEventListener("reset", limpiarErrores);
});
