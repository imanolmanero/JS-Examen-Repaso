// ===============================================
// ===== CHULETA COMPLETA ASYNC / AWAIT + FETCH ===
// ===============================================

// ------------ ¿QUÉ ES ASYNC/AWAIT? --------------

// async → convierte la función en ASÍNCRONA (devuelve una Promesa).
// await → espera a que una Promesa termine (solo dentro de async).
// try/catch → sirve para capturar errores como en código normal.


// ===============================================
// 1) PETICIÓN GET (Leer datos)
// ===============================================

async function hacerGET() {
    try {
        // fetch devuelve una Promesa → await espera el resultado
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");

        // response.ok es true cuando la respuesta es 200–299
        if (!response.ok) {
            throw new Error("Error en la petición: " + response.status);
        }

        // Convertimos a JSON (también es una Promesa)
        const datos = await response.json();

        console.log("Datos obtenidos:", datos);

    } catch (error) {
        console.error("Error capturado:", error);
    }
}


// ===============================================
// 2) PETICIÓN POST (Enviar datos)
// ===============================================

async function hacerPOST() {

    const nuevoPost = {
        title: "Título de ejemplo",
        body: "Contenido del post",
        userId: 1
    };

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",                   // Método HTTP
            headers: {
                "Content-Type": "application/json"  // Indicamos que enviamos JSON
            },
            body: JSON.stringify(nuevoPost)  // Convertimos objeto → texto JSON
        });

        if (!response.ok) {
            throw new Error("Error en el POST: " + response.status);
        }

        const data = await response.json();
        console.log("POST exitoso:", data);

    } catch (error) {
        console.error("Error:", error);
    }
}


// ===============================================
// 3) PETICIÓN PUT (Actualizar datos)
// ===============================================

async function hacerPUT() {

    const datosActualizados = {
        title: "Título actualizado",
        body: "Nuevo contenido",
        userId: 1
    };

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosActualizados)
        });

        if (!response.ok) {
            throw new Error("Error en el PUT: " + response.status);
        }

        const data = await response.json();
        console.log("PUT correcto:", data);

    } catch (error) {
        console.error("Error:", error);
    }
}


// ===============================================
// 4) PETICIÓN DELETE (Eliminar datos)
// ===============================================

async function hacerDELETE() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Error al eliminar: " + response.status);
        }

        console.log("Recurso eliminado correctamente");

    } catch (error) {
        console.error("Error:", error);
    }
}


// ===============================================
// 5) SUBIR ARCHIVOS (FormData + fetch)
// ===============================================

// IMPORTANTE PARA EXAMEN:
// FormData se usa para enviar archivos (NO se usa JSON aquí)

async function subirArchivo(archivo) {

    // FormData se usa para empaquetar archivos y otros datos
    const formData = new FormData();

    // "archivo" es el nombre de la clave que recibirá el servidor
    formData.append("archivo", archivo);

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: formData           // Aquí NO van headers → fetch los añade solo
        });

        if (!response.ok) {
            throw new Error("Error al subir archivo: " + response.status);
        }

        const data = await response.json();
        console.log("Archivo subido correctamente:", data);

    } catch (error) {
        console.error("Error al subir archivo:", error);
    }
}


// ===============================================
// 6) EVENTO PARA SUBIR ARCHIVO EN HTML
// ===============================================

// (Simulación de un input <input type="file" id="fileInput">)

document.getElementById("fileInput").addEventListener("change", async (e) => {

    const archivo = e.target.files[0];  // Primer archivo seleccionado

    if (!archivo) {
        alert("Selecciona un archivo primero");
        return;
    }

    await subirArchivo(archivo);  // Llamamos a la función de arriba
});
