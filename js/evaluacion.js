let puntajesActuales = {
    fluidez: 0,
    precision: 0,
    atencionPalabras: 0,
    usoVoz: 0,
    seguridad: 0,
    comprension: 0
};

// URL de tu formulario (la que me diste)
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdM80NNKROg-v-mIxP3STO0Ax21anhCKaxF_0WcGlEwT7NAzg/formResponse";

function seleccionarNivel(componente, nivel) {
    puntajesActuales[componente] = parseInt(nivel);
    document.querySelectorAll(`.btn-nivel[data-componente="${componente}"]`).forEach(btn => {
        btn.classList.remove('seleccionado');
        if (btn.getAttribute('data-nivel') == nivel) {
            btn.classList.add('seleccionado');
        }
    });
    calcularTotal();
}

function calcularTotal() {
    let suma = 0;
    for (let comp in puntajesActuales) {
        suma += puntajesActuales[comp];
    }
    let nivel = "";
    let color = "";
    if (suma >= 15) {
        nivel = "Nivel esperado (Verde)";
        color = "🟢";
    } else if (suma >= 10) {
        nivel = "En desarrollo (Amarillo)";
        color = "🟡";
    } else {
        nivel = "Requiere apoyo (Rojo)";
        color = "🔴";
    }
    document.getElementById("puntaje-total").innerText = suma;
    document.getElementById("nivel-general").innerHTML = `${color} ${nivel}`;
    document.getElementById("resultado-box").style.display = "block";
}

function verificarComprension(grado) {
    let aciertos = 0;
    let total = 0;
    
    if (grado === 1 || grado === 2) {
        const preg = preguntasComprension[grado];
        if (preg && preg.length > 1) {
            for (let i = 1; i < preg.length; i++) {
                if (preg[i].tipo === "multiple") {
                    total++;
                    let seleccion = document.querySelector(`input[name="preg${i}"]:checked`);
                    if (seleccion && parseInt(seleccion.value) === preg[i].correcta) {
                        aciertos++;
                    }
                }
            }
        }
    } else if (grado === 3) {
        for (let i = 0; i <= 4; i++) {
            let chk = document.getElementById(`check_abierta_${i}`);
            if (chk && chk.checked) {
                aciertos++;
            }
            total++;
        }
    }
    
    let porcentaje = total > 0 ? (aciertos / total) * 100 : 0;
    let nivelComprension = 1;
    if (porcentaje >= 80) nivelComprension = 3;
    else if (porcentaje >= 50) nivelComprension = 2;
    
    puntajesActuales.comprension = nivelComprension;
    calcularTotal();
    return nivelComprension;
}

// Función para enviar datos al formulario de Google
async function enviarDatosACEMEJ(grado, cct, zonaEscolar, puntajeTotal, nivelGeneral) {
    // Crear objeto con los datos a enviar
    const params = new URLSearchParams();
    
    // Mapear los campos según los IDs del formulario
    // Los IDs los obtuve de la estructura del formulario
    params.append("entry.2103818129", new Date().toLocaleDateString('es-MX')); // Fecha
    params.append("entry.1304544216", cct); // CCT
    params.append("entry.773238804", zonaEscolar); // Zona escolar
    params.append("entry.2133955033", grado + "° grado"); // Grado
    params.append("entry.1808190209", puntajesActuales.fluidez.toString()); // Fluidez
    params.append("entry.747946305", puntajesActuales.precision.toString()); // Precisión
    params.append("entry.326947752", puntajesActuales.atencionPalabras.toString()); // Atención
    params.append("entry.1067839395", puntajesActuales.usoVoz.toString()); // Uso de voz
    params.append("entry.1325415441", puntajesActuales.seguridad.toString()); // Seguridad
    params.append("entry.1689114923", puntajesActuales.comprension.toString()); // Comprensión
    params.append("entry.1643008972", puntajeTotal.toString()); // Puntaje total
    
    try {
        // Enviar datos usando fetch (método moderno)
        const response = await fetch(FORM_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: params.toString()
        });
        console.log("Datos enviados a CEMEJ correctamente");
    } catch (error) {
        console.log("Error al enviar datos:", error);
    }
}

function generarFicha(nombreAlumno, grado) {
    if (!nombreAlumno || nombreAlumno.trim() === "") {
        alert("Escribe el nombre del alumno primero.");
        return;
    }
    
    // Solicitar datos de la escuela (solo una vez por evaluación)
    let cct = prompt("Ingresa el CCT de la escuela (ejemplo: 14DPR1234A):");
    if (!cct || cct.trim() === "") {
        alert("El CCT es necesario para el registro. Puedes escribirlo más tarde.");
        return;
    }
    
    let zonaEscolar = prompt("Ingresa la zona escolar (ejemplo: Zona 05):");
    if (!zonaEscolar || zonaEscolar.trim() === "") {
        alert("La zona escolar es necesaria para el registro.");
        return;
    }
    
    let fecha = new Date().toLocaleDateString('es-MX');
    let total = 0;
    for (let c in puntajesActuales) {
        total += puntajesActuales[c];
    }
    
    let nivelTexto = document.getElementById("nivel-general").innerText;
    
    // Enviar datos a CEMEJ (anónimo, sin nombre del alumno)
    enviarDatosACEMEJ(grado, cct, zonaEscolar, total, nivelTexto);
    
    let recomendaciones = "";
    if (puntajesActuales.fluidez <= 1) recomendaciones += "<li>🔴 Fluidez: " + recomendacionesPorComponente.fluidez + "</li>";
    if (puntajesActuales.precision <= 1) recomendaciones += "<li>🔴 Precisión: " + recomendacionesPorComponente.precision + "</li>";
    if (puntajesActuales.atencionPalabras <= 1) recomendaciones += "<li>🔴 Atención a palabras complejas: " + recomendacionesPorComponente.atencionPalabras + "</li>";
    if (puntajesActuales.usoVoz <= 1) recomendaciones += "<li>🔴 Uso de la voz: " + recomendacionesPorComponente.usoVoz + "</li>";
    if (puntajesActuales.seguridad <= 1) recomendaciones += "<li>🔴 Seguridad y disposición: " + recomendacionesPorComponente.seguridad + "</li>";
    if (puntajesActuales.comprension <= 1) recomendaciones += "<li>🔴 Comprensión lectora: " + recomendacionesPorComponente.comprension + "</li>";
    
    if (recomendaciones === "") recomendaciones = "<li>🟢 ¡Muy bien! Sigue practicando con lecturas diarias.</li>";
    
    let htmlFicha = `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; padding: 20px; border: 2px solid #e85f2f; border-radius: 20px;">
            <h2 style="color: #e85f2f;">📋 SAAL - Ficha diagnóstica de lectura</h2>
            <p><strong>Alumno(a):</strong> ${nombreAlumno}</p>
            <p><strong>Grado:</strong> ${grado}° de primaria</p>
            <p><strong>Fecha:</strong> ${fecha}</p>
            <p><strong>CCT:</strong> ${cct}</p>
            <p><strong>Zona escolar:</strong> ${zonaEscolar}</p>
            <hr>
            <h3>Resultado general:</h3>
            <p style="font-size: 1.5rem;">Puntaje total: ${total} / 18</p>
            <p>${nivelTexto}</p>
            <h3>Puntaje por componente:</h3>
            <ul>
                <li>Fluidez: ${puntajesActuales.fluidez}/3</li>
                <li>Precisión: ${puntajesActuales.precision}/3</li>
                <li>Atención a palabras complejas: ${puntajesActuales.atencionPalabras}/3</li>
                <li>Uso de la voz: ${puntajesActuales.usoVoz}/3</li>
                <li>Seguridad y disposición: ${puntajesActuales.seguridad}/3</li>
                <li>Comprensión: ${puntajesActuales.comprension}/3</li>
            </ul>
            <h3>Recomendaciones:</h3>
            <ul>${recomendaciones}</ul>
            <hr>
            <p style="font-size: 0.8rem;">SAAL: Sistema de Alerta y Acompañamiento LEO - Jalisco</p>
            <p style="font-size: 0.7rem;">Esta ficha es un diagnóstico, no una calificación definitiva.</p>
            <p style="font-size: 0.7rem;">Versión 2.0 - Con apoyos visuales</p>
        </div>
    `;
    
    document.getElementById("ficha-contenido").innerHTML = htmlFicha;
    document.getElementById("ficha-area").style.display = "block";
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}