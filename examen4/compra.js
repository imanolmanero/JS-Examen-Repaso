// ============ AL CARGAR LA PÁGINA ============
window.onload = function() {
    cargarProductos();
};

// ============ CARGAR PRODUCTOS DESDE LOCALSTORAGE ============
function cargarProductos() {
    let aProductos = JSON.parse(localStorage.getItem('aProductos')) || [];
    
    aProductos.forEach(producto => {
        crearElementoLista(producto);
    });
}

// ============ AÑADIR PRODUCTO ============
function anadirProducto() {
    // 1. Obtener el valor del input
    const input = document.getElementById('inputProducto');
    const producto = input.value.trim();
    
    // 2. Validación
    if (!producto) {
        alert('Escribe un producto');
        return;
    }
    
    // 3. Crear elemento en la lista
    crearElementoLista(producto);
    
    // 4. Guardar en localStorage
    guardarEnLocalStorage(producto);
    
    // 5. Limpiar input
    input.value = '';
}

// ============ CREAR ELEMENTO <li> EN LA LISTA ============
function crearElementoLista(producto) {
    const lista = document.getElementById('listaProductos');
    const li = document.createElement('li');
    li.textContent = producto;
    lista.appendChild(li);
}

// ============ GUARDAR EN LOCALSTORAGE ============
function guardarEnLocalStorage(producto) {
    let aProductos = JSON.parse(localStorage.getItem('aProductos')) || [];
    aProductos.push(producto);
    localStorage.setItem('aProductos', JSON.stringify(aProductos));
}

// ============ RESETEAR TODA LA LISTA ============
function resetearLista() {
    localStorage.clear();
    location.reload();
}