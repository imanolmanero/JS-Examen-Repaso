// Variables globales
let botonAnadir = document.getElementById("banadir");
const nuevoElemento= document.getElementById("canadir");
var listaCompra = document.querySelector("#listaCompra");


// Eventos
// Añadir un elemento a la lista de la compra
botonAnadir.addEventListener("click",fanadir);
// Vaciar la lista de la compra
document.getElementById("resetear").addEventListener("click",resetear);


// Llamada a la función que lee cookies nada más cargar la página. También se puede usar el evento onload (segunda versión)
rellenarContenido();

// Temporizador para que de tiempo al doble click
let temporizador;
const retrasoDobleClick = 300;


function fanadir()
{
    try
    {
        // Validaciones
        if (nuevoElemento.value == "")
            throw "No se pueden añadir elementos a la lista vacíos";

        // Creación del elemento.
        let lista = document.createElement("li");
        let texto = document.createTextNode(nuevoElemento.value);
        lista.appendChild(texto);
        listaCompra.appendChild(lista);

        // Comportamiento
        lista.addEventListener("dblclick", eliminarLi);
        lista.addEventListener("click", modificarLi);

        nuevoElemento.value = "";

        actualizarCookie();
    }
    catch(e)
    {
        alert(e);
        nuevoElemento.focus();
    }
}


function actualizarCookie()
{
    // Crea o modifica la cookie
    let d = new Date();

    d.setTime(d.getTime() + (7*24*60*60*1000)); // caduca en 7 días
    let expires = "expires="+ d.toUTCString(); // formato fecha

    let valor = "compra=" + listaCompra.innerHTML+ ';'+ expires;
    document.cookie = valor;
}

function resetear()
{
    // Quitar graficamente
    listaCompra.innerHTML ="";
    // Quitar del almacenamiento
    document.cookie = "compra=; max-age=0";
}

function rellenarContenido()
{
    // Si hay algo en la lista de la compra hay que mostrarlo.
    // compra es el nombre de la cookie
    let nombre = "compra=";
    let c=document.cookie; // lee todas
    if (c.indexOf(nombre) != -1 && nombre.length != c.length) // La cookie nombre existe y no está vacía
    {

        /* Mostrar los productos que ya están en la lista. 
        En mi caso solo hay una cookie si fueran varias tendríamos que
        convertir el string en un array y buscar por nombre */

        // quito compra= y ya tento todo el html
        listaCompra.innerHTML = c.substring(nombre.length,c.length); 

        // los li añadidos no tienen el comportamiento.
        let i=0;
        elementosLista = document.getElementsByTagName("li");
        while(i<elementosLista.length)
        {
            // Eliminar elemento de la lista
            elementosLista[i].addEventListener("dblclick",eliminarLi);
            // Modificar el elemento de la lista
            elementosLista[i].addEventListener("click",modificarLi);
            i++;
        }
    }
};

function eliminarLi()
{
    clearTimeout(temporizador);
    temporizador = setTimeout(() => {
        this.parentNode.removeChild(this);
        actualizarCookie();
    }, retrasoDobleClick);
}

function modificarLi()
{
    // Retrasa la ejecución y si hay doble click no ejecutará la función.
    clearTimeout(temporizador);
    temporizador = setTimeout(() => {
        let nuevoProducto = prompt("Teclea el nuevo nombre");
        this.textContent = nuevoProducto;
        actualizarCookie();
    },retrasoDobleClick);
}
    