// Eventos. onclick en vez de addeventlistener
document.getElementById("inicializar").onclick = inicializar
document.getElementById("visualizar").onclick = visualizar
document.body.onload= mostrar

// Código fuera de funciones.
// Array de dos dimensiones para las anotaciones.
alert("Se está ejecutando código de fuera de las funciones");
let anotaciones = new Array(30);
for(let x = 0; x < anotaciones.length; x++)
    anotaciones[x] = []; // bidimensional

// Añadir el evento click a todos los botones
// También se puede con getElementsByTagName
let botones = document.getElementsByClassName('btnDias');
for (let i = 0; i < botones.length; i++) 
{
        botones[i].addEventListener("click", agregarAnotacion);
}

function mostrar()
{
    alert('Escribe la anotación y después indica el día. Pulsa inicializar para eliminar el contenido de la caja de texto.');
}

function agregarAnotacion(event){
    try
    {
        // Con event.target.value o con this.value, podemos obtener el value del botón clicado

        let anotacion = document.getElementById("anotacion").value;
        if (anotacion != "")
            // valor del botón en el que han hecho click
            anotaciones[this.value - 1].push(anotacion);
        else
            throw "La anotación no puede estar vacía";

    }
    catch(err)
    {
        alert(err);
    }
}

function inicializar()
{
    document.getElementById("anotacion").value="";
}

function visualizar()
{
    let datos ="";
    for(let x in anotaciones)
    {
        if (anotaciones[x].length > 0)
        {
            let dia = parseInt(x) + 1;
            datos += "Anotaciones del día " + dia + "\n";
            anotaciones[x].forEach(el => datos += el + "\n")
        }

    }
    alert(datos);
}
