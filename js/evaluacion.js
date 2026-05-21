let puntajesActuales = {
    fluidez: 0,
    precision: 0,
    atencionPalabras: 0,
    usoVoz: 0,
    seguridad: 0,
    comprension: 0
};

// 🔥 URL de tu nuevo Google Apps Script (funciona mágicamente)
const SCRIPT_URL = "https://script.google.com/a/macros/jaliscoedu.mx/s/AKfycbyW0E6HrNEfDosjooYqL4059LS8eaP2KH0vFVNYVPldYATV1fcZG93JWEkJFjMUv3n83g/exec";

function seleccionarNivel(componente, nivel) {
    puntajesActuales[componente] = parseInt(nivel);
    // Actualizar estilos de los botones... (tu código)
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
    // Mostrar resultado (tu código)
    if(document.getElementById("puntaje-total")) document.getElementById("puntaje-total").innerText = suma;
    if(document.getElementById("nivel-general")) document.getElementById("nivel-general").innerHTML = `${color} ${nivel}`;
    if(document.getElementById("resultado-box")) document.getElementById("resultado-box").style.display = "block";
}

// ... (tu función verificarComprension) ...
// Asegúrate de que tu función verificarComprension esté aquí, igual que antes, sin cambios.

// Nueva función para enviar datos de forma automática
async function enviarDatosACEMEJ(grado, cct, zonaEscolar, puntajeTotal, nivel) {
    const payload = {
        fecha: new Date().toLocaleDateString('es-MX'), // O usa new Date().toISOString() si prefieres
        cct: cct,
        zona: zonaEscolar,
        grado: grado + "° grado",
        puntajeTotal: puntajeTotal,
        fluidez: puntajesActuales.fluidez,
        precision: puntajesActuales.precision,
        atencion: puntajesActuales.atencionPalabras,
        usovoz: puntajesActuales.usoVoz,
        seguridad: puntajesActuales.seguridad,
        comprension: puntajesActuales.comprension,
        nivel: nivel // Enviamos el texto completo del nivel
    };

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Importante para que funcione entre diferentes orígenes
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        console.log("✅ Datos enviados a CEMEJ correctamente");
        // Podrías mostrar un pequeño mensaje de éxito no intrusivo
        // alert("Datos registrados automáticamente.");
    } catch (error) {
        console.error("❌ Error al enviar datos:", error);
        alert("Hubo un problema al registrar los datos. Por favor, contacta a soporte.");
    }
}


function generarFicha(nombreAlumno, grado) {
    if (!nombreAlumno || nombreAlumno.trim() === "") {
        alert("Escribe el nombre del alumno primero.");
        return;
    }
    
    let cct = prompt("Ingresa el CCT de la escuela (ejemplo: 14DPR1234A):");
    if (!cct || cct.trim() === "") {
        alert("El CCT es necesario.");
        return;
    }
    
    let zonaEscolar = prompt("Ingresa la zona escolar (ejemplo: Zona 05):");
    if (!zonaEscolar || zonaEscolar.trim() === "") {
        alert("La zona escolar es necesaria.");
        return;
    }
    
    let fecha = new Date().toLocaleDateString('es-MX');
    let total = 0;
    for (let c in puntajesActuales) {
        total += puntajesActuales[c];
    }
    
    let nivelTexto = "No calculado";
    if(document.getElementById("nivel-general")) nivelTexto = document.getElementById("nivel-general").innerText;
    
    // 🔥 Llamada mágica: Envía los datos a tu hoja de cálculo
    enviarDatosACEMEJ(grado, cct, zonaEscolar, total, nivelTexto);
    
    // (Aquí continúa el resto de tu código para mostrar la ficha en la pantalla)
    // ... (tu código para generar el htmlFicha y mostrarlo)
    let recomendaciones = "";
    // ... etc ...
}
