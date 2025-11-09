// ===============================
// VARIABLES DEL DOM (Elemento HTML)
// ===============================
var añadirProductoButton = document.querySelector("#añadirProducto"); // Botón añadir
var añadirProductoInput = document.querySelector("#producto");        // Input texto
var listaProductosDOM = document.querySelector("#listaProductos");    // UL donde van los <li>
var vaciarListaButton = document.querySelector("#resetLista");        // Botón reset lista
var elementoLista = document.getElementsByTagName("li");              // Todos los <li>

// Cargamos los productos desde localStorage al iniciar
var listaProductos = actualizarLista();

// Dibujamos la lista al cargar la página
crearLista();


// ====================================================
// FUNCION: actualizarLista()
// Lee "productos" del localStorage y devuelve un array
// ====================================================
function actualizarLista() {
    // Comprobamos si existe localStorage en el navegador
    if (typeof localStorage !== "undefined") {

        // Obtenemos "productos" como texto y lo convertimos a array con JSON.parse
        var lista = JSON.parse(localStorage.getItem("productos"));

        // Si existe lista → la devolvemos. Si no → devolvemos array vacío
        return lista ? lista : [];
    }
    return [];
}


// ====================================================
// FUNCION: añadirProducto()
// Añade un producto al array y al localStorage
// ====================================================
function añadirProducto(event) {
    event.preventDefault(); // Evita recargar la página

    var producto = añadirProductoInput.value;

    // Validar campo vacío
    if (producto === "") {
        alert("Debes introducir un producto");
        return;
    }

    // Recuperamos la lista actual
    var productos = actualizarLista();

    // Añadimos el producto
    productos.push(producto);

    // Guardamos en localStorage (SIEMPRE EN STRING → JSON.stringify)
    localStorage.setItem("productos", JSON.stringify(productos));

    // Limpiamos input
    añadirProductoInput.value = "";

    // Actualizamos la lista visual
    crearLista();
}


// ====================================================
// FUNCION: crearLista()
// Genera los <li> en el DOM según el localStorage
// ====================================================
function crearLista() {
    var lista = actualizarLista();

    // Primero vaciamos la lista del DOM antes de volver a pintarla
    reinicarLista();

    // Si hay elementos, los creamos uno por uno
    lista.forEach(producto => {
        var productoLista = document.createElement("li"); // Creamos <li>
        productoLista.textContent = producto;             // Metemos texto
        productoLista.addEventListener("dblclick", eliminarUnProducto); // Doble click → eliminar

        listaProductosDOM.appendChild(productoLista); //appendChild() lo inserta al final del <ul>.
    });
}


// ====================================================
// FUNCION: reinicarLista()
// Borra todos los <li> del DOM para redibujar la lista
// ====================================================
function reinicarLista() {
    var productosLista = listaProductosDOM.children;

    // Convertimos HTMLCollection a array para usar forEach
    Array.from(productosLista).forEach(producto => {
        producto.remove(); // Elimina el <li>
    });
}


// ====================================================
// FUNCION: vaciarlista()
// Borra toda la lista del localStorage y del DOM
// ====================================================
async function vaciarlista() {

    // ---- OPCIONAL: ejemplo de fetch si cae en el examen ----
    // (comentado porque no tienes servidor)
    /*
    try {
        const response = await fetch("http://localhost:3000/productos/vaciarlista", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify("hola")
        });

        if (!response.ok) throw new Error("No se pudo vaciar la lista");

        const data = await response.json();
        console.log(data);
    } catch (e) {
        alert("Error al vaciar la lista");
    }
    */
    // ---------------------------------------------------------

    // Vaciamos localStorage
    if (localStorage.getItem("productos")) {
        localStorage.removeItem("productos");
    }

    actualizarLista(); // Actualiza array
    reinicarLista();   // Limpia DOM
}


// ====================================================
// FUNCION: eliminarUnProducto()
// Elimina un solo producto con doble click
// ====================================================
function eliminarUnProducto(event) {

    // Obtengo la lista actual desde localStorage
    var lista = JSON.parse(localStorage.getItem("productos"));

    var listaArray = [];

    // Pasamos la lista a un array manipulable
    Array.from(lista).forEach(elemento => {
        listaArray.push(elemento);
    });

    // Buscamos el índice del producto clicado
    var indiceElemento = listaArray.indexOf(event.target.textContent);

    // Eliminamos el elemento (splice borra por índice)
    if (indiceElemento !== -1) {
        listaArray.splice(indiceElemento, 1);
    }

    // Guardamos la nueva lista actualizada
    localStorage.setItem("productos", JSON.stringify(listaArray));

    // Si la lista queda vacía → vaciar todo
    if (listaArray.length === 0) {
        vaciarlista();
    }

    // Eliminar visualmente el <li>
    event.target.remove();
}


// ====================================================
// EVENTOS DEL DOM
// ====================================================
añadirProductoButton.addEventListener("click", añadirProducto);
vaciarListaButton.addEventListener("click", vaciarlista);



// ------------------------------
// CHULETA EXTRA: REGEX (por si cae)
// ------------------------------
/*
// ===============================
// VALIDAR MATRÍCULA ANTIGUA
// ===============================

// ^ y $ indican inicio y fin
// [A-Z]{1,2}  → 1 o 2 letras iniciales
// -[0-9]{4}-  → guion + 4 números + guion
// ([B-D]|[F-H]|[J-N]|[P-T]|[V-Z]){1,3}
//              → 1 a 3 letras permitidas (sin vocales ni Ñ)

let m = prompt("Matrícula vieja");

let expreg = /^[A-Z]{1,2}-[0-9]{4}-([B-D]|[F-H]|[J-N]|[P-T]|[V-Z]){1,3}$/;

if (expreg.test(m))
    alert("La matrícula es correcta");
else
    alert("La matrícula NO es correcta");




// ===============================
// VALIDAR CONTRASEÑA SEGURA
// ===============================

// ^ y $  → inicio y fin
// (?=.*[a-z])      → mínimo una minúscula
// (?=.*[A-Z])      → mínimo una mayúscula
// (?=.*\d)         → mínimo un número
// (?=.*[^A-Za-z\d])→ mínimo un carácter especial
// .{10,}           → mínimo 10 caracteres en total

const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{10,}$/;

function esPasswordSegura(password) {
    return regexPassword.test(password);
}
*/