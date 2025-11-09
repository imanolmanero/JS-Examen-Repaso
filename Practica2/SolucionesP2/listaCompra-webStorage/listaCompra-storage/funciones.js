// Variables globales

// Botón que añade un elemento a la lista de la compra.
let botonAnadir = document.getElementById("banadir");
botonAnadir.addEventListener("click",fanadir);

// Caja de texto con el contenido del elemento que hay que añadir a la lista de la compra.
let nuevoElemento= document.getElementById("canadir");

// Lista que representa la lista de la compra.
let listaCompra = document.getElementById("listaCompra");

// Evento que resetea la lista de la compra.
document.getElementById("resetear").addEventListener("click",resetear);

// Si hay elementos en la lista almacenada en el localStorage, los muestra
rellenarContenido();
let temporizador;
const retrasoDobleClick = 300;


function fanadir()
{
    // Añade un elemento a la lista de la compra.
    try
    {
        if (nuevoElemento.value == "")
            throw "No se pueden añadir elementos a la lista vacíos";
        let lista = document.createElement("li");
        let texto = document.createTextNode(nuevoElemento.value);
        lista.appendChild(texto);
        lista.addEventListener("dblclick", eliminarLi);
        listaCompra.appendChild(lista);
        nuevoElemento.value = "";

        actualizar(); // Además de mostrar en la página hay que actualizar el localstorage
    }
    catch(e)
    {
        alert(e);
        nuevoElemento.focus();
    }
}


function actualizar()
{
        localStorage.setItem("compra",listaCompra.innerHTML); // Añado valor con la etiqueta.
}

function resetear()
{
    localStorage.removeItem("compra")
     //listaCompra.innerHTML="";
    for( let x = listaCompra.childNodes.length - 1; x >= 0;x--){
        listaCompra.childNodes[x].parentNode.removeChild(listaCompra.childNodes[x]);
    }
}     

function rellenarContenido()
{
    // Si hay algo en la lista de la compra hay que mostrarlo.
    if (localStorage.getItem("compra")!="")
    {
        // mostrar
        listaCompra.innerHTML = localStorage.getItem("compra");
        //los elementos añadidos no tienen el comportamiento Li.
        elementosLista = document.getElementsByTagName("li");
        let i=0;
        while(i<elementosLista.length)
        {
            elementosLista[i].addEventListener("dblclick",eliminarLi);
            elementosLista[i].addEventListener("click",modificarLi);
            i++;
        }
    }
};

function eliminarLi(){
    clearTimeout(temporizador);
    temporizador = setTimeout(() => {
        this.parentNode.removeChild(this);
        actualizar();
    },retrasoDobleClick);
}

function modificarLi(){
    clearTimeout(temporizador);
    temporizador = setTimeout(() => {
        let nuevoProducto = prompt("Teclea el nuevo nombre");
        this.textContent = nuevoProducto;
        this.style.color="red";
        actualizar();
    },retrasoDobleClick);
}
    