window.onload = function(){
    cargarDatos();
}

function cargarDatos(){
    const aProductos = JSON.parse(localStorage.getItem('aProductos')) || [];
    aProductos.forEach(producto => {
        añadirFilaTabla(producto);
    });
}

function añadirProducto(){
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const categoria = document.getElementById('categoria').value;
    const disp = document.querySelector("input[name='disp']:checked").value;

    if (!nombre || !precio || !categoria || !disp ){
        alert('Rellena todos los campos');
        return;
    }

    const oProducto = {
        nombre: nombre,
        precio: Number(precio),
        categoria: categoria,
        disp: disp,
    }

    añadirFilaTabla(oProducto);

    guardarEnLocalStorage(oProducto);

    limpiarForm();
}

function añadirFilaTabla(oProducto){
    const tbody = document.getElementById('tbodyProductos');
    const fila = document.createElement('tr');

    fila.innerHTML = `
    <td>${oProducto.nombre}</td>
    <td>${oProducto.precio}</td>
    <td>${oProducto.categoria}</td>
    <td>${oProducto.disp}</td>
    `;

    tbody.appendChild(fila);
}

function guardarEnLocalStorage(oProducto){
    const aProductos = JSON.parse(localStorage.getItem('aProductos')) || [];
    aProductos.push(oProducto);
    localStorage.setItem('aProductos', JSON.stringify(aProductos));
}

function limpiarForm(){
    document.getElementById('formProducto').reset();
}

function limpiar(){
    localStorage.clear();
    location.reload();
}