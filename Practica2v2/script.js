
var añadirProductoButton = document.querySelector("#añadirProducto")
var añadirProductoInput = document.querySelector("#producto")
var listaProductosDOM = document.querySelector("#listaProductos")
var vaciarListaButton = document.querySelector("#resetLista")
var elementoLista = document.getElementsByTagName("li")

var listaProductos = actualizarLista()

crearLista()

function actualizarLista(){
    if(typeof localStorage !== "undefined"){
        var lista = JSON.parse(localStorage.getItem("productos"));
        return lista ? lista : [];
    }
    return []
}

function añadirProducto(event){
    event.preventDefault()

    var producto = document.querySelector("#producto").value
    if(producto == ""){
        alert("Debes introducir un producto")
    }
    else{
        var productos = actualizarLista();
        productos.push(producto)
        localStorage.setItem("productos", JSON.stringify(productos))
        añadirProductoInput.value = ""
        actualizarLista()
        crearLista()
    }

}

function crearLista(){
    var lista = actualizarLista()
        reinicarLista()
    if (lista){
        lista.forEach(producto => {
            var productoLista = document.createElement("li")
            productoLista.textContent = producto
            productoLista.addEventListener("dblclick",eliminarUnProducto)

            listaProductosDOM.appendChild(productoLista)
        });
    }
}

function reinicarLista(){
    var productosLista = listaProductosDOM.children

    Array.from(productosLista).forEach(producto =>{
        producto.remove();
        
    })
}

async function vaciarlista(){
    // try{
    //     //ENVIAR DATOS AL BACKEND
    //     const response = await fetch("http://localhost:3000/productos/vaciarlista",
    //         {
    //             method: "POST",
    //             body: JSON.stringify('hola'),
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         }
    //     )
    //     if(!response.ok){
    //         throw new Error("No se pudo vaciar la lista")
    //     }
    //     const data2 = await response.json()
    //     console.log(data2);

    //     //OBETNER DATOS DEL BACKEND
    //     const response2 = await fetch("http://localhost:3000/productos/vaciarlista")
    //     if(!response2.ok){
    //         throw new Error("No se pudo vaciar la lista")
    //     }
    //     const data = await response.json()
    //     console.log(data);
    // }catch(e){
    //     alert("No hay productos")
    // }

    if(localStorage.getItem("productos")){
        localStorage.removeItem("productos")
    }
    actualizarLista()
    reinicarLista()
}

function eliminarUnProducto(event){
    var lista = JSON.parse(localStorage.getItem("productos"));


    var listaArray = []

    Array.from(lista).forEach(elemento=>{
        listaArray.push(elemento)
    })

    indiceElemento = listaArray.indexOf(event.target.textContent)

    if(indiceElemento !== 1){
        listaArray.splice(indiceElemento,1)
    }

    localStorage.setItem("productos", JSON.stringify(listaArray))

    
    if(!listaArray){
        vaciarlista()
    }
    event.target.remove()
}


añadirProductoButton.addEventListener("click", añadirProducto)
vaciarListaButton.addEventListener("click",vaciarlista)
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